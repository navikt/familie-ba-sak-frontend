import createUseContext from 'constate';
import { SyntheticEvent, useState } from 'react';
import { Skalaetikett } from '@navikt/helse-frontend-tidslinje/lib/components/types.internal';
import moment from 'moment';
import { ToggleKnappPureProps } from 'nav-frontend-toggle';

export interface ITidslinjeSkala {
    id: number;
    navn: string;
    måneder: number;
}

export enum TidslinjeSkala {
    HALVT_ÅR,
    ETT_ÅR,
    TRE_ÅR,
}

const [TidslinjeProvider, useTidslinje] = createUseContext(() => {
    const tidslinjeSkalaer: ITidslinjeSkala[] = [
        { id: TidslinjeSkala.HALVT_ÅR, navn: '6 mnd', måneder: 6 },
        { id: TidslinjeSkala.ETT_ÅR, navn: '1 år', måneder: 12 },
        { id: TidslinjeSkala.TRE_ÅR, navn: '3 år', måneder: 36 },
    ];

    const [aktivEtikett, settAktivEtikett] = useState<Skalaetikett | undefined>(undefined);

    const [tidslinjeInput, settTidslinjeInput] = useState({
        aktivSkala: tidslinjeSkalaer[1],
        sluttDato: moment(),
        startDato: moment().subtract(12, 'month'),
    });

    const genererFormatertÅrstall = () => {
        const startÅr = tidslinjeInput.startDato.year();
        const sluttÅr = tidslinjeInput.sluttDato.year();

        if (startÅr !== sluttÅr) {
            return `${startÅr} - ${sluttÅr}`;
        } else return sluttÅr;
    };

    const genererToggleKnapper = () => {
        return tidslinjeSkalaer.map(skala => ({
            children: skala.navn,
            pressed: skala.id === TidslinjeSkala.ETT_ÅR,
        }));
    };

    const naviger = (retning: 'venstre' | 'høyre') => {
        if (retning === 'venstre') {
            settTidslinjeInput(({ sluttDato, startDato, aktivSkala }) => ({
                ...tidslinjeInput,
                sluttDato: sluttDato.clone().subtract(aktivSkala.måneder, 'month'),
                startDato: startDato.clone().subtract(aktivSkala.måneder, 'month'),
            }));
        } else {
            settTidslinjeInput(({ sluttDato, startDato, aktivSkala }) => ({
                ...tidslinjeInput,
                sluttDato: sluttDato.clone().add(aktivSkala.måneder, 'month'),
                startDato: startDato.clone().add(aktivSkala.måneder, 'month'),
            }));
        }
    };

    const endreSkala = (
        _event: SyntheticEvent<EventTarget, Event>,
        toggles: ToggleKnappPureProps[]
    ) => {
        const valgtTidslinjeSkala: ITidslinjeSkala | undefined = tidslinjeSkalaer.find(
            skala =>
                TidslinjeSkala[skala.id] ===
                TidslinjeSkala[toggles.findIndex(toggle => toggle.pressed)]
        );

        if (valgtTidslinjeSkala) {
            settTidslinjeInput(({ sluttDato }) => ({
                ...tidslinjeInput,
                aktivSkala: valgtTidslinjeSkala,
                startDato: sluttDato.clone().subtract(valgtTidslinjeSkala.måneder, 'month'),
            }));
        }
    };

    return {
        aktivEtikett,
        settAktivEtikett,
        tidslinjeInput,
        genererFormatertÅrstall,
        genererToggleKnapper,
        naviger,
        endreSkala,
    };
});

export { TidslinjeProvider, useTidslinje };
