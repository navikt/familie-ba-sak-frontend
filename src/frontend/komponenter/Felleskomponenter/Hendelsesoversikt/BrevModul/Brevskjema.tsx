import * as React from 'react';
import { useEffect, useState } from 'react';

import styled from 'styled-components';

import { FileTextIcon, PlusCircleIcon, TrashIcon } from '@navikt/aksel-icons';
import { Button, Fieldset, Label, Select, Tag, Textarea, TextField } from '@navikt/ds-react';
import { AGray100, AGray600 } from '@navikt/ds-tokens/dist/tokens';
import { FamilieReactSelect } from '@navikt/familie-form-elements';
import type { FeltState } from '@navikt/familie-skjema';
import { Valideringsstatus } from '@navikt/familie-skjema';
import type { Ressurs } from '@navikt/familie-typer';
import { RessursStatus } from '@navikt/familie-typer';
import type { Country } from '@navikt/land-verktoy';

import BarnBrevetGjelder from './BarnBrevetGjelder';
import BrevmottakerListe from './BrevmottakerListe';
import type { BrevtypeSelect, ISelectOptionMedBrevtekst } from './typer';
import {
    Brevmal,
    brevmaler,
    leggTilValuePåOption,
    opplysningsdokumenter,
    opplysningsdokumenterTilInstitusjon,
} from './typer';
import { useBehandling } from '../../../../context/behandlingContext/BehandlingContext';
import { useBrevModul } from '../../../../context/BrevModulContext';
import useDokument from '../../../../hooks/useDokument';
import type { IBehandling } from '../../../../typer/behandling';
import { BehandlingSteg, hentStegNummer } from '../../../../typer/behandling';
import type { IManueltBrevRequestPåBehandling } from '../../../../typer/dokument';
import type { IPersonInfo } from '../../../../typer/person';
import { målform } from '../../../../typer/søknad';
import type { IFritekstFelt } from '../../../../utils/fritekstfelter';
import { hentFrontendFeilmelding } from '../../../../utils/ressursUtils';
import { FamilieMultiLandvelger } from '../../../Fagsak/Behandlingsresultat/EøsPeriode/FamilieLandvelger';
import DeltBostedSkjema from '../../../Fagsak/Dokumentutsending/DeltBosted/DeltBostedSkjema';
import { useSamhandlerRequest } from '../../../Fagsak/InstitusjonOgVerge/useSamhandler';
import Datovelger from '../../Datovelger/Datovelger';
import Knapperekke from '../../Knapperekke';
import PdfVisningModal from '../../PdfVisningModal/PdfVisningModal';

interface IProps {
    onSubmitSuccess: () => void;
    bruker: IPersonInfo;
}

const StyledList = styled.ul`
    padding-inline-start: 1rem;
    margin: 0;
`;

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

const TextareaBegrunnelseFritekst = styled(Textarea)`
    .navds-textarea__wrapper {
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
    }
`;

const StyledButton = styled(Button)`
    height: fit-content;
    align-self: center;
`;

