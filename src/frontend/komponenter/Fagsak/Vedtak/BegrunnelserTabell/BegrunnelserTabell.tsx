import { FamilieSelect } from '@navikt/familie-form-elements';
import Lenke from 'nav-frontend-lenker';
import { Feilmelding } from 'nav-frontend-typografi';
import React from 'react';
import { useBehandling } from '../../../../context/BehandlingContext';
import { useBegrunnelser } from '../../../../context/VedtakContext';
import Pluss from '../../../../ikoner/Pluss';
import { IBehandling } from '../../../../typer/behandling';
import { IPar } from '../../../../typer/common';
import { periodeToString } from '../../../../typer/periode';
import { bergunnelseTyper, IRestStønadBrevBegrunnelse } from '../../../../typer/vedtak';
import IkonKnapp from '../../../Felleskomponenter/IkonKnapp/IkonKnapp';

interface IBegrunnelserTabellProps {
    åpenBehandling: IBehandling;
}

const BegrunnelserTabell: React.FC<IBegrunnelserTabellProps> = ({ åpenBehandling }) => {
    const harAndeler = åpenBehandling.beregningOversikt.length > 0;
    const { leggTilBegrunnelse, begrunnelser } = useBegrunnelser();

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
    årsak?: string;
    fom: string;
    tom?: string;
    id: number;
}

const BegrunnelseInput: React.FC<IBegrunnelseInputProps> = ({
    fom,
    tom,
    id,
    begrunnelse = '',
    årsak = '',
}) => {
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
            <FamilieSelect
                className="begrunnelse-input__select"
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
        </div>
    );
};

export default BegrunnelserTabell;
