import { useId } from 'react';

import { useBehandling } from '@hooks/useBehandling';
import { useErLesevisning } from '@hooks/useErLesevisning';
import { useOppdaterVedtaksperiodeMedBegrunnelserIsPending } from '@hooks/useOppdaterVedtaksperiodeMedBegrunnelserIsPending';
import {
    Field,
    useFritekstbegrunnelserForm,
} from '@sider/Fagsak/Behandling/Sider/Vedtak/Vedtaksperioder/useFritekstbegrunnelserForm';
import { utledSøkersMålform } from '@typer/behandling';
import { målform } from '@typer/søknad';
import classNames from 'classnames';
import { FormProvider } from 'react-hook-form';

import { ExternalLinkIcon, PlusCircleIcon, TrashIcon } from '@navikt/aksel-icons';
import {
    BodyLong,
    Button,
    Fieldset,
    Heading,
    HelpText,
    HGrid,
    HStack,
    Label,
    Link,
    Tag,
    Textarea,
    VStack,
} from '@navikt/ds-react';

import Styles from './Fritekstbegrunnelser.module.css';
import { useVedtaksperiodeContext } from './VedtaksperiodeContext';

export const MAKS_LENGDE_FRITEKST = 350;
const MAKS_ANTALL_KULEPUNKT = 3;
const KLARSPRÅK_URL = 'https://navno.sharepoint.com/sites/intranett-kommunikasjon/SitePages/Språk.aspx';

export function Fritekstbegrunnelser() {
    const { vedtaksperiodeMedBegrunnelser, onPanelClose } = useVedtaksperiodeContext();

    const erLesevisning = useErLesevisning();
    const fieldsetId = useId();

    const oppdaterVedtaksperiodeMedBegrunnelserIsPending = useOppdaterVedtaksperiodeMedBegrunnelserIsPending(
        vedtaksperiodeMedBegrunnelser.id
    );

    const {
        form,
        fields,
        onSubmit,
        submittedFieldsRef,
        leggTilFritekstbegrunnelse,
        slettFritekstbegrunnelse,
        validerBegrunnelse,
    } = useFritekstbegrunnelserForm();

    const {
        handleSubmit,
        register,
        formState: { isSubmitting, errors },
        reset,
    } = form;

    function onAvbryt() {
        onPanelClose(false);
        reset();
    }

    if (!vedtaksperiodeMedBegrunnelser.fritekster.length && !fields.length) {
        return (
            <>
                {!erLesevisning && (
                    <VStack gap={'space-8'}>
                        <FritekstHeader />
                        <div>
                            <Button
                                variant={'tertiary'}
                                size={'small'}
                                onClick={leggTilFritekstbegrunnelse}
                                icon={<PlusCircleIcon />}
                                disabled={oppdaterVedtaksperiodeMedBegrunnelserIsPending}
                            >
                                Legg til fritekst
                            </Button>
                        </div>
                    </VStack>
                )}
            </>
        );
    }

    if (erLesevisning) {
        return (
            <VStack gap={'space-8'}>
                <FritekstHeader htmlFor={fieldsetId} />
                <Fieldset id={fieldsetId} legend={'Fritekst til kulepunkt i brev'} hideLegend={true}>
                    <ul>
                        {fields.map(field => (
                            <li>{field.value}</li>
                        ))}
                    </ul>
                </Fieldset>
            </VStack>
        );
    }

    const erMaksAntallKulepunkter = fields.length >= MAKS_ANTALL_KULEPUNKT;

    return (
        <FormProvider {...form}>
            <form
                onSubmit={event => {
                    submittedFieldsRef.current = new Set(fields.map(field => field.id));
                    handleSubmit(onSubmit)(event);
                }}
            >
                <VStack gap={'space-8'}>
                    <FritekstHeader htmlFor={fieldsetId} />
                    <Fieldset
                        id={fieldsetId}
                        legend={'Fritekst til kulepunkt i brev'}
                        hideLegend={true}
                        error={errors.root?.message}
                    >
                        <VStack gap={'space-16'}>
                            {fields.map((field, index) => {
                                return (
                                    <HGrid columns={'5fr 1fr'} align={'center'} key={field.id}>
                                        <Textarea
                                            {...register(`${Field.FRITEKSTBEGRUNNELSER}.${index}.value`, {
                                                validate: value => validerBegrunnelse(field.id, value),
                                            })}
                                            label={`Kulepunkt ${field.id}`}
                                            maxLength={MAKS_LENGDE_FRITEKST}
                                            error={errors.fritekstbegrunnelser?.[index]?.value?.message}
                                            readOnly={isSubmitting || oppdaterVedtaksperiodeMedBegrunnelserIsPending}
                                            hideLabel={true}
                                            resize={true}
                                        />
                                        <Button
                                            type={'button'}
                                            aria-label={'Fjern fritekst'}
                                            variant={'tertiary'}
                                            size={'small'}
                                            onClick={() => slettFritekstbegrunnelse(index)}
                                            icon={<TrashIcon />}
                                            className={classNames({ [Styles.slettFritekstKnapp]: !isSubmitting })}
                                            disabled={isSubmitting || oppdaterVedtaksperiodeMedBegrunnelserIsPending}
                                        >
                                            Fjern
                                        </Button>
                                    </HGrid>
                                );
                            })}
                        </VStack>
                    </Fieldset>
                    {!erMaksAntallKulepunkter && (
                        <div>
                            <Button
                                type={'button'}
                                variant={'tertiary'}
                                size={'small'}
                                onClick={leggTilFritekstbegrunnelse}
                                icon={<PlusCircleIcon />}
                                disabled={isSubmitting || oppdaterVedtaksperiodeMedBegrunnelserIsPending}
                            >
                                Legg til fritekst
                            </Button>
                        </div>
                    )}
                    <HStack align={'center'} justify={'space-between'} paddingBlock={'space-8 space-0'}>
                        <Button
                            type={'submit'}
                            variant={'primary'}
                            size={'small'}
                            loading={isSubmitting}
                            disabled={oppdaterVedtaksperiodeMedBegrunnelserIsPending}
                        >
                            Lagre
                        </Button>
                        <Button
                            type={'button'}
                            variant={'tertiary'}
                            size={'small'}
                            onClick={onAvbryt}
                            disabled={isSubmitting || oppdaterVedtaksperiodeMedBegrunnelserIsPending}
                        >
                            Avbryt
                        </Button>
                    </HStack>
                </VStack>
            </form>
        </FormProvider>
    );
}