const StyledTag = styled(Tag)`
    background-color: ${AGray100};
    border-color: ${AGray600};
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
        settNavigerTilOpplysningsplikt,
        hentMuligeBrevMaler,
        makslengdeFritekst,
        maksAntallKulepunkter,
        leggTilFritekst,
        settVisfeilmeldinger,
        erBrevmalMedObligatoriskFritekst,
        institusjon,
        brevmottakere,
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

    const erMaksAntallKulepunkter = skjema.felter.fritekster.verdi.length >= maksAntallKulepunkter;

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

    const onChangeFritekst = (event: React.ChangeEvent<HTMLTextAreaElement>, fritekstId: number) =>
        skjema.felter.fritekster.validerOgSettFelt([
            ...skjema.felter.fritekster.verdi.map(mapFritekst => {
                if (mapFritekst.verdi.id === fritekstId) {
                    return mapFritekst.valider({
                        ...mapFritekst,
                        verdi: {
                            ...mapFritekst.verdi,
                            tekst: event.target.value,
                        },
                    });
                } else {
                    return mapFritekst;
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
                            <StyledTag variant="info" size="small">
                                {målform[mottakersMålform()]}
                            </StyledTag>
                        </LabelOgEtikett>
                    }
                    placeholder={'Velg brevmal'}
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
                    <FamilieReactSelect
                        {...skjema.felter.dokumenter.hentNavInputProps(skjema.visFeilmeldinger)}
                        label={<Label>Velg dokumenter</Label>}
                        creatable={false}
                        erLesevisning={erLesevisning}
                        isMulti={true}
                        onChange={valgteOptions => {
                            skjema.felter.dokumenter.onChange(
                                valgteOptions === null
                                    ? []
                                    : (valgteOptions as ISelectOptionMedBrevtekst[])
                            );
                        }}
                        options={
                            institusjon
                                ? opplysningsdokumenterTilInstitusjon.map(leggTilValuePåOption)
                                : opplysningsdokumenter.map(leggTilValuePåOption)
                        }
                    />
                )}
                {skjema.felter.fritekster.erSynlig && (
                    <FritekstWrapper>
                        <Label htmlFor={fritekstSkjemaGruppeId}>Legg til kulepunkt</Label>
                        {erLesevisning ? (
                            <StyledList id={fritekstSkjemaGruppeId}>
                                {skjema.felter.fritekster.verdi.map(
                                    (fritekst: FeltState<IFritekstFelt>) => (
                                        <li>{fritekst.verdi.tekst}</li>
                                    )
                                )}
                            </StyledList>
                        ) : (
                            <>
                                <Fieldset
                                    legend="Legg til kulepunkt"
                                    hideLegend
                                    id={fritekstSkjemaGruppeId}
                                >
                                    {skjema.felter.fritekster.verdi.map(
                                        (fritekst: FeltState<IFritekstFelt>, index: number) => {
                                            const fritekstId = fritekst.verdi.id;
                                            const valgtBrevmal = skjema.felter.brevmal
                                                .verdi as Brevmal;

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
                                                    <TextareaBegrunnelseFritekst
                                                        key={`fritekst-${fritekstId}`}
                                                        id={`${fritekstId}`}
                                                        label={``}
                                                        size={'small'}
                                                        className={'fritekst-textarea'}
                                                        value={fritekst.verdi.tekst}
                                                        maxLength={makslengdeFritekst}
                                                        description={hjelpetekst}
                                                        onChange={(
                                                            event: React.ChangeEvent<HTMLTextAreaElement>
                                                        ) => onChangeFritekst(event, fritekstId)}
                                                        error={
                                                            skjema.visFeilmeldinger &&
                                                            fritekst.feilmelding
                                                        }
                                                        /* eslint-disable-next-line jsx-a11y/no-autofocus */
                                                        autoFocus
                                                    />
                                                    {!(
                                                        erBrevmalMedObligatoriskFritekst(
                                                            valgtBrevmal
                                                        ) && index === 0
                                                    ) && (
                                                        <StyledButton
                                                            variant={'tertiary'}
                                                            onClick={() => {
                                                                skjema.felter.fritekster.validerOgSettFelt(
                                                                    [
                                                                        ...skjema.felter.fritekster.verdi.filter(
                                                                            mapFritekst =>
                                                                                mapFritekst.verdi
                                                                                    .id !==
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
                                        onClick={() => leggTilFritekst()}
                                        id={`legg-til-fritekst`}
                                        size={'small'}
                                        icon={<PlusCircleIcon />}
                                    >
                                        {'Legg til kulepunkt'}
                                    </Button>
                                )}
                            </>
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
                        const harRegistrertSøknad =
                            hentStegNummer(behandling.steg) >
                            hentStegNummer(BehandlingSteg.REGISTRERE_SØKNAD);
                        settNavigerTilOpplysningsplikt(
                            harRegistrertSøknad &&
                                skjema.felter.brevmal.verdi === Brevmal.INNHENTE_OPPLYSNINGER
                        );
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
