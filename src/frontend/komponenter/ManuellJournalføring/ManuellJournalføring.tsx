import { AlertStripeAdvarsel, AlertStripeFeil } from 'nav-frontend-alertstriper';
import KnappBase, { Knapp } from 'nav-frontend-knapper';
import Lukknapp from 'nav-frontend-lukknapp';
import PanelBase from 'nav-frontend-paneler';
import { Feiloppsummering, Input, Select } from 'nav-frontend-skjema';
import { Feilmelding, Undertittel } from 'nav-frontend-typografi';
import moment from 'moment';
import React from 'react';
import { useHistory } from 'react-router';
import { IPerson } from '../../typer/person';
import { Ressurs, RessursStatus } from '../../typer/ressurs';
import { randomUUID } from '../../utils/commons';
import HentPerson from '../Felleskomponenter/HentPerson/HentPerson';
import Skjemasteg from '../Felleskomponenter/Skjemasteg/Skjemasteg';
import {
    ManuellJournalføringProvider,
    useManuellJournalføring,
} from '../../context/ManuellJournalføringContext';
import {
    Dokumenttype,
    dokumenttyper,
    ILogiskVedlegg,
    Journalstatus,
} from '../../typer/manuell-journalføring';
import { FamilieCheckbox } from '@navikt/familie-form-elements/dist';
import {
    BehandlingKategori,
    Behandlingstype,
    BehandlingUnderkategori,
    IBehandling,
} from '../../typer/behandling';
import { datoformat, formaterDato } from '../../utils/formatter';
import Pluss from '../../ikoner/Pluss';
import useFagsakApi from '../Fagsak/useFagsakApi';
import { IOpprettBehandlingBarn } from '../../context/OpprettBehandlingContext';

const ManuellJournalføringContent: React.FC = () => {
    const history = useHistory();
    const {
        dataForManuellJournalføring,
        dokumenttype,
        feilmeldinger,
        innsendingsfeilmelding,
        tilknyttedeBehandlingIder,
        logiskeVedlegg,
        manueltJournalfør,
        person,
        senderInn,
        settDokumenttype,
        settTilknyttedeBehandlingIder,
        settLogiskeVedlegg,
        settPerson,
        validerSkjema,
        visFeilmeldinger,
    } = useManuellJournalføring();

    const { opprettEllerHentFagsak, opprettBehandling } = useFagsakApi(
        _ => {
            'Feilmelding';
        },
        _ => {
            'Feilmelding';
        }
    );

    const behandlinger =
        dataForManuellJournalføring.status === RessursStatus.SUKSESS &&
        dataForManuellJournalføring.data.fagsak?.behandlinger;

    switch (dataForManuellJournalføring.status) {
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
                        manueltJournalfør();
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
                        label={'Dokumenttittel'}
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
                    {behandlinger && behandlinger.length > 0 ? (
                        <table className="tabell">
                            <thead className="tabell__head">
                                <tr className="tabell__head__tr">
                                    <th>{'Behandlingstype'}</th>
                                    <th>{'Status'}</th>
                                    <th>{'Dato'}</th>
                                </tr>
                            </thead>
                            <tbody className="tabell__body">
                                {behandlinger.map((behandling: IBehandling) => (
                                    <tr>
                                        <td className={'behandlingliste__tabell--behandlingtype'}>
                                            <FamilieCheckbox
                                                erLesevisning={false}
                                                label={behandling.type}
                                                defaultChecked={tilknyttedeBehandlingIder.includes(
                                                    behandling.behandlingId
                                                )}
                                                onChange={() => {
                                                    const id = behandling.behandlingId;
                                                    const index = tilknyttedeBehandlingIder.indexOf(
                                                        id
                                                    );
                                                    if (index > -1) {
                                                        tilknyttedeBehandlingIder.splice(index, 1);
                                                        settTilknyttedeBehandlingIder(
                                                            tilknyttedeBehandlingIder
                                                        );
                                                    } else {
                                                        settTilknyttedeBehandlingIder(
                                                            tilknyttedeBehandlingIder.concat(id)
                                                        );
                                                    }
                                                }}
                                            />
                                        </td>
                                        <td className={'behandlingliste__tabell--status'}>
                                            {behandling.status}
                                        </td>
                                        <td className={'behandlingliste__tabell--dato'}>
                                            {formaterDato(
                                                moment(behandling.opprettetTidspunkt),
                                                datoformat.DATO_FORKORTTET
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <KnappBase // TODO: Bruke "Utførknapp"? Problem med at useBehandling lesevisning ikke er tilgjengelig
                            aria-label={`utfør_opprettfagsakogbehandlingvedjournalføring}`}
                            className={'ikon-knapp'}
                            id={'d'}
                            onClick={() => {
                                // TODO: Her er jeg usikker på om vi bør lage en egen metode "opprettFagsakMedBehandling". Eksisterende metoder pusher nye sider og i tillegg blir det feil med opprettelse av behandling når man prøver begge i et jafs som her
                                opprettEllerHentFagsak({
                                    personIdent:
                                        dataForManuellJournalføring.data.person?.personIdent, // TODO: Mulig vi skal benytte aktørid her i stedet? Må i så fall oppdatere mock
                                    aktørId: null, //dataForManuellJournalføring.data.oppgave.aktoerId,
                                });
                                opprettBehandling({
                                    // TODO: Fyll inn med ordentlig data
                                    behandlingType: Behandlingstype.FØRSTEGANGSBEHANDLING,
                                    søkersIdent:
                                        dataForManuellJournalføring.data.person?.personIdent,
                                    kategori: BehandlingKategori.NASJONAL,
                                    underkategori: BehandlingUnderkategori.ORDINÆR,
                                    barnasIdenter: [],
                                });
                            }}
                            type="flat"
                            kompakt={true}
                        >
                            <Pluss />
                            {'Opprett ny behandling'}
                        </KnappBase>
                    )}

                    {feilmeldinger.length > 0 && visFeilmeldinger && (
                        <Feiloppsummering
                            tittel={'For å gå videre må du rette opp følgende:'}
                            feil={feilmeldinger}
                        />
                    )}

                    {visFeilmeldinger && <Feilmelding children={innsendingsfeilmelding} />}
                </Skjemasteg>
            ) : (
                <AlertStripeAdvarsel
                    children={`Journalposten har status ${dataForManuellJournalføring.data.journalpost.journalstatus}. Kan bare manuelt journalføre journalposter med status MOTTATT.`}
                />
            );
        case RessursStatus.FEILET:
            return <AlertStripeFeil children={dataForManuellJournalføring.frontendFeilmelding} />;
        default:
            return <div />;
    }
};

const ManuellJournalføring: React.FC = () => {
    return (
        <ManuellJournalføringProvider>
            <ManuellJournalføringContent />
        </ManuellJournalføringProvider>
    );
};

export default ManuellJournalføring;
