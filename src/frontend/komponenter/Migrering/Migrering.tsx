import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import { Knapp } from 'nav-frontend-knapper';
import { Innholdstittel } from 'nav-frontend-typografi';

import { FamilieInput } from '@navikt/familie-form-elements';
import { useFelt } from '@navikt/familie-skjema';

import { MigreringProvider, useMigrering } from '../../context/MigreringContext';
import { IInfotrygdSak } from '../../typer/infotrygd';
import { identValidator } from '../../utils/validators';

const MigreringContainer = styled.div`
    margin: 16px;
`;

const FnrFlex = styled.div`
    margin-top: 32px;
    margin-bottom: 32px;
    display: flex;
`;

const HentSakerKnapp = styled(Knapp)`
    margin-left: 1rem;
    margin-top: auto;
    height: 1rem;
`;

const MigreringContent: React.FC = () => {
    const { hentSakerForBruker, infotrygdsaker } = useMigrering();
    const [feilmelding, settFeilmelding] = useState('');
    const [spinner, settSpinner] = useState(false);

    const nyIdent = useFelt({
        verdi: '',
        valideringsfunksjon: identValidator,
    });

    useEffect(() => {
        settFeilmelding('');
    }, [nyIdent.verdi]);

    return (
        <>
            {/* TODO: Her skal det være et Visittkort, men vi trenger å hente data fra PDL for navn og kjønn. ba-sak må utvides.*/}
            <MigreringContainer>
                <Innholdstittel>Sakshistorikk fra Infotrygd</Innholdstittel>
                <FnrFlex>
                    <FamilieInput
                        {...nyIdent.hentNavInputProps(!!feilmelding)}
                        feil={nyIdent.hentNavInputProps(!!feilmelding).feil || feilmelding}
                        erLesevisning={false}
                        id={'hent-person'}
                        label={'Skriv inn fødselsnummer/D-nummer'}
                        bredde={'XL'}
                        placeholder={'fnr/dnr'}
                    />
                    <HentSakerKnapp
                        onClick={() => {
                            settSpinner(true);
                            hentSakerForBruker(nyIdent.verdi)
                                .then((feilmelding: string) => {
                                    settFeilmelding(feilmelding);
                                })
                                .finally(() => {
                                    settSpinner(false);
                                });
                        }}
                        children={'Hent saker'}
                        spinner={spinner}
                        mini={true}
                    />
                </FnrFlex>
                {/* TODO: Skal tabellen skjules (inkl. headere) når det ikke er noen saker? */}
                <table className="tabell">
                    <thead>
                        <tr>
                            <th>Saksblokk</th>
                            <th>Mottatt</th>
                            <th>Gjelder</th>
                            <th>Ru</th>
                            <th>Kode</th>
                            <th>Type</th>
                            <th>Nivå</th>
                            <th>Res</th>
                            <th>Vedtak</th>
                            <th>Iverksatt</th>
                            <th>Detaljer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {infotrygdsaker.map((infotrygdsak: IInfotrygdSak, index: number) => {
                            return (
                                <tr key={index}>
                                    <td>
                                        {(infotrygdsak.saksblokk ?? '') +
                                            (infotrygdsak.saksnr ?? '')}
                                    </td>
                                    <td>{infotrygdsak.mottattdato}</td>
                                    <td>Barnetrygd</td>
                                    <td>{infotrygdsak.kapittelnr}</td>
                                    <td>
                                        {(infotrygdsak.valg ?? '') +
                                            ' ' +
                                            (infotrygdsak.undervalg ?? '')}
                                    </td>
                                    <td>{infotrygdsak.type}</td>
                                    <td>{infotrygdsak.nivå}</td>
                                    <td>{infotrygdsak.resultat}</td>
                                    <td>{infotrygdsak.vedtaksdato}</td>
                                    <td>{infotrygdsak.iverksattdato}</td>
                                    <td></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </MigreringContainer>
        </>
    );
};

const Migrering: React.FC = () => {
    return (
        <MigreringProvider>
            <MigreringContent />
        </MigreringProvider>
    );
};

export default Migrering;
