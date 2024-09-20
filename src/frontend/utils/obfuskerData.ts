import type { Ressurs } from '@navikt/familie-typer';
import { RessursStatus } from '@navikt/familie-typer/dist/ressurs';

import type { IBehandling } from '../typer/behandling';
import type { IMinimalFagsak } from '../typer/fagsak';
import { FagsakDeltagerRolle, type IFagsakDeltager } from '../typer/fagsakdeltager';
import { type ILogg, LoggType } from '../typer/logg';
import {
    ForelderBarnRelasjonRolle,
    type IGrunnlagPerson,
    type IPersonInfo,
    PersonType,
} from '../typer/person';
import type { ISamhandlerInfo } from '../typer/samhandler';

export const obfuskerSamhandler = (ressurs: Ressurs<ISamhandlerInfo>) => {
    if (ressurs.status === RessursStatus.SUKSESS) {
        ressurs.data.navn = 'Institusjonen';
        ressurs.data.tssEksternId = '12345678910';
        ressurs.data.orgNummer = '123456789';
        ressurs.data.adresser?.forEach(adresse => {
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
            ?.filter(
                logg =>
                    logg.type === LoggType.BREVMOTTAKER_LAGT_TIL_ELLER_FJERNET ||
                    logg.type === LoggType.BARN_LAGT_TIL
            )
            .forEach(logg => (logg.tekst = ''));
    }
};

export const obfuskerBehandling = (behandlingRessurs: Ressurs<IBehandling>) => {
    if (behandlingRessurs.status === RessursStatus.SUKSESS) {
        let indeks = 1;
        behandlingRessurs.data.søknadsgrunnlag?.barnaMedOpplysninger
            ?.sort(sammenlignFødselsdato)
            .forEach(barn => {
                barn.navn = '[' + indeks++ + '] Barn Barnesen';
            });
        indeks = 1;
        behandlingRessurs.data.personer?.sort(sammenlignFødselsdato).forEach(person => {
            if (person.type === PersonType.BARN) {
                person.navn = '[' + indeks++ + '] Barn Barnesen';
            } else {
                person.navn = 'Søker Søkersen';
            }
            person.registerhistorikk?.bostedsadresse.forEach(adresse => {
                adresse.verdi = 'Adresseveien 1';
            });
        });
        behandlingRessurs.data.utbetalingsperioder.forEach(ubp => {
            indeks = 1;
            ubp.utbetalingsperiodeDetaljer?.sort(sammenlignFødselsdato).forEach(ubpd => {
                if (ubpd.person.type === PersonType.BARN) {
                    ubpd.person.navn = '[' + indeks++ + '] Barn Barnesen';
                } else {
                    ubpd.person.navn = 'Søker Søkersen';
                }
            });
        });
        behandlingRessurs.data.brevmottakere?.forEach(brevmottaker => {
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
        let indeks = 1;
        personInfo.data.forelderBarnRelasjon?.sort(sammenlignFødselsdato).forEach(person => {
            if (person.relasjonRolle === ForelderBarnRelasjonRolle.BARN) {
                person.navn = '[' + indeks++ + '] Barn Barnesen';
            } else {
                person.navn = 'Søker Søkersen';
            }
        });
    }
};

export const obfuskerFagsak = (fagsak: Ressurs<IMinimalFagsak>) => {
    if (fagsak.status === RessursStatus.SUKSESS) {
        fagsak.data.gjeldendeUtbetalingsperioder?.forEach(gup => {
            let indeks = 1;
            gup.utbetalingsperiodeDetaljer?.sort(sammenlignFødselsdato).forEach(upd => {
                if (upd.person.type === PersonType.SØKER) {
                    upd.person.navn = 'Søker Søkersen';
                } else {
                    upd.person.navn = '[' + indeks++ + '] Barn Barnesen';
                }
            });
        });
    }
};

export const obfuskerFagsakDeltager = (fagsakDeltager: Ressurs<IFagsakDeltager[]>) => {
    if (fagsakDeltager.status === RessursStatus.SUKSESS) {
        fagsakDeltager.data?.forEach(fagsakDeltager => {
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

const sammenlignFødselsdato = <T extends { fødselsdato?: string; person?: IGrunnlagPerson }>(
    a: T,
    b: T
) => {
    if (a.person && b.person) return b.person.fødselsdato.localeCompare(a.person.fødselsdato);
    if (a.fødselsdato && b.fødselsdato) return b.fødselsdato.localeCompare(a.fødselsdato);
    return 0;
};
