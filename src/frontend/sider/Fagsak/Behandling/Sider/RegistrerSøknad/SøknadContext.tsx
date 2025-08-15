import React, { createContext, useContext } from 'react';

import { useNavigate } from 'react-router';

import type { Avhengigheter, FeiloppsummeringFeil, ISkjema } from '@navikt/familie-skjema';
import { feil, ok, useFelt, useSkjema } from '@navikt/familie-skjema';
import type { Ressurs } from '@navikt/familie-typer';
import { RessursStatus } from '@navikt/familie-typer';

import useDeepEffect from '../../../../../hooks/useDeepEffect';
import { usePrevious } from '../../../../../hooks/usePrevious';
import useSakOgBehandlingParams from '../../../../../hooks/useSakOgBehandlingParams';
import type { IBehandling } from '../../../../../typer/behandling';
import { BehandlingUnderkategori } from '../../../../../typer/behandlingstema';
import { erBrukerLike, type IForelderBarnRelasjon } from '../../../../../typer/person';
import { ForelderBarnRelasjonRolle } from '../../../../../typer/person';
import type {
    IBarnMedOpplysninger,
    IBarnMedOpplysningerBackend,
    IRestRegistrerSøknad,
    Målform,
} from '../../../../../typer/søknad';
import { hentBarnMedLøpendeUtbetaling } from '../../../../../utils/fagsak';
import { useBrukerContext } from '../../../BrukerContext';
import { useFagsakContext } from '../../../FagsakContext';
import { useBehandlingContext } from '../../context/BehandlingContext';

interface Props extends React.PropsWithChildren {
    åpenBehandling: IBehandling;
}

interface SøknadSkjema {
    underkategori: BehandlingUnderkategori;
    barnaMedOpplysninger: IBarnMedOpplysninger[];
    endringAvOpplysningerBegrunnelse: string;
    målform: Målform | undefined;
}

interface SøknadContextValue {
    barnMedLøpendeUtbetaling: Set<string>;
    hentFeilTilOppsummering: () => FeiloppsummeringFeil[];
    nesteAction: (bekreftEndringerViaFrontend: boolean) => void;
    settVisBekreftModal: (vis: boolean) => void;
    skjema: ISkjema<SøknadSkjema, IBehandling>;
    søknadErLastetFraBackend: boolean;
    visBekreftModal: boolean;
}

const SøknadContext = createContext<SøknadContextValue | undefined>(undefined);

