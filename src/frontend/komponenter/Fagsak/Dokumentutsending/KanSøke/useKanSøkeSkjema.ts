import { useEffect } from 'react';

import {
    Avhengigheter,
    feil,
    FeltState,
    ok,
    useFelt,
    useSkjema,
    Valideringsstatus,
} from '@navikt/familie-skjema';
import { RessursStatus } from '@navikt/familie-typer';

import { useFagsakRessurser } from '../../../../context/FagsakContext';
import { IManueltBrevRequestPåFagsak } from '../../../../typer/dokument';
import { Målform } from '../../../../typer/søknad';
import { IFritekstFelt } from '../../../../utils/fritekstfelter';
import {
    Informasjonsbrev,
    ISelectOptionMedBrevtekst,
} from '../../../Felleskomponenter/Hendelsesoversikt/BrevModul/typer';

export const useKanSøkeSkjema = () => {
    const { bruker } = useFagsakRessurser();

    const fritekster = useFelt<FeltState<IFritekstFelt>[]>({
        verdi: [],
        valideringsfunksjon: (felt: FeltState<FeltState<IFritekstFelt>[]>) => {
            return felt.verdi.some(
                fritekst =>
                    fritekst.valideringsstatus === Valideringsstatus.FEIL ||
                    fritekst.verdi.tekst.length === 0
            )
                ? feil(felt, '')
                : ok(felt);
        },
    });

    const dokumenter = useFelt({
        verdi: [],
        valideringsfunksjon: (
            felt: FeltState<ISelectOptionMedBrevtekst[]>,
            avhengigheter?: Avhengigheter
        ) => {
            if (felt.verdi.length === 0 && avhengigheter?.fritekster.verdi.length === 0) {
                return feil(felt, 'Du må velge minst ett dokument');
            } else {
                return ok(felt);
            }
        },
        avhengigheter: { fritekster },
    });

    const {
        skjema: kanSøkeSkjema,
        nullstillSkjema: nullstillKanSøkeSkjema,
        onSubmit: onKanSøkeSubmit,
        settVisfeilmeldinger: settVisfeilmeldingerKanSøke,
    } = useSkjema<
        {
            dokumenter: ISelectOptionMedBrevtekst[];
            fritekster: FeltState<IFritekstFelt>[];
        },
        string
    >({
        felter: {
            dokumenter,
            fritekster,
        },
        skjemanavn: 'Kan søke',
    });

    useEffect(() => {
        nullstillKanSøkeSkjema();
    }, [bruker.status]);

    const hentKanSøkeSkjemaData = (målform: Målform): IManueltBrevRequestPåFagsak => {
        if (bruker.status === RessursStatus.SUKSESS) {
            const fritekster = kanSøkeSkjema.felter.fritekster.verdi.map(
                fritekstFelt => fritekstFelt.verdi.tekst
            );

            const dokumenter = kanSøkeSkjema.felter.dokumenter.verdi.map(dokumentOption => {
                if (!dokumentOption.brevtekst) {
                    throw new Error('Dokumentoptionen mangler brevtekst');
                }
                return dokumentOption.brevtekst[målform];
            });

            return {
                mottakerIdent: bruker.data.personIdent,
                multiselectVerdier: dokumenter.concat(fritekster),
                barnIBrev: [],
                mottakerMålform: målform,
                mottakerNavn: bruker.data.navn,
                brevmal: Informasjonsbrev.INFORMASJONSBREV_KAN_SØKE,
            };
        } else {
            throw Error('Bruker ikke hentet inn og vi kan ikke sende inn skjema');
        }
    };

    return {
        kanSøkeSkjema,
        hentKanSøkeSkjemaData,
        nullstillKanSøkeSkjema,
        onKanSøkeSubmit,
        settVisfeilmeldingerKanSøke,
    };
};
