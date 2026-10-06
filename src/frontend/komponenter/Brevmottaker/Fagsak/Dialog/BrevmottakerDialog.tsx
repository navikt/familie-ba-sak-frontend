import { useErLesevisningFagsak } from '@hooks/useErLesevisningFagsak';
import { PlusCircleIcon } from '@navikt/aksel-icons';
import { Box, Button, Dialog, Fieldset, HStack, InlineMessage, VStack } from '@navikt/ds-react';
import { useBrevmottakereFagsakContext } from '@sider/Fagsak/BrevmottakereFagsakContext';
import { useState } from 'react';
import { FormProvider, useWatch } from 'react-hook-form';
import { useBrevmottakerDialogContext } from './BrevmottakerDialogContext';
import { Brevmottakere } from './Brevmottakere';
import { Adresselinje1Field } from './Field/Adresselinje1Field';
import { Adresselinje2Field } from './Field/Adresselinje2Field';
import { BrevmottakertypeField } from './Field/BrevmottakertypeField';
import { LandField } from './Field/LandField';
import { NavnField } from './Field/NavnField';
import { PostnummerField } from './Field/PostnummerField';
import { PoststedField } from './Field/PoststedField';
import { Informasjonskort } from './Informasjonskort';
import { BrevmottakerField, useBrevmottakerForm } from './useBrevmottakerForm';

export function BrevmottakerDialog() {
    const erLesevisning = useErLesevisningFagsak();

    const { brevmottakere } = useBrevmottakereFagsakContext();
    const { lukkDialog } = useBrevmottakerDialogContext();

    const [visForm, settVisForm] = useState(brevmottakere.length === 0 && !erLesevisning);

    const { form, onSubmit } = useBrevmottakerForm({ onSubmitSuccess: () => settVisForm(false) });

    const {
        control,
        handleSubmit,
        formState: { isSubmitting, errors },
        reset,
    } = form;

    function onLukkDialog() {
        lukkDialog();
        settVisForm(false);
        reset();
    }

    function onLukkForm() {
        settVisForm(false);
        reset();
    }

    const land = useWatch({ control, name: BrevmottakerField.LAND });

    return (
        <Dialog open={true} onOpenChange={onLukkDialog}>
            <Dialog.Popup width={'40rem'}>
                <Dialog.Header>
                    <Dialog.Title>Brevmottaker</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                    <VStack gap={'space-24'}>
                        <Informasjonskort />
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
                                                    {land && land !== 'NO' && (
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
                                    icon={<PlusCircleIcon aria-hidden={true} />}
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
