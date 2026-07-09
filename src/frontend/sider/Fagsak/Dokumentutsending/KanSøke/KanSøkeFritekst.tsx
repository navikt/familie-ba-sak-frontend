import type { ChangeEvent } from 'react';

import { PlusCircleIcon, TrashIcon } from '@navikt/aksel-icons';
import { Box, Button, Fieldset, HStack, Textarea } from '@navikt/ds-react';
import type { FeltState } from '@navikt/familie-skjema';

import type { IFritekstFelt } from '../../../../utils/fritekstfelter';
import { genererIdBasertPåAndreFritekstKulepunkter, lagInitiellFritekst } from '../../../../utils/fritekstfelter';
import { hentFrontendFeilmelding } from '../../../../utils/ressursUtils';
import { useDokumentutsendingContext } from '../DokumentutsendingContext';

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
            lagInitiellFritekst('', genererIdBasertPåAndreFritekstKulepunkter(friteksterFelt), makslengdeFritekst),
        ]);
    };

    const onChangeFritekst = (event: ChangeEvent<HTMLTextAreaElement>, fritekstId: number) =>
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
        <Box>
            <Fieldset
                id={skjemaGruppeId}
                error={skjema.visFeilmeldinger && hentFrontendFeilmelding(skjema.submitRessurs)}
                legend="Fritekst til kulepunkt i brev"
            >
                {friteksterFelt.verdi.map((fritekst: FeltState<IFritekstFelt>) => {
                    const fritekstId = fritekst.verdi.id;

                    return (
                        <HStack key={`fritekst-${fritekstId}`} align={'start'} gap={'space-8'}>
                            <Box width={'80%'}>
                                <Textarea
                                    key={`fritekst-${fritekstId}`}
                                    id={`${fritekstId}`}
                                    className={'fritekst-textarea'}
                                    value={fritekst.verdi.tekst}
                                    label={`Kulepunkt ${fritekstId}`}
                                    hideLabel={true}
                                    maxLength={makslengdeFritekst}
                                    onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
                                        onChangeFritekst(event, fritekstId)
                                    }
                                    error={skjema.visFeilmeldinger && fritekst.feilmelding}
                                    /* eslint-disable-next-line jsx-a11y/no-autofocus */
                                    autoFocus
                                />
                            </Box>
                            <Button
                                variant={'tertiary'}
                                onClick={() => {
                                    friteksterFelt.validerOgSettFelt([
                                        ...friteksterFelt.verdi.filter(
                                            mapFritekst => mapFritekst.verdi.id !== fritekst.verdi.id
                                        ),
                                    ]);
                                }}
                                id={`fjern_fritekst-${fritekstId}`}
                                size={'small'}
                                aria-label={'Fjern fritekst'}
                                icon={<TrashIcon />}
                            >
                                {'Fjern'}
                            </Button>
                        </HStack>
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
        </Box>
    );
};

export default KanSøkeFritekst;
