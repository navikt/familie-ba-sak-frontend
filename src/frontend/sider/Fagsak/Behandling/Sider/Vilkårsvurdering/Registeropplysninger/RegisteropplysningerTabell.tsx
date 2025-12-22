import type { ReactNode } from 'react';
import React, { useState } from 'react';

import { differenceInMilliseconds } from 'date-fns';

import { ChevronDownIcon, ChevronUpIcon } from '@navikt/aksel-icons';
import { Button, HStack, Table } from '@navikt/ds-react';

import styles from './RegisteropplysningerTabell.module.css';
import type { IRestRegisteropplysning } from '../../../../../../typer/person';
import { Registeropplysning, registeropplysning } from '../../../../../../typer/registeropplysning';
import {
    Datoformat,
    isoDatoPeriodeTilFormatertString,
    isoStringTilDateMedFallback,
    isoStringTilFormatertString,
    tidenesMorgen,
} from '../../../../../../utils/dato';

interface IRegisteropplysningerTabellProps {
    opplysningstype: Registeropplysning;
    ikon: ReactNode;
    historikk: IRestRegisteropplysning[];
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

const RegisteropplysningerTabell: React.FC<IRegisteropplysningerTabellProps> = ({
    opplysningstype,
    ikon,
    historikk,
}) => {
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

    return (
        <>
            <HStack wrap={false} marginBlock={'space-16 space-0'} justify={'space-between'} width={'100%'}>
                <div className={styles.opplysningsIkon} children={ikon} />
                <Table
                    className={styles.table}
                    size={'small'}
                    aria-label={`Registeropplysninger for ${registeropplysning[opplysningstype]}`}
                >
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell
                                className={styles.headerCell}
                                children={registeropplysning[opplysningstype]}
                            />
                            <Table.HeaderCell
                                className={styles.headerCell}
                                children={hentDatoHeader(opplysningstype)}
                            />
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {manglerOpplysninger && (
                            <Table.Row key={`${opplysningstype}_ukjent`}>
                                <Table.DataCell children={'Ingen opplysninger'} />
                                <Table.DataCell children={'-'} />
                            </Table.Row>
                        )}
                        {!manglerOpplysninger &&
                            synligHistorikk.map(periode => (
                                <Table.Row key={`${periode.fom}_${periode.tom}_${periode.verdi}`}>
                                    <Table.DataCell children={periode.verdi} />
                                    <Table.DataCell children={hentDatoVerdi(opplysningstype, periode)} />
                                </Table.Row>
                            ))}
                    </Table.Body>
                </Table>
            </HStack>
            {skalVæreEkspanderbar && (
                <HStack justify={'end'}>
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
            )}
        </>
    );
};

export default RegisteropplysningerTabell;
