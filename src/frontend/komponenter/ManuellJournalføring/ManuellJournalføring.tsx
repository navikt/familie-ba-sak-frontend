import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router';
import { useOppgaver } from '../../context/OppgaverContext';
import { RessursStatus, Ressurs, byggTomRessurs } from '../../typer/ressurs';
import SystemetLaster from '../Felleskomponenter/SystemetLaster/SystemetLaster';
import { AlertStripeAdvarsel, AlertStripeFeil } from 'nav-frontend-alertstriper';
import { IPerson } from '../../typer/person';
import Skjemasteg from '../Felleskomponenter/Skjemasteg/Skjemasteg';
import { useApp } from '../../context/AppContext';
import { IRestOppdaterJournalpost, Journalstatus } from '../../typer/oppgave';
import {
    Input,
    RadioGruppe,
    Radio,
    FeiloppsummeringFeil,
    Feiloppsummering,
} from 'nav-frontend-skjema';
import Datovelger from '../Felleskomponenter/Datovelger/Datovelger';
import { datoformat } from '../../utils/formatter';
import moment from 'moment';
import HentPerson from '../Felleskomponenter/HentPerson/HentPerson';
import { Undertittel } from 'nav-frontend-typografi';
import { ISaksbehandler } from '../../typer/saksbehandler';

interface IProps {
    innloggetSaksbehandler?: ISaksbehandler;
}

