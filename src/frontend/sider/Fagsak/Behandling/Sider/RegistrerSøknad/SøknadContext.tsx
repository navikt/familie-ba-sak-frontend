import type { PropsWithChildren } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

import { ApiFeil, RessursStatus } from '@api/client/apiClient';
import { useBruker } from '@hooks/useBruker';
import { useErLesevisning } from '@hooks/useErLesevisning';
import { useFagsak } from '@hooks/useFagsak';
import { useRegistrerSøknad } from '@hooks/useRegistrerSøknad';
import { BehandlingUnderkategori } from '@typer/behandlingstema';
import { erFagsakAvTypeEnsligMindreårig, erFagsakAvTypeInstitusjon, erFagsakAvTypeSkjermetBarn } from '@typer/fagsak';
import { ForelderBarnRelasjonRolle, type IForelderBarnRelasjon } from '@typer/person';
import type { IBarnMedOpplysninger, IBarnMedOpplysningerBackend, Målform } from '@typer/søknad';
import { hentBarnMedLøpendeUtbetaling } from '@utils/fagsak';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { byggSuksessRessurs } from '@navikt/familie-typer';

import useDeepEffect from '../../../../../hooks/useDeepEffect';
import { useBehandlingContext } from '../../context/BehandlingContext';

export enum RegistrerSøknadFelt {
    UNDERKATEGORI = 'underkategori',
    BARNA_MED_OPPLYSNINGER = 'barnaMedOpplysninger',
    ENDRING_AV_OPPLYSNINGER_BEGRUNNELSE = 'endringAvOpplysningerBegrunnelse',
    MÅLFORM = 'målform',
}

export interface RegistrerSøknadFormValues {
    [RegistrerSøknadFelt.UNDERKATEGORI]: BehandlingUnderkategori;
    [RegistrerSøknadFelt.BARNA_MED_OPPLYSNINGER]: IBarnMedOpplysninger[];
    [RegistrerSøknadFelt.ENDRING_AV_OPPLYSNINGER_BEGRUNNELSE]: string;
    [RegistrerSøknadFelt.MÅLFORM]: Målform | undefined;
}

interface SøknadContextValue {
    barnMedLøpendeUtbetaling: Set<string>;
    bekreftModalFeilmelding: string;
    erSenderInn: boolean;
    nesteAction: (bekreftEndringerViaFrontend: boolean) => void;
    settVisBekreftModal: (vis: boolean) => void;
    søknadErLastetFraBackend: boolean;
    visBekreftModal: boolean;
}

const SøknadContext = createContext<SøknadContextValue | undefined>(undefined);

