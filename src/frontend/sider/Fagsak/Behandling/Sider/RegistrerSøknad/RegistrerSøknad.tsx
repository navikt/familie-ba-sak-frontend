import { useBehandling } from '@hooks/useBehandling';
import { useErLesevisning } from '@hooks/useErLesevisning';
import { useFagsak } from '@hooks/useFagsak';
import { LeggTilBarnModal } from '@komponenter/Modal/LeggTilBarn/LeggTilBarnModal';
import { LeggTilBarnModalContextProvider } from '@komponenter/Modal/LeggTilBarn/LeggTilBarnModalContext';
import { BehandlingSteg } from '@typer/behandling';
import { erFagsakAvTypeInstitusjon } from '@typer/fagsak';
import type { IBarnMedOpplysninger } from '@typer/søknad';
import { useFormContext } from 'react-hook-form';

import { BodyShort, Button, ErrorSummary, LocalAlert, Modal } from '@navikt/ds-react';

import { Annet } from './Annet';
import { Barna, BARN_CHECKBOX_GROUP_ID } from './Barna';
import { LeggTilBarnKnapp } from './LeggTilBarnKnapp';
import { MÅLFORM_RADIOGROUP_ID, MålformFelt } from './MålformFelt';
import { RegistrerSøknadFelt, type RegistrerSøknadFormValues, useSøknadContext } from './SøknadContext';
import { SøknadType } from './SøknadType';
import Skjemasteg from '../Skjemasteg';
import styles from './RegistrerSøknad.module.css';

export const RegistrerSøknad = () => {
    const fagsak = useFagsak();
    const behandling = useBehandling();
    const erLesevisning = useErLesevisning();

    const {
        bekreftModalFeilmelding,
        erSenderInn,
        nesteAction,
        settVisBekreftModal,
        søknadErLastetFraBackend,
        visBekreftModal,
    } = useSøknadContext();

    const {
        getValues,
        setValue,
        watch,
        formState: { errors },
    } = useFormContext<RegistrerSøknadFormValues>();

    const gjelderInstitusjon = erFagsakAvTypeInstitusjon(fagsak);

    const barnaMedOpplysninger = watch(RegistrerSøknadFelt.BARNA_MED_OPPLYSNINGER);

    function onLeggTilBarn(barn: IBarnMedOpplysninger) {
        setValue(
            RegistrerSøknadFelt.BARNA_MED_OPPLYSNINGER,
            [...getValues(RegistrerSøknadFelt.BARNA_MED_OPPLYSNINGER), barn],
            {
                shouldValidate: true,
                shouldDirty: true,
            }
        );
    }

    const feiloppsummering = [
        errors.barnaMedOpplysninger?.message && {
            id: BARN_CHECKBOX_GROUP_ID,
            feilmelding: errors.barnaMedOpplysninger.message,
        },
        errors.målform?.message && {
            id: MÅLFORM_RADIOGROUP_ID,
            feilmelding: errors.målform.message,
        },
    ].filter((feil): feil is { id: string; feilmelding: string } => Boolean(feil));

    return (
        <LeggTilBarnModalContextProvider
            barn={barnaMedOpplysninger}
            onLeggTilBarn={onLeggTilBarn}
            harBrevmottaker={behandling.brevmottakere.length > 0}
        >
            {!erLesevisning && <LeggTilBarnModal />}
            <Skjemasteg
                className={'søknad'}
                tittel={'Registrer opplysninger fra søknaden'}
                nesteOnClick={() => {
                    nesteAction(false);
                }}
                nesteKnappTittel={erLesevisning ? 'Neste' : 'Bekreft og fortsett'}
                senderInn={erSenderInn}
                steg={BehandlingSteg.REGISTRERE_SØKNAD}
            >
                {søknadErLastetFraBackend && !erLesevisning && (
                    <>
                        <br />
                        <LocalAlert status="warning">
                            <LocalAlert.Header>
                                <LocalAlert.Title>Søknad registrert</LocalAlert.Title>
                            </LocalAlert.Header>
                            <LocalAlert.Content>
                                En søknad er allerede registrert på behandlingen. Vi har fylt ut søknaden i skjemaet.
                            </LocalAlert.Content>
                        </LocalAlert>
                        <br />
                    </>
                )}
                {!gjelderInstitusjon && <SøknadType />}
                <Barna />
                {!erLesevisning && <LeggTilBarnKnapp />}
                <MålformFelt />
                <Annet />
                {errors.root?.message && (
                    <LocalAlert status="error">
                        <LocalAlert.Header>
                            <LocalAlert.Title>{errors.root.message}</LocalAlert.Title>
                        </LocalAlert.Header>
                    </LocalAlert>
                )}
                {feiloppsummering.length > 0 && (
                    <ErrorSummary heading={'For å gå videre må du rette opp følgende:'} size="small">
                        {feiloppsummering.map(item => (
                            <ErrorSummary.Item key={item.id} href={`#${item.id}`}>
                                {item.feilmelding}
                            </ErrorSummary.Item>
                        ))}
                    </ErrorSummary>
                )}
                {visBekreftModal && (
                    <Modal
                        open
                        onClose={() => settVisBekreftModal(false)}
                        header={{
                            heading: 'Er du sikker på at du vil gå videre?',
                            size: 'small',
                            closeButton: false,
                        }}
                        width={'35rem'}
                    >
                        <Modal.Body>
                            <BodyShort className={styles.fjernVilkårAdvarsel}>{bekreftModalFeilmelding}</BodyShort>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                variant={'primary'}
                                onClick={() => {
                                    settVisBekreftModal(false);
                                    nesteAction(true);
                                }}
                                children={'Ja'}
                                loading={erSenderInn}
                            />
                            <Button
                                variant={'secondary'}
                                onClick={() => {
                                    settVisBekreftModal(false);
                                }}
                                children={'Nei'}
                            />
                        </Modal.Footer>
                    </Modal>
                )}
            </Skjemasteg>
        </LeggTilBarnModalContextProvider>
    );
};
