import { AlertStripeAdvarsel, AlertStripeFeil } from 'nav-frontend-alertstriper';
import { Knapp } from 'nav-frontend-knapper';
import Lukknapp from 'nav-frontend-lukknapp';
import PanelBase from 'nav-frontend-paneler';
import { Feiloppsummering, Input, Radio, RadioGruppe, Select } from 'nav-frontend-skjema';
import { Undertittel, Feilmelding } from 'nav-frontend-typografi';
import React from 'react';
import { useHistory } from 'react-router';
import { IPerson } from '../../typer/person';
import { Ressurs, RessursStatus } from '../../typer/ressurs';
import { randomUUID } from '../../utils/commons';
import HentPerson from '../Felleskomponenter/HentPerson/HentPerson';
import Skjemasteg from '../Felleskomponenter/Skjemasteg/Skjemasteg';
import {
    useManuellJournalføring,
    ManuellJournalføringProvider,
} from '../../context/ManuellJournalføringContext';
import {
    Journalstatus,
    Dokumenttype,
    dokumenttyper,
    ILogiskVedlegg,
} from '../../typer/manuell-journalføring';

const ManuellJournalføringContent: React.FC = () => {
    const history = useHistory();
    const {
        dataForManuellJournalføring,
        dokumenttype,
        feilmeldinger,
        innsendingsfeilmelding,
        knyttTilFagsak,
        logiskeVedlegg,
        manueltJournalfør,
        person,
        senderInn,
        settDokumenttype,
        settKnyttTilFagsak,
        settLogiskeVedlegg,
        settPerson,
        validerSkjema,
        visFeilmeldinger,
    } = useManuellJournalføring();

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
