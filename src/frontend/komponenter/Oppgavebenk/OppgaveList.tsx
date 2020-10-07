import Alertstripe from 'nav-frontend-alertstriper';
import { Knapp } from 'nav-frontend-knapper';
import Lenke from 'nav-frontend-lenker';
import { Systemtittel, Normaltekst } from 'nav-frontend-typografi';
import React from 'react';
import { useApp } from '../../context/AppContext';
import { useOppgaver } from '../../context/OppgaverContext';
import {
    enhetFilter,
    gjelderFilter,
    IOppgave,
    OppgavetypeFilter,
    oppgaveTypeFilter,
    PrioritetFilter,
    adressebeskyttelsestyper,
    ITilgangDTO,
} from '../../typer/oppgave';
import { RessursStatus } from '@navikt/familie-typer';
import { fnr } from '../../utils/oppgave';
import OppgavelisteNavigator from './OppgavelisteNavigator';
import OppgavelisteSaksbehandler from './OppgavelisteSaksbehandler';
import { ariaSortMap, FeltSortOrder, IOppgaveFelt, sortLenkClassNameMap } from './oppgavefelter';
import classNames from 'classnames';
import UIModalWrapper from '../Felleskomponenter/Modal/UIModalWrapper';
import IkkeOppfylt from '../../ikoner/IkkeOppfylt';

const intDatoTilNorskDato = (intDato: string) => {
    return `${intDato.substr(8, 2)}.${intDato.substr(5, 2)}.${intDato.substr(2, 2)}`;
};

