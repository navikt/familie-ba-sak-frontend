import { useErLesevisning } from '@hooks/useErLesevisning';
import DødsfallTag from '@komponenter/DødsfallTag';
import { FalskIdentitet } from '@komponenter/FalskIdentitet/FalskIdentitet';
import RegistrerDødsfallDatoMeny from '@komponenter/PersonInformasjon/RegistrerDødsfallDatoMeny';
import { ChevronDownIcon, ChevronUpIcon } from '@navikt/aksel-icons';
import { BodyShort, Box, Button, CopyButton, HStack, LocalAlert } from '@navikt/ds-react';
import { type IGrunnlagPerson, personTypeMap } from '@typer/person';
import { formaterIdent, hentAlder } from '@utils/formatter';
import { Activity, useState } from 'react';

import Registeropplysninger from '../Registeropplysninger/Registeropplysninger';
import styles from './VilkårsvurderingSkjema.module.css';

interface Props {
    person: IGrunnlagPerson;
}

function Skillelinje() {
    return (
        <BodyShort aria-hidden className={styles.skillelinje}>
            |
        </BodyShort>
    );
}

export function Personkort({ person }: Props) {
    const erLesevisning = useErLesevisning();
    const [erÅpen, settErÅpen] = useState(true);

    return (
        <section className={styles.personkort} aria-label={person.navn}>
            <HStack
                justify="space-between"
                align="center"
                wrap={false}
                gap="space-8"
                className={styles.personkortHeader}
                data-lukket={!erÅpen}
            >
                <HStack gap="space-8" align="center">
                    <BodyShort weight="semibold">{`${person.navn} (${hentAlder(person.fødselsdato)} år)`}</BodyShort>
                    <Skillelinje />
                    {person.harFalskIdentitet && (
                        <>
                            <FalskIdentitet />
                            <Skillelinje />
                        </>
                    )}
                    <HStack gap="space-2" align="center" wrap={false}>
                        <BodyShort weight="semibold">{formaterIdent(person.personIdent)}</BodyShort>
                        <CopyButton size="xsmall" copyText={person.personIdent} />
                    </HStack>
                    <Skillelinje />
                    <BodyShort weight="semibold">{personTypeMap[person.type]}</BodyShort>
                    {person.dødsfallDato ? (
                        <DødsfallTag dødsfallDato={person.dødsfallDato} />
                    ) : (
                        !erLesevisning && <RegistrerDødsfallDatoMeny person={person} />
                    )}
                </HStack>
                <Button
                    variant="tertiary"
                    size="small"
                    aria-expanded={erÅpen}
                    title={erÅpen ? 'Skjul registeropplysninger' : 'Vis registeropplysninger'}
                    icon={erÅpen ? <ChevronUpIcon aria-hidden /> : <ChevronDownIcon aria-hidden />}
                    onClick={() => settErÅpen(forrige => !forrige)}
                />
            </HStack>
            <Activity mode={erÅpen ? 'visible' : 'hidden'}>
                <Box padding="space-16">
                    {person.registerhistorikk ? (
                        <Registeropplysninger
                            registerHistorikk={person.registerhistorikk}
                            fødselsdato={person.fødselsdato}
                            kompakt
                        />
                    ) : (
                        <LocalAlert status="warning" size="small">
                            <LocalAlert.Header>
                                <LocalAlert.Title>Klarte ikke hente registeropplysninger</LocalAlert.Title>
                            </LocalAlert.Header>
                        </LocalAlert>
                    )}
                </Box>
            </Activity>
        </section>
    );
}
