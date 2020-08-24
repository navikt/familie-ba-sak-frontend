import { FamilieSelect } from '@navikt/familie-form-elements';
import Lenke from 'nav-frontend-lenker';
import { Feilmelding } from 'nav-frontend-typografi';
import React from 'react';
import { useApp } from '../../../../context/AppContext';
import { useBehandling } from '../../../../context/BehandlingContext';
import { useBegrunnelser } from '../../../../context/VedtakContext';
import Pluss from '../../../../ikoner/Pluss';
import { IBehandling } from '../../../../typer/behandling';
import { IPar } from '../../../../typer/common';
import { IFagsak } from '../../../../typer/fagsak';
import { periodeToString } from '../../../../typer/periode';
import {
    bergunnelseTyper,
    IRestStønadBrevBegrunnelse,
    IVedtakForBehandling,
} from '../../../../typer/vedtak';
import IkonKnapp from '../../../Felleskomponenter/IkonKnapp/IkonKnapp';

interface IBegrunnelserTabellProps {
    fagsak: IFagsak;
    åpenBehandling: IBehandling;
    aktivVedtak: IVedtakForBehandling | undefined;
}

const BegrunnelserTabell: React.FC<IBegrunnelserTabellProps> = ({
    fagsak,
    åpenBehandling,
    aktivVedtak,
}) => {
    const harAndeler = åpenBehandling.beregningOversikt.length > 0;
    const { axiosRequest } = useApp();
    const { leggTilBegrunnelse, begrunnelser } = useBegrunnelser();

    /*const leggTilFørsteBegrunnelse = (data: IRestStønadBrevBegrunnelse) => {
        axiosRequest<IFagsak, IRestStønadBrevBegrunnelse>({
            method: 'POST',
            url: `/familie-ba-sak/api/fagsaker/${fagsak.id}/legg-til-stønad-brev-begrunnelse`,
            data,
        }).then((response: Ressurs<IFagsak>) => {
            if ((response.status = RessursStatus.SUKSESS)) {
                console.log('Suksess');
            }
        });
    };*/

    /*const leggTilNyBegrunnelse = (periode: IPeriode) => {
        const randomId =
            Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15);
        return axiosRequest({
            method: 'PUT',
            url: `/familie-ba-sak/api/fagsaker/${fagsak.id}/legg-til-stønad-brev-begrunnelse`,
            data: {
                periode,
                begrunnelse: '',
                begrunnelseId: randomId,
            },
        });
    };*/

    return (
        <div className={'begrunnelser-tabell'}>
            {harAndeler ? (
                <table className={'tabell'}>
                    <thead>
                        <tr>
                            <th role="columnheader" aria-sort="none">
                                <Lenke href="#">Periode</Lenke>
                            </th>
                            <th>Behandlingsresultat</th>
                            <th>Begrunnelse(r)</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {åpenBehandling.beregningOversikt
                            .slice()
                            .reverse()
                            .map(beregning => {
                                const begrunnelserForPeriode = begrunnelser.filter(
                                    (begrunnelse: IRestStønadBrevBegrunnelse) => {
                                        return (
                                            begrunnelse.fom === beregning.periodeFom &&
                                            begrunnelse.tom === beregning.periodeTom
                                        );
                                    }
                                );

                                return (
                                    <tr key={beregning.periodeFom}>
                                        <td>
                                            {periodeToString({
                                                fom: beregning.periodeFom,
                                                tom: beregning.periodeTom,
                                            })}
                                        </td>
                                        <td>{`${beregning.utbetaltPerMnd} kr/mnd for ${beregning.antallBarn} barn`}</td>
                                        <td>
                                            {begrunnelserForPeriode.map(begrunnelse => {
                                                return begrunnelse.id ? (
                                                    <BegrunnelseInput
                                                        id={begrunnelse.id}
                                                        fom={begrunnelse.fom}
                                                        tom={begrunnelse.tom}
                                                        begrunnelse={begrunnelse.begrunnelse}
                                                    />
                                                ) : (
                                                    <Feilmelding>
                                                        Begrunnelsen mangler id
                                                    </Feilmelding>
                                                );
                                            })}
                                        </td>
                                        <td>
                                            <IkonKnapp
                                                id={`legg-til-begrunnelse-${periodeToString({
                                                    fom: beregning.periodeFom,
                                                    tom: beregning.periodeTom,
                                                })}`}
                                                onClick={() => {
                                                    leggTilBegrunnelse({
                                                        fom: beregning.periodeFom,
                                                        tom: beregning.periodeTom,
                                                        begrunnelse: '',
                                                        årsak: '',
                                                    });
                                                }}
                                                label={'Legg til'}
                                                ikon={<Pluss />}
                                                spinner={false}
                                            />
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            ) : null}
        </div>
    );
};

interface IBegrunnelseInputProps {
    begrunnelse?: string;
    fom: string;
    tom: string;
    id: number;
}

const BegrunnelseInput: React.FC<IBegrunnelseInputProps> = ({ fom, tom, id, begrunnelse = '' }) => {
    const { erLesevisning } = useBehandling();
    const [mutableBegrunnelse, settMutableBegrunnelse] = React.useState(begrunnelse);
    const { endreBegrunnelse } = useBegrunnelser();

    const onChangeBegrunnelse = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value ? event.target.value : '';
        endreBegrunnelse({ id: id, fom: fom, tom: tom, begrunnelse: value, årsak: '' });
        settMutableBegrunnelse(value);
    };

    return (
        <div className={'begrunnelse-input'}>
            <div className={'begrunnelse-input__med-knapp'}>
                <FamilieSelect
                    name="begrunnelse"
                    bredde={'l'}
                    erLesevisning={erLesevisning()}
                    onChange={event => onChangeBegrunnelse(event)}
                    value={mutableBegrunnelse}
                >
                    <option>Velg behandlingsresultat</option>
                    {Object.values(bergunnelseTyper).map((type: IPar) => {
                        return (
                            <option key={type.id} value={type.id}>
                                {type.navn}
                            </option>
                        );
                    })}
                </FamilieSelect>

                {/*<FamilieKnapp
                    erLesevisning={erLesevisning()}
                    mini={true}
                    onClick={() =>
                        axiosRequest({
                            method: 'PUT',
                            url: `/familie-ba-sak/api/fagsaker/${fagsakId}/legg-til-stønad-brev-begrunnelse`,
                            data: {
                                periode,
                                begrunnelse: mutableBegrunnelse,
                                begrunnelseId:
                                    Math.random().toString(36).substring(2, 15) +
                                    Math.random().toString(36).substring(2, 15),
                            },
                        })
                    }
                >
                    Sett begrunnelse
                </FamilieKnapp>*/}
            </div>
        </div>
    );
};

export default BegrunnelserTabell;
