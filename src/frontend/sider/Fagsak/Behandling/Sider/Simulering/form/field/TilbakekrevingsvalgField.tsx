import { useBehandling } from '@hooks/useBehandling';
import { useBruker } from '@hooks/useBruker';
import { useErLesevisning } from '@hooks/useErLesevisning';
import { BrevmottakereAlert } from '@komponenter/Brevmottaker/BrevmottakereAlert';
import { BodyLong, Box, Heading, HelpText, HStack, Radio, RadioGroup } from '@navikt/ds-react';
import { FritekstVarselField } from '@sider/Fagsak/Behandling/Sider/Simulering/form/field/FritekstVarselField';
import styles from '@sider/Fagsak/Behandling/Sider/Simulering/form/TilbakekrevingForm.module.css';
import {
    TilbakekrevingFormField,
    type TilbakekrevingFormValues,
} from '@sider/Fagsak/Behandling/Sider/Simulering/form/useTilbakekrevingForm';
import { Tilbakekrevingsvalg } from '@typer/simulering';
import { useController, useFormContext } from 'react-hook-form';

export function TilbakekrevingsvalgField() {
    const behandling = useBehandling();
    const bruker = useBruker();
    const erLesevisning = useErLesevisning();

    const { control } = useFormContext<TilbakekrevingFormValues>();

    const {
        field: { name, value, onChange, onBlur },
        fieldState: { error },
        formState: { isSubmitting },
    } = useController({
        name: TilbakekrevingFormField.TILBAKEKREVINGSVALG,
        control,
        rules: {
            required:
                'Resultatet medfører en feilutbetaling. Du må velge om det skal opprettes tilbakekrevingsbehandling.',
        },
    });

    const brevmottakere = behandling.brevmottakere ?? [];

    return (
        <RadioGroup
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            readOnly={isSubmitting}
            error={error?.message}
            legend={
                <HStack gap={'space-16'}>
                    Fastsett videre behandling
                    <HelpText placement="right">
                        <Box maxWidth={'20rem'}>
                            <Heading size="small">Hvordan fastsette videre behandling?</Heading>
                            <Heading size="xsmall">Opprett tilbakekreving, send varsel</Heading>
                            <BodyLong size="small" spacing={true}>
                                Hovedregel er at en feilutbetaling skal varsles, og at bruker får varsel samtidig med
                                revurderingsvedtaket.
                            </BodyLong>
                            <Heading size="xsmall">Opprett tilbakekreving, ikke send varsel</Heading>
                            <BodyLong size="small" spacing={true}>
                                Velges unntaksvis når man er usikker på om inneværende måned blir feilutbetalt eller
                                ikke. Eller at det fremstår som relativt sikkert at feilutbetalt beløp ikke skal kreves
                                inn.
                            </BodyLong>
                            <Heading size="small">Avvent tilbakekreving</Heading>
                            <BodyLong size="small" spacing={true}>
                                Velges når man er rimelig sikker på at det ikke blir feilutbetaling.
                            </BodyLong>
                        </Box>
                    </HelpText>
                </HStack>
            }
        >
            {bruker && !bruker.dødsfallDato && (
                <>
                    <Radio
                        value={Tilbakekrevingsvalg.OPPRETT_TILBAKEKREVING_MED_VARSEL}
                        id={'Opprett-tilbakekreving-send-varsel'}
                    >
                        {'Opprett tilbakekreving, send varsel'}
                    </Radio>
                    {value === Tilbakekrevingsvalg.OPPRETT_TILBAKEKREVING_MED_VARSEL && (
                        <>
                            <BrevmottakereAlert
                                className={styles.brevmottakereAlert}
                                bruker={bruker}
                                erPåBehandling={true}
                                brevmottakere={brevmottakere}
                                erLesevisning={erLesevisning}
                                åpenBehandling={behandling}
                            />
                            <FritekstVarselField />
                        </>
                    )}
                </>
            )}
            <Radio
                value={Tilbakekrevingsvalg.OPPRETT_TILBAKEKREVING_UTEN_VARSEL}
                id={'Opprett-tilbakekreving-ikke-send-varsel'}
            >
                {'Opprett tilbakekreving, ikke send varsel'}
            </Radio>
            <Radio value={Tilbakekrevingsvalg.IGNORER_TILBAKEKREVING} id={'avvent-tilbakekreving'}>
                {'Avvent tilbakekreving'}
            </Radio>
        </RadioGroup>
    );
}
