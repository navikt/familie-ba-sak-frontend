import { TrashIcon } from '@navikt/aksel-icons';
import { Box, Button, Heading, HStack, InlineMessage } from '@navikt/ds-react';
import _CountryData from '@navikt/land-verktoy';
import type { Brevmottaker } from '@typer/brevmottaker';
import { brevmottakertypeVisningsnavn } from '@typer/brevmottaker';

import styles from './BrevmottakerTabell.module.css';

const CountryData = (_CountryData as unknown as { default?: typeof _CountryData }).default ?? _CountryData;

interface Props<T extends Brevmottaker> {
    mottaker: T;
    fjernMottaker: (mottaker: T) => void;
    erLesevisning: boolean;
}

const BrevmottakerTabell = <T extends Brevmottaker>({ mottaker, fjernMottaker, erLesevisning }: Props<T>) => {
    const land = CountryData.getCountryInstance('nb').findByValue(mottaker.landkode);

    return (
        <Box marginBlock={'space-40 space-0'}>
            <HStack justify={'space-between'}>
                <Heading size="medium">{brevmottakertypeVisningsnavn[mottaker.type]}</Heading>
                {!erLesevisning && (
                    <Button
                        variant={'tertiary'}
                        onClick={() => fjernMottaker(mottaker)}
                        loading={false}
                        disabled={false}
                        size={'small'}
                        icon={<TrashIcon />}
                    >
                        {'Fjern'}
                    </Button>
                )}
            </HStack>
            <dl className={styles.definitionList}>
                <dt>Navn</dt>
                <dd>{mottaker.navn}</dd>
                <dt>Land</dt>
                <dd>{land.label}</dd>
                <dt>Adresselinje 1</dt>
                <dd>{mottaker.adresselinje1}</dd>
                <dt>Adresselinje 2</dt>
                <dd>{mottaker.adresselinje2 || '-'}</dd>
                <dt>Postnummer</dt>
                <dd>{mottaker.postnummer || '-'}</dd>
                <dt>Poststed</dt>
                <dd>{mottaker.poststed || '-'}</dd>
            </dl>

            {mottaker.landkode !== 'NO' && (
                <InlineMessage status={'info'}>
                    Ved utenlandsk adresse skal postnummer og poststed legges i adresselinjene.
                </InlineMessage>
            )}
        </Box>
    );
};

export default BrevmottakerTabell;
