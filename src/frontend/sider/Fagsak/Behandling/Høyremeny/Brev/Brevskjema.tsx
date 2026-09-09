import { useErLesevisning } from '@hooks/useErLesevisning';
import { useOpprettManueltBrevPdf } from '@hooks/useOpprettManueltBrevPdf';
import { LeggTilBarnModal } from '@komponenter/Modal/LeggTilBarn/LeggTilBarnModal';
import { LeggTilBarnModalContextProvider } from '@komponenter/Modal/LeggTilBarn/LeggTilBarnModalContext';
import { useSamhandlerRequest } from '@komponenter/Samhandler/useSamhandler';
import { FileTextIcon, PlusCircleIcon, TrashIcon, XMarkOctagonFillIcon } from '@navikt/aksel-icons';
import {
    Button,
    Dialog,
    ErrorMessage,
    Fieldset,
    Heading,
    HStack,
    Label,
    Loader,
    Select,
    Tag,
    Textarea,
    TextField,
    UNSAFE_Combobox,
    VStack,
} from '@navikt/ds-react';
import { RessursStatus } from '@navikt/familie-typer';
import type { IPersonInfo } from '@typer/person';
import { type IBarnMedOpplysninger, målform } from '@typer/søknad';
import { validerAvtalerOmDeltBostedPerBarn, validerBarnMedDeltBosted } from '@utils/deltBostedSkjemaFelter';
import { validerFritekstKulepunkt } from '@utils/fritekstfelter';
import { type ChangeEvent, useState } from 'react';
import { Controller, FormProvider } from 'react-hook-form';

import BrevmottakerListe from '../../../../../komponenter/Brevmottaker/BrevmottakerListe';
import Knapperekke from '../../../../../komponenter/Knapperekke';
import { useBehandlingContext } from '../../context/BehandlingContext';
import { BarnBrevetGjelder } from './BarnBrevetGjelder';
import styles from './Brevskjema.module.css';
import { DatoAvtaleField } from './DatoAvtaleField';
import DeltBostedSkjema from './DeltBosted/DeltBostedSkjema';
import { LeggTilBarnKnapp } from './LeggTilBarnKnapp';
import { MottakerlandSedField } from './MottakerlandSedField';
import type { BrevtypeSelect } from './typer';
import {
    Brevmal,
    brevmaler,
    leggTilValuePåOption,
    opplysningsdokumenter,
    opplysningsdokumenterTilInstitusjon,
} from './typer';
import {
    skalViseAntallUkerSvarfrist,
    skalViseBarnBrevetGjelder,
    skalViseDatoAvtale,
    skalViseDeltBosted,
    skalViseDokumenter,
    skalViseFritekstAvsnitt,
    skalViseFritekstKulepunkter,
    skalViseMottakerlandSed,
    useBrevModul,
} from './useBrevModul';

interface IProps {
    onSubmitSuccess: () => void;
    bruker: IPersonInfo;
}

