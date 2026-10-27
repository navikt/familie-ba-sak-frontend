import { useBehandling } from '@hooks/useBehandling';
import { useErLesevisning } from '@hooks/useErLesevisning';
import { useSlettBrevmottakerIsPending } from '@hooks/useSlettBrevmottakerIsPending';
import { PlusCircleIcon } from '@navikt/aksel-icons';
import { Box, Button, Dialog, Fieldset, HStack, InlineMessage, VStack } from '@navikt/ds-react';
import { kanLeggeTilBrevmottaker, Modus, utledValgbareBrevmottakertyper } from '@typer/brevmottaker';
import { useState } from 'react';
import { FormProvider, useWatch } from 'react-hook-form';
import { useBrevmottakerDialogContext } from '../Felles/BrevmottakerDialogContext';
import { Brevmottakere } from '../Felles/Brevmottakere';
import { Adresselinje1Field } from '../Felles/Form/Field/Adresselinje1Field';
import { Adresselinje2Field } from '../Felles/Form/Field/Adresselinje2Field';
import { BrevmottakertypeField } from '../Felles/Form/Field/BrevmottakertypeField';
import { LandField } from '../Felles/Form/Field/LandField';
import { NavnField } from '../Felles/Form/Field/NavnField';
import { PostnummerField } from '../Felles/Form/Field/PostnummerField';
import { PoststedField } from '../Felles/Form/Field/PoststedField';
import { BrevmottakerField } from '../Felles/Form/useBrevmottakerForm';
import { Informasjonskort } from '../Felles/Informasjonskort';
import { BrevmottakerDetaljerBehandling } from './BrevmottakerDetaljerBehandling';
import { useBrevmottakerFormBehandling } from './useBrevmottakerFormBehandling';

export function BrevmottakerDialogBehandling() {
    const erLesevisning = useErLesevisning();

    const { brevmottakere } = useBehandling();
    const { lukkDialog } = useBrevmottakerDialogContext();

    const [visForm, settVisForm] = useState(brevmottakere.length === 0 && !erLesevisning);

    const slettBrevmottakerIsPending = useSlettBrevmottakerIsPending();

    const { form, onSubmit } = useBrevmottakerFormBehandling({ onSubmitSuccess: () => settVisForm(false) });

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
    const skalViseLeggTilNyMottaker = !visForm && !erLesevisning && kanLeggeTilBrevmottaker(brevmottakere);
    const valgbareBrevmottakertyper = utledValgbareBrevmottakertyper(brevmottakere, Modus.BEHANDLING);

    return (
        <Dialog open={true} onOpenChange={onLukkDialog}>
            <Dialog.Popup width={'40rem'}>
                <Dialog.Header>
                    <Dialog.Title>Brevmottaker</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                    <VStack gap={'space-24'}>
                        <Informasjonskort modus={Modus.BEHANDLING} />
                        <Brevmottakere brevmottakere={brevmottakere}>
                            {brevmottaker => (
                                <BrevmottakerDetaljerBehandling key={brevmottaker.id} brevmottaker={brevmottaker} />
                            )}
                        </Brevmottakere>
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
                                                    <BrevmottakertypeField
                                                        erLesevisning={erLesevisning}
                                                        valgbareBrevmottakertyper={valgbareBrevmottakertyper}
                                                    />
                                                    <NavnField erLesevisning={erLesevisning} />
                                                    <LandField erLesevisning={erLesevisning} />
                                                    <Adresselinje1Field erLesevisning={erLesevisning} />
                                                    <Adresselinje2Field erLesevisning={erLesevisning} />
                                                    {land && land !== 'NO' && (
                                                        <InlineMessage status={'info'}>
                                                            Ved utenlandsk adresse skal postnummer og poststed legges i
                                                            adresselinjene.
                                                        </InlineMessage>
                                                    )}
                                                    {land === 'NO' && (
                                                        <>
                                                            <PostnummerField erLesevisning={erLesevisning} />
                                                            <PoststedField erLesevisning={erLesevisning} />
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
                        {skalViseLeggTilNyMottaker && (
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
                    <Button
                        type={'button'}
                        onClick={onLukkDialog}
                        disabled={visForm || isSubmitting || slettBrevmottakerIsPending}
                    >
                        Lukk
                    </Button>
                </Dialog.Footer>
            </Dialog.Popup>
        </Dialog>
    );
}
