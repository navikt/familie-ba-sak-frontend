import * as React from 'react';
import PanelBase from 'nav-frontend-paneler';
import { Undertittel } from 'nav-frontend-typografi';
import HentPerson from '../../Felleskomponenter/HentPerson/HentPerson';
import { Ressurs, RessursStatus } from '../../../typer/ressurs';
import { IPerson } from '../../../typer/person';
import { ISøknadDTO } from '../../../typer/søknad';
import { useBehandling } from '../../../context/BehandlingContext';

interface IProps {
    settSøknadOgValider: (søknad: ISøknadDTO) => void;
    søknad: ISøknadDTO;
}

const AnnenPart: React.FunctionComponent<IProps> = ({ settSøknadOgValider, søknad }) => {
    const { erLesevisning } = useBehandling();
    const [annenPart, settAnnenPart] = React.useState<Ressurs<IPerson>>({
        status: RessursStatus.IKKE_HENTET,
    });

    return (
        <PanelBase>
            <Undertittel children={'Opplysninger om den andre forelderen'} />
            <br />
            <HentPerson
                erLesevisning={erLesevisning()}
                person={annenPart}
                settPerson={(person: Ressurs<IPerson>) => {
                    if (person.status === RessursStatus.SUKSESS) {
                        settSøknadOgValider({
                            ...søknad,
                            annenPartIdent: person.data.personIdent,
                        });
                    }

                    settAnnenPart(person);
                }}
            />
        </PanelBase>
    );
};

export default AnnenPart;
