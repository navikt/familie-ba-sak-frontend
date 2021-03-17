import React from 'react';

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
`;

const StyledFamilieFritekstFelt = styled.div`
    display: grid;
    grid-template-columns: 20fr 1fr;
    margin-top: 3px;
    margin-bottom: 3px;
`;

const StyledElement = styled(Element)`
    margin-bottom: 13px;
`;

const UtførKnapp = styled(IkonKnapp)`
    margin-top: 0px;
`;

const SletteKnapp = styled(IkonKnapp)`
    margin-top: 0px;
    margin-right: 20px;
`;

const Knapperad = styled.div`
    display: grid;
    grid-template-columns: 100px 100px;
    margin-top: 24px;
`;

const FritekstVedtakbegrunnelser: React.FC<IProps> = ({ vedtaksperiode, toggleForm }) => {
    const { erLesevisning } = useBehandling();
    const {
        persiterteFritekster,
        fritekster,
        settFritekster,
        settPersiterteFritekster,
        leggTilFritekst,
        onSubmit,
    } = useFritekstVedtakBegrunnelser(vedtaksperiode);
    const harFritekster = Object.keys(fritekster).length > 0;

    return (
        <StyledSkjemaGruppe>
            {harFritekster && (
                <StyledElement>Fritekst til kulepunkt i brev (valgfri)</StyledElement>
            )}
            {Object.keys(fritekster).map((fritekstId: string, index) => {
                return (
                    <StyledFamilieFritekstFelt>
                        <FamilieTextareaBegrunnelseFritekst
                            tekstLesevisning={''}
                            erLesevisning={erLesevisning()}
                            defaultValue={fritekster[fritekstId].verdi}
                            key={`__fritekst-${fritekstId}`}
                            textareaClass={'fritekst-textarea'}
                            value={fritekster[fritekstId].verdi}
                            maxLength={300}
                            onBlur={(event: React.FocusEvent<HTMLTextAreaElement>) => {
                                settFritekster({
                                    ...fritekster,
                                    [fritekstId]: fritekster[fritekstId].valider({
                                        ...fritekster[fritekstId],
                                        verdi: event.target.value,
                                    }),
                                });
                            }}
                        />

                        <SletteKnapp
                            erLesevisning={erLesevisning()}
                            onClick={() => {
                                delete fritekster[fritekstId];
                                settFritekster({
                                    ...fritekster,
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
                onClick={leggTilFritekst}
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
                            settPersiterteFritekster({ ...fritekster });
                            toggleForm(true);
                        }}
                        mini={true}
                        type={'standard'}
                    >
                        Lagre
                    </FamilieKnapp>
                    <FamilieKnapp
                        erLesevisning={erLesevisning()}
                        onClick={() => {
                            settFritekster({ ...persiterteFritekster });
                            toggleForm(true);
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
