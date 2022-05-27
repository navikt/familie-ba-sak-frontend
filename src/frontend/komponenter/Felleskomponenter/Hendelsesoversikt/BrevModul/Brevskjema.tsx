import * as React from 'react';
import { useEffect, useState } from 'react';

import styled from 'styled-components';

import navFarger from 'nav-frontend-core';
import { EtikettInfo } from 'nav-frontend-etiketter';
import { Knapp } from 'nav-frontend-knapper';
import { Label, SkjemaGruppe } from 'nav-frontend-skjema';

import { FamilieReactSelect, FamilieSelect, FamilieTextarea } from '@navikt/familie-form-elements';
import type { FeltState } from '@navikt/familie-skjema';
import { RessursStatus } from '@navikt/familie-typer';
import type { Ressurs } from '@navikt/familie-typer';

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
import { målform } from '../../../../typer/søknad';
import { formaterIdent } from '../../../../utils/formatter';
import type { IFritekstFelt } from '../../../../utils/fritekstfelter';
import { hentFrontendFeilmelding } from '../../../../utils/ressursUtils';
import { FamilieDatovelgerWrapper } from '../../../../utils/skjema/FamilieDatovelgerWrapper';
import DeltBostedSkjema from '../../../Fagsak/Dokumentutsending/DeltBosted/DeltBostedSkjema';
import IkonKnapp, { IkonPosisjon } from '../../IkonKnapp/IkonKnapp';
import Knapperekke from '../../Knapperekke';
import PdfVisningModal from '../../PdfVisningModal/PdfVisningModal';
import SkjultLegend from '../../SkjultLegend';
import type { BrevtypeSelect, ISelectOptionMedBrevtekst } from './typer';
import { Brevmal, brevmaler, leggTilValuePåOption, opplysningsdokumenter } from './typer';

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

const StyledEtikettInfo = styled(EtikettInfo)`
    background-color: ${navFarger.navLysGra};
    border-color: ${navFarger.navGra60};
`;

const LabelOgEtikett = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Brevskjema = ({ onSubmitSuccess }: IProps) => {
    const { åpenBehandling, settÅpenBehandling, erLesevisning, hentLogg } = useBehandling();
    const { hentForhåndsvisning, hentetDokument } = useDokument();

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

    const erFørsteKulepunktIRevurderingsBrev = (index: number) =>
        index === 0 &&
        [
            Brevmal.VARSEL_OM_REVURDERING,
            Brevmal.VARSEL_OM_REVURDERING_FRA_NASJONAL_TIL_EØS,
        ].includes(skjema.felter.brevmal.verdi as Brevmal);

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
                                    {formaterIdent(person.personIdent)}
                                </option>
                            );
                        })}
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
                                    'Velg dokumenter'
                                </Label>
                                <StyledEtikettInfo mini={true}>
                                    Skriv {målform[mottakersMålform()].toLowerCase()}
                                </StyledEtikettInfo>
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
                        options={opplysningsdokumenter.map(leggTilValuePåOption)}
                    />
                )}
                {skjema.felter.fritekster.erSynlig && (
                    <>
                        <Label htmlFor={skjemaGruppeId}>Fritekst til kulepunkt i brev</Label>
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
                                                    {!erFørsteKulepunktIRevurderingsBrev(index) && (
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
                                        onClick={leggTilFritekst}
                                        id={`legg-til-fritekst`}
                                        ikon={<Pluss />}
                                        ikonPosisjon={IkonPosisjon.VENSTRE}
                                        label={'Legg til fritekst'}
                                        mini={true}
                                    />
                                )}
                            </>
                        )}
                    </>
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
