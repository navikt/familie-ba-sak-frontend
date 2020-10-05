import Alertstripe from 'nav-frontend-alertstriper';
import Lenke from 'nav-frontend-lenker';
import { Systemtittel } from 'nav-frontend-typografi';
import React from 'react';
import { useApp } from '../../context/AppContext';
import { useOppgaver } from '../../context/OppgaverContext';
import {
    enhetFilter,
    gjelderFilter,
    IdentGruppe,
    IOppgave,
    IOppgaveIdent,
    ITilgangDTO,
    OppgavetypeFilter,
    oppgaveTypeFilter,
    PrioritetFilter,
} from '../../typer/oppgave';
import { Ressurs, RessursStatus } from '@navikt/familie-typer';
import OppgavelisteNavigator from './OppgavelisteNavigator';
import OppgavelisteSaksbehandler from './OppgavelisteSaksbehandler';
import { ariaSortMap, FeltSortOrder, IOppgaveFelt, sortLenkClassNameMap } from './oppgavefelter';
import classNames from 'classnames';

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
        tilgangssjekk,
    } = useOppgaver();
    const { innloggetSaksbehandler } = useApp();

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
                                        <td>
                                            {oppg.identer
                                                ? oppg.identer.find(
                                                      (ident: IOppgaveIdent) =>
                                                          ident.gruppe ===
                                                          IdentGruppe.FOLKEREGISTERIDENT
                                                  )?.ident
                                                : 'Ukjent'}
                                        </td>
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
                                            />
                                        </td>
                                        <td className={'handlinger'}>
                                            {oppg.oppgavetype
                                                ? oppgaveTypeFilter[oppg.oppgavetype].id ===
                                                      OppgavetypeFilter.JFR && (
                                                      <button
                                                          key={'tiloppg'}
                                                          onClick={() => {
                                                              tilgangssjekk(oppg.aktoerId).then(
                                                                  (res: Ressurs<ITilgangDTO>) => {
                                                                      if (
                                                                          res.status ===
                                                                          RessursStatus.SUKSESS
                                                                      ) {
                                                                          if (
                                                                              res.data
                                                                                  .saksbehandlerHarTilgang
                                                                          ) {
                                                                              gåTilOppgave(oppg.id);
                                                                          } else {
                                                                              alert('foo!');
                                                                          }
                                                                      }
                                                                  }
                                                              );
                                                              /*
                                                                dersom tilgang er ok, kall fordelOppgave.
                                                                dersom ikke, vis modal med melding.
                                                              */
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
        </div>
    );
};

export default OppgaveList;
