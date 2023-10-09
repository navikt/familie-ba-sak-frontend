import React from 'react';

import { Select } from '@navikt/ds-react';
import type { Felt } from '@navikt/familie-skjema';

import type { Behandlingstema, IBehandlingstema } from '../../typer/behandlingstema';
import { BehandlingKategori, behandlingstemaer } from '../../typer/behandlingstema';
import { FagsakType } from '../../typer/fagsak';

interface Props {
    behandlingstema: Felt<IBehandlingstema | undefined>;
    fagsakType: FagsakType | undefined;
    erLesevisning: boolean;
    visFeilmeldinger?: boolean;
}

export const BehandlingstemaSelect = ({
    behandlingstema,
    fagsakType,
    erLesevisning,
    visFeilmeldinger = false,
}: Props) => {
    const { verdi } = behandlingstema;
    return (
        <Select
            {...behandlingstema.hentNavInputProps(visFeilmeldinger)}
            value={verdi !== undefined ? verdi.id : ''}
            label={'Velg behandlingstema'}
            onChange={evt => {
                behandlingstema.validerOgSettFelt(
                    behandlingstemaer[evt.target.value as Behandlingstema]
                );
            }}
            readOnly={erLesevisning}
        >
            {verdi === undefined && (
                <option
                    disabled
                    key={'behandlingstema-select-disabled'}
                    value={''}
                    aria-selected={true}
                >
                    Velg behandlingstema
                </option>
            )}
            {Object.values(behandlingstemaer)
                .filter(it => it.id !== 'NASJONAL_INSTITUSJON')
                .filter(
                    it =>
                        it.kategori !== BehandlingKategori.EØS ||
                        fagsakType !== FagsakType.BARN_ENSLIG_MINDREÅRIG
                )
                .map(tema => {
                    return (
                        <option
                            key={tema.id}
                            aria-selected={verdi !== undefined && verdi.id === tema.id}
                            value={tema.id}
                        >
                            {tema.navn}
                        </option>
                    );
                })}
        </Select>
    );
};
