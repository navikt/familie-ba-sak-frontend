import React, { ReactNode } from 'react';

import styled from 'styled-components';

import { IRestRegisteropplysning } from '../../../../typer/person';
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

interface IRegisteropplysningerTabellProps {
    opplysningstype: Registeropplysning;
    ikon: ReactNode;
    historikk: IRestRegisteropplysning[];
}

const RegisteropplysningerTabell: React.FC<IRegisteropplysningerTabellProps> = ({
    opplysningstype,
    ikon,
    historikk,
}) => {
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
                            <TabellHeader
                                children={
                                    opplysningstype === Registeropplysning.SIVILSTAND
                                        ? 'Dato'
                                        : 'Periode'
                                }
                            />
                        </tr>
                    </thead>
                    {historikk.length ? (
                        historikk
                            .sort((a, b) =>
                                kalenderDiff(
                                    kalenderDatoTilDate(
                                        kalenderDatoMedFallback(b.fom, TIDENES_MORGEN)
                                    ),
                                    kalenderDatoTilDate(
                                        kalenderDatoMedFallback(a.fom, TIDENES_MORGEN)
                                    )
                                )
                            )
                            .map(periode => {
                                return (
                                    <TabellRad
                                        key={`${periode.fom}_${periode.tom}_${periode.verdi}`}
                                    >
                                        <td children={periode.verdi} />
                                        <td
                                            children={
                                                opplysningstype === Registeropplysning.SIVILSTAND
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
                                );
                            })
                    ) : (
                        <TabellRad key={`${opplysningstype}_ukjent`}>
                            <td children={'Ingen opplysninger'} />
                            <td children={'-'} />
                        </TabellRad>
                    )}
                </Tabell>
            </Container>
        </>
    );
};

export default RegisteropplysningerTabell;