const ManuellJournalføring: React.FC<IProps> = ({ innloggetSaksbehandler }) => {
    const { oppgaveId } = useParams();
    const { axiosRequest } = useApp();
    const history = useHistory();
    const { hentDataForManuellJournalføring, dataForManuellJournalføring } = useOppgaver();

    const [dokumentType, settDokumenttype] = useState('');
    const [annetInnhold, settAnnetInnhold] = useState('');
    const [knyttTilFagsak, settKnyttTilFagsak] = useState(true);
    const [mottattDato, settMottattDato] = useState(moment(undefined).format(datoformat.ISO_DAG));
    const [senderInn, settSenderInn] = useState(false);
    const [visFeilmeldinger, settVisfeilmeldinger] = useState(false);

    const [feilmeldinger, settFeilmeldinger] = useState<FeiloppsummeringFeil[]>([]);

    const [person, settPerson] = useState<Ressurs<IPerson>>(byggTomRessurs());

    React.useEffect(() => {
        if (oppgaveId) {
            hentDataForManuellJournalføring(oppgaveId);
        }
    }, [oppgaveId]);

    React.useEffect(() => {
        if (
            dataForManuellJournalføring.status === RessursStatus.SUKSESS &&
            dataForManuellJournalføring.data.person !== undefined
        ) {
            settPerson({
                status: RessursStatus.SUKSESS,
                data: dataForManuellJournalføring.data.person,
            });
        }
    }, [dataForManuellJournalføring.status]);

    const validerSkjema = () => {
        const accFeilmeldinger: FeiloppsummeringFeil[] = [];

        if (person.status !== RessursStatus.SUKSESS) {
            accFeilmeldinger.push({
                feilmelding: 'Du må knytte bruker til journalposten',
                skjemaelementId: 'hent-person',
            });
        }

        if (dokumentType === '') {
            accFeilmeldinger.push({
                feilmelding: 'Du må sette dokumenttype for dokumentet',
                skjemaelementId: 'manuell-journalføring-dokumenttype',
            });
        }

        if (annetInnhold === '') {
            accFeilmeldinger.push({
                feilmelding: 'Du må sette annet innhold for dokumentet',
                skjemaelementId: 'manuell-journalføring-annet-innhold',
            });
        }

        settFeilmeldinger(accFeilmeldinger);
        return accFeilmeldinger;
    };

    switch (dataForManuellJournalføring.status) {
        case RessursStatus.IKKE_HENTET:
        case RessursStatus.HENTER:
            return <SystemetLaster />;
        case RessursStatus.SUKSESS:
            return dataForManuellJournalføring.data.journalpost.journalstatus ===
                Journalstatus.MOTTATT ? (
                <Skjemasteg
                    className={'journalføring'}
                    tittel={'Registrere journalpost: Barnetrygd'}
                    forrigeKnappTittel={'Avbryt'}
                    forrigeOnClick={() => {
                        history.push(`/oppgaver`);
                    }}
                    nesteKnappTittel={'Journalfør'}
                    nesteOnClick={() => {
                        const accFeilmeldinger = validerSkjema();

                        if (
                            accFeilmeldinger.length === 0 &&
                            person.status === RessursStatus.SUKSESS
                        ) {
                            settSenderInn(true);
                            axiosRequest<string, IRestOppdaterJournalpost>({
                                method: 'PUT',
                                url: `/familie-ba-sak/api/journalpost/${
                                    dataForManuellJournalføring.data.journalpost.journalpostId
                                }/ferdigstill/${oppgaveId}?journalfoerendeEnhet=${innloggetSaksbehandler?.enhet ??
                                    '9999'}`,
                                data: {
                                    bruker: {
                                        navn: person.data.navn,
                                        id: person.data.personIdent,
                                    },
                                    avsender: {
                                        navn: person.data.navn,
                                        id: person.data.personIdent,
                                    },
                                    mottattDato,
                                    dokumentType,
                                    annetInnhold,
                                    knyttTilFagsak,
                                },
                            })
                                .then((fagsakId: Ressurs<string>) => {
                                    settSenderInn(false);
                                    if (
                                        fagsakId.status === RessursStatus.SUKSESS &&
                                        fagsakId.data !== ''
                                    ) {
                                        history.push(`/fagsak/${fagsakId.data}/registrer-soknad`);
                                    } else if (fagsakId.status === RessursStatus.SUKSESS) {
                                        history.push('/oppgaver');
                                    }
                                })
                                .catch(() => {
                                    settSenderInn(false);
                                });
                        } else {
                            settVisfeilmeldinger(true);
                        }
                    }}
                    senderInn={senderInn}
                >
                    <br />
                    <Undertittel children={'Bruker'} />
                    <HentPerson
                        person={person}
                        settPerson={(hentetPerson: Ressurs<IPerson>) => {
                            settPerson(hentetPerson);
                            validerSkjema();
                        }}
                    />
                    <br />

                    <Input
                        bredde={'XL'}
                        id={'manuell-journalføring-dokumenttype'}
                        label={'Dokumenttype'}
                        value={dokumentType}
                        onChange={(event: any) => {
                            settDokumenttype(event.target.value);
                            validerSkjema();
                        }}
                    />

                    <br />
                    <Datovelger
                        id={'manuell-journalføring-mottatt-dato'}
                        label={'Mottatt dato'}
                        valgtDato={mottattDato}
                        onChange={(dato: string) => settMottattDato(dato)}
                    />

                    <br />
                    <Input
                        bredde={'XL'}
                        id={'manuell-journalføring-annet-innhold'}
                        label={'Annet innhold'}
                        value={annetInnhold}
                        onChange={(event: any) => {
                            settAnnetInnhold(event.target.value);
                            validerSkjema();
                        }}
                    />
                    <br />

                    <RadioGruppe legend={'Knytt til fagsak'}>
                        <Radio
                            name={'ja'}
                            label={'Ja'}
                            checked={knyttTilFagsak}
                            onChange={() => settKnyttTilFagsak(true)}
                        />
                        <Radio
                            name={'nei'}
                            label={'Nei'}
                            checked={!knyttTilFagsak}
                            onChange={() => settKnyttTilFagsak(false)}
                        />
                    </RadioGruppe>

                    {feilmeldinger.length > 0 && visFeilmeldinger && (
                        <Feiloppsummering
                            tittel={'For å gå videre må du rette opp følgende:'}
                            feil={feilmeldinger}
                        />
                    )}
                </Skjemasteg>
            ) : (
                <AlertStripeAdvarsel
                    children={`Journalposten har status ${dataForManuellJournalføring.data.journalpost.journalstatus}. Kan bare manuelt journalføre journalposter med status MOTTATT.`}
                />
            );
        default:
            return <AlertStripeFeil children={'Uventet feil ved henting av oppgave'} />;
    }
};

export default ManuellJournalføring;
