import React from 'react';

import styled from 'styled-components';

import navFarger from 'nav-frontend-core';
import { EtikettInfo } from 'nav-frontend-etiketter';
import Lenke from 'nav-frontend-lenker';
import { PopoverOrientering } from 'nav-frontend-popover';
import { Label, SkjemaGruppe } from 'nav-frontend-skjema';
import { Element, Normaltekst } from 'nav-frontend-typografi';

import { FamilieKnapp, FamilieTextarea } from '@navikt/familie-form-elements';
import { FeltState } from '@navikt/familie-skjema';
import { RessursStatus } from '@navikt/familie-typer';

import { useBehandling } from '../../../../../context/BehandlingContext';
import { EksternLenke } from '../../../../../ikoner/EksternLenke';
import Pluss from '../../../../../ikoner/Pluss';
import Slett from '../../../../../ikoner/Slett';
import { målform } from '../../../../../typer/søknad';
import { hentFrontendFeilmelding } from '../../../../../utils/ressursUtils';
import Hjelpetekst44px from '../../../../Felleskomponenter/Hjelpetekst44px';
import IkonKnapp from '../../../../Felleskomponenter/IkonKnapp/IkonKnapp';
import Knapperekke from '../../../../Felleskomponenter/Knapperekke';
import SkjultLegend from '../../../../Felleskomponenter/SkjultLegend';
import {
    IFritekstFelt,
    useVedtaksperiodeMedBegrunnelser,
} from '../Context/VedtaksperiodeMedBegrunnelserContext';

const FritekstContainer = styled.div`
    background-color: ${navFarger.navGraBakgrunn};
    padding: 1rem;
`;

const FamilieTextareaBegrunnelseFritekst = styled(FamilieTextarea)`
    .skjemaelement {
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
    }
`;

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

const StyledLabel = styled(Label)`
    margin-bottom: 0;
`;

const InfoBoks = styled.div`
    margin-right: 5.6875rem;
    display: flex;
    align-items: center;
    text-align: center;
`;

const StyledEtikettInfo = styled(EtikettInfo)`
    margin-left: auto;
    background-color: ${navFarger.navLysGra};
    border-color: ${navFarger.navGra60};
`;

const SletteKnapp = styled(IkonKnapp)`
    margin-left: 0.5rem;
    height: 2.75rem;
`;

const StyledHjelpetekst44px = styled(Hjelpetekst44px)`
    .popover {
        max-width: 25rem;
        text-align: left;
    }
`;

const ItalicText = styled(Normaltekst)`
    font-style: italic;
`;

