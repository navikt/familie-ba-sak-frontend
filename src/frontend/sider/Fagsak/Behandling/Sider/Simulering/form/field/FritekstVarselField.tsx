import { ModalType } from '@context/ModalContext';
import { useBehandling } from '@hooks/useBehandling';
import { useErLesevisning } from '@hooks/useErLesevisning';
import { useModal } from '@hooks/useModal';
import {
    mutationKey,
    useOpprettForhåndsvisbarTilbakekrevingVarselbrevPdf,
} from '@hooks/useOpprettForhåndsvisbarTilbakekrevingVarselbrevPdf';
import { ExternalLinkIcon, FileTextIcon } from '@navikt/aksel-icons';
import { BodyLong, Box, Button, HelpText, HStack, Link, Spacer, Tag, Textarea, VStack } from '@navikt/ds-react';
import styles from '@sider/Fagsak/Behandling/Sider/Simulering/form/TilbakekrevingForm.module.css';
import {
    MAKS_LENGDE_TEKST,
    TilbakekrevingFormField,
    type TilbakekrevingFormValues,
} from '@sider/Fagsak/Behandling/Sider/Simulering/form/useTilbakekrevingForm';
import { målform } from '@typer/søknad';
import { hentSøkersMålform } from '@utils/behandling';
import { useController, useFormContext } from 'react-hook-form';

export function FritekstVarselField() {
    const behandling = useBehandling();
    const erLesevisning = useErLesevisning();

    const { åpneModal: åpneForhåndsvisOpprettingAvPdfModal } = useModal(ModalType.FORHÅNDSVIS_OPPRETTING_AV_PDF);

    const { mutate: opprettTilbakekrevingVarselBrevPdf, isPending: isOpprettTilbakekrevingVarselBrevPdfPending } =
        useOpprettForhåndsvisbarTilbakekrevingVarselbrevPdf({
            onMutate: () => åpneForhåndsvisOpprettingAvPdfModal({ mutationKey }),
        });

    const { control } = useFormContext<TilbakekrevingFormValues>();

    const {
        field: { name, value, onChange, onBlur },
        fieldState: { error },
        formState: { isSubmitting },
    } = useController({
        name: TilbakekrevingFormField.FRITEKST_VARSEL,
        control,
        rules: {
            required: 'Du må skrive en fritekst for varselet til tilbakekrevingen.',
            maxLength: {
                value: MAKS_LENGDE_TEKST,
                message: `Du har nådd maks antall tegn i varselbrevet: 1 500. Prøv å forkorte/forenkle teksten.`,
            },
        },
    });

    const søkerMålform = hentSøkersMålform(behandling);

    return (
        <VStack marginInline={'space-32 space-0'}>
            <Textarea
                className={styles.fritekstVarsel}
                id={name}
                name={name}
                label={
                    <HStack align="center" justify="space-between" wrap={false}>
                        <HStack align="center" wrap={false} gap={'space-16'}>
                            Fritekst i varselet
                            <HelpText placement="right">
                                <Box maxWidth={'20rem'}>
                                    <BodyLong size="small" spacing={true}>
                                        Her skal du oppgi hvorfor brukeren ikke skulle fått utbetalt ytelsen i
                                        perioden(e). Du må også oppgi hvordan feilutbetalingen ble oppdaget, hvem som
                                        oppdaget den og når den ble oppdaget eller meldt til Nav.
                                    </BodyLong>
                                    <BodyLong size="small" spacing={true}>
                                        Eksempel på tekst:
                                    </BodyLong>
                                    <BodyLong size="small" spacing={true}>
                                        Vi mottok melding fra deg (dato) om at du flyttet utenlands (dato). Du har ikke
                                        rett på barnetrygd når du oppholder deg utenlands. Da vi mottok meldingen fra
                                        deg, var det allerede utbetalt barnetrygd for perioden (Fom dato - Tom dato).
                                    </BodyLong>
                                    <Link
                                        href="https://navno.sharepoint.com/sites/intranett-kommunikasjon/SitePages/Språk.aspx"
                                        target="_blank"
                                    >
                                        <span>Se retningslinjer for klarspråk:</span>
                                        <ExternalLinkIcon fontSize={'1.3rem'} />
                                    </Link>
                                </Box>
                            </HelpText>
                        </HStack>
                        <Spacer />
                        <Tag variant="neutral" size="small">
                            Skriv {målform[søkerMålform].toLowerCase()}
                        </Tag>
                    </HStack>
                }
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                error={error?.message}
                readOnly={erLesevisning || isSubmitting}
                maxLength={MAKS_LENGDE_TEKST}
            />
            <HStack justify={'end'} marginBlock={'space-0 space-16'}>
                <Button
                    variant={'tertiary'}
                    id={'forhandsvis-varsel'}
                    type={'button'}
                    onClick={() => {
                        opprettTilbakekrevingVarselBrevPdf({
                            behandlingId: behandling.behandlingId,
                            payload: { fritekst: value },
                        });
                    }}
                    size={'small'}
                    icon={<FileTextIcon />}
                    disabled={isOpprettTilbakekrevingVarselBrevPdfPending || isSubmitting}
                >
                    Forhåndsvis varsel
                </Button>
            </HStack>
        </VStack>
    );
}
