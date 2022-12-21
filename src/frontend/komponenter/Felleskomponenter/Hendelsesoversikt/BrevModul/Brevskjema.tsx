import * as React from 'react';
import { useEffect, useState } from 'react';

import styled from 'styled-components';

import { SkjemaGruppe } from 'nav-frontend-skjema';

import { AddCircle, Delete, FileContent } from '@navikt/ds-icons';
import { Button, Label, Tag } from '@navikt/ds-react';
import { NavdsGlobalColorGray100, NavdsGlobalColorGray600 } from '@navikt/ds-tokens/dist/tokens';
import {
    FamilieInput,
    FamilieReactSelect,
    FamilieSelect,
    FamilieTextarea,
} from '@navikt/familie-form-elements';
import { type FeltState, Valideringsstatus } from '@navikt/familie-skjema';
import type { Ressurs } from '@navikt/familie-typer';
import { RessursStatus } from '@navikt/familie-typer';
import type { Country } from '@navikt/land-verktoy';

import { useBehandling } from '../../../../context/behandlingContext/BehandlingContext';
import { useBrevModul } from '../../../../context/BrevModulContext';
import useDokument from '../../../../hooks/useDokument';
import type { IBehandling } from '../../../../typer/behandling';
import { BehandlingSteg, hentStegNummer } from '../../../../typer/behandling';
import type { IManueltBrevRequestPåBehandling } from '../../../../typer/dokument';
import type { IGrunnlagPerson } from '../../../../typer/person';
import { PersonType } from '../../../../typer/person';
import type { IBarnMedOpplysninger } from '../../../../typer/søknad';
import { målform } from '../../../../typer/søknad';
import { formaterIdent, lagPersonLabel } from '../../../../utils/formatter';
import type { IFritekstFelt } from '../../../../utils/fritekstfelter';
import { hentFrontendFeilmelding } from '../../../../utils/ressursUtils';
import { FamilieDatovelgerWrapper } from '../../../../utils/skjema/FamilieDatovelgerWrapper';
import { FamilieLandvelger } from '../../../Fagsak/Behandlingsresultat/EøsPeriode/FamilieLandvelger';
import DeltBostedSkjema from '../../../Fagsak/Dokumentutsending/DeltBosted/DeltBostedSkjema';
import { useSamhandlerRequest } from '../../../Fagsak/InstitusjonOgVerge/useSamhandler';
import Knapperekke from '../../Knapperekke';
import PdfVisningModal from '../../PdfVisningModal/PdfVisningModal';
import SkjultLegend from '../../SkjultLegend';
import BarnBrevetGjelder from './BarnBrevetGjelder';
import type { BrevtypeSelect, ISelectOptionMedBrevtekst } from './typer';
import {
    Brevmal,
    brevmaler,
    leggTilValuePåOption,
    opplysningsdokumenter,
    opplysningsdokumenterTilInstitusjon,
} from './typer';

interface IProps {
    onSubmitSuccess: () => void;
}

const StyledList = styled.ul`
    padding-inline-start: 1rem;
    margin: 0;
`;

const StyledFamilieSelect = styled(FamilieSelect)`
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

const FamilieTextareaBegrunnelseFritekst = styled(FamilieTextarea)`
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
    background-color: ${NavdsGlobalColorGray100};
    border-color: ${NavdsGlobalColorGray600};
`;

const LabelOgEtikett = styled.div`
    display: flex;
    justify-content: space-between;
`;

const FritekstWrapper = styled.div`
    margin: 1rem 0;
`;

const StyledFamilieInput = styled(FamilieInput)`
    width: fit-content;
`;

const StyledFamilieLandvelger = styled(FamilieLandvelger)`
    margin-top: 1.5rem;
