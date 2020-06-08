import createUseContext from 'constate';
import { useState } from 'react';

import { BehandlingKategori, BehandlingUnderkategori, Behandlingstype } from '../typer/behandling';
import { IFagsak } from '../typer/fagsak';
import { IPerson, IFamilieRelasjon, FamilieRelasjonRolle } from '../typer/person';

interface IProps {
    fagsak: IFagsak;
    bruker: IPerson;
}

export interface IOpprettBehandlingBarn {
    barn: IFamilieRelasjon;
    checked: boolean;
}

const [OpprettBehandlingProvider, useOpprettBehandling] = createUseContext(
    ({ bruker, fagsak }: IProps) => {
        const [behandlingstype, settBehandlingstype] = useState(
            fagsak.behandlinger.length === 0
                ? Behandlingstype.FØRSTEGANGSBEHANDLING
                : Behandlingstype.REVURDERING
        );
        const [kategori, settKategori] = useState(BehandlingKategori.NASJONAL);
        const [underkategori, settUnderkategori] = useState(BehandlingUnderkategori.ORDINÆR);
        const [barna, settBarna] = useState<IOpprettBehandlingBarn[]>(
            bruker.familierelasjoner
                .filter(
                    (relasjon: IFamilieRelasjon) =>
                        relasjon.relasjonRolle === FamilieRelasjonRolle.BARN
                )
                .map((barn: IFamilieRelasjon) => ({
                    barn,
                    checked: true,
                }))
        );

        return {
            barna,
            settBarna,
            behandlingstype,
            kategori,
            settBehandlingstype,
            settKategori,
            settUnderkategori,
            underkategori,
        };
    }
);

export { OpprettBehandlingProvider, useOpprettBehandling };
