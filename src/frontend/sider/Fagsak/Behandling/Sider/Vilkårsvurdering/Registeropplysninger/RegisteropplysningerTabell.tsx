import type { ReactNode } from 'react';
import React, { useState } from 'react';

import { differenceInMilliseconds } from 'date-fns';
import styled from 'styled-components';

import { ChevronDownIcon, ChevronUpIcon } from '@navikt/aksel-icons';
import { Button, Table } from '@navikt/ds-react';

import type { IRestRegisteropplysning } from '../../../../../../typer/person';
import { Registeropplysning, registeropplysning } from '../../../../../../typer/registeropplysning';
import {
    Datoformat,
    isoDatoPeriodeTilFormatertString,
    isoStringTilDateMedFallback,
    isoStringTilFormatertString,
    tidenesMorgen,
} from '../../../../../../utils/dato';

const Container = styled.div`
    display: flex;
    margin-top: 1rem;
    justify-content: space-between;
    width: 100%;
`;

const StyledHeaderCell = styled(Table.HeaderCell)`
    &:nth-of-type(1) {
        width: 15rem;
    }
    &:nth-of-type(2) {
        width: 12rem;
    }
`;

const StyledTable = styled(Table)`
    margin-left: 1rem;
`;

const OpplysningsIkon = styled.div`
    padding-top: 0.5rem;
`;

const HøyrejustertKnapperad = styled.div`
    display: flex;
    flex-direction: row-reverse;
`;

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
            <Container>
                <OpplysningsIkon children={ikon} />
                <StyledTable
                    size={'small'}
                    aria-label={`Registeropplysninger for ${registeropplysning[opplysningstype]}`}
                >
                    <Table.Header>
                        <Table.Row>
                            <StyledHeaderCell children={registeropplysning[opplysningstype]} />
                            <StyledHeaderCell children={hentDatoHeader(opplysningstype)} />
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
                </StyledTable>
            </Container>
            {skalVæreEkspanderbar && (
                <HøyrejustertKnapperad>
                    <Button
                        variant="tertiary"
                        size="small"
                        onClick={() => settEkspandert(nåverdi => !nåverdi)}
                        icon={erEkspandert ? <ChevronUpIcon /> : <ChevronDownIcon />}
                        iconPosition="right"
                    >
                        {erEkspandert ? 'Skjul' : `Vis ${historikk.length - GRENSE_FOR_EKSPANDERBAR_HISTORIKK} flere`}
                    </Button>
                </HøyrejustertKnapperad>
            )}
        </>
    );
};

export default RegisteropplysningerTabell;