const OppgaveList: React.FunctionComponent = () => {
    const {
        oppgaver,
        sortOppgave,
        oppgaveFelter,
        hentOppgaveSide,
        gåTilOppgave,
        sjekkTilgang,
    } = useOppgaver();
    const { innloggetSaksbehandler } = useApp();
    const [visModal, settVisModal] = React.useState<boolean>(false);
    const [addressebeskyttelsegradering, settAdressebeskyttelsegradering] = React.useState<string>(
        ''
    );

    const onColumnSort = (felt: IOppgaveFelt) => {
        sortOppgave(felt.nøkkel, felt.order !== FeltSortOrder.ASCENDANT);
    };

    const getAriaSort = (felt: IOppgaveFelt) => ariaSortMap.get(felt.order || FeltSortOrder.NONE);

    const getSortLenkClassName = (felt: IOppgaveFelt) =>
        sortLenkClassNameMap.get(felt.order || FeltSortOrder.NONE);

    const sortertClassName = (felt: IOppgaveFelt) =>
        felt.order !== FeltSortOrder.NONE ? 'tabell__td--sortert' : '';

    return (
        <div className={'oppgavelist'}>
            <div className={'oppgavelist__header'}>
                <Systemtittel>Oppgaveliste</Systemtittel>
                <OppgavelisteNavigator />
            </div>
            <div>
                <table className="tabell">
                    <thead>
                        <tr>
                            {Object.values(oppgaveFelter).map((felt: IOppgaveFelt) => {
                                return felt.order ? (
                                    <th
                                        role="columnheader"
                                        aria-sort={getAriaSort(felt)}
                                        className={classNames(
                                            getSortLenkClassName(felt),
                                            felt.nøkkel
                                        )}
                                        key={felt.nøkkel}
                                    >
                                        <Lenke href="#" onClick={() => onColumnSort(felt)}>
                                            {felt.label}
                                        </Lenke>
                                    </th>
                                ) : (
                                    <th
                                        role="columnheader"
                                        key={felt.nøkkel}
                                        className={felt.nøkkel}
                                    >
                                        {felt.label}
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>
                    {oppgaver.status === RessursStatus.SUKSESS &&
                        oppgaver.data.oppgaver.length > 0 && (
                            <tbody>
                                {hentOppgaveSide().map((oppg: IOppgave, index) => (
                                    <tr key={index}>
                                        <td
                                            className={sortertClassName(
                                                oppgaveFelter.opprettetTidspunkt
                                            )}
                                        >
                                            {oppg.opprettetTidspunkt
                                                ? intDatoTilNorskDato(oppg.opprettetTidspunkt)
                                                : 'Ukjent'}
                                        </td>
                                        <td
                                            className={classNames(
                                                'oppgavetype',
                                                sortertClassName(oppgaveFelter.oppgavetype)
                                            )}
                                        >
                                            {oppg.oppgavetype
                                                ? oppgaveTypeFilter[oppg.oppgavetype].navn
                                                : 'Ukjent'}
                                        </td>
                                        <td
                                            className={sortertClassName(
                                                oppgaveFelter.behandlingstema
                                            )}
                                        >
                                            {oppg.behandlingstema
                                                ? gjelderFilter[oppg.behandlingstema].navn
                                                : 'Ikke satt'}
                                        </td>
                                        <td
                                            className={sortertClassName(
                                                oppgaveFelter.fristFerdigstillelse
                                            )}
                                        >
                                            {oppg.fristFerdigstillelse
                                                ? intDatoTilNorskDato(oppg.fristFerdigstillelse)
                                                : 'Ukjent'}
                                        </td>
                                        <td className={sortertClassName(oppgaveFelter.prioritet)}>
                                            {
                                                PrioritetFilter[
                                                    oppg.prioritet as keyof typeof PrioritetFilter
                                                ]
                                            }
                                        </td>
                                        <td className={'beskrivelse'}>{oppg.beskrivelse}</td>
                                        <td>{fnr(oppg) || 'Ukjent'}</td>
                                        <td
                                            className={classNames(
                                                'tildelt-enhetsnr',
                                                sortertClassName(oppgaveFelter.tildeltEnhetsnr)
                                            )}
                                        >
                                            {oppg.tildeltEnhetsnr
                                                ? enhetFilter[`E${oppg.tildeltEnhetsnr}`]?.navn
                                                : 'Ikke satt'}
                                        </td>
                                        <td
                                            className={classNames(
                                                'tilordnet-ressurs',
                                                sortertClassName(oppgaveFelter.tilordnetRessurs)
                                            )}
                                        >
                                            <OppgavelisteSaksbehandler
                                                oppgave={oppg}
                                                innloggetSaksbehandler={innloggetSaksbehandler}
                                                settAdressebeskyttelsegradering={
                                                    settAdressebeskyttelsegradering
                                                }
                                                settVisTilgangsKontrollModal={settVisModal}
                                            />
                                        </td>
                                        <td className={'handlinger'}>
                                            {oppg.oppgavetype
                                                ? oppgaveTypeFilter[oppg.oppgavetype].id ===
                                                      OppgavetypeFilter.JFR && (
                                                      <button
                                                          key={'tiloppg'}
                                                          onClick={() => {
                                                              sjekkTilgang(oppg).then(
                                                                  (
                                                                      res: ITilgangDTO | undefined
                                                                  ) => {
                                                                      if (res !== undefined) {
                                                                          if (
                                                                              res.saksbehandlerHarTilgang
                                                                          ) {
                                                                              gåTilOppgave(oppg.id);
                                                                          } else {
                                                                              settAdressebeskyttelsegradering(
                                                                                  res.adressebeskyttelsegradering
                                                                              );
                                                                              settVisModal(true);
                                                                          }
                                                                      }
                                                                  }
                                                              );
                                                          }}
                                                          children={'Gå til oppg'}
                                                      />
                                                  )
                                                : 'Ukjent'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        )}
                </table>
            </div>
            {oppgaver.status === RessursStatus.SUKSESS && oppgaver.data.oppgaver.length === 0 && (
                <Alertstripe type="advarsel" className="oppgavelist__info">
                    Ingen oppgaver
                </Alertstripe>
            )}
            {oppgaver.status === RessursStatus.FEILET && (
                <Alertstripe type="feil" className="oppgavelist__info">
                    {oppgaver.frontendFeilmelding}
                </Alertstripe>
            )}
            {oppgaver.status === RessursStatus.HENTER && (
                <Alertstripe type="info" className="oppgavelist__info">
                    Henter...
                </Alertstripe>
            )}
            {visModal && (
                <UIModalWrapper
                    modal={{
                        tittel: 'Diskresjonskode',
                        lukkKnapp: false,
                        visModal: visModal,
                        actions: [
                            <Knapp
                                key={'Avbryt'}
                                mini={true}
                                onClick={() => {
                                    settVisModal(false);
                                    //history.push(`/fagsak/${fagsak.id}/saksoversikt`);
                                    //window.location.reload();
                                }}
                                children={'Avbryt'}
                            />,
                        ],
                    }}
                >
                    <Normaltekst>
                        <IkkeOppfylt heigth={20} className={'ikke-oppfylt-ikon'} width={20} />
                        Bruker har diskresjonskode{' '}
                        {adressebeskyttelsestyper[addressebeskyttelsegradering].navn}
                    </Normaltekst>
                </UIModalWrapper>
            )}
        </div>
    );
};

export default OppgaveList;
