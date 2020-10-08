import createUseContext from 'constate';
import { useState, useEffect } from 'react';

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
        const [behandlingstype, settBehandlingstype] = useState<Behandlingstype | undefined>(
            undefined
        );
        const [kategori, settKategori] = useState(BehandlingKategori.NASJONAL);
        const [underkategori, settUnderkategori] = useState(BehandlingUnderkategori.ORDINÆR);
        const [barna, settBarna] = useState<IOpprettBehandlingBarn[]>([]);

        useEffect(() => {
            settBarna(
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
        }, [bruker, fagsak]);

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