const Brevskjema = ({ onSubmitSuccess, bruker }: IProps) => {
    const { behandling } = useBehandlingContext();
    const { hentOgSettSamhandler, samhandlerRessurs } = useSamhandlerRequest(true);

    const {
        form,
        onSubmit,
        hentSkjemaData,
        mottakersMålform,
        hentMuligeBrevMaler,
        makslengdeFritekstHvertKulepunkt,
        maksLengdeFritekstAvsnitt,
        maksAntallKulepunkter,
        leggTilFritekstKulepunkt,
        erBrevmalMedObligatoriskFritekstKulepunkt,
        institusjon,
        brevmottakere,
        behandlingKategori,
        visFritekstAvsnittTekstboks,
        settVisFritekstAvsnittTekstboks,
    } = useBrevModul({ onSubmitSuccess });

    const {
        control,
        handleSubmit,
        watch,
        setValue,
        formState: { isSubmitting, isSubmitted, errors },
    } = form;

    const [visForhåndsvisningDialog, settVisForhåndsvisningDialog] = useState(false);

    const {
        data: manueltBrevPdf,
        mutate: opprettManueltBrevPdf,
        isPending: opprettManueltBrevPdfIsPending,
        error: opprettManueltBrevPdfError,
    } = useOpprettManueltBrevPdf();

    const erLesevisning = useErLesevisning();

    const brevmal = watch('brevmal');
    const mottakerIdent = watch('mottakerIdent');
    const barnMedDeltBosted = watch('barnMedDeltBosted');
    const avtalerOmDeltBostedPerBarn = watch('avtalerOmDeltBostedPerBarn');

    const brevMaler = hentMuligeBrevMaler();
    const skjemaErLåst = isSubmitting || opprettManueltBrevPdfIsPending;

    const fritekstSkjemaGruppeId = 'Fritekster-brev';

    const maksSvarfristUker = 4 * 5;

    const hjelpetekstVarselAnnenForelderMedSelvstendigRettSøkt =
        'Skriv her hvilke opplysninger vi har som er av betydning for saken. For eksempel: Vi har fått opplyst at barnet bor fast sammen med den andre forelderen.';

    const behandlingSteg = behandling.steg;

    if (institusjon) {
        if (!institusjon.navn && samhandlerRessurs.status === RessursStatus.IKKE_HENTET) {
            hentOgSettSamhandler(behandling.behandlingId);
        }
        institusjon.navn =
            samhandlerRessurs.status === RessursStatus.SUKSESS ? samhandlerRessurs.data.navn : institusjon.navn;
    }

    const muligeDokumenterÅVelge = institusjon
        ? opplysningsdokumenterTilInstitusjon.map(leggTilValuePåOption)
        : opplysningsdokumenter.map(leggTilValuePåOption);

    function onLeggTilBarn(barn: IBarnMedOpplysninger) {
        setValue('barnMedDeltBosted', [...barnMedDeltBosted, barn], { shouldValidate: isSubmitted });
        if (barn.erFolkeregistrert) {
            setValue(
                'avtalerOmDeltBostedPerBarn',
                { ...avtalerOmDeltBostedPerBarn, [barn.ident]: [''] },
                { shouldValidate: isSubmitted }
            );
        }
    }

    return (
        <FormProvider {...form}>
            <LeggTilBarnModalContextProvider
                barn={barnMedDeltBosted}
                onLeggTilBarn={onLeggTilBarn}
                harBrevmottaker={brevmottakere.length > 0}
            >
                {!erLesevisning && <LeggTilBarnModal />}
                <Fieldset error={errors.root?.message} legend="Send brev" hideLegend>
                    <Controller
                        name="mottakerIdent"
                        control={control}
                        rules={{ validate: verdi => verdi.length >= 1 || 'Du må velge en mottaker' }}
                        render={() => <></>}
                    />
                    <Label>Brev sendes til</Label>
                    <BrevmottakerListe bruker={bruker} brevmottakere={brevmottakere} />
                    <VStack gap={'space-16'}>
                        <Controller
                            name="brevmal"
                            control={control}
                            rules={{ validate: verdi => (verdi ? true : 'Du må velge en brevmal') }}
                            render={({ field, fieldState }) => (
                                <Select
                                    id={'velg-brevmal'}
                                    value={field.value}
                                    error={fieldState.error?.message}
                                    className={styles.select}
                                    label={
                                        <HStack marginBlock={'space-16 space-8'} justify={'space-between'}>
                                            <Label htmlFor={'velg-brevmal'}>Velg brevmal</Label>
                                            <Tag variant="neutral" size="small">
                                                {målform[mottakersMålform(mottakerIdent)]}
                                            </Tag>
                                        </HStack>
                                    }
                                    onChange={(event: ChangeEvent<BrevtypeSelect>): void =>
                                        field.onChange(event.target.value)
                                    }
                                >
                                    <option value={''}>Velg</option>
                                    {brevMaler.map(mal => (
                                        <option aria-selected={mal === field.value} key={mal} value={mal}>
                                            {brevmaler[mal]}
                                        </option>
                                    ))}
                                </Select>
                            )}
                        />
                        {skalViseDokumenter(brevmal) && (
                            <Controller
                                name="dokumenter"
                                control={control}
                                rules={{
                                    validate: (verdi, values) =>
                                        verdi.length === 0 &&
                                        values.fritekstKulepunkter.length === 0 &&
                                        values.fritekstAvsnitt === undefined
                                            ? 'Brevmalen krever at du enten velger dokumenter fra listen over, eller legger til et kulepunkt eller avsnitt med fritekst'
                                            : true,
                                }}
                                render={({ field, fieldState }) => (
                                    <UNSAFE_Combobox
                                        label={'Velg dokumenter'}
                                        readOnly={erLesevisning}
                                        isMultiSelect
                                        options={muligeDokumenterÅVelge}
                                        selectedOptions={field.value}
                                        onToggleSelected={(optionValue: string, isSelected: boolean) => {
                                            if (isSelected) {
                                                const nyttValg = muligeDokumenterÅVelge.find(
                                                    valg => valg.value === optionValue
                                                );
                                                if (nyttValg) {
                                                    field.onChange([...field.value, nyttValg]);
                                                }
                                            } else {
                                                field.onChange(field.value.filter(valg => valg.value !== optionValue));
                                            }
                                        }}
                                        error={fieldState.error?.message}
                                    />
                                )}
                            />
                        )}
                        {skalViseFritekstKulepunkter(brevmal) && (
                            <Controller
                                name="fritekstKulepunkter"
                                control={control}
                                rules={{
                                    validate: kulepunkter =>
                                        !kulepunkter.some(
                                            kulepunkt =>
                                                validerFritekstKulepunkt(
                                                    kulepunkt,
                                                    makslengdeFritekstHvertKulepunkt
                                                ) !== undefined
                                        ),
                                }}
                                render={({ field }) => {
                                    const erMaksAntallKulepunkter = field.value.length >= maksAntallKulepunkter;
                                    const valgtBrevmal = brevmal as Brevmal;

                                    return (
                                        <div>
                                            <Label htmlFor={fritekstSkjemaGruppeId}>Legg til kulepunkt</Label>
                                            <Fieldset
                                                legend="Legg til kulepunkt"
                                                hideLegend
                                                id={fritekstSkjemaGruppeId}
                                            >
                                                {field.value.map((fritekst, index) => {
                                                    const fritekstId = fritekst.id;

                                                    const hjelpetekst =
                                                        index === 0 &&
                                                        valgtBrevmal ===
                                                            Brevmal.VARSEL_ANNEN_FORELDER_MED_SELVSTENDIG_RETT_SØKT
                                                            ? hjelpetekstVarselAnnenForelderMedSelvstendigRettSøkt
                                                            : '';

                                                    const feilmelding = isSubmitted
                                                        ? validerFritekstKulepunkt(
                                                              fritekst,
                                                              makslengdeFritekstHvertKulepunkt
                                                          )
                                                        : undefined;

                                                    return (
                                                        <HStack key={`fritekst-${fritekstId}`}>
                                                            <Textarea
                                                                key={`fritekst-${fritekstId}`}
                                                                id={`${fritekstId}`}
                                                                className={styles.textarea}
                                                                label="Skriv inn kulepunkt"
                                                                hideLabel
                                                                size={'small'}
                                                                value={fritekst.tekst}
                                                                maxLength={makslengdeFritekstHvertKulepunkt}
                                                                description={hjelpetekst}
                                                                onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
                                                                    field.onChange(
                                                                        field.value.map(kulepunkt =>
                                                                            kulepunkt.id === fritekstId
                                                                                ? {
                                                                                      ...kulepunkt,
                                                                                      tekst: event.target.value,
                                                                                  }
                                                                                : kulepunkt
                                                                        )
                                                                    )
                                                                }
                                                                error={feilmelding}
                                                                autoFocus
                                                            />
                                                            {!(
                                                                erBrevmalMedObligatoriskFritekstKulepunkt(
                                                                    valgtBrevmal
                                                                ) && index === 0
                                                            ) && (
                                                                <Button
                                                                    variant={'tertiary'}
                                                                    onClick={() =>
                                                                        field.onChange(
                                                                            field.value.filter(
                                                                                kulepunkt => kulepunkt.id !== fritekstId
                                                                            )
                                                                        )
                                                                    }
                                                                    id={`fjern_fritekst-${fritekstId}`}
                                                                    size={'small'}
                                                                    aria-label={'Fjern fritekst'}
                                                                    icon={<TrashIcon />}
                                                                    className={styles.removeButton}
                                                                >
                                                                    {'Fjern'}
                                                                </Button>
                                                            )}
                                                        </HStack>
                                                    );
                                                })}
                                            </Fieldset>

                                            {!erMaksAntallKulepunkter && !erLesevisning && (
                                                <Button
                                                    variant={'tertiary'}
                                                    onClick={() => leggTilFritekstKulepunkt()}
                                                    id={`legg-til-fritekst`}
                                                    size={'small'}
                                                    icon={<PlusCircleIcon />}
                                                    className={styles.addButton}
                                                >
                                                    {'Legg til kulepunkt'}
                                                </Button>
                                            )}
                                        </div>
                                    );
                                }}
                            />
                        )}
                        {skalViseFritekstAvsnitt(brevmal) && (
                            <Controller
                                name="fritekstAvsnitt"
                                control={control}
                                rules={{
                                    validate: verdi => {
                                        if (verdi === undefined) {
                                            return true;
                                        }
                                        if (verdi.trim() === '') {
                                            return 'Du må skrive tekst i feltet, eller fjerne det om du ikke skal ha fritekst.';
                                        }
                                        if (verdi.length > maksLengdeFritekstAvsnitt) {
                                            return `Du har nådd maks antall tegn: ${maksLengdeFritekstAvsnitt}`;
                                        }
                                        return true;
                                    },
                                }}
                                render={({ field, fieldState }) => (
                                    <div>
                                        <Label htmlFor={fritekstSkjemaGruppeId}>Legg til fritekst avsnitt</Label>
                                        {visFritekstAvsnittTekstboks ? (
                                            <Fieldset
                                                legend="Legg til fritekst avsnitt"
                                                hideLegend
                                                id={fritekstSkjemaGruppeId}
                                            >
                                                <HStack>
                                                    <Textarea
                                                        label="Skriv inn fritekstavsnitt"
                                                        hideLabel
                                                        size={'small'}
                                                        className={styles.textarea}
                                                        value={field.value ?? ''}
                                                        maxLength={maksLengdeFritekstAvsnitt}
                                                        onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
                                                            field.onChange(event.target.value)
                                                        }
                                                        error={fieldState.error?.message}
                                                        autoFocus
                                                    />

                                                    <Button
                                                        variant={'tertiary'}
                                                        onClick={() => {
                                                            field.onChange(undefined);
                                                            settVisFritekstAvsnittTekstboks(false);
                                                        }}
                                                        id={`fjern_fritekst`}
                                                        size={'small'}
                                                        aria-label={'Fjern fritekst'}
                                                        icon={<TrashIcon />}
                                                        className={styles.removeButton}
                                                    >
                                                        {'Fjern'}
                                                    </Button>
                                                </HStack>
                                            </Fieldset>
                                        ) : (
                                            !erLesevisning && (
                                                <Button
                                                    variant={'tertiary'}
                                                    onClick={() => settVisFritekstAvsnittTekstboks(true)}
                                                    id={`legg-til-fritekst-avsnitt`}
                                                    size={'small'}
                                                    icon={<PlusCircleIcon />}
                                                    className={styles.addButton}
                                                >
                                                    {'Legg til fritekst avsnitt'}
                                                </Button>
                                            )
                                        )}
                                    </div>
                                )}
                            />
                        )}
                        {skalViseBarnBrevetGjelder(brevmal) && (
                            <Controller
                                name="barnBrevetGjelder"
                                control={control}
                                rules={{
                                    validate: verdi =>
                                        verdi.some(barn => barn.merket)
                                            ? true
                                            : 'Du må velge hvilke barn brevet gjelder',
                                }}
                                render={({ field, fieldState }) => (
                                    <BarnBrevetGjelder
                                        barnBrevetGjelder={field.value}
                                        onChange={field.onChange}
                                        behandlingsSteg={behandlingSteg}
                                        error={fieldState.error?.message}
                                    />
                                )}
                            />
                        )}
                        {skalViseDeltBosted(brevmal) && (
                            <>
                                <Controller
                                    name="barnMedDeltBosted"
                                    control={control}
                                    rules={{ validate: verdi => validerBarnMedDeltBosted(verdi) ?? true }}
                                    render={({ field: barnField, fieldState: barnState }) => (
                                        <Controller
                                            name="avtalerOmDeltBostedPerBarn"
                                            control={control}
                                            rules={{
                                                validate: (verdi, values) =>
                                                    validerAvtalerOmDeltBostedPerBarn(
                                                        verdi,
                                                        values.barnMedDeltBosted
                                                    ) ?? true,
                                            }}
                                            render={({ field: avtaleField }) => (
                                                <DeltBostedSkjema
                                                    barnMedDeltBosted={barnField.value}
                                                    settBarnMedDeltBosted={barnField.onChange}
                                                    avtalerOmDeltBostedPerBarn={avtaleField.value}
                                                    settAvtalerOmDeltBostedPerBarn={avtaleField.onChange}
                                                    visFeilmeldinger={isSubmitted}
                                                    error={barnState.error?.message}
                                                />
                                            )}
                                        />
                                    )}
                                />
                                {!erLesevisning && <LeggTilBarnKnapp />}
                            </>
                        )}
                        {skalViseDatoAvtale(brevmal) && <DatoAvtaleField />}
                        {skalViseAntallUkerSvarfrist(brevmal) && (
                            <Controller
                                name="antallUkerSvarfrist"
                                control={control}
                                rules={{
                                    validate: verdi => {
                                        if (verdi === '') {
                                            return 'Antall uker svarfrist er ikke satt';
                                        }
                                        if (Number.isNaN(verdi) || verdi < 1) {
                                            return 'Antall uker svarfrist må være et positivt tall';
                                        }
                                        if (verdi > maksSvarfristUker) {
                                            return `Du kan ikke sette antall uker svartid til mer enn ${maksSvarfristUker} uker (5 måneder)`;
                                        }
                                        return true;
                                    },
                                }}
                                render={({ field, fieldState }) => (
                                    <TextField
                                        label={'Antall uker svarfrist'}
                                        size={'small'}
                                        className={styles.textField}
                                        value={field.value === '' ? '' : field.value}
                                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                            field.onChange(event.target.value === '' ? '' : Number(event.target.value))
                                        }
                                        onBlur={field.onBlur}
                                        error={fieldState.error?.message}
                                    />
                                )}
                            />
                        )}
                        {skalViseMottakerlandSed(brevmal, behandlingKategori) && <MottakerlandSedField />}
                    </VStack>
                </Fieldset>
                <Knapperekke>
                    {!erLesevisning && (
                        <>
                            <Button
                                variant={'secondary'}
                                id={'forhandsvis-vedtaksbrev'}
                                size={'small'}
                                disabled={skjemaErLåst}
                                onClick={handleSubmit(values => {
                                    opprettManueltBrevPdf({
                                        behandlingId: behandling.behandlingId,
                                        payload: hentSkjemaData(values),
                                    });
                                    settVisForhåndsvisningDialog(true);
                                })}
                                icon={<FileTextIcon />}
                            >
                                Forhåndsvis
                            </Button>
                            <Dialog open={visForhåndsvisningDialog} onOpenChange={settVisForhåndsvisningDialog}>
                                <Dialog.Popup width={'max(100rem, 60vw)'} height={'80vh'}>
                                    <Dialog.Header>
                                        <Dialog.Title>Forhåndsvisning av brev</Dialog.Title>
                                    </Dialog.Header>
                                    <Dialog.Body className={styles.body}>
                                        {opprettManueltBrevPdfIsPending && (
                                            <HStack height={'100%'} justify={'center'} align={'center'} gap={'space-8'}>
                                                <Loader size={'small'} title={'Laster dokument...'} />
                                                <Heading size={'small'} level={'2'}>
                                                    Laster dokument...
                                                </Heading>
                                            </HStack>
                                        )}
                                        {opprettManueltBrevPdfError && (
                                            <HStack height={'100%'} justify={'center'} align={'center'} gap={'space-8'}>
                                                <XMarkOctagonFillIcon
                                                    color={'var(--ax-text-danger-subtle)'}
                                                    fontSize={'1.2rem'}
                                                />
                                                <ErrorMessage>{opprettManueltBrevPdfError.message}</ErrorMessage>
                                            </HStack>
                                        )}
                                        {!opprettManueltBrevPdfIsPending && !opprettManueltBrevPdfError && (
                                            <iframe className={styles.iframe} title={'Dokument'} src={manueltBrevPdf} />
                                        )}
                                    </Dialog.Body>
                                </Dialog.Popup>
                            </Dialog>
                        </>
                    )}
                    <Button
                        variant={'primary'}
                        size={'small'}
                        loading={isSubmitting}
                        disabled={skjemaErLåst}
                        onClick={handleSubmit(onSubmit)}
                    >
                        Send brev
                    </Button>
                </Knapperekke>
            </LeggTilBarnModalContextProvider>
        </FormProvider>
    );
};

export default Brevskjema;