function FritekstHeader({ htmlFor }: { htmlFor?: string }) {
    const behandling = useBehandling();
    const erLesevisning = useErLesevisning();
    return (
        <HStack gap={'space-8'} align={'center'} justify={'space-between'}>
            <HStack gap={'space-8'} align={'center'} justify={'center'} wrap={false}>
                <Label htmlFor={htmlFor}>Fritekst til kulepunkt i brev</Label>
                <HelpText placement={'top-start'}>
                    <BodyLong size={'small'} spacing>
                        Brev som sendes ut bør være så kortfattede og presise som mulig.
                        <Link target={'_blank'} rel={'noopener noreferrer'} href={KLARSPRÅK_URL}>
                            Se retningslinjer for klarspråk.
                            <ExternalLinkIcon fontSize={'1.3rem'} />
                        </Link>
                    </BodyLong>
                    <Heading level={'3'} size={'xsmall'}>
                        Eksempler på formulering:
                    </Heading>
                    <BodyLong size={'small'} spacing={true} className={Styles.italics}>
                        Barnevernet har bekreftet at de overtok omsorgen for barnet mars 2021
                    </BodyLong>
                    <BodyLong size={'small'} className={Styles.italics}>
                        Opplysningene fra Folkeregisteret viser at barnet ikke bor sammen med deg
                    </BodyLong>
                </HelpText>
            </HStack>
            {!erLesevisning && (
                <Tag variant={'outline'} data-color={'neutral'} size={'small'}>
                    Skriv {målform[utledSøkersMålform(behandling)].toLowerCase()}
                </Tag>
            )}
        </HStack>
    );
}
