import { ModalType } from '@context/ModalContext';
import { useModal } from '@hooks/useModal';
import { useSøkFagsakDeltagere } from '@hooks/useSøkFagsakDeltagere';
import { PersonIkon } from '@komponenter/PersonIkon';
import { type ISøkeresultat, Søk } from '@navikt/familie-header';
import {
    byggFeiletRessurs,
    byggFunksjonellFeilRessurs,
    byggHenterRessurs,
    byggSuksessRessurs,
    byggTomRessurs,
    kjønnType,
    type Ressurs,
} from '@navikt/familie-typer';
import { idnr } from '@navikt/fnrvalidator';
import { FagsakDeltagerRolle, type IFagsakDeltager } from '@typer/fagsakdeltager';
import { erLokal } from '@utils/miljø';
import { erAdresseBeskyttet } from '@utils/validators';
import { useState } from 'react';
import { useNavigate } from 'react-router';

const UGYLDIG_IDENT_FEILMELDING = 'Ugyldig fødsels- eller d-nummer (11 siffer)';

function erGyldigIdent(personIdent: string): boolean {
    return idnr(personIdent).status === 'valid' || erLokal();
}

function tilSøkeresultat(fagsakDeltager: IFagsakDeltager): ISøkeresultat {
    return {
        adressebeskyttelseGradering: fagsakDeltager.adressebeskyttelseGradering,
        fagsakId: fagsakDeltager.fagsakId,
        harTilgang: fagsakDeltager.harTilgang,
        navn: fagsakDeltager.navn,
        ident: fagsakDeltager.ident,
        ikon: (
            <PersonIkon
                fagsakType={fagsakDeltager.fagsakType}
                kjønn={fagsakDeltager.kjønn || kjønnType.UKJENT}
                erBarn={fagsakDeltager.rolle === FagsakDeltagerRolle.Barn}
                erAdresseBeskyttet={erAdresseBeskyttet(fagsakDeltager.adressebeskyttelseGradering)}
                harTilgang={fagsakDeltager.harTilgang}
                størrelse={'m'}
                erEgenAnsatt={fagsakDeltager.erEgenAnsatt}
            />
        ),
    };
}

export function FagsakDeltagerSøk() {
    const navigate = useNavigate();
    const { åpneModal } = useModal(ModalType.OPPRETT_FAGSAK);

    const {
        mutate: søkEtterFagsakDeltagere,
        reset: nullstillSøk,
        isPending,
        error,
        data: fagsakDeltagere,
    } = useSøkFagsakDeltagere();
    const [harUgyldigIdent, settHarUgyldigIdent] = useState(false);

    function nullstillSøkeresultater() {
        settHarUgyldigIdent(false);
        nullstillSøk();
    }

    function søk(personIdent: string) {
        nullstillSøkeresultater();
        if (personIdent === '') {
            return;
        }
        if (!erGyldigIdent(personIdent)) {
            settHarUgyldigIdent(true);
            return;
        }
        søkEtterFagsakDeltagere({ personIdent });
    }

    function lagSøkeresultater(): Ressurs<ISøkeresultat[]> {
        if (harUgyldigIdent) {
            return byggFunksjonellFeilRessurs(UGYLDIG_IDENT_FEILMELDING);
        }
        if (isPending) {
            return byggHenterRessurs();
        }
        if (error) {
            return byggFeiletRessurs(error.message);
        }
        if (fagsakDeltagere) {
            return byggSuksessRessurs(fagsakDeltagere.map(tilSøkeresultat));
        }
        return byggTomRessurs();
    }

    return (
        <Søk
            søk={søk}
            label={'Søkefelt. Fødsels- eller D-nummer (11 siffer)'}
            placeholder={'Fødsels- eller D-nummer (11 siffer)'}
            nullstillSøkeresultater={nullstillSøkeresultater}
            søkeresultater={lagSøkeresultater()}
            søkeresultatOnClick={søkeresultat => {
                if (!søkeresultat) {
                    return;
                }
                if (søkeresultat.fagsakId) {
                    navigate(`/fagsak/${søkeresultat.fagsakId}/saksoversikt`);
                    return;
                }
                if (søkeresultat.harTilgang) {
                    åpneModal({ ident: søkeresultat.ident });
                }
            }}
        />
    );
}
