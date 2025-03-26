import { useEffect, useState } from 'react';

import type { FeltState } from '@navikt/familie-skjema';
import { feil, ok, useFelt, useSkjema, Valideringsstatus } from '@navikt/familie-skjema';
import type { Ressurs } from '@navikt/familie-typer';
import { byggHenterRessurs, RessursStatus } from '@navikt/familie-typer';

import { useBehandling } from '../../context/behandlingContext/BehandlingContext';
import type { IBehandling } from '../../typer/behandling';
import type { IManuellDødsfall } from '../../typer/dødsfall';
import type { IGrunnlagPerson } from '../../typer/person';
import { dateTilIsoDatoString, validerGyldigDato } from '../../utils/dato';
import { isEmpty } from '../../utils/eøsValidators';

interface IProps {
    lukkModal: () => void;
    person: IGrunnlagPerson;
}

const erBegrunnelseFyltUt = (felt: FeltState<string>): FeltState<string> =>
    !isEmpty(felt.verdi)
        ? ok(felt)
        : feil(felt, 'Begrunnelse for manuell registrering av dødsfall er påkrevd.');

export const useRegistrerDødsfallDatoSkjema = ({ person, lukkModal }: IProps) => {
    const { behandling, settÅpenBehandling } = useBehandling();
    const [restFeil, settRestFeil] = useState<string | undefined>(undefined);

    const {
        skjema,
        valideringErOk,
        kanSendeSkjema,
        settVisfeilmeldinger,
        onSubmit,
        nullstillSkjema,
        settSubmitRessurs,
        validerAlleSynligeFelter,
    } = useSkjema<
        {
            dødsfallDato: Date | undefined;
            begrunnelse: string;
        },
        IBehandling
    >({
        felter: {
            dødsfallDato: useFelt<Date | undefined>({
                verdi: undefined,
                valideringsfunksjon: validerGyldigDato,
            }),
            begrunnelse: useFelt<string>({
                verdi: '',
                valideringsfunksjon: erBegrunnelseFyltUt,
            }),
        },
        skjemanavn: 'registrer-dødsfall-dato-skjema',
    });

    const valideringsstatuser = [
        skjema.felter.dødsfallDato.valideringsstatus,
        skjema.felter.begrunnelse.valideringsstatus,
    ];

    useEffect(() => {
        if (
            valideringsstatuser.some(
                valideringsstatus => valideringsstatus === Valideringsstatus.IKKE_VALIDERT
            )
        ) {
            validerAlleSynligeFelter();
        }
    }, [valideringsstatuser]);

    const korrigertVedtakURL = `/familie-ba-sak/api/person/registrer-manuell-dodsfall/${behandling.behandlingId}`;

    const registrerManuellDødsfall = () => {
        if (kanSendeSkjema()) {
            settVisfeilmeldinger(false);
            settSubmitRessurs(byggHenterRessurs());
            onSubmit<IManuellDødsfall>(
                {
                    method: 'POST',
                    data: {
                        dødsfallDato: dateTilIsoDatoString(skjema.felter.dødsfallDato.verdi),
                        begrunnelse: skjema.felter.begrunnelse.verdi,
                        personIdent: person.personIdent,
                    },
                    url: korrigertVedtakURL,
                },
                (response: Ressurs<IBehandling>) => {
                    if (response.status === RessursStatus.SUKSESS) {
                        settRestFeil(undefined);
                        lukkModal();
                        nullstillSkjema();
                        settÅpenBehandling(response);
                    }
                },
                (error: Ressurs<IBehandling>) => {
                    if (
                        error.status === RessursStatus.FEILET ||
                        error.status === RessursStatus.FUNKSJONELL_FEIL
                    ) {
                        settRestFeil(error.frontendFeilmelding);
                    } else {
                        settRestFeil('Teknisk feil ved lagring av manuell dødsfall dato');
                    }
                }
            );
        } else {
            settVisfeilmeldinger(true);
        }
    };

    return {
        skjema,
        valideringErOk,
        registrerManuellDødsfall,
        restFeil,
    };
};
