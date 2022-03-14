import * as React from 'react';

import classNames from 'classnames';

import { Knapp } from 'nav-frontend-knapper';
import PanelBase from 'nav-frontend-paneler';
import { Feilmelding, Undertittel } from 'nav-frontend-typografi';

import { FamilieInput } from '@navikt/familie-form-elements';
import { useHttp } from '@navikt/familie-http';
import { useFelt, Valideringsstatus } from '@navikt/familie-skjema';
import { RessursStatus } from '@navikt/familie-typer';
import type { Ressurs } from '@navikt/familie-typer';

import type { IPersonInfo } from '../../../typer/person';
import { sjekkTilgangTilPerson } from '../../../utils/commons';
import { identValidator } from '../../../utils/validators';
import Informasjonsbolk from '../Informasjonsbolk/Informasjonsbolk';

interface IProps {
    erLesevisning?: boolean;
    person: Ressurs<IPersonInfo>;
    settPerson: (person: Ressurs<IPersonInfo>) => void;
}

const HentPerson: React.FunctionComponent<IProps> = ({
    erLesevisning = false,
    person,
    settPerson,
}) => {
    const { request } = useHttp();
    const ident = useFelt({
        verdi: '',
        valideringsfunksjon: identValidator,
    });

    React.useEffect(() => {
        if (person.status === RessursStatus.SUKSESS) {
            ident.onChange(person.data.personIdent);
        }
    }, [person.status]);
    const [visFeilmelding, settVisFeilmelding] = React.useState(false);

    return (
        <div className={'hentperson'}>
            <div className={'hentperson__inputogknapp'}>
                <FamilieInput
                    {...ident.hentNavInputProps(visFeilmelding)}
                    erLesevisning={erLesevisning}
                    id={'hent-person'}
                    label={'Ident'}
                    bredde={'XL'}
                    placeholder={'fnr/dnr'}
                />
                {!erLesevisning && (
                    <Knapp
                        onClick={() => {
                            if (
                                ident.valideringsstatus === Valideringsstatus.OK ||
                                process.env.NODE_ENV === 'development'
                            ) {
                                settPerson({ status: RessursStatus.HENTER });
                                request<void, IPersonInfo>({
                                    method: 'GET',
                                    url: '/familie-ba-sak/api/person',
                                    headers: {
                                        personIdent: ident.verdi,
                                    },
                                })
                                    .then((hentetPerson: Ressurs<IPersonInfo>) => {
                                        settPerson(sjekkTilgangTilPerson(hentetPerson));
                                    })
                                    .catch(() => {
                                        settPerson({
                                            status: RessursStatus.FEILET,
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
            {(person.status === RessursStatus.FEILET ||
                person.status === RessursStatus.FUNKSJONELL_FEIL ||
                person.status === RessursStatus.IKKE_TILGANG) && (
                <>
                    <br />
                    <Feilmelding children={person.frontendFeilmelding} />
                </>
            )}
        </div>
    );
};

export default HentPerson;