`;

const Brevskjema = ({ onSubmitSuccess }: IProps) => {
    const { åpenBehandling, settÅpenBehandling, vurderErLesevisning, hentLogg } = useBehandling();
    const { hentForhåndsvisning, hentetDokument } = useDokument();
    const { hentOgSettSamhandler, samhandlerRessurs } = useSamhandlerRequest();

    const {
        skjema,
        hentSkjemaData,
        kanSendeSkjema,
        mottakersMålform,
        onSubmit,
        personer,
        settNavigerTilOpplysningsplikt,
        hentMuligeBrevMaler,
        makslengdeFritekst,
        maksAntallKulepunkter,
        leggTilFritekst,
        settVisfeilmeldinger,
        erBrevmalMedObligatoriskFritekst,
        institusjon,
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

    const brevMaler = hentMuligeBrevMaler();
    const skjemaErLåst =
        skjema.submitRessurs.status === RessursStatus.HENTER ||
        hentetDokument.status === RessursStatus.HENTER;

    const behandlingId =
        åpenBehandling.status === RessursStatus.SUKSESS && åpenBehandling.data.behandlingId;

    const skjemaGruppeId = 'Fritekster-brev';
    const erMaksAntallKulepunkter = skjema.felter.fritekster.verdi.length >= maksAntallKulepunkter;

    const behandlingSteg =
        åpenBehandling.status === RessursStatus.SUKSESS ? åpenBehandling.data.steg : undefined;

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
            <PdfVisningModal
                åpen={visForhåndsvisningModal}
                onRequestClose={() => settForhåndsviningModal(false)}
                pdfdata={hentetDokument}
            />
            <SkjemaGruppe
                feil={
                    hentFrontendFeilmelding(skjema.submitRessurs) ||
                    hentFrontendFeilmelding(hentetDokument)
                }
            >
                <SkjultLegend>Send brev</SkjultLegend>
                <StyledFamilieSelect
                    {...skjema.felter.mottakerIdent.hentNavInputProps(skjema.visFeilmeldinger)}
                    label={'Velg mottaker'}
                    placeholder={'Velg mottaker'}
                    onChange={(event: React.ChangeEvent<HTMLSelectElement>): void => {
                        skjema.felter.mottakerIdent.onChange(event.target.value);
                    }}
                >
                    <option value={''}>Velg</option>
                    {personer
                        .filter((person: IGrunnlagPerson) => person.type !== PersonType.BARN)
                        .map((person, index) => {
                            return (
                                <option
                                    aria-selected={
                                        person.personIdent === skjema.felter.mottakerIdent.verdi
                                    }
                                    key={`${index}_${person.fødselsdato}`}
                                    value={person.personIdent}
                                >
                                    {lagPersonLabel(person.personIdent, personer)}
                                </option>
                            );
                        })}
                    {institusjon && (
                        <option
                            aria-selected={
                                institusjon.orgNummer === skjema.felter.mottakerIdent.verdi
                            }
                            key={`institusjon_${institusjon.orgNummer}`}
                            value={institusjon.orgNummer}
                        >
                            {`Institusjon | ${institusjon.navn?.concat(' |') || ''} ${formaterIdent(
                                institusjon.orgNummer
                            )}`}
                        </option>
                    )}
                </StyledFamilieSelect>
                <StyledFamilieSelect
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
                </StyledFamilieSelect>

                {skjema.felter.dokumenter.erSynlig && (
                    <FamilieReactSelect
                        {...skjema.felter.dokumenter.hentNavInputProps(skjema.visFeilmeldinger)}
                        label={<Label>Velg dokumenter</Label>}
                        creatable={false}
                        erLesevisning={vurderErLesevisning()}
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
                        <Label htmlFor={skjemaGruppeId}>Legg til kulepunkt</Label>
                        {vurderErLesevisning() ? (
                            <StyledList id={skjemaGruppeId}>
                                {skjema.felter.fritekster.verdi.map(
                                    (fritekst: FeltState<IFritekstFelt>) => (
                                        <li>{fritekst.verdi.tekst}</li>
                                    )
                                )}
                            </StyledList>
                        ) : (
                            <>
                                <SkjemaGruppe
                                    id={skjemaGruppeId}
                                    feil={
                                        skjema.visFeilmeldinger &&
                                        hentFrontendFeilmelding(skjema.submitRessurs)
                                    }
                                >
                                    {skjema.felter.fritekster.verdi.map(
                                        (fritekst: FeltState<IFritekstFelt>, index: number) => {
                                            const fritekstId = fritekst.verdi.id;

                                            return (
                                                <StyledFamilieFritekstFelt
                                                    key={`fritekst-${fritekstId}`}
                                                >
                                                    <FamilieTextareaBegrunnelseFritekst
                                                        erLesevisning={false}
                                                        key={`fritekst-${fritekstId}`}
                                                        id={`${fritekstId}`}
                                                        label={`Kulepunkt ${fritekstId}`}
                                                        hideLabel
                                                        size={'small'}
                                                        className={'fritekst-textarea'}
                                                        value={fritekst.verdi.tekst}
                                                        maxLength={makslengdeFritekst}
                                                        onChange={event =>
                                                            onChangeFritekst(event, fritekstId)
                                                        }
                                                        error={
                                                            skjema.visFeilmeldinger &&
                                                            fritekst.feilmelding
                                                        }
                                                        /* eslint-disable-next-line jsx-a11y/no-autofocus */
                                                        autoFocus
                                                    />
                                                    {!(
                                                        erBrevmalMedObligatoriskFritekst(
                                                            skjema.felter.brevmal.verdi as Brevmal
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
                                                            icon={<Delete />}
                                                        >
                                                            {'Fjern'}
                                                        </StyledButton>
                                                    )}
                                                </StyledFamilieFritekstFelt>
                                            );
                                        }
                                    )}
                                </SkjemaGruppe>

                                {!erMaksAntallKulepunkter &&
                                    (!vurderErLesevisning() ? (
                                        <Button
                                            variant={'tertiary'}
                                            onClick={() => leggTilFritekst()}
                                            id={`legg-til-fritekst`}
                                            size={'small'}
                                            icon={<AddCircle />}
                                        >
                                            {'Legg til kulepunkt'}
                                        </Button>
                                    ) : null)}
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
                        alternativer={personer
                            .filter(person => person.type === PersonType.BARN)
                            .map(
                                (person: IGrunnlagPerson): IBarnMedOpplysninger => ({
                                    ident: person.personIdent,
                                    fødselsdato: person.fødselsdato,
                                    navn: person.navn,
                                    merket:
                                        skjema.felter.barnBrevetGjelder.verdi.find(
                                            markertFelt => markertFelt.ident === person.personIdent
                                        )?.merket ?? false,
                                    manueltRegistrert: false,
                                    erFolkeregistrert: true,
                                })
                            )}
                    />
                )}
                {skjema.felter.brevmal.verdi ===
                    Brevmal.VARSEL_OM_REVURDERING_DELT_BOSTED_PARAGRAF_14 && (
                    <DeltBostedSkjema
                        avtalerOmDeltBostedPerBarnFelt={skjema.felter.avtalerOmDeltBostedPerBarn}
                        barnMedDeltBostedFelt={skjema.felter.barnMedDeltBosted}
                        visFeilmeldinger={skjema.visFeilmeldinger}
                        settVisFeilmeldinger={settVisfeilmeldinger}
                    />
                )}
                {skjema.felter.brevmal.verdi === Brevmal.VARSEL_OM_REVURDERING_SAMBOER && (
                    <FamilieDatovelgerWrapper
                        {...skjema.felter.datoAvtale.hentNavInputProps(skjema.visFeilmeldinger)}
                        label={'Samboer fra'}
                        value={skjema.felter.datoAvtale.verdi}
                        placeholder={'DD.MM.ÅÅÅÅ'}
                    />
                )}
                {skjema.felter.brevmal.verdi &&
                    [
                        Brevmal.FORLENGET_SVARTIDSBREV,
                        Brevmal.FORLENGET_SVARTIDSBREV_INSTITUSJON,
                    ].includes(skjema.felter.brevmal.verdi) && (
                        <StyledFamilieInput
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
                        <StyledFamilieLandvelger
                            erLesevisning={false}
                            id={'mottakerlandSED'}
                            label={'SED er sendt til'}
                            kunEøs
                            eksluderLand={['NO']}
                            medFlag
                            size="medium"
                            kanNullstilles
                            value={skjema.felter.mottakerlandSed?.verdi}
                            onChange={(value: Country) => {
                                const nyVerdi = value ? value.value : '';
                                skjema.felter.mottakerlandSed.validerOgSettFelt(nyVerdi);
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
            </SkjemaGruppe>
            <Knapperekke>
                {!vurderErLesevisning() && (
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
                        icon={<FileContent />}
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
                        if (åpenBehandling.status === RessursStatus.SUKSESS) {
                            const harRegistrertSøknad =
                                hentStegNummer(åpenBehandling.data.steg) >
                                hentStegNummer(BehandlingSteg.REGISTRERE_SØKNAD);
                            settNavigerTilOpplysningsplikt(
                                harRegistrertSøknad &&
                                    skjema.felter.brevmal.verdi === Brevmal.INNHENTE_OPPLYSNINGER
                            );
                            onSubmit<IManueltBrevRequestPåBehandling>(
                                {
                                    method: 'POST',
                                    data: hentSkjemaData(),
                                    url: `/familie-ba-sak/api/dokument/send-brev/${åpenBehandling.data.behandlingId}`,
                                },
                                (ressurs: Ressurs<IBehandling>) => {
                                    onSubmitSuccess();
                                    settÅpenBehandling(ressurs);
                                    hentLogg();
                                }
                            );
                        }
                    }}
                >
                    Send brev
                </Button>
            </Knapperekke>
        </div>
    );
};

export default Brevskjema;
