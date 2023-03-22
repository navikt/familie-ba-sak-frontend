import React from 'react';

import styled from 'styled-components';

import { AddCircle, Delete } from '@navikt/ds-icons';
import { Button, Fieldset } from '@navikt/ds-react';
import { FamilieTextarea } from '@navikt/familie-form-elements';
import type { FeltState } from '@navikt/familie-skjema';

import { useDokumentutsending } from '../../../../context/DokumentutsendingContext';
import type { IFritekstFelt } from '../../../../utils/fritekstfelter';
import {
    genererIdBasertPåAndreFritekster,
    lagInitiellFritekst,
} from '../../../../utils/fritekstfelter';
import { hentFrontendFeilmelding } from '../../../../utils/ressursUtils';

const StyledFamilieFritekstFelt = styled.div`
    display: flex;
    align-items: center;
`;

const FamilieTextareaBegrunnelseFritekst = styled(FamilieTextarea)`
    display: flex;
    margin-bottom: 0.5rem;
    flex: auto;
`;

const SletteKnapp = styled(Button)`
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
            <Fieldset
                id={skjemaGruppeId}
                error={skjema.visFeilmeldinger && hentFrontendFeilmelding(skjema.submitRessurs)}
                legend="Fritekst til kulepunkt i brev"
            >
                {friteksterFelt.verdi.map((fritekst: FeltState<IFritekstFelt>) => {
                    const fritekstId = fritekst.verdi.id;

                    return (
                        <StyledFamilieFritekstFelt key={`fritekst-${fritekstId}`}>
                            <FamilieTextareaBegrunnelseFritekst
                                erLesevisning={false}
                                key={`fritekst-${fritekstId}`}
                                id={`${fritekstId}`}
                                className={'fritekst-textarea'}
                                value={fritekst.verdi.tekst}
                                label={`Kulepunkt ${fritekstId}`}
                                hideLabel={true}
                                maxLength={makslengdeFritekst}
                                onChange={event => onChangeFritekst(event, fritekstId)}
                                error={skjema.visFeilmeldinger && fritekst.feilmelding}
                                /* eslint-disable-next-line jsx-a11y/no-autofocus */
                                autoFocus
                            />

                            <SletteKnapp
                                variant={'tertiary'}
                                onClick={() => {
                                    friteksterFelt.validerOgSettFelt([
                                        ...friteksterFelt.verdi.filter(
                                            mapFritekst =>
                                                mapFritekst.verdi.id !== fritekst.verdi.id
                                        ),
                                    ]);
                                }}
                                id={`fjern_fritekst-${fritekstId}`}
                                size={'small'}
                                aria-label={'Fjern fritekst'}
                                icon={<Delete />}
                            >
                                {'Fjern'}
                            </SletteKnapp>
                        </StyledFamilieFritekstFelt>
                    );
                })}
            </Fieldset>

            {!erMaksAntallKulepunkter && (
                <Button
                    variant={'tertiary'}
                    onClick={leggTilFritekst}
                    id={`legg-til-fritekst`}
                    size={'small'}
                    icon={<AddCircle />}
                >
                    {'Legg til fritekst'}
                </Button>
            )}
        </>
    );
};

export default KanSøkeFritekst;
