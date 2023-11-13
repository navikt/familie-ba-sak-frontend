import React, { useState } from 'react';

import { Dropdown } from '@navikt/ds-react';

import { LeggTilBrevmottakerModal } from './LeggTilBrevmottakerModal';
import type {
    BrevmottakerUseSkjema,
    IRestBrevmottaker,
    SkjemaBrevmottaker,
} from './useBrevmottakerSkjema';
import { felterTilSkjematBrevmottaker } from './useBrevmottakerSkjema';
import { useLagreEllerFjernMottakerPåBehandling } from './useLagreOgFjernMottakerPåBehandling';
import type { IBehandling } from '../../../../../typer/behandling';

interface IProps<T extends SkjemaBrevmottaker | IRestBrevmottaker> {
    brevmottakere: T[];
    lagreMottaker: (useSkjema: BrevmottakerUseSkjema) => void;
    fjernMottaker: (mottaker: T) => void;
    erLesevisning: boolean;
}

interface IFagsakProps {
    brevmottakere: SkjemaBrevmottaker[];
    settBrevmottakere: (mottakere: SkjemaBrevmottaker[]) => void;
}

interface IBehandlingProps {
    behandling: IBehandling;
    erLesevisning: boolean;
}

const utledMenyinnslag = (antallMottakere: number, erLesevisning: boolean) => {
    if (erLesevisning) {
        return antallMottakere === 1 ? 'Se brevmottaker' : 'Se brevmottakere';
    } else {
        return antallMottakere === 0
            ? 'Legg til brevmottaker'
            : antallMottakere === 1
            ? 'Legg til eller fjern brevmottaker'
            : 'Se eller fjern brevmottakere';
    }
};

const LeggTilEllerFjernBrevmottakere = <T extends SkjemaBrevmottaker | IRestBrevmottaker>({
    brevmottakere,
    lagreMottaker,
    fjernMottaker,
    erLesevisning,
}: IProps<T>) => {
    const [visModal, settVisModal] = useState(false);

    const menyinnslag = utledMenyinnslag(brevmottakere.length, erLesevisning);

    return (
        <>
            <Dropdown.Menu.List.Item onClick={() => settVisModal(true)}>
                {menyinnslag}
            </Dropdown.Menu.List.Item>

            {visModal && (
                <LeggTilBrevmottakerModal
                    brevmottakere={brevmottakere}
                    lukkModal={() => settVisModal(false)}
                    lagreMottaker={lagreMottaker}
                    fjernMottaker={fjernMottaker}
                    erLesevisning={erLesevisning}
                />
            )}
        </>
    );
};

export const LeggTilEllerFjernBrevmottakereBehandling: React.FC<IBehandlingProps> = ({
    behandling,
    erLesevisning,
}) => {
    const { lagreMottaker, fjernMottaker } = useLagreEllerFjernMottakerPåBehandling({
        behandlingId: behandling.behandlingId,
    });

    return (
        <LeggTilEllerFjernBrevmottakere
            brevmottakere={behandling.brevmottakere}
            lagreMottaker={lagreMottaker}
            fjernMottaker={fjernMottaker}
            erLesevisning={erLesevisning}
        />
    );
};

export const LeggTilEllerFjernBrevmottakereFagsak: React.FC<IFagsakProps> = ({
    brevmottakere,
    settBrevmottakere,
}) => {
    const lagreMottaker = (useSkjema: BrevmottakerUseSkjema) => {
        const nyMottaker = felterTilSkjematBrevmottaker(useSkjema.skjema.felter);
        const mottakere: SkjemaBrevmottaker[] = [...brevmottakere, nyMottaker];
        return settBrevmottakere(mottakere);
    };

    const fjernMottaker = (mottaker: SkjemaBrevmottaker) => {
        const mottakereUtenFjernetPerson = brevmottakere.filter(it => it !== mottaker);
        settBrevmottakere(mottakereUtenFjernetPerson);
    };

    return (
        <LeggTilEllerFjernBrevmottakere
            brevmottakere={brevmottakere}
            lagreMottaker={lagreMottaker}
            fjernMottaker={fjernMottaker}
            erLesevisning={false}
        />
    );
};
