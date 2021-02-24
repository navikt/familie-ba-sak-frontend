import React from 'react';

import styled from 'styled-components';

import { Knapp } from 'nav-frontend-knapper';
import { Input, SkjemaGruppe } from 'nav-frontend-skjema';
import { Innholdstittel } from 'nav-frontend-typografi';

import { byggFunksjonellFeilRessurs, Ressurs, RessursStatus } from '@navikt/familie-typer';

import { useMigrering } from '../../context/MigreringContext';
import { IInfotrygdSak, IInfotrygdsaker } from '../../typer/infotrygd';
import { hentFrontendFeilmelding } from '../../utils/ressursUtils';

const MigreringContainer = styled.div`
    margin: 16px;
`;

/*const HentSakerFlex = styled.div`
    margin-top: 32px;
    margin-bottom: 32px;
    display: flex;
`;

const HentSakerKnapp = styled(Knapp)`
    margin-left: 1rem;
    margin-top: auto;
    height: 1rem;
`;*/

const MigreringContent: React.FC = () => {
    const { onSubmit, tilgangFeilmelding, settSubmitRessurs, skjema } = useMigrering();

    const skjemaErLåst = skjema.submitRessurs.status === RessursStatus.HENTER;

    console.log(skjema.submitRessurs);

    return (
        <>
            {/* TODO: Her skal det være et Visittkort, men vi trenger å hente data fra PDL for navn og kjønn. ba-sak må utvides.*/}
            <MigreringContainer>
                <Innholdstittel>Sakshistorikk fra Infotrygd</Innholdstittel>
                <SkjemaGruppe feil={hentFrontendFeilmelding(skjema.submitRessurs)}>
                    <Input {...skjema.felter.ident.hentNavInputProps(skjema.visFeilmeldinger)} />
                </SkjemaGruppe>
                <Knapp
                    mini
                    spinner={skjema.submitRessurs.status === RessursStatus.HENTER}
                    disabled={skjemaErLåst}
                    onClick={() => {
                        onSubmit(
                            {
                                method: 'POST',
                                data: { ident: skjema.felter.ident.verdi },
                                url: '/familie-ba-sak/api/infotrygd/hent-infotrygdsaker-for-soker',
                            },
                            (ressurs: Ressurs<IInfotrygdsaker>) => {
                                if (ressurs.status === RessursStatus.SUKSESS) {
                                    if (!ressurs.data.harTilgang) {
                                        settSubmitRessurs(
                                            byggFunksjonellFeilRessurs<IInfotrygdsaker>(
                                                tilgangFeilmelding(
                                                    ressurs.data.adressebeskyttelsegradering
                                                )
                                            )
                                        );
                                        /*settInfotrygdsaker(
                                            sorterSakerEtterSaksnr(ressurs.data.saker)
                                        );*/
                                    } else {
                                        /*
                                        Her kan man evt. sette status til FEILET i etterkant,
                                        så frontendFeilmelding eksponeres,
                                        men ressurs.status kan ikke bli satt.
                                        
                                        Dette bruksmønsteret oppstår fordi vi sender med data,
                                        og da må Ressurs være SUKSESS, for Ressurs er typet slik
                                        at data-feltet eksponeres kun ved SUKSESS.

                                        Alternativt: La Ressurs-typen eksponere data også ved
                                        FEILET-status.

                                        Kode:
                                        ressurs.status = RessursStatus.FEILET;
                                        ressurs.frontendFeilmelding = tilgangFeilmelding(
                                            ressurs.data.adressebeskyttelsegradering
                                        );*/
                                    }
                                }
                            }
                        );
                    }}
                >
                    Hent saker
                </Knapp>
                {/*<HentSakerFlex>
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
                    </HentSakerFlex>*/}
                {/* TODO: switch på RessurStatus for å håndtere alle mulige statuser.*/}
                <table className="tabell">
                    <thead>
                        <tr>
                            <th>Saksblokk</th>
                            <th>Mottatt</th>
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
                        {/* Trekk ut tabell, og send data.saker som prop for å unngå ressurs-status-sjekk */}
                        {skjema.submitRessurs.status === RessursStatus.SUKSESS &&
                            skjema.submitRessurs.data.saker.map(
                                (infotrygdsak: IInfotrygdSak, index: number) => {
                                    return (
                                        <tr key={index}>
                                            <td>
                                                {(infotrygdsak.saksblokk ?? '') +
                                                    (infotrygdsak.saksnr ?? '')}
                                            </td>
                                            <td>{infotrygdsak.mottattdato}</td>
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
                                }
                            )}
                        {/* TODO: vis frontendFeilmelding */}
                    </tbody>
                </table>
            </MigreringContainer>
        </>
    );
};

const Migrering: React.FC = () => {
    return <MigreringContent />;
};

export default Migrering;
