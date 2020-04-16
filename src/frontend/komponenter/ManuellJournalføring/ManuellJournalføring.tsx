import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router';
import { useOppgaver } from '../../context/OppgaverContext';
import { RessursStatus, Ressurs } from '../../typer/ressurs';
import { Systemtittel } from 'nav-frontend-typografi';
import SystemetLaster from '../Felleskomponenter/SystemetLaster/SystemetLaster';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { IPerson } from '../../typer/person';
import Skjemasteg from '../Felleskomponenter/Skjemasteg/Skjemasteg';
import { useApp } from '../../context/AppContext';
import { IRestOppdaterJournalpost } from '../../typer/oppgave';
import { Input, RadioGruppe, Radio } from 'nav-frontend-skjema';
import Datovegler from '../Felleskomponenter/Datovelger/Datovelger';
import { datoformat } from '../../utils/formatter';
import moment from 'moment';
import PersonInformasjon from '../Felleskomponenter/PersonInformasjon/PersonInformasjon';

const ManuellJournalføring: React.FC = () => {
    const { oppgaveId } = useParams();
    const { axiosRequest } = useApp();
    const history = useHistory();
    const { hentDataForManuellJournalføring, dataForManuellJournalføring } = useOppgaver();

    const [dokumentTittel, settDokumentTittel] = useState('');
    const [annetInnhold, settAnnetInnhold] = useState('');
    const [knyttTilFagsak, settKnyttTilFagsak] = useState(true);
    const [mottattDato, settMottattDato] = useState(moment(undefined).format(datoformat.ISO_DAG));
    const [senderInn, settSenderInn] = useState(false);

    React.useEffect(() => {
        if (oppgaveId) {
            hentDataForManuellJournalføring(oppgaveId);
        }
    }, [oppgaveId]);

    switch (dataForManuellJournalføring.status) {
        case RessursStatus.IKKE_HENTET:
        case RessursStatus.HENTER:
            return <SystemetLaster />;
        case RessursStatus.SUKSESS:
            const personData: IPerson = dataForManuellJournalføring.data.person;

            return (
                <Skjemasteg
                    className={'journalføring'}
                    tittel={'Registrere journalpost: Barnetrygd'}
                    forrigeOnClick={() => {
                        history.push(`/oppgaver`);
                    }}
                    nesteOnClick={() => {
                        settSenderInn(true);
                        axiosRequest<string, IRestOppdaterJournalpost>({
                            method: 'POST',
                            url: `/oppgaver/${oppgaveId}`,
                            data: {
                                bruker: {
                                    navn: personData.navn,
                                    ident: personData.personIdent,
                                },
                                avsender: {
                                    navn: personData.navn,
                                    ident: personData.personIdent,
                                },
                                mottattDato: '',
                                dokumentType: dokumentTittel,
                                annetInnhold: '',
                                knyttTilFagsak,
                            },
                        })
                            .then((fagsakId: Ressurs<string>) => {
                                settSenderInn(false);
                                if (fagsakId.status === RessursStatus.SUKSESS) {
                                    history.push(`/fagsak/${fagsakId.data}`);
                                }
                            })
                            .catch(() => {
                                settSenderInn(false);
                            });
                    }}
                    senderInn={senderInn}
                >
                    <br />
                    <PersonInformasjon person={dataForManuellJournalføring.data.person} />
                    <br />

                    <Input
                        bredde={'XL'}
                        label={'Dokumenttype'}
                        value={dokumentTittel}
                        onChange={(event: any) => settDokumentTittel(event.target.value)}
                    />

                    <br />
                    <Datovegler
                        id={'manuell-journalføring-mottatt-dato'}
                        label={'Mottatt dato'}
                        valgtDato={mottattDato}
                        onChange={(dato: string) => settMottattDato(dato)}
                    />

                    <br />
                    <Input
                        bredde={'XL'}
                        label={'Annet innhold'}
                        value={annetInnhold}
                        onChange={(event: any) => settAnnetInnhold(event.target.value)}
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
                </Skjemasteg>
            );
        default:
            return <AlertStripeFeil children={'Uventet feil ved henting av oppgave'} />;
    }
};

export default ManuellJournalføring;
