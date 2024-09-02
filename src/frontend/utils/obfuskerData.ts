import type { Ressurs } from '@navikt/familie-typer';
import { RessursStatus } from '@navikt/familie-typer/dist/ressurs';

import type { IBehandling } from '../typer/behandling';
import { FagsakDeltagerRolle, type IFagsakDeltager } from '../typer/fagsakdeltager';
import { type ILogg, LoggType } from '../typer/logg';
import { ForelderBarnRelasjonRolle, type IPersonInfo, PersonType } from '../typer/person';
import type { ISamhandlerInfo } from '../typer/samhandler';

export const obfuskerSamhandler = (ressurs: Ressurs<ISamhandlerInfo>) => {
    if (ressurs.status === RessursStatus.SUKSESS) {
        ressurs.data.navn = 'Institusjonen';
        ressurs.data.tssEksternId = '12345678910';
        ressurs.data.orgNummer = '123456789';
        ressurs.data.adresser.forEach(adresse => {
            if (adresse.adresseType === 'Arbeidsadresse') {
                adresse.adresselinjer = ['Institusjonsveien 1'];
            } else {
                adresse.adresselinjer = ['Postboks 1'];
            }
            adresse.postNr = '0001';
            adresse.postSted = 'Oslo';
        });
    }
};

export const obfuskerLogg = (logg: Ressurs<ILogg[]>) => {
    if (logg.status === RessursStatus.SUKSESS) {
        logg.data
            .filter(logg => logg.type === LoggType.BREVMOTTAKER_LAGT_TIL_ELLER_FJERNET)
            .forEach(logg => (logg.tekst = ''));
    }
};

export const obfuskerBehandling = (behandlingRessurs: Ressurs<IBehandling>) => {
    if (behandlingRessurs.status === RessursStatus.SUKSESS) {
        behandlingRessurs.data.søknadsgrunnlag?.barnaMedOpplysninger.forEach(barn => {
            barn.navn = 'Barn Barnesen';
        });
        behandlingRessurs.data.personer.forEach(person => {
            if (person.type === PersonType.BARN) {
                person.navn = 'Barn Barnesen';
            } else {
                person.navn = 'Søker Søkersen';
            }
            person.registerhistorikk?.bostedsadresse.forEach(adresse => {
                adresse.verdi = 'Adresseveien 1';
            });
        });
        behandlingRessurs.data.utbetalingsperioder.forEach(ubp => {
            ubp.utbetalingsperiodeDetaljer.forEach(ubpd => {
                if (ubpd.person.type === PersonType.BARN) {
                    ubpd.person.navn = 'Barn Barnesen';
                } else {
                    ubpd.person.navn = 'Søker Søkersen';
                }
            });
        });
        behandlingRessurs.data.brevmottakere.forEach(brevmottaker => {
            brevmottaker.navn =
                brevmottaker.type.charAt(0).toUpperCase() +
                brevmottaker.type.slice(1).toLowerCase().replaceAll('_', ' ');
            brevmottaker.adresselinje1 = 'Mottakerveien 1';
            brevmottaker.adresselinje2 = undefined;
        });
    }
};

export const obfuskerFagsak = (personInfo: Ressurs<IPersonInfo>) => {
    if (personInfo.status === RessursStatus.SUKSESS) {
        personInfo.data.navn = 'Søker Søkersen';
        personInfo.data.forelderBarnRelasjon.forEach(person => {
            if (person.relasjonRolle === ForelderBarnRelasjonRolle.BARN) {
                person.navn = 'Barn Barnesen';
            } else {
                person.navn = 'Søker Søkersen';
            }
        });
    }
};

export const obfuskerFagsakDeltager = (fagsakDeltager: Ressurs<IFagsakDeltager[]>) => {
    if (fagsakDeltager.status === RessursStatus.SUKSESS) {
        fagsakDeltager.data.forEach(fagsakDeltager => {
            if (fagsakDeltager.rolle == FagsakDeltagerRolle.Barn) {
                fagsakDeltager.navn = 'Barn';
            } else if (fagsakDeltager.rolle == FagsakDeltagerRolle.Forelder) {
                fagsakDeltager.navn = 'Forelder';
            } else {
                fagsakDeltager.navn = 'Ukjent rolle';
            }
        });
    }
};
