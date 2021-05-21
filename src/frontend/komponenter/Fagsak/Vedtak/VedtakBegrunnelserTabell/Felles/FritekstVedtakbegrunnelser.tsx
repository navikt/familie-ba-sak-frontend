import React, { useEffect } from 'react';

import styled from 'styled-components';

import navFarger from 'nav-frontend-core';
import { EtikettInfo } from 'nav-frontend-etiketter';
import Lenke from 'nav-frontend-lenker';
import { PopoverOrientering } from 'nav-frontend-popover';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { Feilmelding } from 'nav-frontend-typografi';

import { FamilieKnapp, FamilieTextarea } from '@navikt/familie-form-elements';

import { useBehandling } from '../../../../../context/BehandlingContext';
import { EksternLenke } from '../../../../../ikoner/EksternLenke';
import Pluss from '../../../../../ikoner/Pluss';
import Slett from '../../../../../ikoner/Slett';
import { Fritekster } from '../../../../../typer/begrunnelser';
import { målform } from '../../../../../typer/søknad';
import { Vedtaksperiode } from '../../../../../typer/vedtaksperiode';
import { fjernElementMedNøkkel } from '../../../../../utils/commons';
import Hjelpetekst44px from '../../../../Felleskomponenter/Hjelpetekst44px';
import IkonKnapp from '../../../../Felleskomponenter/IkonKnapp/IkonKnapp';
import SkjultLegend from '../../../../Felleskomponenter/SkjultLegend';
import {
    FritekstSubmit,
    useFritekstVedtakBegrunnelser,
} from '../Context/FritekstVedtakBegrunnelserContext';

interface IProps {
    vedtaksperiode: Vedtaksperiode;
}

const FamilieTextareaBegrunnelseFritekst = styled(FamilieTextarea)`
    .skjemaelement {
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
    }
`;

const StyledSkjemaGruppe = styled(SkjemaGruppe)`
    background-color: ${navFarger.navGraBakgrunn};
    padding: 1rem;
    max-width: 50rem;
    margin-top: 1.25rem;
`;

const StyledFamilieFritekstFelt = styled.div`
    display: flex;
    margin-top: 0.2rem;
    margin-bottom: 0.2rem;

    .textarea__container {
        width: 100% !important;
    }
`;

const InfoBoks = styled.div`
    margin: 0 2.8rem 0 0;
    display: flex;
    align-items: center;
    text-align: center;
`;

const StyledEtikettInfo = styled(EtikettInfo)`
    margin-left: auto;
    background-color: ${navFarger.navLysGra};
    border-color: ${navFarger.navGra60};
`;

const UtførKnapp = styled(IkonKnapp)`
    margin-top: 0rem;
`;

const SletteKnapp = styled(IkonKnapp)`
    margin-top: 0rem;
    margin-right: 0rem;
    height: 2.75rem;
    width: 2.75rem;
    border-radius: 50%;

    &:hover {
        background-color: ${navFarger.navLysGra};
    }
`;

