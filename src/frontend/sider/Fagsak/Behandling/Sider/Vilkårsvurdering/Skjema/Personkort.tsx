import { useErLesevisning } from '@hooks/useErLesevisning';
import DødsfallTag from '@komponenter/DødsfallTag';
import { FalskIdentitet } from '@komponenter/FalskIdentitet/FalskIdentitet';
import RegistrerDødsfallDatoMeny from '@komponenter/PersonInformasjon/RegistrerDødsfallDatoMeny';
import { ChevronDownIcon, ChevronUpIcon } from '@navikt/aksel-icons';
import { Button, CopyButton, Heading, HStack, LocalAlert } from '@navikt/ds-react';
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
        <Heading size="medium" as="span" aria-hidden className={styles.skillelinje}>
            |
        </Heading>
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
                <HStack gap="space-4 space-12" align="center">
                    <Heading size="medium" level="2">{`${person.navn} (${hentAlder(person.fødselsdato)} år)`}</Heading>
                    <Skillelinje />
                    {person.harFalskIdentitet && (
                        <>
                            <FalskIdentitet />
                            <Skillelinje />
                        </>
                    )}
                    <HStack gap="space-4" align="center" wrap={false}>
                        <Heading size="medium" level="2" as="span">
                            {formaterIdent(person.personIdent)}
                        </Heading>
                        <CopyButton size="small" copyText={person.personIdent} />
                    </HStack>
                    <Skillelinje />
                    <Heading size="medium" level="2" as="span">
                        {personTypeMap[person.type]}
                    </Heading>
                    {person.dødsfallDato && <DødsfallTag dødsfallDato={person.dødsfallDato} />}
                </HStack>
                <HStack gap="space-4" align="center" wrap={false}>
                    {!person.dødsfallDato && !erLesevisning && (
                        <RegistrerDødsfallDatoMeny person={person} størrelse="small" />
                    )}
                    <Button
                        variant="tertiary"
                        data-color="neutral"
                        size="small"
                        className={styles.personkortChevron}
                        aria-expanded={erÅpen}
                        title={erÅpen ? 'Skjul registeropplysninger' : 'Vis registeropplysninger'}
                        icon={
                            erÅpen ? (
                                <ChevronDownIcon aria-hidden fontSize="2rem" />
                            ) : (
                                <ChevronUpIcon aria-hidden fontSize="2rem" />
                            )
                        }
                        onClick={() => settErÅpen(forrige => !forrige)}
                    />
                </HStack>
            </HStack>
            <Activity mode={erÅpen ? 'visible' : 'hidden'}>
                <div className={styles.personkortInnhold}>
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
                </div>
            </Activity>
        </section>
    );
}
