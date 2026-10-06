import { useErLesevisningFagsak } from '@hooks/useErLesevisningFagsak';
import { FormDebugger } from '@komponenter/FormDebugger';
import { Adresselinje1Field } from '@komponenter/Saklinje/Meny/Brevmottaker/Fagsak/Adresselinje1Field';
import { Adresselinje2Field } from '@komponenter/Saklinje/Meny/Brevmottaker/Fagsak/Adresselinje2Field';
import { LandField } from '@komponenter/Saklinje/Meny/Brevmottaker/Fagsak/LandField';
import { PostnummerField } from '@komponenter/Saklinje/Meny/Brevmottaker/Fagsak/PostnummerField';
import { PoststedField } from '@komponenter/Saklinje/Meny/Brevmottaker/Fagsak/PoststedField';
import { PlusCircleIcon } from '@navikt/aksel-icons';
import { Box, Button, Dialog, Fieldset, HStack, InlineMessage, VStack } from '@navikt/ds-react';
import { useBrevmottakereFagsakContext } from '@sider/Fagsak/BrevmottakereFagsakContext';
import { useState } from 'react';
import { FormProvider } from 'react-hook-form';
import { Advarsel } from './Advarsel';
import { useBrevmottakerDialogContext } from './BrevmottakerDialogContext';
import { Brevmottakere } from './Brevmottakere';
import { BrevmottakertypeField } from './BrevmottakertypeField';
import { NavnField } from './NavnField';
import { BrevmottakerField, useBrevmottakerForm } from './useBrevmottakerForm';

export function BrevmottakerDialog() {
    const erLesevisning = useErLesevisningFagsak();

    const { brevmottakere } = useBrevmottakereFagsakContext();
    const { erDialogÅpen, lukkDialog } = useBrevmottakerDialogContext();

    const [visForm, settVisForm] = useState(brevmottakere.length === 0 && !erLesevisning);

    const { form, onSubmit } = useBrevmottakerForm({ onSubmitSuccess: () => settVisForm(false) });

    const {
        handleSubmit,
        formState: { isSubmitting, errors },
        reset,
        watch,
    } = form;

    function onLukkDialog() {
        lukkDialog();
    }

    function onLukkForm() {
        settVisForm(false);
        reset();
    }

    const land = watch(BrevmottakerField.LAND);

    return (
        <Dialog open={erDialogÅpen} onOpenChange={onLukkDialog}>
            <Dialog.Popup width={'40rem'}>
                <Dialog.Header>
                    <Dialog.Title>Brevmottaker</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                    <VStack gap={'space-24'}>
                        <Advarsel />
                        <Brevmottakere />
                        {visForm && (
                            <Box marginBlock={'space-0 space-20'}>
                                <FormProvider {...form}>
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <VStack gap={'space-24'}>
                                            <Fieldset
                                                legend={'Brevmottakerskjema'}
                                                hideLegend={true}
                                                error={errors.root?.message}
                                                errorPropagation={false}
                                            >
                                                <VStack gap={'space-12'}>
                                                    <BrevmottakertypeField />
                                                    <NavnField />
                                                    <LandField />
                                                    <Adresselinje1Field />
                                                    <Adresselinje2Field />
                                                    {land !== 'NO' && (
                                                        <InlineMessage status={'info'}>
                                                            Ved utenlandsk adresse skal postnummer og poststed legges i
                                                            adresselinjene.
                                                        </InlineMessage>
                                                    )}
                                                    {land === 'NO' && (
                                                        <>
                                                            <PostnummerField />
                                                            <PoststedField />
                                                        </>
                                                    )}
                                                    <FormDebugger />
                                                </VStack>
                                            </Fieldset>
                                            <HStack gap={'space-8'}>
                                                <Button type={'submit'} variant={'primary'} loading={isSubmitting}>
                                                    Legg til brevmottaker
                                                </Button>
                                                <Button type={'button'} variant={'tertiary'} onClick={onLukkForm}>
                                                    Avbryt
                                                </Button>
                                            </HStack>
                                        </VStack>
                                    </form>
                                </FormProvider>
                            </Box>
                        )}
                        {!visForm && brevmottakere.length < 2 && !erLesevisning && (
                            <div>
                                <Button
                                    variant={'tertiary'}
                                    size={'small'}
                                    icon={<PlusCircleIcon />}
                                    onClick={() => settVisForm(true)}
                                >
                                    Legg til ny mottaker
                                </Button>
                            </div>
                        )}
                    </VStack>
                </Dialog.Body>
                <Dialog.Footer>
                    <Button type={'button'} onClick={onLukkDialog} disabled={visForm || isSubmitting}>
                        Lukk
                    </Button>
                </Dialog.Footer>
            </Dialog.Popup>
        </Dialog>
    );
}
