import { Select } from '@navikt/ds-react';
import { useManuellJournalføringContext } from '@sider/ManuellJournalføring/ManuellJournalføringContext';
import type { Behandlingstema } from '@typer/behandlingstema';
import { behandlingstemaer } from '@typer/behandlingstema';
import { hentTilgjengeligeBehandlingstemaer } from '@utils/behandling';

interface Props {
    erLesevisning: boolean;
}

export const BehandlingstemaFelt = ({ erLesevisning }: Props) => {
    const { minimalFagsak, skjema } = useManuellJournalføringContext();
    const { verdi } = skjema.felter.behandlingstema;

    return (
        <Select
            {...skjema.felter.behandlingstema.hentNavInputProps(skjema.visFeilmeldinger)}
            value={verdi !== undefined ? verdi.id : ''}
            label={'Velg behandlingstema'}
            onChange={event => {
                skjema.felter.behandlingstema.validerOgSettFelt(
                    behandlingstemaer[event.target.value as Behandlingstema]
                );
            }}
            readOnly={erLesevisning}
        >
            <option disabled value={''}>
                Velg behandlingstema
            </option>
            {hentTilgjengeligeBehandlingstemaer(minimalFagsak?.fagsakType).map(tema => {
                return (
                    <option key={tema.id} aria-selected={verdi !== undefined && verdi.id === tema.id} value={tema.id}>
                        {tema.navn}
                    </option>
                );
            })}
        </Select>
    );
};
