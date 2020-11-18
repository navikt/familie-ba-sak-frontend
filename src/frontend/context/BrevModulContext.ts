import createUseContext from 'constate';
import React, { useEffect } from 'react';

import { Behandlingstype, BehandlingÅrsak, hentStegNummer } from '../typer/behandling';
import {
    byggDataRessurs,
    byggFeiletRessurs,
    byggHenterRessurs,
    byggTomRessurs,
    Ressurs,
    RessursStatus,
} from '@navikt/familie-typer';
import { useApp } from './AppContext';
import { useBehandling } from './BehandlingContext';
import { IFagsak } from '../typer/fagsak';
import {
    Brevmal,
    IBrevData,
    ISelectOptionMedBrevtekst,
} from '../komponenter/Felleskomponenter/Hendelsesoversikt/BrevModul/typer';
import { AxiosError } from 'axios';
import { useSkjema } from '../familie-skjema/skjema';
import { IGrunnlagPerson, PersonType } from '../typer/person';
import { Målform } from '../typer/søknad';
import { useFelt } from '../familie-skjema/felt';
import { FeltState, FeltContext, Valideringsstatus } from '../familie-skjema/typer';
import { feil, ok } from '../familie-skjema/validators';

const [BrevModulProvider, useBrevModul] = createUseContext(() => {
    const { axiosRequest } = useApp();
    const { åpenBehandling } = useBehandling();

    const mottakerIdent = useFelt({
        verdi: '',
        valideringsfunksjon: (felt: FeltState<string>) =>
            felt.verdi.length >= 1 ? ok(felt) : feil(felt, 'Du må velge en mottaker'),
    });
    const brevmal = useFelt({
        verdi: '',
        valideringsfunksjon: (felt: FeltState<Brevmal | ''>) =>
            felt.verdi ? ok(felt) : feil(felt, 'Du må velge en brevmal'),
    });
    const multiselect = useFelt({
        verdi: [],
        valideringsfunksjon: (
            felt: FeltState<ISelectOptionMedBrevtekst[]>,
            avhengigheter?: FeltContext
        ) => {
            const brevmal: Brevmal | '' = avhengigheter?.brevmal.verdi;

            return felt.verdi.length > 0
                ? ok(felt)
                : feil(
                      felt,
                      `Du må velge minst ${
                          brevmal === Brevmal.INNHENTE_OPPLYSNINGER ? 'ett dokument' : 'en årsak'
                      }`
                  );
        },
        skalFeltetVises: (avhengigheter: FeltContext) => {
            return avhengigheter?.brevmal.valideringsstatus === Valideringsstatus.OK;
        },
        avhengigheter: { brevmal },
    });

    const { kanSendeSkjema, onSubmit, skjema } = useSkjema<
        {
            mottakerIdent: string;
            brevmal: Brevmal | '';
            multiselect: ISelectOptionMedBrevtekst[];
        },
        IFagsak
    >({
        felter: {
            mottakerIdent,
            brevmal,
            multiselect,
        },
        skjemanavn: 'brevmodul',
    });

    const [hentetForhåndsvisning, settHentetForhåndsvisning] = React.useState<Ressurs<string>>(
        byggTomRessurs()
    );

    const [navigerTilOpplysningsplikt, settNavigerTilOpplysningsplikt] = React.useState<boolean>(
        false
    );

    /**
     * Nullstill enkelte felter i skjemaet ved oppdatering av åpenbehandling i staten.
     * Dette fordi at man kan ha gjort endring på målform
     */
    useEffect(() => {
        skjema.felter.multiselect.nullstill();
    }, [åpenBehandling]);

    const behandlingId =
        åpenBehandling.status === RessursStatus.SUKSESS && åpenBehandling.data.behandlingId;

    const personer =
        åpenBehandling.status === RessursStatus.SUKSESS ? åpenBehandling.data.personer : [];

    const mottakersMålform = () =>
        personer.find((person: IGrunnlagPerson) => {
            if (skjema.felter.mottakerIdent.valideringsstatus === Valideringsstatus.OK) {
                return person.personIdent === skjema.felter.mottakerIdent.verdi;
            } else {
                return person.type === PersonType.SØKER;
            }
        })?.målform ?? Målform.NB;

    const hentForhåndsvisning = (brevData: IBrevData) => {
        settHentetForhåndsvisning(byggHenterRessurs());
        axiosRequest<string, IBrevData>({
            method: 'POST',
            data: brevData,
            url: `/familie-ba-sak/api/dokument/forhaandsvis-brev/${behandlingId}`,
        })
            .then((response: Ressurs<string>) => {
                if (response.status === RessursStatus.SUKSESS) {
                    settHentetForhåndsvisning(
                        byggDataRessurs(`data:application/pdf;base64,${response.data}`)
                    );
                } else if (response.status === RessursStatus.FEILET) {
                    settHentetForhåndsvisning(response);
                } else {
                    settHentetForhåndsvisning(
                        byggFeiletRessurs('Ukjent feil, kunne ikke generere forhåndsvisning.')
                    );
                }
            })
            .catch((_error: AxiosError) => {
                settHentetForhåndsvisning(
                    byggFeiletRessurs('Ukjent feil ved henting av forhåndsvisning.')
                );
            });
    };

    const hentMuligeBrevMaler = () => {
        const brevMaler = [];
        if (åpenBehandling.status === RessursStatus.SUKSESS) {
            if (
                hentStegNummer(åpenBehandling.data.steg) >= 2 &&
                åpenBehandling.data.årsak === BehandlingÅrsak.SØKNAD
            ) {
                brevMaler.push(Brevmal.INNHENTE_OPPLYSNINGER);
            }

            if (
                åpenBehandling.data.type === Behandlingstype.REVURDERING &&
                åpenBehandling.data.årsak !== BehandlingÅrsak.SØKNAD
            ) {
                brevMaler.push(Brevmal.VARSEL_OM_REVURDERING);
            }
        }

        return brevMaler;
    };

    const hentSkjemaData = (): IBrevData => ({
        mottakerIdent: skjema.felter.mottakerIdent.verdi,
        multiselectVerdier: skjema.felter.multiselect.verdi
            .filter((selectOption: ISelectOptionMedBrevtekst) => selectOption.value !== 'annet')
            .map((selectOption: ISelectOptionMedBrevtekst) => {
                if (selectOption.brevtekst) {
                    return selectOption.brevtekst[mottakersMålform()];
                } else {
                    return selectOption.value;
                }
            }),
        brevmal: skjema.felter.brevmal.verdi as Brevmal,
        fritekst: '',
    });

    return {
        skjema,
        hentForhåndsvisning,
        hentMuligeBrevMaler,
        hentSkjemaData,
        hentetForhåndsvisning,
        kanSendeSkjema,
        mottakersMålform,
        navigerTilOpplysningsplikt,
        onSubmit,
        personer,
        settNavigerTilOpplysningsplikt,
    };
});

export { BrevModulProvider, useBrevModul };
