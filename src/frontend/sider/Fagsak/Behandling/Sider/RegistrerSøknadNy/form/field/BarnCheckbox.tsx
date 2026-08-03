import { useState } from 'react';

import { useErLesevisning } from '@hooks/useErLesevisning';
import { useFagsak } from '@hooks/useFagsak';
import { useBarnaFieldArray } from '@sider/Fagsak/Behandling/Sider/RegistrerSøknadNy/form/BarnaFieldArrayContext';
import type { RegistrerSøknadFormValues } from '@sider/Fagsak/Behandling/Sider/RegistrerSøknadNy/form/useRegistrerSøknadForm';
import { erFagsakAvTypeEnsligMindreårig, erFagsakAvTypeInstitusjon, erFagsakAvTypeSkjermetBarn } from '@typer/fagsak';
import type { IBarnMedOpplysninger } from '@typer/søknad';
import { hentBarnMedLøpendeUtbetaling } from '@utils/fagsak';
import { formaterIdent, hentAlderSomString } from '@utils/formatter';
import { useFormState } from 'react-hook-form';

import { TrashIcon } from '@navikt/aksel-icons';
import { BodyLong, BodyShort, Box, Button, Checkbox, Dialog, HStack } from '@navikt/ds-react';

interface Props {
    index: number;
    barn: IBarnMedOpplysninger & { id: string };
}

export function BarnCheckbox({ index, barn }: Props) {
    const erLesevisning = useErLesevisning();
    const fagsak = useFagsak();

    const { slettBarn } = useBarnaFieldArray();
    const { isSubmitting } = useFormState<RegistrerSøknadFormValues>();

    const [visBekreftSlettBarnModal, settVisBekreftSlettBarnModal] = useState(false);

    const gjelderInstitusjon = erFagsakAvTypeInstitusjon(fagsak);
    const gjelderEnsligMindreårig = erFagsakAvTypeEnsligMindreårig(fagsak);
    const gjelderSkjermetBarn = erFagsakAvTypeSkjermetBarn(fagsak);

    const barnMedLøpendeUtbetaling = hentBarnMedLøpendeUtbetaling(fagsak);
    const barnetHarLøpendeUtbetaling = barnMedLøpendeUtbetaling.has(barn.ident);

    const navn = barn.navn ?? 'Navn ukjent';
    const alder = hentAlderSomString(barn.fødselsdato);
    const ident = formaterIdent(barn.ident);
    const løpende = barnetHarLøpendeUtbetaling ? '(løpende)' : '';
    const manueltRegistrert = barn.manueltRegistrert ? '| (manuelt registrert)' : '';
    const navnOgIdentTekst = `${navn} (${alder}) | ${ident} ${løpende} ${manueltRegistrert}`;

    const kanSletteBarn = barn.manueltRegistrert && !erLesevisning;

    if (gjelderInstitusjon || gjelderEnsligMindreårig || gjelderSkjermetBarn) {
        return <BodyShort title={navnOgIdentTekst}>{navnOgIdentTekst}</BodyShort>;
    }

    return (
        <HStack gap={'space-16'}>
            <Checkbox readOnly={erLesevisning} value={barn.id}>
                {navnOgIdentTekst}
            </Checkbox>
            {kanSletteBarn && (
                <>
                    <Button
                        type={'button'}
                        variant={'tertiary'}
                        size={'small'}
                        onClick={() => settVisBekreftSlettBarnModal(true)}
                        icon={<TrashIcon fontSize={'1.3rem'} />}
                        disabled={isSubmitting}
                    >
                        Fjern barn
                    </Button>
                    <Dialog open={visBekreftSlettBarnModal} onOpenChange={settVisBekreftSlettBarnModal}>
                        <Dialog.Popup role={'alertdialog'} closeOnOutsideClick={false} position={'center'}>
                            <Dialog.Header withClosebutton={false}>
                                <Dialog.Title>Bekreft fjerning av barn</Dialog.Title>
                            </Dialog.Header>
                            <Dialog.Body>
                                <Box paddingBlock={'space-12'}>
                                    <BodyLong>
                                        Er du sikker på at du vil fjerne {barn.navn} ({alder})? Denne handlingen kan
                                        ikke angres.
                                    </BodyLong>
                                </Box>
                            </Dialog.Body>
                            <Dialog.Footer>
                                <Dialog.CloseTrigger>
                                    <Button variant={'secondary'} size={'medium'}>
                                        Avbryt
                                    </Button>
                                </Dialog.CloseTrigger>
                                <Dialog.CloseTrigger>
                                    <Button
                                        variant={'danger'}
                                        size={'medium'}
                                        icon={<TrashIcon />}
                                        onClick={() => slettBarn(index)}
                                        disabled={isSubmitting}
                                    >
                                        Fjern
                                    </Button>
                                </Dialog.CloseTrigger>
                            </Dialog.Footer>
                        </Dialog.Popup>
                    </Dialog>
                </>
            )}
        </HStack>
    );
}
