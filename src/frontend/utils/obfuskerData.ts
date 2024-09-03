import type { Ressurs } from '@navikt/familie-typer';
import { RessursStatus } from '@navikt/familie-typer/dist/ressurs';

import type { IBehandling } from '../typer/behandling';
import type { IMinimalFagsak } from '../typer/fagsak';
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
        let index = 1;
        behandlingRessurs.data.personer
            .sort((a, b) => b.fødselsdato.localeCompare(a.fødselsdato))
            .forEach(person => {
                if (person.type === PersonType.BARN) {
                    person.navn = 'Barn Barnesen ' + index++;
                } else {
                    person.navn = 'Søker Søkersen';
                }
                person.registerhistorikk?.bostedsadresse.forEach(adresse => {
                    adresse.verdi = 'Adresseveien 1';
                });
            });
        behandlingRessurs.data.utbetalingsperioder.forEach(ubp => {
            let index = 1;
            ubp.utbetalingsperiodeDetaljer
                .sort((a, b) => b.person.fødselsdato.localeCompare(a.person.fødselsdato))
                .forEach(ubpd => {
                    if (ubpd.person.type === PersonType.BARN) {
                        ubpd.person.navn = 'Barn Barnesen ' + index++;
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

export const obfuskerPersonInfo = (personInfo: Ressurs<IPersonInfo>) => {
    if (personInfo.status === RessursStatus.SUKSESS) {
        personInfo.data.navn = 'Søker Søkersen';
        personInfo.data.bostedsadresse = {
            adresse: 'Adresseveien 1',
            postnummer: '0001',
        };
        let index = 1;
        personInfo.data.forelderBarnRelasjon
            .sort((a, b) => b.fødselsdato.localeCompare(a.fødselsdato))
            .forEach(person => {
                if (person.relasjonRolle === ForelderBarnRelasjonRolle.BARN) {
                    person.navn = 'Barn Barnesen ' + index++;
                } else {
                    person.navn = 'Søker Søkersen';
                }
            });
    }
};

export const obfuskerFagsak = (fagsak: Ressurs<IMinimalFagsak>) => {
    if (fagsak.status === RessursStatus.SUKSESS) {
        fagsak.data.gjeldendeUtbetalingsperioder.forEach(gup => {
            let index = 1;
            gup.utbetalingsperiodeDetaljer
                .sort((a, b) => b.person.fødselsdato.localeCompare(a.person.fødselsdato))
                .forEach(upd => {
                    if (upd.person.type === PersonType.SØKER) {
                        upd.person.navn = 'Søker Søkersen';
                    } else {
                        upd.person.navn = 'Barn Barnesen ' + index++;
                    }
                });
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