export const SøknadProvider = ({ åpenBehandling, children }: Props) => {
    const {
        vurderErLesevisning,
        settÅpenBehandling,
        gjelderInstitusjon,
        gjelderEnsligMindreårig,
        gjelderSkjermetBarn,
    } = useBehandlingContext();
    const { fagsakId } = useSakOgBehandlingParams();
    const navigate = useNavigate();
    const { fagsak } = useFagsakContext();
    const { bruker } = useBrukerContext();
    const forrigeBruker = usePrevious(bruker);
    const [visBekreftModal, settVisBekreftModal] = React.useState<boolean>(false);

    const barnMedLøpendeUtbetaling = hentBarnMedLøpendeUtbetaling(fagsak);

    const { skjema, nullstillSkjema, onSubmit, hentFeilTilOppsummering } = useSkjema<
        SøknadSkjema,
        IBehandling
    >({
        felter: {
            underkategori: useFelt<BehandlingUnderkategori>({
                verdi:
                    åpenBehandling.underkategori === BehandlingUnderkategori.UTVIDET
                        ? BehandlingUnderkategori.UTVIDET
                        : BehandlingUnderkategori.ORDINÆR,
            }),
            barnaMedOpplysninger: useFelt<IBarnMedOpplysninger[]>({
                verdi: [],
                valideringsfunksjon: (felt, avhengigheter?: Avhengigheter) => {
                    return felt.verdi.some((barn: IBarnMedOpplysninger) => barn.merket) ||
                        (avhengigheter?.barnMedLøpendeUtbetaling.size ?? []) > 0
                        ? ok(felt)
                        : feil(felt, 'Ingen av barna er valgt.');
                },
                avhengigheter: { barnMedLøpendeUtbetaling },
            }),
            endringAvOpplysningerBegrunnelse: useFelt<string>({
                verdi: '',
            }),
            målform: useFelt<Målform | undefined>({
                verdi: undefined,
                valideringsfunksjon: felt =>
                    felt.verdi !== undefined ? ok(felt) : feil(felt, 'Målform er ikke valgt.'),
            }),
        },
        skjemanavn: 'Registrer søknad',
    });

    const [søknadErLastetFraBackend, settSøknadErLastetFraBackend] = React.useState(false);

    const tilbakestillSøknad = () => {
        nullstillSkjema();
        let barnaMedOpplysninger: IBarnMedOpplysninger[];
        if (gjelderInstitusjon || gjelderEnsligMindreårig || gjelderSkjermetBarn) {
            barnaMedOpplysninger = [
                {
                    merket: true,
                    ident: bruker.personIdent,
                    navn: bruker.navn,
                    fødselsdato: bruker.fødselsdato,
                    manueltRegistrert: false,
                    erFolkeregistrert: true,
                },
            ];
        } else {
            barnaMedOpplysninger = bruker.forelderBarnRelasjon
                .filter(
                    (relasjon: IForelderBarnRelasjon) =>
                        relasjon.relasjonRolle === ForelderBarnRelasjonRolle.BARN
                )
                .map(
                    (relasjon: IForelderBarnRelasjon): IBarnMedOpplysninger => ({
                        merket: false,
                        ident: relasjon.personIdent,
                        navn: relasjon.navn,
                        fødselsdato: relasjon.fødselsdato,
                        manueltRegistrert: false,
                        erFolkeregistrert: true,
                    })
                );
        }
        skjema.felter.barnaMedOpplysninger.validerOgSettFelt(barnaMedOpplysninger);
        settSøknadErLastetFraBackend(false);
    };

    React.useEffect(() => {
        // TODO : Fjern dette når man går over til react-hook-form. Bruk heller "values", se https://react-hook-form.com/docs/useform#values
        if (forrigeBruker === undefined) {
            return;
        }
        if (!erBrukerLike(forrigeBruker, bruker)) {
            tilbakestillSøknad();
        }
    }, [forrigeBruker, bruker]);

    useDeepEffect(() => {
        if (åpenBehandling.søknadsgrunnlag) {
            settSøknadErLastetFraBackend(true);
            skjema.felter.barnaMedOpplysninger.validerOgSettFelt(
                åpenBehandling.søknadsgrunnlag.barnaMedOpplysninger.map(
                    (barnMedOpplysninger: IBarnMedOpplysningerBackend) => ({
                        ...barnMedOpplysninger,
                        merket: barnMedOpplysninger.inkludertISøknaden,
                    })
                )
            );

            skjema.felter.målform.validerOgSettFelt(
                åpenBehandling.søknadsgrunnlag.søkerMedOpplysninger.målform
            );
            skjema.felter.underkategori.validerOgSettFelt(
                åpenBehandling.søknadsgrunnlag.underkategori
            );
            skjema.felter.endringAvOpplysningerBegrunnelse.validerOgSettFelt(
                åpenBehandling.søknadsgrunnlag.endringAvOpplysningerBegrunnelse
            );
        } else {
            // Ny behandling er lastet som ikke har fullført søknad-steget.
            tilbakestillSøknad();
        }
    }, [åpenBehandling.behandlingId, åpenBehandling.søknadsgrunnlag]);

    const nesteAction = (bekreftEndringerViaFrontend: boolean) => {
        if (vurderErLesevisning()) {
            navigate(`/fagsak/${fagsakId}/${åpenBehandling?.behandlingId}/vilkaarsvurdering`);
        } else {
            onSubmit<IRestRegistrerSøknad>(
                {
                    method: 'POST',
                    data: {
                        søknad: {
                            underkategori: skjema.felter.underkategori.verdi,
                            søkerMedOpplysninger: {
                                ident: fagsak.søkerFødselsnummer,
                                målform: skjema.felter.målform.verdi,
                            },
                            barnaMedOpplysninger: skjema.felter.barnaMedOpplysninger.verdi.map(
                                (barn: IBarnMedOpplysninger): IBarnMedOpplysningerBackend => ({
                                    ...barn,
                                    inkludertISøknaden: barn.merket,
                                })
                            ),
                            endringAvOpplysningerBegrunnelse:
                                skjema.felter.endringAvOpplysningerBegrunnelse.verdi,
                            erAutomatiskRegistrert: false,
                        },
                        bekreftEndringerViaFrontend,
                    },
                    url: `/familie-ba-sak/api/behandlinger/${åpenBehandling.behandlingId}/steg/registrer-søknad`,
                },
                (response: Ressurs<IBehandling>) => {
                    if (response.status === RessursStatus.SUKSESS) {
                        settÅpenBehandling(response);
                        navigate(
                            `/fagsak/${fagsakId}/${åpenBehandling.behandlingId}/vilkaarsvurdering`
                        );
                    }
                },
                (errorResponse: Ressurs<IBehandling>) => {
                    if (errorResponse.status === RessursStatus.FUNKSJONELL_FEIL) {
                        settVisBekreftModal(true);
                    }
                }
            );
        }
    };

    return (
        <SøknadContext.Provider
            value={{
                barnMedLøpendeUtbetaling,
                hentFeilTilOppsummering,
                nesteAction,
                settVisBekreftModal,
                skjema,
                søknadErLastetFraBackend,
                visBekreftModal,
            }}
        >
            {children}
        </SøknadContext.Provider>
    );
};

export const useSøknadContext = () => {
    const context = useContext(SøknadContext);

    if (context === undefined) {
        throw new Error('useSøknadContext må brukes innenfor en SøknadProvider');
    }

    return context;
};
