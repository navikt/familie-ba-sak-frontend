import React from 'react';

import styled from 'styled-components';

import { PlusCircleIcon, TrashIcon } from '@navikt/aksel-icons';
import { Button, Fieldset, Textarea } from '@navikt/ds-react';
import type { FeltState } from '@navikt/familie-skjema';

import type { IFritekstFelt } from '../../../../utils/fritekstfelter';
import {
    genererIdBasertPåAndreFritekstKulepunkter,
    lagInitiellFritekst,
} from '../../../../utils/fritekstfelter';
import { hentFrontendFeilmelding } from '../../../../utils/ressursUtils';
import { useDokumentutsendingContext } from '../DokumentutsendingContext';

const StyledFamilieFritekstFelt = styled.div`
    display: flex;
    align-items: center;
`;

const TextareaBegrunnelseFritekst = styled(Textarea)`
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
    const { skjema } = useDokumentutsendingContext();
    const friteksterFelt = skjema.felter.fritekster;

    const leggTilFritekst = () => {
        friteksterFelt.validerOgSettFelt([
            ...friteksterFelt.verdi,
            lagInitiellFritekst(
                '',
                genererIdBasertPåAndreFritekstKulepunkter(friteksterFelt),
                makslengdeFritekst
            ),
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
                            <TextareaBegrunnelseFritekst
                                key={`fritekst-${fritekstId}`}
                                id={`${fritekstId}`}
                                className={'fritekst-textarea'}
                                value={fritekst.verdi.tekst}
                                label={`Kulepunkt ${fritekstId}`}
                                hideLabel={true}
                                maxLength={makslengdeFritekst}
                                onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
                                    onChangeFritekst(event, fritekstId)
                                }
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
                                icon={<TrashIcon />}
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
                    icon={<PlusCircleIcon />}
                >
                    {'Legg til fritekst'}
                </Button>
            )}
        </>
    );
};

export default KanSøkeFritekst;
