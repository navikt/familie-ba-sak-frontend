import React from 'react';

import { FamilieSelect } from '@navikt/familie-form-elements';
import { IFamilieSelectProps } from '@navikt/familie-form-elements/src/select/FamilieSelect';
import { Felt } from '@navikt/familie-skjema';

import { useApp } from '../../context/AppContext';
import {
    BehandlingKategori,
    Behandlingstema,
    behandlingstemaer,
    BehandlingUnderkategori,
    IBehandlingstema,
} from '../../typer/behandlingstema';
import { ToggleNavn } from '../../typer/toggles';

interface EgneProps {
    behandlingstema: Felt<IBehandlingstema | undefined>;
    visFeilmeldinger?: boolean;
    erLesevisning?: boolean;
}

type Props = EgneProps & Omit<IFamilieSelectProps, 'children'>;

export const BehandlingstemaSelect = ({
    behandlingstema,
    visFeilmeldinger = false,
    erLesevisning = false,
    ...familieSelectProps
}: Props) => {
    const { toggles } = useApp();
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
            {Object.values(behandlingstemaer).map(tema => {
                return (
                    <option
                        key={tema.id}
                        aria-selected={verdi !== undefined && verdi.id === tema.id}
                        value={tema.id}
                        disabled={
                            (tema.kategori === BehandlingKategori.EØS &&
                                !toggles[ToggleNavn.brukEøs]) ||
                            (tema.underkategori === BehandlingUnderkategori.UTVIDET &&
                                !toggles[ToggleNavn.kanBehandleUtvidet])
                        }
                    >
                        {tema.navn}
                    </option>
                );
            })}
        </FamilieSelect>
    );
};
