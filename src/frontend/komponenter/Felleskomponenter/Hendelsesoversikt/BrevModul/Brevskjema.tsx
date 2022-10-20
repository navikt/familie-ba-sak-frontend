import * as React from 'react';
import { useEffect, useState } from 'react';

import styled from 'styled-components';

import navFarger from 'nav-frontend-core';
import { Knapp } from 'nav-frontend-knapper';
import { Label, SkjemaGruppe } from 'nav-frontend-skjema';

import { Tag } from '@navikt/ds-react';
import {
    FamilieInput,
    FamilieReactSelect,
    FamilieSelect,
    FamilieTextarea,
} from '@navikt/familie-form-elements';
import type { FeltState } from '@navikt/familie-skjema';
import type { Ressurs } from '@navikt/familie-typer';
import { RessursStatus } from '@navikt/familie-typer';

import { useBehandling } from '../../../../context/behandlingContext/BehandlingContext';
import { useBrevModul } from '../../../../context/BrevModulContext';
import useDokument from '../../../../hooks/useDokument';
import { DokumentIkon } from '../../../../ikoner/DokumentIkon';
import Pluss from '../../../../ikoner/Pluss';
import Slett from '../../../../ikoner/Slett';
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
import DeltBostedSkjema from '../../../Fagsak/Dokumentutsending/DeltBosted/DeltBostedSkjema';
import { useSamhandlerRequest } from '../../../Fagsak/InstitusjonOgVerge/useSamhandler';
import IkonKnapp, { IkonPosisjon } from '../../IkonKnapp/IkonKnapp';
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

const StyledFamilieFritekstFelt = styled.div`
    display: flex;

    .textarea__container {
        width: 100% !important;
    }
`;

const FamilieTextareaBegrunnelseFritekst = styled(FamilieTextarea)`
    .skjemaelement {
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
    }
`;

const SletteKnapp = styled(IkonKnapp)`
    margin-left: 0.5rem;
    height: 2.75rem;
`;

const StyledTag = styled(Tag)`
    background-color: ${navFarger.navLysGra};
    border-color: ${navFarger.navGra60};
`;

const LabelOgEtikett = styled.div`
    display: flex;
    justify-content: space-between;
`;

const FritekstWrapper = styled.div`
    margin-bottom: 1rem;
`;

const Brevskjema = ({ onSubmitSuccess }: IProps) => {
    const { åpenBehandling, settÅpenBehandling, erLesevisning, hentLogg } = useBehandling();
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
                <FamilieSelect
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
                </FamilieSelect>
                <FamilieSelect
                    {...skjema.felter.brevmal.hentNavInputProps(skjema.visFeilmeldinger)}
                    label={'Velg brevmal'}
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
                </FamilieSelect>

                {skjema.felter.dokumenter.erSynlig && (
                    <FamilieReactSelect
                        {...skjema.felter.dokumenter.hentNavInputProps(skjema.visFeilmeldinger)}
                        label={
                            <LabelOgEtikett>
                                <Label
                                    htmlFor={
                                        skjema.felter.dokumenter.hentNavInputProps(
                                            skjema.visFeilmeldinger
                                        ).id
                                    }
                                >
                                    Velg dokumenter
                                </Label>
                                <StyledTag variant="info" size="small">
                                    Skriv {målform[mottakersMålform()].toLowerCase()}
                                </StyledTag>
                            </LabelOgEtikett>
                        }
                        creatable={false}
                        erLesevisning={erLesevisning()}
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
                        {erLesevisning() ? (
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
                                                    <SkjultLegend>{`Kulepunkt ${fritekstId}`}</SkjultLegend>
                                                    <FamilieTextareaBegrunnelseFritekst
                                                        erLesevisning={false}
                                                        key={`fritekst-${fritekstId}`}
                                                        id={`${fritekstId}`}
                                                        textareaClass={'fritekst-textarea'}
                                                        value={fritekst.verdi.tekst}
                                                        maxLength={makslengdeFritekst}
                                                        onChange={event =>
                                                            onChangeFritekst(event, fritekstId)
                                                        }
                                                        feil={
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
                                                        <SletteKnapp
                                                            erLesevisning={false}
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
                                                            mini={true}
                                                            label={'Fjern'}
                                                            aria-label={'Fjern fritekst'}
                                                            ikon={<Slett />}
                                                        />
                                                    )}
                                                </StyledFamilieFritekstFelt>
                                            );
                                        }
                                    )}
                                </SkjemaGruppe>

                                {!erMaksAntallKulepunkter && (
                                    <IkonKnapp
                                        erLesevisning={erLesevisning()}
                                        onClick={() => leggTilFritekst()}
                                        id={`legg-til-fritekst`}
                                        ikon={<Pluss />}
                                        ikonPosisjon={IkonPosisjon.VENSTRE}
                                        label={'Legg til kulepunkt'}
                                        mini={true}
                                    />
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
                        label={'Samboer fra'}
                        valgtDato={skjema.felter.datoAvtale.verdi}
                        placeholder={'DD.MM.ÅÅÅÅ'}
                        {...skjema.felter.datoAvtale.hentNavInputProps(skjema.visFeilmeldinger)}
                    />
                )}
                {skjema.felter.brevmal.verdi &&
                    [
                        Brevmal.FORLENGET_SVARTIDSBREV,
                        Brevmal.FORLENGET_SVARTIDSBREV_INSTITUSJON,
                    ].includes(skjema.felter.brevmal.verdi) && (
                        <FamilieInput
                            {...skjema.felter.antallUkerSvarfrist.hentNavInputProps(
                                skjema.visFeilmeldinger
                            )}
                            label={'Antall uker svarfrist'}
                            bredde={'S'}
                        />
                    )}
            </SkjemaGruppe>
            <Knapperekke>
                <IkonKnapp
                    id={'forhandsvis-vedtaksbrev'}
                    erLesevisning={erLesevisning()}
                    label={'Forhåndsvis'}
                    ikonPosisjon={IkonPosisjon.VENSTRE}
                    ikon={<DokumentIkon />}
                    mini={true}
                    spinner={hentetDokument.status === RessursStatus.HENTER}
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
                />
                <Knapp
                    mini
                    spinner={skjema.submitRessurs.status === RessursStatus.HENTER}
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
                </Knapp>
            </Knapperekke>
        </div>
    );
};

export default Brevskjema;
