import { useToastContext } from '@context/ToastContext';
import { useErLesevisning } from '@hooks/useErLesevisning';
import { useSlettBrevmottaker } from '@hooks/useSlettBrevmottaker';
import { AlertType, ToastTyper } from '@komponenter/Toast/typer';
import { TrashIcon } from '@navikt/aksel-icons';
import { Button, ErrorMessage, Heading, HStack, InlineMessage, VStack } from '@navikt/ds-react';
import { byggSuksessRessurs } from '@navikt/familie-typer';
import _CountryData from '@navikt/land-verktoy';
import { useBehandlingContext } from '@sider/Fagsak/Behandling/context/BehandlingContext';
import { type BrevmottakerBehandling, brevmottakertypeVisningsnavn } from '@typer/brevmottaker';
import styles from './BrevmottakerDetaljer.module.css';

const CountryData = (_CountryData as unknown as { default?: typeof _CountryData }).default ?? _CountryData;
const countryInstance = CountryData.getCountryInstance('nb');

interface Props {
    brevmottaker: BrevmottakerBehandling;
}

export function BrevmottakerDetaljer({ brevmottaker }: Props) {
    const erLesevisning = useErLesevisning();

    const { behandling, settÅpenBehandling } = useBehandlingContext();
    const { settToast } = useToastContext();

    const {
        mutate: slettBrevmottaker,
        isPending: slettBrevmottakerIsPending,
        error: slettBrevmottakerError,
    } = useSlettBrevmottaker({
        onSuccess: oppdatertBehandling => {
            settÅpenBehandling(byggSuksessRessurs(oppdatertBehandling));
            settToast(ToastTyper.BREVMOTTAKER_FJERNET, { alertType: AlertType.SUCCESS, tekst: 'Mottaker fjernet' });
        },
    });

    function onSlettBrevmottaker() {
        slettBrevmottaker({ behandlingId: behandling.behandlingId, brevmottakerId: brevmottaker.id });
    }

    return (
        <VStack gap={'space-2'}>
            <HStack justify={'space-between'}>
                <Heading level={'2'} size={'small'}>
                    {brevmottakertypeVisningsnavn[brevmottaker.type]}
                </Heading>
                {!erLesevisning && (
                    <Button
                        variant={'tertiary'}
                        onClick={onSlettBrevmottaker}
                        loading={slettBrevmottakerIsPending}
                        size={'small'}
                        icon={<TrashIcon aria-hidden={true} />}
                        aria-label={`Fjern ${brevmottakertypeVisningsnavn[brevmottaker.type].toLowerCase()}`}
                    >
                        Fjern
                    </Button>
                )}
            </HStack>
            {slettBrevmottakerError && <ErrorMessage size={'small'}>{slettBrevmottakerError.message}</ErrorMessage>}
            <dl className={styles.definitionList}>
                <dt>Navn</dt>
                <dd>{brevmottaker.navn}</dd>
                <dt>Land</dt>
                <dd>{countryInstance.findByValue(brevmottaker.landkode).label}</dd>
                <dt>Adresselinje 1</dt>
                <dd>{brevmottaker.adresselinje1}</dd>
                <dt>Adresselinje 2</dt>
                <dd>{brevmottaker.adresselinje2 || '-'}</dd>
                <dt>Postnummer</dt>
                <dd>{brevmottaker.postnummer || '-'}</dd>
                <dt>Poststed</dt>
                <dd>{brevmottaker.poststed || '-'}</dd>
            </dl>
            {brevmottaker.landkode !== 'NO' && (
                <InlineMessage status={'info'}>
                    Ved utenlandsk adresse skal postnummer og poststed legges i adresselinjene.
                </InlineMessage>
            )}
        </VStack>
    );
}
