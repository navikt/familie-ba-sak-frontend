import React from 'react';

import { FamilieSelect } from '@navikt/familie-form-elements';
import type { IFamilieSelectProps } from '@navikt/familie-form-elements/src/select/FamilieSelect';
import type { Felt } from '@navikt/familie-skjema';

import type { Behandlingstema, IBehandlingstema } from '../../typer/behandlingstema';
import { BehandlingKategori, behandlingstemaer } from '../../typer/behandlingstema';
import { FagsakType } from '../../typer/fagsak';

interface EgneProps {
    behandlingstema: Felt<IBehandlingstema | undefined>;
    fagsakType?: FagsakType;
    visFeilmeldinger?: boolean;
    erLesevisning?: boolean;
}

type Props = EgneProps & Omit<IFamilieSelectProps, 'children'>;

export const BehandlingstemaSelect = ({
    behandlingstema,
    fagsakType,
    visFeilmeldinger = false,
    erLesevisning = false,
    ...familieSelectProps
}: Props) => {
    const { verdi } = behandlingstema;
    return (
        <FamilieSelect
            {...familieSelectProps}
            {...behandlingstema.hentNavInputProps(visFeilmeldinger)}
            value={verdi !== undefined ? verdi.id : ''}
            onChange={evt => {
                behandlingstema.validerOgSettFelt(
                    behandlingstemaer[evt.target.value as Behandlingstema]
                );
            }}
            erLesevisning={erLesevisning}
            lesevisningVerdi={verdi !== undefined ? verdi.navn : ''}
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
        </FamilieSelect>
    );
};