const FritekstVedtakbegrunnelser: React.FC = () => {
    const { erLesevisning, søkersMålform } = useBehandling();
    const {
        skjema,
        leggTilFritekst,
        id,
        makslengdeFritekst,
        maksAntallKulepunkter,
        onPanelClose,
        putVedtaksperiodeMedFritekster,
        vedtaksperiodeMedBegrunnelser,
    } = useVedtaksperiodeMedBegrunnelser();

    const erMaksAntallKulepunkter = skjema.felter.fritekster.verdi.length >= maksAntallKulepunkter;

    const skjemaGruppeId = `Fritekster ${id}`;

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

    return vedtaksperiodeMedBegrunnelser.fritekster.length > 0 ||
        skjema.felter.fritekster.verdi.length > 0 ? (
        <FritekstContainer>
            <SkjultLegend>Fritekst til kulepunkt i brev</SkjultLegend>
            <InfoBoks>
                <StyledLabel htmlFor={skjemaGruppeId}>Fritekst til kulepunkt i brev</StyledLabel>
                <StyledHjelpetekst44px
                    type={PopoverOrientering.OverVenstre}
                    innhold={
                        <div>
                            <Normaltekst>
                                Brev som sendes ut bør være så kortfattede og presise som mulig.{' '}
                                <Lenke
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href="https://navno.sharepoint.com/sites/intranett-kommunikasjon/SitePages/Spr%C3%A5k.aspx"
                                >
                                    Se retningslinjer for klarspråk.
                                    <EksternLenke />
                                </Lenke>
                            </Normaltekst>
                            <br />
                            <Element>Eksempler på formulering:</Element>
                            <ItalicText>
                                Barnevernet har bekreftet at de overtok omsorgen for barnet mars
                                2021
                            </ItalicText>
                            <br />
                            <ItalicText>
                                Opplysningene fra Folkeregisteret viser at barnet ikke bor sammen
                                med deg
                            </ItalicText>
                        </div>
                    }
                />
                <StyledEtikettInfo mini={true}>Skriv {målform[søkersMålform]}</StyledEtikettInfo>
            </InfoBoks>

            {erLesevisning() ? (
                <StyledList id={skjemaGruppeId}>
                    {skjema.felter.fritekster.verdi.map((fritekst: FeltState<IFritekstFelt>) => (
                        <li>{fritekst.verdi.tekst}</li>
                    ))}
                </StyledList>
            ) : (
                <>
                    <SkjemaGruppe
                        id={skjemaGruppeId}
                        feil={
                            skjema.visFeilmeldinger && hentFrontendFeilmelding(skjema.submitRessurs)
                        }
                    >
                        {skjema.felter.fritekster.verdi.map(
                            (fritekst: FeltState<IFritekstFelt>) => {
                                const fritekstId = fritekst.verdi.id;

                                return (
                                    <StyledFamilieFritekstFelt key={`fritekst-${fritekstId}`}>
                                        <SkjultLegend>{`Kulepunkt ${fritekstId}`}</SkjultLegend>
                                        <FamilieTextareaBegrunnelseFritekst
                                            erLesevisning={false}
                                            key={`fritekst-${fritekstId}`}
                                            id={`${fritekstId}`}
                                            textareaClass={'fritekst-textarea'}
                                            value={fritekst.verdi.tekst}
                                            maxLength={makslengdeFritekst}
                                            onChange={event => onChangeFritekst(event, fritekstId)}
                                            feil={skjema.visFeilmeldinger && fritekst.feilmelding}
                                        />
                                        <SletteKnapp
                                            erLesevisning={false}
                                            onClick={() => {
                                                skjema.felter.fritekster.validerOgSettFelt([
                                                    ...skjema.felter.fritekster.verdi.filter(
                                                        mapFritekst =>
                                                            mapFritekst.verdi.id !==
                                                            fritekst.verdi.id
                                                    ),
                                                ]);
                                            }}
                                            id={`fjern_fritekst-${fritekstId}`}
                                            mini={true}
                                            label={'Fjern'}
                                            aria-label={'Fjern fritekst'}
                                            ikon={<Slett />}
                                        />
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
                            knappPosisjon={'venstre'}
                            label={'Legg til fritekst'}
                            mini={true}
                        />
                    )}
                    <Knapperekke>
                        <FamilieKnapp
                            erLesevisning={erLesevisning()}
                            onClick={() => {
                                putVedtaksperiodeMedFritekster();
                            }}
                            mini={true}
                            type={'standard'}
                            spinner={skjema.submitRessurs.status === RessursStatus.HENTER}
                            disabled={skjema.submitRessurs.status === RessursStatus.HENTER}
                        >
                            Lagre
                        </FamilieKnapp>
                        <FamilieKnapp
                            erLesevisning={erLesevisning()}
                            onClick={() => {
                                onPanelClose(false);
                            }}
                            mini={true}
                            type={'flat'}
                        >
                            Avbryt
                        </FamilieKnapp>
                    </Knapperekke>
                </>
            )}
        </FritekstContainer>
    ) : (
        <IkonKnapp
            erLesevisning={erLesevisning()}
            onClick={leggTilFritekst}
            id={`legg-til-fritekst`}
            ikon={<Pluss />}
            knappPosisjon={'venstre'}
            label={'Legg til fritekst'}
            mini={true}
        />
    );
};

export default FritekstVedtakbegrunnelser;
