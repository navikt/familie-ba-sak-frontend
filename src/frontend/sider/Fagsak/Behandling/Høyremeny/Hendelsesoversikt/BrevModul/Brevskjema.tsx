import * as React from 'react';
import { useEffect, useState } from 'react';

import styled from 'styled-components';

import { FileTextIcon, PlusCircleIcon, TrashIcon } from '@navikt/aksel-icons';
import {
    Button,
    Fieldset,
    Label,
    Select,
    Tag,
    Textarea,
    TextField,
    UNSAFE_Combobox,
} from '@navikt/ds-react';
import { ASpacing4 } from '@navikt/ds-tokens/dist/tokens';
import type { FeltState } from '@navikt/familie-skjema';
import { Valideringsstatus } from '@navikt/familie-skjema';
import type { Ressurs } from '@navikt/familie-typer';
import { RessursStatus } from '@navikt/familie-typer';
import type { Country } from '@navikt/land-verktoy';

import BarnBrevetGjelder from './BarnBrevetGjelder';
import type { BrevtypeSelect } from './typer';
import {
    Brevmal,
    brevmaler,
    leggTilValuePåOption,
    opplysningsdokumenter,
    opplysningsdokumenterTilInstitusjon,
} from './typer';
import { useBrevModul } from './useBrevModul';
import { useBehandling } from '../../../../../../context/behandlingContext/BehandlingContext';
import useDokument from '../../../../../../hooks/useDokument';
import BrevmottakerListe from '../../../../../../komponenter/Brevmottaker/BrevmottakerListe';
import Datovelger from '../../../../../../komponenter/Datovelger/Datovelger';
import Knapperekke from '../../../../../../komponenter/Knapperekke';
import PdfVisningModal from '../../../../../../komponenter/PdfVisningModal/PdfVisningModal';
import { useSamhandlerRequest } from '../../../../../../komponenter/Samhandler/useSamhandler';
import type { IBehandling } from '../../../../../../typer/behandling';
import type { IManueltBrevRequestPåBehandling } from '../../../../../../typer/dokument';
import type { IPersonInfo } from '../../../../../../typer/person';
import { målform } from '../../../../../../typer/søknad';
import type { IFritekstFelt } from '../../../../../../utils/fritekstfelter';
import { hentFrontendFeilmelding } from '../../../../../../utils/ressursUtils';
import { onOptionSelected } from '../../../../../../utils/skjema';
import DeltBostedSkjema from '../../../../Dokumentutsending/DeltBosted/DeltBostedSkjema';
import { FamilieMultiLandvelger } from '../../../Sider/Behandlingsresultat/Eøs/EøsKomponenter/FamilieLandvelger';

interface IProps {
    onSubmitSuccess: () => void;
    bruker: IPersonInfo;
}

const StyledSelect = styled(Select)`
    margin-bottom: 1rem;

    .navds-label {
        width: 100%;
    }
`;

const StyledFamilieFritekstFelt = styled.div`
    display: flex;

    .navds-form-field {
        width: 100% !important;
    }
`;

const StyledButton = styled(Button)`
    height: fit-content;
    align-self: center;
`;

const LabelOgEtikett = styled.div`
    display: flex;
    justify-content: space-between;
`;

const FritekstWrapper = styled.div`
    margin: 1rem 0;
`;

const StyledTextField = styled(TextField)`
    width: fit-content;
`;

const StyledLandvelger = styled(FamilieMultiLandvelger)`
    margin-top: 1.5rem;
`;

const StyledCombobox = styled(UNSAFE_Combobox)`
    margin-bottom: ${ASpacing4};
`;

