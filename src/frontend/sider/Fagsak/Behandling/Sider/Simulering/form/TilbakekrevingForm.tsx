import { useErLesevisning } from '@hooks/useErLesevisning';
import { Feilsammendrag } from '@komponenter/Skjema/Feilsammendrag';
import { BodyShort, Box, Fieldset, Heading, Label, LocalAlert, Textarea, VStack } from '@navikt/ds-react';
import { BegrunnelseField } from '@sider/Fagsak/Behandling/Sider/Simulering/form/field/BegrunnelseField';
import { TilbakekrevingsvalgField } from '@sider/Fagsak/Behandling/Sider/Simulering/form/field/TilbakekrevingsvalgField';
import styles from '@sider/Fagsak/Behandling/Sider/Simulering/form/TilbakekrevingForm.module.css';
import {
    TilbakekrevingFormField,
    type TilbakekrevingFormValues,
} from '@sider/Fagsak/Behandling/Sider/Simulering/form/useTilbakekrevingForm';
import { useSimuleringContext } from '@sider/Fagsak/Behandling/Sider/Simulering/SimuleringContext';
import { Tilbakekrevingsvalg, visTilbakekrevingsvalg } from '@typer/simulering';
import { useFormContext, useWatch } from 'react-hook-form';

export function TilbakekrevingForm() {
    const erLesevisning = useErLesevisning();

    const { harÅpenTilbakekreving, harÅpenTilbakekrevingError } = useSimuleringContext();

    const { control } = useFormContext<TilbakekrevingFormValues>();

    const tilbakekrevingsvalg = useWatch({ control, name: TilbakekrevingFormField.TILBAKEKREVINGSVALG });
    const fritekstVarsel = useWatch({ control, name: TilbakekrevingFormField.FRITEKST_VARSEL });

    if (harÅpenTilbakekrevingError) {
        return (
            <Box marginBlock={'space-24 space-0'}>
                <LocalAlert status="error">
                    <LocalAlert.Header>
                        <LocalAlert.Title>Det har skjedd en feil</LocalAlert.Title>
                    </LocalAlert.Header>
                    <LocalAlert.Content>{harÅpenTilbakekrevingError.message}</LocalAlert.Content>
                </LocalAlert>
            </Box>
        );
    }

    if (harÅpenTilbakekreving && !erLesevisning) {
        return (
            <VStack marginBlock={'space-64 space-0'} gap={'space-24'}>
                <Label>Tilbakekrevingsvalg</Label>
                <LocalAlert status="warning">
                    <LocalAlert.Header>
                        <LocalAlert.Title>Det foreligger en åpen tilbakekrevingsbehandling.</LocalAlert.Title>
                    </LocalAlert.Header>
                    <LocalAlert.Content>
                        Endringer i vedtaket vil automatisk oppdatere eksisterende feilutbetalte perioder og beløp.
                    </LocalAlert.Content>
                </LocalAlert>
            </VStack>
        );
    }

    if (erLesevisning && tilbakekrevingsvalg === '') {
        return (
            <VStack marginBlock={'space-64 space-0'} gap={'space-24'}>
                <Label>Tilbakekrevingsvalg</Label>
                <LocalAlert status="warning">
                    <LocalAlert.Header>
                        <LocalAlert.Title>
                            Tilbakekreving uten varsel er valgt automatisk, da feilutbetalingen ble avdekket etter at
                            saken ble sendt til beslutter.
                        </LocalAlert.Title>
                    </LocalAlert.Header>
                </LocalAlert>
            </VStack>
        );
    }

    const skalViseFritekstVarselILesevisning =
        erLesevisning && tilbakekrevingsvalg === Tilbakekrevingsvalg.OPPRETT_TILBAKEKREVING_MED_VARSEL;

    return (
        <Fieldset className={styles.fieldset} legend="Tilbakekreving" hideLegend>
            <VStack gap={'space-32'}>
                <Heading level="2" size="medium">
                    Tilbakekreving
                </Heading>
                <BegrunnelseField />
                {erLesevisning ? (
                    <>
                        <Label>Fastsett videre behandling</Label>
                        <BodyShort>
                            {tilbakekrevingsvalg === '' ? 'Ingen valgt' : visTilbakekrevingsvalg[tilbakekrevingsvalg]}
                        </BodyShort>
                    </>
                ) : (
                    <TilbakekrevingsvalgField />
                )}
                {skalViseFritekstVarselILesevisning && (
                    <Textarea label="Fritekst i varselet" value={fritekstVarsel} readOnly />
                )}
                <Feilsammendrag heading={'For å gå videre må du rette opp følgende:'} />
            </VStack>
        </Fieldset>
    );
}
