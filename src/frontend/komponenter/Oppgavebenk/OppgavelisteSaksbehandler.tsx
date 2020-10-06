import React from 'react';
import {
    IOppgave,
    ITilgangModal,
    OppgavetypeFilter,
    adressebeskyttelsestyper,
} from '../../typer/oppgave';
import { useOppgaver } from '../../context/OppgaverContext';
import { ISaksbehandler } from '@navikt/familie-typer';
import AlertStripe from 'nav-frontend-alertstriper';
import { Ressurs, RessursStatus } from '@navikt/familie-typer';
import { Feilmelding, Normaltekst } from 'nav-frontend-typografi';
import UIModalWrapper from '../Felleskomponenter/Modal/UIModalWrapper';
import { Knapp } from 'nav-frontend-knapper';
import IkkeOppfylt from '../../ikoner/IkkeOppfylt';

interface IOppgavelisteSaksbehandler {
    oppgave: IOppgave;
    innloggetSaksbehandler?: ISaksbehandler;
}

const OppgavelisteSaksbehandler: React.FunctionComponent<IOppgavelisteSaksbehandler> = ({
    oppgave,
    innloggetSaksbehandler,
}) => {
    const { fordelOppgave, tilbakestillFordelingPåOppgave, sjekkTilgang } = useOppgaver();
    const [feilmelding, setFeilmelding] = React.useState<string>();
    const [erTilbakestilt, setErTilbakestilt] = React.useState<boolean>(false);
    const [visModal, settVisModal] = React.useState<boolean>(false);
    const [addressebeskyttelsegradering, settAdressebeskyttelsegradering] = React.useState<string>(
        ''
    );

    if (innloggetSaksbehandler == null) {
        return <AlertStripe type="feil">Klarte ikke hente innlogget saksbehandler</AlertStripe>;
    }

    if (feilmelding) {
        return <Feilmelding className={'kolonne'}>{feilmelding}</Feilmelding>;
    }
    if (erTilbakestilt) {
        return <div className={'kolonne'}>Saksbehandler er tilbakestilt</div>;
    }

    const oppgaveTypeErStøttet = [
        OppgavetypeFilter.JFR,
        OppgavetypeFilter.BEH_SAK,
        OppgavetypeFilter.BEH_UND_VED,
        OppgavetypeFilter.GOD_VED,
    ].find(
        (type: OppgavetypeFilter) =>
            OppgavetypeFilter[oppgave.oppgavetype as keyof typeof OppgavetypeFilter] === type
    );

    return oppgave.tilordnetRessurs ? (
        <div className={'kolonne'}>
            <Normaltekst>{oppgave.tilordnetRessurs}</Normaltekst>
            {oppgaveTypeErStøttet && (
                <button
                    key={'tilbakestill'}
                    onClick={() => {
                        tilbakestillFordelingPåOppgave(oppgave).then(
                            (oppgaveResponse: Ressurs<string>) => {
                                if (oppgaveResponse.status === RessursStatus.FEILET) {
                                    setFeilmelding(oppgaveResponse.frontendFeilmelding);
                                } else {
                                    setErTilbakestilt(true);
                                }
                            }
                        );
                    }}
                    children={'Tilbakestill'}
                />
            )}
        </div>
    ) : (
        <div className={'kolonne'}>
            <Normaltekst>Ikke tildelt</Normaltekst>
            {oppgaveTypeErStøttet && (
                <button
                    key={'plukk'}
                    onClick={() => {
                        sjekkTilgang(oppgave).then((res: ITilgangModal) => {
                            if (res !== undefined) {
                                settAdressebeskyttelsegradering(res.adressebeskyttelsegradering);
                                settVisModal(res.visModal);
                            } else {
                                fordelOppgave(oppgave, innloggetSaksbehandler?.navIdent).then(
                                    (oppgaveResponse: Ressurs<string>) => {
                                        if (oppgaveResponse.status === RessursStatus.FEILET) {
                                            setFeilmelding(oppgaveResponse.frontendFeilmelding);
                                        }
                                    }
                                );
                            }
                        });
                    }}
                    children={'Plukk'}
                />
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

export default OppgavelisteSaksbehandler;