export const SøknadProvider = ({ children }: PropsWithChildren) => {
    const { behandling, settÅpenBehandling } = useBehandlingContext();

    const fagsak = useFagsak();
    const bruker = useBruker();
    const erLesevisning = useErLesevisning();
    const navigate = useNavigate();

    const [visBekreftModal, settVisBekreftModal] = useState<boolean>(false);
    const [bekreftModalFeilmelding, settBekreftModalFeilmelding] = useState<string>('');
    const [søknadErLastetFraBackend, settSøknadErLastetFraBackend] = useState(false);

    const gjelderInstitusjon = erFagsakAvTypeInstitusjon(fagsak);
    const gjelderEnsligMindreårig = erFagsakAvTypeEnsligMindreårig(fagsak);
    const gjelderSkjermetBarn = erFagsakAvTypeSkjermetBarn(fagsak);

    const barnMedLøpendeUtbetaling = hentBarnMedLøpendeUtbetaling(fagsak);

    const { mutateAsync: registrerSøknad, isPending } = useRegistrerSøknad();

    const form = useForm<RegistrerSøknadFormValues>({
        defaultValues: {
            [RegistrerSøknadFelt.UNDERKATEGORI]:
                behandling.underkategori === BehandlingUnderkategori.UTVIDET
                    ? BehandlingUnderkategori.UTVIDET
                    : BehandlingUnderkategori.ORDINÆR,
            [RegistrerSøknadFelt.BARNA_MED_OPPLYSNINGER]: [],
            [RegistrerSøknadFelt.ENDRING_AV_OPPLYSNINGER_BEGRUNNELSE]: '',
            [RegistrerSøknadFelt.MÅLFORM]: undefined,
        },
    });

    const { reset, setError, handleSubmit } = form;

    const byggBarnaFraFolkeregister = (): IBarnMedOpplysninger[] => {
        if (gjelderInstitusjon || gjelderEnsligMindreårig || gjelderSkjermetBarn) {
            return [
                {
                    merket: true,
                    ident: bruker.personIdent,
                    navn: bruker.navn,
                    fødselsdato: bruker.fødselsdato,
                    manueltRegistrert: false,
                    erFolkeregistrert: true,
                },
            ];
        }
        return bruker.forelderBarnRelasjon
            .filter((relasjon: IForelderBarnRelasjon) => relasjon.relasjonRolle === ForelderBarnRelasjonRolle.BARN)
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
    };

    const tilbakestillSøknad = () => {
        reset({
            [RegistrerSøknadFelt.UNDERKATEGORI]:
                behandling.underkategori === BehandlingUnderkategori.UTVIDET
                    ? BehandlingUnderkategori.UTVIDET
                    : BehandlingUnderkategori.ORDINÆR,
            [RegistrerSøknadFelt.BARNA_MED_OPPLYSNINGER]: byggBarnaFraFolkeregister(),
            [RegistrerSøknadFelt.ENDRING_AV_OPPLYSNINGER_BEGRUNNELSE]: '',
            [RegistrerSøknadFelt.MÅLFORM]: undefined,
        });
        settSøknadErLastetFraBackend(false);
    };

    useEffect(() => {
        tilbakestillSøknad();
    }, [bruker]);

    useDeepEffect(() => {
        if (behandling.søknadsgrunnlag) {
            settSøknadErLastetFraBackend(true);
            reset({
                [RegistrerSøknadFelt.UNDERKATEGORI]: behandling.søknadsgrunnlag.underkategori,
                [RegistrerSøknadFelt.BARNA_MED_OPPLYSNINGER]: behandling.søknadsgrunnlag.barnaMedOpplysninger.map(
                    (barnMedOpplysninger: IBarnMedOpplysningerBackend) => ({
                        ...barnMedOpplysninger,
                        merket: barnMedOpplysninger.inkludertISøknaden,
                    })
                ),
                [RegistrerSøknadFelt.ENDRING_AV_OPPLYSNINGER_BEGRUNNELSE]:
                    behandling.søknadsgrunnlag.endringAvOpplysningerBegrunnelse,
                [RegistrerSøknadFelt.MÅLFORM]: behandling.søknadsgrunnlag.søkerMedOpplysninger.målform,
            });
        } else {
            // Ny behandling er lastet som ikke har fullført søknad-steget.
            tilbakestillSøknad();
        }
    }, [behandling.behandlingId, behandling.søknadsgrunnlag]);

    const sendInn = async (values: RegistrerSøknadFormValues, bekreftEndringerViaFrontend: boolean) => {
        return registrerSøknad({
            behandlingId: behandling.behandlingId,
            søknad: {
                søknad: {
                    underkategori: values.underkategori,
                    søkerMedOpplysninger: {
                        ident: fagsak.søkerFødselsnummer,
                        målform: values.målform,
                    },
                    barnaMedOpplysninger: values.barnaMedOpplysninger.map(
                        (barn: IBarnMedOpplysninger): IBarnMedOpplysningerBackend => ({
                            ...barn,
                            inkludertISøknaden: barn.merket,
                        })
                    ),
                    endringAvOpplysningerBegrunnelse: values.endringAvOpplysningerBegrunnelse,
                    erAutomatiskRegistrert: false,
                },
                bekreftEndringerViaFrontend,
            },
        })
            .then(oppdatertBehandling => {
                settÅpenBehandling(byggSuksessRessurs(oppdatertBehandling));
                navigate(`/fagsak/${fagsak.id}/${behandling.behandlingId}/vilkaarsvurdering`);
            })
            .catch((error: unknown) => {
                if (error instanceof ApiFeil && error.ressursStatus === RessursStatus.FUNKSJONELL_FEIL) {
                    settBekreftModalFeilmelding(error.message);
                    settVisBekreftModal(true);
                    return;
                }
                setError('root', {
                    message: error instanceof Error ? error.message : 'Teknisk feil ved registrering av søknad.',
                });
            });
    };

    const nesteAction = (bekreftEndringerViaFrontend: boolean) => {
        if (erLesevisning) {
            navigate(`/fagsak/${fagsak.id}/${behandling.behandlingId}/vilkaarsvurdering`);
            return;
        }
        handleSubmit(values => sendInn(values, bekreftEndringerViaFrontend))();
    };

    return (
        <FormProvider {...form}>
            <SøknadContext.Provider
                value={{
                    barnMedLøpendeUtbetaling,
                    bekreftModalFeilmelding,
                    erSenderInn: isPending,
                    nesteAction,
                    settVisBekreftModal,
                    søknadErLastetFraBackend,
                    visBekreftModal,
                }}
            >
                {children}
            </SøknadContext.Provider>
        </FormProvider>
    );
};

export const useSøknadContext = () => {
    const context = useContext(SøknadContext);

    if (context === undefined) {
        throw new Error('useSøknadContext må brukes innenfor en SøknadProvider');
    }

    return context;
};
