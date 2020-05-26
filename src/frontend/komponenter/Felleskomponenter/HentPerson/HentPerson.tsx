import classNames from 'classnames';
import { Knapp } from 'nav-frontend-knapper';
import PanelBase from 'nav-frontend-paneler';
import { Feilmelding, Undertittel } from 'nav-frontend-typografi';
import * as React from 'react';
import { useApp } from '../../../context/AppContext';
import { useBehandling } from '../../../context/BehandlingContext';
import { IFelt, Valideringsstatus } from '../../../typer/felt';
import { IPerson } from '../../../typer/person';
import { Ressurs, RessursStatus } from '../../../typer/ressurs';
import { identValidator, lagInitiellFelt, validerFelt } from '../../../utils/validators';
import Informasjonsbolk from '../Informasjonsbolk/Informasjonsbolk';
import FamilieInput from '../InputMedLesevisning/FamilieInput';

interface IProps {
    person: Ressurs<IPerson>;
    settPerson: (person: Ressurs<IPerson>) => void;
}

const HentPerson: React.FunctionComponent<IProps> = ({ person, settPerson }) => {
    const { axiosRequest } = useApp();
    const { erLesevisning } = useBehandling();
    const [ident, settIdent] = React.useState<IFelt<string>>(lagInitiellFelt('', identValidator));

    React.useEffect(() => {
        if (person.status === RessursStatus.SUKSESS) {
            settIdent({
                ...ident,
                verdi: person.data.personIdent,
            });
        }
    }, [person.status]);
    const [visFeilmelding, settVisFeilmelding] = React.useState(false);

    return (
        <div className={'hentperson'}>
            <div className={'hentperson__inputogknapp'}>
                <FamilieInput
                    id={'hent-person'}
                    label={'Ident'}
                    bredde={'XL'}
                    value={ident.verdi}
                    placeholder={'fnr/dnr'}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        settIdent(validerFelt(event.target.value, ident));
                    }}
                    feil={
                        visFeilmelding &&
                        ident.valideringsstatus === Valideringsstatus.FEIL &&
                        ident.feilmelding
                    }
                />
                {!erLesevisning() && (
                    <Knapp
                        onClick={() => {
                            if (
                                ident.valideringsstatus === Valideringsstatus.OK ||
                                process.env.NODE_ENV === 'development'
                            ) {
                                settPerson({ status: RessursStatus.HENTER });
                                axiosRequest<IPerson, void>({
                                    method: 'GET',
                                    url: '/familie-ba-sak/api/person',
                                    headers: {
                                        personIdent: ident.verdi,
                                    },
                                })
                                    .then((hentetPerson: Ressurs<IPerson>) => {
                                        settPerson(hentetPerson);
                                    })
                                    .catch(() => {
                                        settPerson({
                                            status: RessursStatus.FEILET,
                                            melding: 'Ukjent feil ved henting av person',
                                            frontendFeilmelding:
                                                'Ukjent feil ved henting av person',
                                        });
                                    });
                            } else {
                                settVisFeilmelding(true);
                            }
                        }}
                        children={'Hent'}
                        spinner={person.status === RessursStatus.HENTER}
                    />
                )}
            </div>

            {person.status === RessursStatus.SUKSESS && (
                <PanelBase className={classNames('hentperson__panel', 'panel--gra')}>
                    <Undertittel children={'Fant person'} />
                    <Informasjonsbolk
                        informasjon={[
                            {
                                label: 'Navn',
                                tekst: person.data.navn,
                            },
                            {
                                label: 'Fødselsdato',
                                tekst: person.data.fødselsdato,
                            },
                            {
                                label: 'Kjønn',
                                tekst: person.data.kjønn,
                            },
                        ]}
                    />
                </PanelBase>
            )}
            {person.status === RessursStatus.FEILET && (
                <>
                    <br />
                    <Feilmelding children={person.melding} />
                </>
            )}
        </div>
    );
};

export default HentPerson;
