import { useErLesevisningFagsak } from '@hooks/useErLesevisningFagsak';
import { TrashIcon } from '@navikt/aksel-icons';
import { Button, Heading, HStack, InlineMessage, VStack } from '@navikt/ds-react';
import _CountryData from '@navikt/land-verktoy';
import { useBrevmottakereFagsakContext } from '@sider/Fagsak/BrevmottakereFagsakContext';
import { type BrevmottakerFagsak, brevmottakertypeVisningsnavn } from '@typer/brevmottaker';
import styles from './BrevmottakerDetaljer.module.css';

const CountryData = (_CountryData as unknown as { default?: typeof _CountryData }).default ?? _CountryData;
const countryInstance = CountryData.getCountryInstance('nb');

interface Props {
    brevmottaker: BrevmottakerFagsak;
}

export function BrevmottakerDetaljer({ brevmottaker }: Props) {
    const erLesevisning = useErLesevisningFagsak();

    const { slettBrevmottaker } = useBrevmottakereFagsakContext();

    return (
        <VStack gap={'space-2'}>
            <HStack justify={'space-between'}>
                <Heading level={'2'} size={'small'}>
                    {brevmottakertypeVisningsnavn[brevmottaker.type]}
                </Heading>
                {!erLesevisning && (
                    <Button
                        variant={'tertiary'}
                        onClick={() => slettBrevmottaker(brevmottaker)}
                        size={'small'}
                        icon={<TrashIcon />}
                    >
                        Fjern
                    </Button>
                )}
            </HStack>
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
