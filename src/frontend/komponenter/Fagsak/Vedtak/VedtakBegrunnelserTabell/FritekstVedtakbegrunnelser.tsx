import React, { useEffect } from 'react';

import styled from 'styled-components';

import navFarger from 'nav-frontend-core';
import { EtikettInfo } from 'nav-frontend-etiketter';
import Lenke from 'nav-frontend-lenker';
import { PopoverOrientering } from 'nav-frontend-popover';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import { Element } from 'nav-frontend-typografi';

import { FamilieKnapp, FamilieTextarea } from '@navikt/familie-form-elements';

import { useBehandling } from '../../../../context/BehandlingContext';
import {
    Fritekster,
    FritekstSubmit,
    useFritekstVedtakBegrunnelser,
} from '../../../../context/FritekstVedtakBegrunnelserContext';
import Pluss from '../../../../ikoner/Pluss';
import Slett from '../../../../ikoner/Slett';
import { målform } from '../../../../typer/søknad';
import { Vedtaksperiode } from '../../../../typer/vedtaksperiode';
import { fjernElementMedNøkkel } from '../../../../utils/commons';
import IkonKnapp from '../../../Felleskomponenter/IkonKnapp/IkonKnapp';
import SkjultLegend from '../../../Felleskomponenter/SkjultLegend';
import Hjelpetekst44px from './Felles/Hjelpetekst44px';

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
`;

const StyledFamilieFritekstFelt = styled.div`
    display: flex;
    margin-top: 0.2rem;
    margin-bottom: 0.2rem;

    .textarea__container {
        width: 100% !important;
    }
`;

const StyledElement = styled(Element)`
    margin-bottom: 0.8rem;
`;

const StyledEtikettInfo = styled(EtikettInfo)`
    float: right;
    background-color: ${navFarger.navLysGra};
    border-color: ${navFarger.navGra60};
`;

const UtførKnapp = styled(IkonKnapp)`
    margin-top: 0rem;
`;

const SletteKnapp = styled(IkonKnapp)`
    margin-top: 0rem;
    margin-right: 0rem;
`;

const Knapperad = styled.div`
    display: grid;
    column-gap: 1rem;
    grid-template-columns: 5rem 5rem;
    margin-top: 1.5rem;
`;

const StyledHjelpetekst44px = styled(Hjelpetekst44px)`
    .popover {
        max-width: 18rem;
        text-align: left;
    }
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
                    <StyledElement>
                        Fritekst til kulepunkt i brev (valgfri)
                        <StyledHjelpetekst44px
                            type={PopoverOrientering.Hoyre}
                            innhold={
                                <div>
                                    Brev som sendes ut bør være så kortfattede og presise som mulig.
                                    <br />
                                    <Lenke href="https://navno.sharepoint.com/sites/intranett-kommunikasjon/SitePages/Spr%C3%A5k.aspx">
                                        Se retningslinjer for klarspråk.
                                    </Lenke>
                                    <p />
                                    <b>Eksempler på formulering:</b>
                                    <br />
                                    ”Barnevernet har bekreftet at de overtok omsorgen for barnet 15.
                                    barnet 15. mars 2021” “Opplysningene fra Folkeregisteret viser
                                    at barnet ikke bor sammen med deg”
                                </div>
                            }
                        />
                        <StyledEtikettInfo mini={true}>
                            {målform[søkersMålform()]}
                        </StyledEtikettInfo>
                    </StyledElement>
                    {Object.keys(redigerbarefritekster).map((fritekstId: string) => {
                        return (
                            <StyledFamilieFritekstFelt>
                                <SkjultLegend>{`Kulepunkt ${fritekstId}`}</SkjultLegend>
                                <FamilieTextareaBegrunnelseFritekst
                                    feil={feilMelding[fritekstId]}
                                    erLesevisning={erLesevisning()}
                                    defaultValue={redigerbarefritekster[fritekstId].verdi}
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
                <SkjemaGruppe style={{ padding: '1rem' }}>
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
