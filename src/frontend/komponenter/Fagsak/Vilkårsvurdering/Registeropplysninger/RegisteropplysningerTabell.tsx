import type { ReactNode } from 'react';
import React, { useState } from 'react';

import styled from 'styled-components';

import { Collapse, Expand } from '@navikt/ds-icons';
import { Button } from '@navikt/ds-react';

import type { IRestRegisteropplysning } from '../../../../typer/person';
import { Registeropplysning, registeropplysning } from '../../../../typer/registeropplysning';
import {
    kalenderDato,
    kalenderDatoMedFallback,
    kalenderDatoTilDate,
    kalenderDiff,
    periodeToString,
    TIDENES_MORGEN,
    tilVisning,
} from '../../../../utils/kalender';

const Container = styled.div`
    display: flex;
    margin-top: 1rem;
    justify-content: space-between;
    width: 100%;
`;

const TabellHeader = styled.th`
    text-align: left;
    padding: 0.5rem !important;
    &:nth-of-type(1) {
        width: 15rem;
    }
    &:nth-of-type(2) {
        width: 12rem;
    }
`;

const Tabell = styled.table`
    margin-left: 1rem;
    table-layout: fixed;
`;

const TabellRad = styled.tr`
    td {
        border-bottom: 1px solid rgba(0, 0, 0, 0.15) !important;
        padding: 0.5rem;
    }
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

const hentDatoHeader = (opplysningstype: Registeropplysning) => {
    if (opplysningstype === Registeropplysning.SIVILSTAND) {
        return 'Dato';
    } else if (opplysningstype === Registeropplysning.DØDSBOADRESSE) {
        return 'Dødsdato';
    } else {
        return 'Periode';
    }
};

const sorterPerioderSynkende = (a: IRestRegisteropplysning, b: IRestRegisteropplysning) =>
    kalenderDiff(
        kalenderDatoTilDate(kalenderDatoMedFallback(b.fom, TIDENES_MORGEN)),
        kalenderDatoTilDate(kalenderDatoMedFallback(a.fom, TIDENES_MORGEN))
    );

export const GRENSE_FOR_EKSPANDERBAR_HISTORIKK = 3;

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
                <Tabell
                    className={'tabell'}
                    aria-label={`Registeropplysninger for ${registeropplysning[opplysningstype]}`}
                >
                    <thead>
                        <tr>
                            <TabellHeader children={registeropplysning[opplysningstype]} />
                            <TabellHeader children={hentDatoHeader(opplysningstype)} />
                        </tr>
                    </thead>
                    <tbody>
                        {manglerOpplysninger && (
                            <TabellRad key={`${opplysningstype}_ukjent`}>
                                <td children={'Ingen opplysninger'} />
                                <td children={'-'} />
                            </TabellRad>
                        )}
                        {!manglerOpplysninger &&
                            synligHistorikk.map(periode => (
                                <TabellRad key={`${periode.fom}_${periode.tom}_${periode.verdi}`}>
                                    <td children={periode.verdi} />
                                    <td
                                        children={
                                            opplysningstype === Registeropplysning.SIVILSTAND ||
                                            opplysningstype === Registeropplysning.DØDSBOADRESSE
                                                ? tilVisning(
                                                      periode.fom
                                                          ? kalenderDato(periode.fom)
                                                          : undefined
                                                  )
                                                : periodeToString({
                                                      fom: periode.fom,
                                                      tom: periode.tom,
                                                  })
                                        }
                                    />
                                </TabellRad>
                            ))}
                    </tbody>
                </Tabell>
            </Container>
            {skalVæreEkspanderbar && (
                <HøyrejustertKnapperad>
                    <Button
                        variant="tertiary"
                        size="small"
                        onClick={() => settEkspandert(nåverdi => !nåverdi)}
                    >
                        {erEkspandert ? (
                            <>
                                Skjul
                                <Collapse />
                            </>
                        ) : (
                            <>
                                Vis {historikk.length - GRENSE_FOR_EKSPANDERBAR_HISTORIKK} flere
                                <Expand />
                            </>
                        )}
                    </Button>
                </HøyrejustertKnapperad>
            )}
        </>
    );
};

export default RegisteropplysningerTabell;
