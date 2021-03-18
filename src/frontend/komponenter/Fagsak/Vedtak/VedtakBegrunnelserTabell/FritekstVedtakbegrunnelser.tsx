import React, { useEffect } from 'react';

import styled from 'styled-components';

import navFarger from 'nav-frontend-core';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import { Element } from 'nav-frontend-typografi';

import { FamilieKnapp, FamilieTextareaControlled } from '@navikt/familie-form-elements';

import { useBehandling } from '../../../../context/BehandlingContext';
import Pluss from '../../../../ikoner/Pluss';
import Slett from '../../../../ikoner/Slett';
import { Vedtaksperiode } from '../../../../typer/vedtaksperiode';
import IkonKnapp from '../../../Felleskomponenter/IkonKnapp/IkonKnapp';
import useFritekstVedtakBegrunnelser from './useFritekstVedtakBegrunnelser';

interface IProps {
    vedtaksperiode: Vedtaksperiode;
    toggleForm: (visAlert: boolean) => void;
}

const FamilieTextareaBegrunnelseFritekst = styled(FamilieTextareaControlled)`
    .skjemaelement {
        margin-top: 10px;
        margin-bottom: 10px;
    }
`;

const StyledSkjemaGruppe = styled(SkjemaGruppe)`
    background-color: ${navFarger.navGraBakgrunn};
    padding-left: 20px;
    padding-right: 0px;
`;

const StyledFamilieFritekstFelt = styled.div`
    display: flex;
    margin-top: 3px;
    margin-bottom: 3px;

    .textarea__container {
        width: 100% !important;
    }
`;

const StyledElement = styled(Element)`
    margin-bottom: 13px;
`;

const UtførKnapp = styled(IkonKnapp)`
    margin-top: 0px;
`;

const SletteKnapp = styled(IkonKnapp)`
    margin-top: 0px;
    margin-right: 0px;
`;

const Knapperad = styled.div`
    display: grid;
    column-gap: 1rem;
    grid-template-columns: 100px 100px;
    margin-top: 24px;
`;

const FritekstVedtakbegrunnelser: React.FC<IProps> = ({ vedtaksperiode, toggleForm }) => {
    const { erLesevisning } = useBehandling();
    const {
        redigerbarefritekster,
        settRedigerbarefritekster,
        leggTilRedigerbareFritekst,
        idPaSistOpprettetFritekst,
        onSubmit,
    } = useFritekstVedtakBegrunnelser(vedtaksperiode);
    const harFritekster = Object.keys(redigerbarefritekster).length > 0;

    useEffect(() => {
        const element = document.getElementById(`${idPaSistOpprettetFritekst}`);
        if (element) {
            element.focus();
        }
    }, [idPaSistOpprettetFritekst]);

    return (
        <StyledSkjemaGruppe>
            {harFritekster && (
                <StyledElement>Fritekst til kulepunkt i brev (valgfri)</StyledElement>
            )}
            {Object.keys(redigerbarefritekster).map((fritekstId: string, index) => {
                return (
                    <StyledFamilieFritekstFelt>
                        <FamilieTextareaBegrunnelseFritekst
                            tekstLesevisning={''}
                            erLesevisning={erLesevisning()}
                            defaultValue={redigerbarefritekster[fritekstId].verdi}
                            key={`__fritekst-${fritekstId}`}
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
                                delete redigerbarefritekster[fritekstId];
                                settRedigerbarefritekster({
                                    ...redigerbarefritekster,
                                });
                            }}
                            id={`__fjern_fritekst-${fritekstId}`}
                            mini={true}
                            label={''}
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
