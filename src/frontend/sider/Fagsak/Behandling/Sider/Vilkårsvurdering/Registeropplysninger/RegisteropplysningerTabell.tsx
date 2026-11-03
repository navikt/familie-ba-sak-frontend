import { ChevronDownIcon, ChevronUpIcon } from '@navikt/aksel-icons';
import { BodyShort, Button, HStack, Label, Table } from '@navikt/ds-react';

import { differenceInMilliseconds } from 'date-fns';
import type { ReactNode } from 'react';
import { Fragment, useState } from 'react';
import type { IRestRegisteropplysning } from '../../../../../../typer/person';
import { Registeropplysning, registeropplysning } from '../../../../../../typer/registeropplysning';
import {
    Datoformat,
    isoDatoPeriodeTilFormatertString,
    isoStringTilDateMedFallback,
    isoStringTilFormatertString,
    tidenesMorgen,
} from '../../../../../../utils/dato';
import styles from './RegisteropplysningerTabell.module.css';

interface IRegisteropplysningerTabellProps {
    opplysningstype: Registeropplysning;
    ikon: ReactNode;
    historikk: IRestRegisteropplysning[];
    /** Etikett over verdien og ikonet foran verdien, i to like brede kolonner uten tabellstil. */
    kompakt?: boolean;
}

const hentDatoHeader = (opplysningstype: Registeropplysning): string => {
    switch (opplysningstype) {
        case Registeropplysning.SIVILSTAND:
            return 'Dato';
        case Registeropplysning.DØDSBOADRESSE:
            return 'Dødsdato';
        case Registeropplysning.FØDSELSDATO:
            return '';
        default:
            return 'Periode';
    }
};

const hentDatoVerdi = (opplysningstype: Registeropplysning, periode: IRestRegisteropplysning): string => {
    switch (opplysningstype) {
        case Registeropplysning.SIVILSTAND:
        case Registeropplysning.DØDSBOADRESSE:
            return isoStringTilFormatertString({
                isoString: periode.fom,
                tilFormat: Datoformat.DATO,
            });
        case Registeropplysning.FØDSELSDATO:
            return '';
        default:
            return isoDatoPeriodeTilFormatertString({
                fom: periode.fom,
                tom: periode.tom,
            });
    }
};

const sorterPerioderSynkende = (a: IRestRegisteropplysning, b: IRestRegisteropplysning) =>
    differenceInMilliseconds(
        isoStringTilDateMedFallback({ isoString: b.fom, fallbackDate: tidenesMorgen }),
        isoStringTilDateMedFallback({ isoString: a.fom, fallbackDate: tidenesMorgen })
    );

const GRENSE_FOR_EKSPANDERBAR_HISTORIKK = 3;

const RegisteropplysningerTabell = ({
    opplysningstype,
    ikon,
    historikk,
    kompakt = false,
}: IRegisteropplysningerTabellProps) => {
    const [erEkspandert, settEkspandert] = useState<boolean>(false);
    const manglerOpplysninger = historikk.length === 0;
    const skalVæreEkspanderbar =
        !manglerOpplysninger &&
        historikk.length > GRENSE_FOR_EKSPANDERBAR_HISTORIKK &&
        opplysningstype === Registeropplysning.BOSTEDSADRESSE;

    const synligHistorikk =
        !skalVæreEkspanderbar || erEkspandert
            ? historikk.sort(sorterPerioderSynkende)
            : historikk.sort(sorterPerioderSynkende).slice(0, GRENSE_FOR_EKSPANDERBAR_HISTORIKK);

    const ekspanderKnapp = skalVæreEkspanderbar && (
        <HStack justify={kompakt ? 'start' : 'end'}>
            <Button
                variant="tertiary"
                size="small"
                onClick={() => settEkspandert(nåverdi => !nåverdi)}
                icon={erEkspandert ? <ChevronUpIcon /> : <ChevronDownIcon />}
                iconPosition="right"
            >
                {erEkspandert ? 'Skjul' : `Vis ${historikk.length - GRENSE_FOR_EKSPANDERBAR_HISTORIKK} flere`}
            </Button>
        </HStack>
    );

    if (kompakt) {
        const rader = manglerOpplysninger ? [{ verdi: 'Ingen opplysninger' }] : synligHistorikk;
        return (
            <div className={styles.kompakt}>
                <div className={styles.kompaktGrid}>
                    <Label size="small" as="p">
                        {registeropplysning[opplysningstype]}
                    </Label>
                    <Label size="small" as="p">
                        {hentDatoHeader(opplysningstype)}
                    </Label>
                    {rader.map((periode, index) => (
                        <Fragment key={`${periode.fom}_${periode.tom}_${periode.verdi}`}>
                            <HStack gap="space-8" align="start" wrap={false}>
                                <span className={styles.kompaktIkon}>{index === 0 && ikon}</span>
                                <BodyShort size="small" className={styles.dataCell}>
                                    {periode.verdi}
                                </BodyShort>
                            </HStack>
                            <BodyShort size="small">
                                {manglerOpplysninger ? '-' : hentDatoVerdi(opplysningstype, periode)}
                            </BodyShort>
                        </Fragment>
                    ))}
                </div>
                {ekspanderKnapp}
            </div>
        );
    }

    return (
        <>
            <HStack wrap={false} marginBlock={'space-16 space-0'} justify={'space-between'} width={'100%'}>
                <div className={styles.opplysningsIkon}>{ikon}</div>
                <Table
                    className={styles.table}
                    size={'small'}
                    aria-label={`Registeropplysninger for ${registeropplysning[opplysningstype]}`}
                >
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell className={styles.headerCell}>
                                {registeropplysning[opplysningstype]}
                            </Table.HeaderCell>
                            <Table.HeaderCell className={styles.headerCell}>
                                {hentDatoHeader(opplysningstype)}
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {manglerOpplysninger && (
                            <Table.Row key={`${opplysningstype}_ukjent`}>
                                <Table.DataCell>Ingen opplysninger</Table.DataCell>
                                <Table.DataCell>-</Table.DataCell>
                            </Table.Row>
                        )}
                        {!manglerOpplysninger &&
                            synligHistorikk.map(periode => (
                                <Table.Row key={`${periode.fom}_${periode.tom}_${periode.verdi}`}>
                                    <Table.DataCell className={styles.dataCell}>{periode.verdi}</Table.DataCell>
                                    <Table.DataCell>{hentDatoVerdi(opplysningstype, periode)}</Table.DataCell>
                                </Table.Row>
                            ))}
                    </Table.Body>
                </Table>
            </HStack>
            {ekspanderKnapp}
        </>
    );
};

export default RegisteropplysningerTabell;
