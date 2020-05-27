import { AlertStripeAdvarsel, AlertStripeFeil } from 'nav-frontend-alertstriper';
import { Knapp } from 'nav-frontend-knapper';
import Lukknapp from 'nav-frontend-lukknapp';
import PanelBase from 'nav-frontend-paneler';
import {
    Feiloppsummering,
    FeiloppsummeringFeil,
    Input,
    Radio,
    RadioGruppe,
    Select,
} from 'nav-frontend-skjema';
import { Undertittel } from 'nav-frontend-typografi';
import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { useApp } from '../../context/AppContext';
import { useOppgaver } from '../../context/OppgaverContext';
import {
    Dokumenttype,
    dokumenttyper,
    IDokumentInfo,
    ILogiskVedlegg,
    IRestOppdaterJournalpost,
    Journalstatus,
} from '../../typer/oppgave';
import { IPerson } from '../../typer/person';
import { byggTomRessurs, Ressurs, RessursStatus } from '../../typer/ressurs';
import { randomUUID } from '../../utils/commons';
import HentPerson from '../Felleskomponenter/HentPerson/HentPerson';
import Skjemasteg from '../Felleskomponenter/Skjemasteg/Skjemasteg';
import SystemetLaster from '../Felleskomponenter/SystemetLaster/SystemetLaster';

const ManuellJournalføring: React.FC = () => {
    const { oppgaveId } = useParams();
    const { axiosRequest, innloggetSaksbehandler } = useApp();
    const history = useHistory();
    const { hentDataForManuellJournalføring, dataForManuellJournalføring } = useOppgaver();

    const [dokumenttype, settDokumenttype] = useState<Dokumenttype>(
        Dokumenttype.SØKNAD_OM_ORDINÆR_BARNETRYGD
    );
    const [logiskeVedlegg, settLogiskeVedlegg] = useState<ILogiskVedlegg[]>([]);
    const [knyttTilFagsak, settKnyttTilFagsak] = useState(true);
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
            dataForManuellJournalføring.data.person !== undefined &&
            dataForManuellJournalføring.data.person !== null
        ) {
            settPerson({
                status: RessursStatus.SUKSESS,
                data: dataForManuellJournalføring.data.person,
            });
        }

        if (dataForManuellJournalføring.status === RessursStatus.SUKSESS) {
            if (dataForManuellJournalføring.data.journalpost.dokumenter) {
                settLogiskeVedlegg(
                    dataForManuellJournalføring.data.journalpost.dokumenter[0].logiskeVedlegg ?? []
                );
            }
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
                            const dokumenter: IDokumentInfo[] | undefined =
                                dataForManuellJournalføring.data.journalpost.dokumenter;

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
                                    datoMottatt:
                                        dataForManuellJournalføring.data.journalpost.datoMottatt,
                                    dokumentTittel: dokumenttyper[dokumenttype].navn,
                                    dokumentInfoId: dokumenter
                                        ? dokumenter[0].dokumentInfoId ?? ''
                                        : '',
                                    eksisterendeLogiskeVedlegg: dokumenter
                                        ? dokumenter[0].logiskeVedlegg
                                        : [],
                                    logiskeVedlegg,
                                    knyttTilFagsak,
                                    navIdent: innloggetSaksbehandler?.navIdent ?? '',
                                },
                            })
                                .then((fagsakId: Ressurs<string>) => {
                                    settSenderInn(false);
                                    if (
                                        fagsakId.status === RessursStatus.SUKSESS &&
                                        fagsakId.data !== ''
                                    ) {
                                        history.push(`/fagsak/${fagsakId.data}/saksoversikt`);
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

                    <Select
                        bredde={'xl'}
                        id={'manuell-journalføring-dokumenttype'}
                        label={'Dokumenttype'}
                        value={dokumenttype}
                        onChange={event => {
                            settDokumenttype(event.target.value as Dokumenttype);
                            validerSkjema();
                        }}
                    >
                        {Object.keys(dokumenttyper).map((key: string) => {
                            return (
                                <option aria-selected={dokumenttype === key} key={key} value={key}>
                                    {dokumenttyper[key].navn}
                                </option>
                            );
                        })}
                    </Select>

                    <br />
                    <PanelBase className={'panel--gra'}>
                        <Undertittel children={'Annet innhold'} />
                        {logiskeVedlegg.map((logiskVedlegg: ILogiskVedlegg, index: number) => {
                            return (
                                <div key={index} className={'journalføring__logisk-vedlegg'}>
                                    <Input
                                        className={'journalføring__logisk-vedlegg--input'}
                                        label={'Tittel'}
                                        value={logiskVedlegg.tittel}
                                        bredde={'XXL'}
                                        onChange={event => {
                                            settLogiskeVedlegg(
                                                logiskeVedlegg.map((lVedlegg: ILogiskVedlegg) => {
                                                    if (
                                                        lVedlegg.logiskVedleggId ===
                                                        logiskVedlegg.logiskVedleggId
                                                    ) {
                                                        return {
                                                            ...lVedlegg,
                                                            tittel: event.target.value,
                                                        };
                                                    } else {
                                                        return lVedlegg;
                                                    }
                                                })
                                            );
                                        }}
                                    />
                                    <Lukknapp
                                        onClick={() => {
                                            settLogiskeVedlegg(
                                                logiskeVedlegg.filter(
                                                    (lVedlegg: ILogiskVedlegg) =>
                                                        lVedlegg.logiskVedleggId !==
                                                        logiskVedlegg.logiskVedleggId
                                                )
                                            );
                                        }}
                                    />
                                </div>
                            );
                        })}

                        <br />
                        <Knapp
                            mini={true}
                            onClick={() => {
                                settLogiskeVedlegg([
                                    ...logiskeVedlegg,
                                    {
                                        logiskVedleggId: randomUUID(),
                                        tittel: '',
                                    },
                                ]);
                            }}
                        >
                            Legg til innhold
                        </Knapp>
                    </PanelBase>
                    <br />
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
