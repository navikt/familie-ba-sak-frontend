import React from 'react';
import { IBehandling } from '../../../../typer/behandling';
import { hentAktivVedtakPåBehandlig } from '../../../../utils/fagsak';
import Lenke from 'nav-frontend-lenker';
import { IPeriode, hentPeriodeHash, periodeToString } from '../../../../typer/periode';
import { IFagsak } from '../../../../typer/fagsak';
import { useApp } from '../../../../context/AppContext';
import { FamilieInput, FamilieKnapp } from '@navikt/familie-form-elements';
import { useBehandling } from '../../../../context/BehandlingContext';

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
    begrunnelse: string | undefined;
    fagsakId: number;
    periode: IPeriode;
}

const BegrunnelseInput: React.FC<IBegrunnelseInputProps> = ({ begrunnelse, fagsakId, periode }) => {
    const { axiosRequest } = useApp();
    const { erLesevisning } = useBehandling();
    const [mutableBegrunnelse, settMutableBegrunnelse] = React.useState(begrunnelse);

    return (
        <div className={'begrunnelse-input'}>
            <div className={'begrunnelse-input__med-knapp'}>
                <FamilieInput
                    bredde={'L'}
                    label={'Begrunnelse'}
                    defaultValue={begrunnelse}
                    value={mutableBegrunnelse}
                    onChange={event => settMutableBegrunnelse(event.target.value)}
                    erLesevisning={erLesevisning()}
                />
                <FamilieKnapp
                    erLesevisning={erLesevisning()}
                    mini={true}
                    onClick={() =>
                        axiosRequest({
                            method: 'PUT',
                            url: `/familie-ba-sak/api/fagsaker/${fagsakId}/legg-til-stønad-brev-begrunnelse`,
                            data: {
                                periode,
                                begrunnelse: mutableBegrunnelse,
                            },
                        })
                    }
                >
                    Sett begrunnelse
                </FamilieKnapp>
            </div>
        </div>
    );
};

export default BegrunnelserTabell;