const Brevskjema = ({ onSubmitSuccess, bruker }: IProps) => {
    const { behandling, settÅpenBehandling, vurderErLesevisning, hentLogg } = useBehandling();
    const { hentForhåndsvisning, hentetDokument } = useDokument();
    const { hentOgSettSamhandler, samhandlerRessurs } = useSamhandlerRequest();

    const {
        skjema,
        hentSkjemaData,
        kanSendeSkjema,
        mottakersMålform,
        onSubmit,
        hentMuligeBrevMaler,
        makslengdeFritekstHvertKulepunkt,
        maksLengdeFritekstAvsnitt,
        maksAntallKulepunkter,
        leggTilFritekstKulepunkt,
        settVisfeilmeldinger,
        erBrevmalMedObligatoriskFritekstKulepunkt,
        institusjon,
        brevmottakere,
        visFritekstAvsnittTekstboks,
        settVisFritekstAvsnittTekstboks,
    } = useBrevModul();

    const [visForhåndsvisningModal, settForhåndsviningModal] = useState(false);

    useEffect(() => {
        if (hentetDokument.status === RessursStatus.SUKSESS) {
            settForhåndsviningModal(true);
        }
    }, [hentetDokument]);

    useEffect(() => {
        settForhåndsviningModal(false);
    }, []);

    const erLesevisning = vurderErLesevisning();

    const brevMaler = hentMuligeBrevMaler();
    const skjemaErLåst =
        skjema.submitRessurs.status === RessursStatus.HENTER ||
        hentetDokument.status === RessursStatus.HENTER;

    const behandlingId = behandling.behandlingId;

    const fritekstSkjemaGruppeId = 'Fritekster-brev';

    const hjelpetekstVarselAnnenForelderMedSelvstendigRettSøkt =
        'Skriv her hvilke opplysninger vi har som er av betydning for saken. For eksempel: Vi har fått opplyst at barnet bor fast sammen med den andre forelderen.';

    const erMaksAntallKulepunkter =
        skjema.felter.fritekstKulepunkter.verdi.length >= maksAntallKulepunkter;

    const behandlingSteg = behandling.steg;

    if (institusjon) {
        skjema.felter.mottakerIdent.validerOgSettFelt(institusjon.orgNummer);
        if (!institusjon.navn && samhandlerRessurs.status === RessursStatus.IKKE_HENTET) {
            hentOgSettSamhandler(institusjon.orgNummer);
        }
        institusjon.navn =
            samhandlerRessurs.status === RessursStatus.SUKSESS
                ? samhandlerRessurs.data.navn
                : institusjon.navn;
    }

    const muligeDokumenterÅVelge = institusjon
        ? opplysningsdokumenterTilInstitusjon.map(leggTilValuePåOption)
        : opplysningsdokumenter.map(leggTilValuePåOption);

    const onChangeFritekstKulepunkt = (
        event: React.ChangeEvent<HTMLTextAreaElement>,
        fritekstKulepunktId: number
    ) =>
        skjema.felter.fritekstKulepunkter.validerOgSettFelt([
            ...skjema.felter.fritekstKulepunkter.verdi.map(fritekstKulepunkt => {
                if (fritekstKulepunkt.verdi.id === fritekstKulepunktId) {
                    return fritekstKulepunkt.valider({
                        ...fritekstKulepunkt,
                        verdi: {
                            ...fritekstKulepunkt.verdi,
                            tekst: event.target.value,
                        },
                    });
                } else {
                    return fritekstKulepunkt;
                }
            }),
        ]);

    return (
        <div>
            {visForhåndsvisningModal && (
                <PdfVisningModal
                    onRequestClose={() => settForhåndsviningModal(false)}
                    pdfdata={hentetDokument}
                />
            )}
            <Fieldset
                error={
                    (skjema.visFeilmeldinger && hentFrontendFeilmelding(skjema.submitRessurs)) ||
                    hentFrontendFeilmelding(hentetDokument)
                }
                legend="Send brev"
                hideLegend
            >
                <Label>Brev sendes til</Label>
                <BrevmottakerListe bruker={bruker} brevmottakere={brevmottakere} />
                <StyledSelect
                    {...skjema.felter.brevmal.hentNavInputProps(skjema.visFeilmeldinger)}
                    label={
                        <LabelOgEtikett>
                            <Label
                                htmlFor={
                                    skjema.felter.brevmal.hentNavInputProps(skjema.visFeilmeldinger)
                                        .id
                                }
                            >
                                Velg brevmal
                            </Label>
                            <Tag variant="neutral" size="small">
                                {målform[mottakersMålform()]}
                            </Tag>
                        </LabelOgEtikett>
                    }
                    onChange={(event: React.ChangeEvent<BrevtypeSelect>): void => {
                        skjema.felter.brevmal.onChange(event.target.value);
                        skjema.felter.dokumenter.nullstill();
                    }}
                >
                    <option value={''}>Velg</option>
                    {brevMaler.map(mal => {
                        return (
                            <option
                                aria-selected={mal === skjema.felter.brevmal.verdi}
                                key={mal}
                                value={mal}
                            >
                                {brevmaler[mal]}
                            </option>
                        );
                    })}
                </StyledSelect>

                {skjema.felter.dokumenter.erSynlig && (
                    <StyledCombobox
                        label={'Velg dokumenter'}
                        readOnly={erLesevisning}
                        isMultiSelect
                        options={muligeDokumenterÅVelge}
                        selectedOptions={skjema.felter.dokumenter.verdi}
                        onToggleSelected={(optionValue: string, isSelected: boolean) =>
                            onOptionSelected(
                                optionValue,
                                isSelected,
                                skjema.felter.dokumenter,
                                muligeDokumenterÅVelge
                            )
                        }
                        error={
                            skjema.felter.dokumenter.hentNavInputProps(skjema.visFeilmeldinger)
                                .error
                        }
                    />
                )}
                {skjema.felter.fritekstKulepunkter.erSynlig && (
                    <FritekstWrapper>
                        <Label htmlFor={fritekstSkjemaGruppeId}>Legg til kulepunkt</Label>
                        <>
                            <Fieldset
                                legend="Legg til kulepunkt"
                                hideLegend
                                id={fritekstSkjemaGruppeId}
                            >
                                {skjema.felter.fritekstKulepunkter.verdi.map(
                                    (fritekst: FeltState<IFritekstFelt>, index: number) => {
                                        const fritekstId = fritekst.verdi.id;
                                        const valgtBrevmal = skjema.felter.brevmal.verdi as Brevmal;

                                        const hjelpetekst =
                                            index === 0 &&
                                            valgtBrevmal ===
                                                Brevmal.VARSEL_ANNEN_FORELDER_MED_SELVSTENDIG_RETT_SØKT
                                                ? hjelpetekstVarselAnnenForelderMedSelvstendigRettSøkt
                                                : '';

                                        return (
                                            <StyledFamilieFritekstFelt
                                                key={`fritekst-${fritekstId}`}
                                            >
                                                <Textarea
                                                    key={`fritekst-${fritekstId}`}
                                                    id={`${fritekstId}`}
                                                    label="Skriv inn kulepunkt"
                                                    hideLabel
                                                    size={'small'}
                                                    value={fritekst.verdi.tekst}
                                                    maxLength={makslengdeFritekstHvertKulepunkt}
                                                    description={hjelpetekst}
                                                    onChange={(
                                                        event: React.ChangeEvent<HTMLTextAreaElement>
                                                    ) =>
                                                        onChangeFritekstKulepunkt(event, fritekstId)
                                                    }
                                                    error={
                                                        skjema.visFeilmeldinger &&
                                                        fritekst.feilmelding
                                                    }
                                                    /* eslint-disable-next-line jsx-a11y/no-autofocus */
                                                    autoFocus
                                                />
                                                {!(
                                                    erBrevmalMedObligatoriskFritekstKulepunkt(
                                                        valgtBrevmal
                                                    ) && index === 0
                                                ) && (
                                                    <StyledButton
                                                        variant={'tertiary'}
                                                        onClick={() => {
                                                            skjema.felter.fritekstKulepunkter.validerOgSettFelt(
                                                                [
                                                                    ...skjema.felter.fritekstKulepunkter.verdi.filter(
                                                                        mapFritekst =>
                                                                            mapFritekst.verdi.id !==
                                                                            fritekst.verdi.id
                                                                    ),
                                                                ]
                                                            );
                                                        }}
                                                        id={`fjern_fritekst-${fritekstId}`}
                                                        size={'small'}
                                                        aria-label={'Fjern fritekst'}
                                                        icon={<TrashIcon />}
                                                    >
                                                        {'Fjern'}
                                                    </StyledButton>
                                                )}
                                            </StyledFamilieFritekstFelt>
                                        );
                                    }
                                )}
                            </Fieldset>

                            {!erMaksAntallKulepunkter && !erLesevisning && (
                                <Button
                                    variant={'tertiary'}
                                    onClick={() => leggTilFritekstKulepunkt()}
                                    id={`legg-til-fritekst`}
                                    size={'small'}
                                    icon={<PlusCircleIcon />}
                                >
                                    {'Legg til kulepunkt'}
                                </Button>
                            )}
                        </>
                    </FritekstWrapper>
                )}
                {skjema.felter.fritekstAvsnitt.erSynlig && (
                    <FritekstWrapper>
                        <Label htmlFor={fritekstSkjemaGruppeId}>Legg til fritekst avsnitt</Label>
                        {visFritekstAvsnittTekstboks ? (
                            <Fieldset
                                legend="Legg til fritekst avsnitt"
                                hideLegend
                                id={fritekstSkjemaGruppeId}
                            >
                                <StyledFamilieFritekstFelt>
                                    <Textarea
                                        label="Skriv inn fritekstavsnitt"
                                        hideLabel
                                        size={'small'}
                                        value={skjema.felter.fritekstAvsnitt.verdi}
                                        maxLength={maksLengdeFritekstAvsnitt}
                                        onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
                                            skjema.felter.fritekstAvsnitt.validerOgSettFelt(
                                                event.target.value
                                            )
                                        }
                                        error={
                                            skjema.visFeilmeldinger &&
                                            skjema.felter.fritekstAvsnitt?.feilmelding
                                        }
                                        /* eslint-disable-next-line jsx-a11y/no-autofocus */
                                        autoFocus
                                    />

                                    <StyledButton
                                        variant={'tertiary'}
                                        onClick={() => {
                                            skjema.felter.fritekstAvsnitt.nullstill();
                                            settVisFritekstAvsnittTekstboks(false);
                                        }}
                                        id={`fjern_fritekst`}
                                        size={'small'}
                                        aria-label={'Fjern fritekst'}
                                        icon={<TrashIcon />}
                                    >
                                        {'Fjern'}
                                    </StyledButton>
                                </StyledFamilieFritekstFelt>
                            </Fieldset>
                        ) : (
                            skjema.felter.fritekstAvsnitt &&
                            !erLesevisning && (
                                <Button
                                    variant={'tertiary'}
                                    onClick={() => settVisFritekstAvsnittTekstboks(true)}
                                    id={`legg-til-fritekst-avsnitt`}
                                    size={'small'}
                                    icon={<PlusCircleIcon />}
                                >
                                    {'Legg til fritekst avsnitt'}
                                </Button>
                            )
                        )}
                    </FritekstWrapper>
                )}
                {skjema.felter.barnBrevetGjelder.erSynlig && (
                    <BarnBrevetGjelder
                        barnBrevetGjelderFelt={skjema.felter.barnBrevetGjelder}
                        behandlingsSteg={behandlingSteg}
                        visFeilmeldinger={skjema.visFeilmeldinger}
                        settVisFeilmeldinger={settVisfeilmeldinger}
                    />
                )}
                {skjema.felter.brevmal.verdi ===
                    Brevmal.VARSEL_OM_REVURDERING_DELT_BOSTED_PARAGRAF_14 && (
                    <DeltBostedSkjema
                        avtalerOmDeltBostedPerBarnFelt={skjema.felter.avtalerOmDeltBostedPerBarn}
                        barnMedDeltBostedFelt={skjema.felter.barnMedDeltBosted}
                        visFeilmeldinger={skjema.visFeilmeldinger}
                        settVisFeilmeldinger={settVisfeilmeldinger}
                        manuelleBrevmottakere={brevmottakere}
                        vurderErLesevisning={vurderErLesevisning}
                    />
                )}
                {skjema.felter.brevmal.verdi === Brevmal.VARSEL_OM_REVURDERING_SAMBOER && (
                    <Datovelger
                        felt={skjema.felter.datoAvtale}
                        label={'Samboer fra'}
                        visFeilmeldinger={skjema.visFeilmeldinger}
                    />
                )}
                {skjema.felter.brevmal.verdi &&
                    [
                        Brevmal.FORLENGET_SVARTIDSBREV,
                        Brevmal.FORLENGET_SVARTIDSBREV_INSTITUSJON,
                    ].includes(skjema.felter.brevmal.verdi) && (
                        <StyledTextField
                            {...skjema.felter.antallUkerSvarfrist.hentNavInputProps(
                                skjema.visFeilmeldinger
                            )}
                            label={'Antall uker svarfrist'}
                            size={'small'}
                        />
                    )}
                {skjema.felter.brevmal.verdi &&
                    [
                        Brevmal.VARSEL_OM_ÅRLIG_REVURDERING_EØS,
                        Brevmal.VARSEL_OM_ÅRLIG_REVURDERING_EØS_MED_INNHENTING_AV_OPPLYSNINGER,
                    ].includes(skjema.felter.brevmal.verdi) && (
                        <StyledLandvelger
                            erLesevisning={false}
                            id={'mottakerlandSED'}
                            label={'SED er sendt til'}
                            kunEøs
                            eksluderLand={['NO']}
                            medFlag
                            size="medium"
                            kanNullstilles
                            value={skjema.felter.mottakerlandSed?.verdi}
                            onChange={(value: Country[]) => {
                                skjema.felter.mottakerlandSed.validerOgSettFelt(
                                    value.map(land => land.value)
                                );
                            }}
                            feil={
                                skjema.visFeilmeldinger &&
                                skjema.felter.mottakerlandSed.valideringsstatus ===
                                    Valideringsstatus.FEIL
                                    ? skjema.felter.mottakerlandSed?.feilmelding?.toString()
                                    : ''
                            }
                        />
                    )}
            </Fieldset>
            <Knapperekke>
                {!erLesevisning && (
                    <Button
                        variant={'tertiary'}
                        id={'forhandsvis-vedtaksbrev'}
                        size={'medium'}
                        loading={hentetDokument.status === RessursStatus.HENTER}
                        disabled={skjemaErLåst}
                        onClick={() => {
                            if (kanSendeSkjema()) {
                                hentForhåndsvisning<IManueltBrevRequestPåBehandling>({
                                    method: 'POST',
                                    data: hentSkjemaData(),
                                    url: `/familie-ba-sak/api/dokument/forhaandsvis-brev/${behandlingId}`,
                                });
                            }
                        }}
                        icon={<FileTextIcon />}
                    >
                        {'Forhåndsvis'}
                    </Button>
                )}
                <Button
                    variant={'secondary'}
                    size={'medium'}
                    loading={skjema.submitRessurs.status === RessursStatus.HENTER}
                    disabled={skjemaErLåst}
                    onClick={() => {
                        onSubmit<IManueltBrevRequestPåBehandling>(
                            {
                                method: 'POST',
                                data: hentSkjemaData(),
                                url: `/familie-ba-sak/api/dokument/send-brev/${behandling.behandlingId}`,
                            },
                            (ressurs: Ressurs<IBehandling>) => {
                                onSubmitSuccess();
                                settÅpenBehandling(ressurs);
                                hentLogg();
                            }
                        );
                    }}
                >
                    Send brev
                </Button>
            </Knapperekke>
        </div>
    );
};

export default Brevskjema;
