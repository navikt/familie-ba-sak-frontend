import { FamilieSelect } from '@navikt/familie-form-elements';
import Lenke from 'nav-frontend-lenker';
import React from 'react';
import { useApp } from '../../../../context/AppContext';
import { useBehandling } from '../../../../context/BehandlingContext';
import { IBehandling } from '../../../../typer/behandling';
import { IPar } from '../../../../typer/common';
import { IFagsak } from '../../../../typer/fagsak';
import { hentPeriodeHash, IPeriode, periodeToString } from '../../../../typer/periode';
import { bergunnelseTyper } from '../../../../typer/vedtak';
import { hentAktivVedtakPåBehandlig } from '../../../../utils/fagsak';

interface IBegrunnelserTabellProps {
    fagsak: IFagsak;
    åpenBehandling: IBehandling;
}

const BegrunnelserTabell: React.FC<IBegrunnelserTabellProps> = ({ fagsak, åpenBehandling }) => {
    const aktivVedtak = hentAktivVedtakPåBehandlig(åpenBehandling);
    const harAndeler = åpenBehandling.beregningOversikt.length > 0;

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
                        </tr>
                    </thead>
                    <tbody>
                        {åpenBehandling.beregningOversikt
                            .slice()
                            .reverse()
                            .map(beregning => {
                                const periode: IPeriode = {
                                    fom: beregning.periodeFom,
                                    tom: beregning.periodeTom,
                                };
                                const begrunnelse =
                                    aktivVedtak?.stønadBrevMetadata?.begrunnelser[
                                        hentPeriodeHash(periode)
                                    ];

                                return (
                                    <tr key={hentPeriodeHash(periode)}>
                                        <td>{periodeToString(periode)}</td>
                                        <td>{`${beregning.utbetaltPerMnd} kr/mnd for ${beregning.antallBarn} barn`}</td>
                                        <td>
                                            <BegrunnelseInput
                                                begrunnelseId={
                                                    Math.random().toString(36).substring(2, 15) +
                                                    Math.random().toString(36).substring(2, 15)
                                                }
                                                begrunnelse={begrunnelse}
                                                fagsakId={fagsak.id}
                                                periode={periode}
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
    begrunnelseId: string;
    begrunnelse: { [key: string]: string };
    fagsakId: number;
    periode: IPeriode;
}

const BegrunnelseInput: React.FC<IBegrunnelseInputProps> = ({
    begrunnelseId,
    begrunnelse,
    fagsakId,
    periode,
}) => {
    const { axiosRequest } = useApp();
    const { erLesevisning } = useBehandling();
    const [mutableBegrunnelse, settMutableBegrunnelse] = React.useState(begrunnelse);

    const onChangeBegrunnelse = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        axiosRequest({
            method: 'PUT',
            url: `/familie-ba-sak/api/fagsaker/${fagsakId}/legg-til-stønad-brev-begrunnelse`,
            data: {
                periode,
                begrunnelse: value !== 'Velg behandlingsresultat' && value,
                begrunnelseId: begrunnelseId,
            },
        });
        //settMutableBegrunnelse(value);
    };

    return (
        <div className={'begrunnelse-input'}>
            <div className={'begrunnelse-input__med-knapp'}>
                {erLesevisning() && mutableBegrunnelse ? (
                    Object.entries(mutableBegrunnelse).map(([key, value]) => <div> {value} </div>)
                ) : (
                    <FamilieSelect
                        name="begrunnelse"
                        bredde={'l'}
                        erLesevisning={erLesevisning()}
                        onChange={event => onChangeBegrunnelse(event)}
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
                )}
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
