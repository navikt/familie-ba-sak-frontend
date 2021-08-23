import React from 'react';

import { Flatknapp } from 'nav-frontend-knapper';
import { Innholdstittel } from 'nav-frontend-typografi';

import { RessursStatus } from '@navikt/familie-typer';

import { useDokumentutsending } from '../../../context/DokumentutsendingContext';
import { IFagsak } from '../../../typer/fagsak';
import Knapperekke from '../../Felleskomponenter/Knapperekke';

interface IProps {
    fagsak: IFagsak;
}

const DokumentutsendingSkjema: React.FC<IProps> = ({ fagsak }) => {
    const { hentetForhåndsvisning, hentForhåndsvisning } = useDokumentutsending();

    const skjemaErLåst = false; // TODO

    const kanSendeSkjema = () => true; // TODO
    return (
        <div>
            <Innholdstittel children={'Send informasjonsbrev'} />

            <Knapperekke>
                <Flatknapp
                    mini
                    spinner={hentetForhåndsvisning.status === RessursStatus.HENTER}
                    disabled={skjemaErLåst}
                    onClick={() => {
                        if (kanSendeSkjema()) {
                            hentForhåndsvisning({
                                method: 'POST',
                                data: {},
                                url: `/familie-ba-sak/api/dokument/dokumentutsending/${fagsak.id}`,
                            });
                        }
                    }}
                >
                    Forhåndsvis
                </Flatknapp>
                {/*<Knapp
                    mini
                    spinner={skjema.submitRessurs.status === RessursStatus.HENTER}
                    disabled={skjemaErLåst}
                    onClick={() => {
                        if (åpenBehandling.status === RessursStatus.SUKSESS) {
                            const harRegistrertSøknad =
                                hentStegNummer(åpenBehandling.data.steg) >
                                hentStegNummer(BehandlingSteg.REGISTRERE_SØKNAD);
                            settNavigerTilOpplysningsplikt(
                                harRegistrertSøknad &&
                                    skjema.felter.brevmal.verdi === Brevmal.INNHENTE_OPPLYSNINGER
                            );
                            onSubmit(
                                {
                                    method: 'POST',
                                    data: hentSkjemaData(),
                                    url: `/familie-ba-sak/api/dokument/send-brev/${åpenBehandling.data.behandlingId}`,
                                },
                                (ressurs: Ressurs<IFagsak>) => {
                                    onSubmitSuccess();
                                    settFagsak(ressurs);
                                    hentLogg(åpenBehandling.data.behandlingId);
                                }
                            );
                        }
                    }}
                >
                    Send brev
                </Knapp>*/}
            </Knapperekke>
        </div>
    );
};

export default DokumentutsendingSkjema;