const Knapperad = styled.div`
    display: grid;
    column-gap: 1rem;
    grid-template-columns: 5rem 5rem;
    margin-top: 1.5rem;
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

const FritekstVedtakbegrunnelser: React.FC<IProps> = () => {
    const { erLesevisning } = useBehandling();
    const {
        fritekster,
        redigerbarefritekster,
        settRedigerbarefritekster,
        leggTilRedigerbareFritekst,
        idPåSistOpprettetFritekst,
        onSubmit,
        fritekstSubmit,
        toggleForm,
        feilMelding,
        settFeilMelding,
        søkersMålform,
    } = useFritekstVedtakBegrunnelser();

    const harFritekster =
        Object.keys(redigerbarefritekster).length > 0 || Object.keys(fritekster).length > 0;

    useEffect(() => {
        const element = document.getElementById(`${idPåSistOpprettetFritekst}`);
        if (element) {
            element.focus();
        }
    }, [idPåSistOpprettetFritekst]);

    return (
        <>
            {harFritekster ? (
                <StyledSkjemaGruppe>
                    <SkjultLegend>Fritekst til kulepunkt i brev</SkjultLegend>
                    <InfoBoks>
                        Fritekst til kulepunkt i brev (valgfri)
                        <StyledHjelpetekst44px
                            type={PopoverOrientering.OverVenstre}
                            innhold={
                                <div>
                                    <Normaltekst>
                                        Brev som sendes ut bør være så kortfattede og presise som
                                        mulig.{' '}
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
                                        Barnevernet har bekreftet at de overtok omsorgen for barnet
                                        mars 2021
                                    </ItalicText>
                                    <br />
                                    <ItalicText>
                                        Opplysningene fra Folkeregisteret viser at barnet ikke bor
                                        sammen med deg
                                    </ItalicText>
                                </div>
                            }
                        />
                        <StyledEtikettInfo mini={true}>
                            Skriv {målform[søkersMålform()]}
                        </StyledEtikettInfo>
                    </InfoBoks>
                    {Object.keys(redigerbarefritekster).map((fritekstId: string) => {
                        return (
                            <StyledFamilieFritekstFelt key={`fritekst-${fritekstId}`}>
                                <SkjultLegend>{`Kulepunkt ${fritekstId}`}</SkjultLegend>
                                <FamilieTextareaBegrunnelseFritekst
                                    feil={feilMelding[fritekstId]}
                                    erLesevisning={erLesevisning()}
                                    key={`fritekst-${fritekstId}`}
                                    id={`${fritekstId}`}
                                    textareaClass={'fritekst-textarea'}
                                    value={redigerbarefritekster[fritekstId].verdi}
                                    maxLength={220}
                                    onChange={(event: React.FocusEvent<HTMLTextAreaElement>) => {
                                        if (event.target.value.length > 220) {
                                            settFeilMelding({
                                                ...feilMelding,
                                                [fritekstId]: 'Du har nådd maks antall tegn: 220',
                                            });

                                            return;
                                        }
                                        settFeilMelding({});

                                        settRedigerbarefritekster({
                                            ...redigerbarefritekster,
                                            [fritekstId]: redigerbarefritekster[fritekstId].valider(
                                                {
                                                    ...redigerbarefritekster[fritekstId],
                                                    verdi: event.target.value,
                                                }
                                            ),
                                        });
                                    }}
                                />
                                <SletteKnapp
                                    erLesevisning={erLesevisning()}
                                    onClick={() => {
                                        settRedigerbarefritekster(
                                            fjernElementMedNøkkel(
                                                redigerbarefritekster,
                                                fritekstId
                                            ) as Fritekster
                                        );
                                    }}
                                    id={`fjern_fritekst-${fritekstId}`}
                                    mini={true}
                                    label={''}
                                    aria-label={'Slett fritekst'}
                                    ikon={<Slett />}
                                />
                            </StyledFamilieFritekstFelt>
                        );
                    })}
                    <UtførKnapp
                        erLesevisning={erLesevisning()}
                        onClick={leggTilRedigerbareFritekst}
                        id={`legg-til-fritekst`}
                        ikon={<Pluss />}
                        knappPosisjon={'venstre'}
                        label={'Legg til fritekst'}
                        mini={true}
                    />
                    <Feilmelding style={{ paddingLeft: '0rem' }}>
                        {feilMelding[`legg-til-fritekst`] ?? ''}
                    </Feilmelding>
                    <Knapperad>
                        <FamilieKnapp
                            erLesevisning={erLesevisning()}
                            onClick={() => {
                                onSubmit();
                                toggleForm(false);
                            }}
                            mini={true}
                            type={'standard'}
                            spinner={fritekstSubmit === FritekstSubmit.POST}
                            disabled={fritekstSubmit === FritekstSubmit.POST}
                        >
                            Lagre
                        </FamilieKnapp>
                        <FamilieKnapp
                            erLesevisning={erLesevisning()}
                            onClick={() => {
                                toggleForm(false);
                            }}
                            mini={true}
                            type={'flat'}
                        >
                            Avbryt
                        </FamilieKnapp>
                    </Knapperad>
                </StyledSkjemaGruppe>
            ) : (
                <SkjemaGruppe>
                    <SkjultLegend>Legg til fritekst til kulepunkt i brev</SkjultLegend>
                    <UtførKnapp
                        erLesevisning={erLesevisning()}
                        onClick={leggTilRedigerbareFritekst}
                        id={`legg-til-fritekst`}
                        ikon={<Pluss />}
                        knappPosisjon={'venstre'}
                        label={'Legg til fritekst'}
                        mini={true}
                    />
                </SkjemaGruppe>
            )}
        </>
    );
};

export default FritekstVedtakbegrunnelser;
