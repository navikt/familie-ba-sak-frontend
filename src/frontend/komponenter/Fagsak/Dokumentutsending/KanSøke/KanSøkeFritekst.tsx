import React from 'react';

import styled from 'styled-components';

import { Label, SkjemaGruppe } from 'nav-frontend-skjema';

import { FamilieTextarea } from '@navikt/familie-form-elements';
import type { FeltState } from '@navikt/familie-skjema';

import { useDokumentutsending } from '../../../../context/DokumentutsendingContext';
import Pluss from '../../../../ikoner/Pluss';
import Slett from '../../../../ikoner/Slett';
import type { IFritekstFelt } from '../../../../utils/fritekstfelter';
import {
    genererIdBasertPåAndreFritekster,
    lagInitiellFritekst,
} from '../../../../utils/fritekstfelter';
import { hentFrontendFeilmelding } from '../../../../utils/ressursUtils';
import IkonKnapp, { IkonPosisjon } from '../../../Felleskomponenter/IkonKnapp/IkonKnapp';
import SkjultLegend from '../../../Felleskomponenter/SkjultLegend';

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

const KanSøkeFritekst = ({
    erMaksAntallKulepunkter,
    makslengdeFritekst,
}: {
    erMaksAntallKulepunkter: boolean;
    makslengdeFritekst: number;
}) => {
    const skjemaGruppeId = 'Fritekster-brev';
    const { skjema } = useDokumentutsending();
    const friteksterFelt = skjema.felter.fritekster;

    const leggTilFritekst = () => {
        friteksterFelt.validerOgSettFelt([
            ...friteksterFelt.verdi,
            lagInitiellFritekst('', genererIdBasertPåAndreFritekster(friteksterFelt)),
        ]);
    };

    const onChangeFritekst = (event: React.ChangeEvent<HTMLTextAreaElement>, fritekstId: number) =>
        friteksterFelt.validerOgSettFelt([
            ...friteksterFelt.verdi.map(mapFritekst => {
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
        <>
            <Label htmlFor={skjemaGruppeId}>Fritekst til kulepunkt i brev</Label>
            <>
                <SkjemaGruppe
                    id={skjemaGruppeId}
                    feil={skjema.visFeilmeldinger && hentFrontendFeilmelding(skjema.submitRessurs)}
                >
                    {friteksterFelt.verdi.map((fritekst: FeltState<IFritekstFelt>) => {
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
                                    /* eslint-disable-next-line jsx-a11y/no-autofocus */
                                    autoFocus
                                />

                                <SletteKnapp
                                    erLesevisning={false}
                                    onClick={() => {
                                        friteksterFelt.validerOgSettFelt([
                                            ...friteksterFelt.verdi.filter(
                                                mapFritekst =>
                                                    mapFritekst.verdi.id !== fritekst.verdi.id
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
                    })}
                </SkjemaGruppe>

                {!erMaksAntallKulepunkter && (
                    <IkonKnapp
                        onClick={leggTilFritekst}
                        id={`legg-til-fritekst`}
                        ikon={<Pluss />}
                        ikonPosisjon={IkonPosisjon.VENSTRE}
                        label={'Legg til fritekst'}
                        mini={true}
                        erLesevisning={false}
                    />
                )}
            </>
        </>
    );
};

export default KanSøkeFritekst;
