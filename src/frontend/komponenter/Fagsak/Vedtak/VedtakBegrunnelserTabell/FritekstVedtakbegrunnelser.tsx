import React, { useEffect } from 'react';

import styled from 'styled-components';

import navFarger from 'nav-frontend-core';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import { Element } from 'nav-frontend-typografi';

import { FamilieKnapp, FamilieTextareaControlled } from '@navikt/familie-form-elements';

import { useBehandling } from '../../../../context/BehandlingContext';
import {
    Fritekster,
    FritekstSubmit,
    useFritekstVedtakBegrunnelser,
} from '../../../../context/FritekstVedtakBegrunnelserContext';
import Pluss from '../../../../ikoner/Pluss';
import Slett from '../../../../ikoner/Slett';
import { Vedtaksperiode } from '../../../../typer/vedtaksperiode';
import { fjernElementMedNøkkel } from '../../../../utils/commons';
import IkonKnapp from '../../../Felleskomponenter/IkonKnapp/IkonKnapp';
import SkjultLegend from '../../../Felleskomponenter/SkjultLegend';

interface IProps {
    vedtaksperiode: Vedtaksperiode;
}

const FamilieTextareaBegrunnelseFritekst = styled(FamilieTextareaControlled)`
    .skjemaelement {
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
    }
`;

const StyledSkjemaGruppe = styled(SkjemaGruppe)`
    background-color: ${navFarger.navGraBakgrunn};
    padding-left: 1rem;
    padding-right: 0rem;
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
        <StyledSkjemaGruppe>
            <SkjultLegend>Fritekst til kulepunkt i brev</SkjultLegend>
            {harFritekster && (
                <StyledElement>Fritekst til kulepunkt i brev (valgfri)</StyledElement>
            )}
            {Object.keys(redigerbarefritekster).map((fritekstId: string) => {
                return (
                    <StyledFamilieFritekstFelt>
                        <SkjultLegend>{`Kulepunkt ${fritekstId}`}</SkjultLegend>
                        <FamilieTextareaBegrunnelseFritekst
                            erLesevisning={erLesevisning()}
                            defaultValue={redigerbarefritekster[fritekstId].verdi}
                            key={`fritekst-${fritekstId}`}
                            id={`${fritekstId}`}
                            textareaClass={'fritekst-textarea'}
                            value={redigerbarefritekster[fritekstId].verdi}
                            maxLength={300}
                            onBlur={(event: React.FocusEvent<HTMLTextAreaElement>) => {
                                settRedigerbarefritekster({
                                    ...redigerbarefritekster,
                                    [fritekstId]: redigerbarefritekster[fritekstId].valider({
                                        ...redigerbarefritekster[fritekstId],
                                        verdi: event.target.value,
                                    }),
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
            {harFritekster && (
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
            )}
        </StyledSkjemaGruppe>
    );
};

export default FritekstVedtakbegrunnelser;
