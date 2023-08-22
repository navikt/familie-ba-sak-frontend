import { useEffect, useState } from 'react';

import type { FeltState } from '@navikt/familie-skjema';
import { feil, ok, useFelt, useSkjema, Valideringsstatus } from '@navikt/familie-skjema';
import type { Ressurs } from '@navikt/familie-typer';
import { byggHenterRessurs, RessursStatus } from '@navikt/familie-typer';

import type { IBehandling } from '../../typer/behandling';
import type { IGrunnlagPerson } from '../../typer/person';
import { isEmpty } from '../../utils/eøsValidators';
import { useBehandling } from '../behandlingContext/BehandlingContext';

interface IProps {
    onSuccess: () => void;
    person: IGrunnlagPerson;
}

const erDødsfallDatoFyltUt = (felt: FeltState<string | undefined>): FeltState<string | undefined> =>
    !isEmpty(felt.verdi) ? ok(felt) : feil(felt, 'Dato for dødsfall er påkrevd.');

const erBegrunnelseFyltUt = (felt: FeltState<string>): FeltState<string> =>
    !isEmpty(felt.verdi)
        ? ok(felt)
        : feil(felt, 'Begrunnelse for manuell registrering av dødsfall er påkrevd.');

export const useRegistrerDødsfallDatoSkjemaContext = ({ person, onSuccess }: IProps) => {
    const { åpenBehandling, settÅpenBehandling } = useBehandling();
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
            dødsfallDato: string | undefined;
            begrunnelse: string;
        },
        IBehandling
    >({
        felter: {
            dødsfallDato: useFelt<string | undefined>({
                verdi: '',
                valideringsfunksjon: erDødsfallDatoFyltUt,
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

    const behandlingId =
        åpenBehandling.status === RessursStatus.SUKSESS && åpenBehandling.data.behandlingId;
    const korrigertVedtakURL = `/familie-ba-sak/api/person/registrer-manuell-dodsfall/${behandlingId}`;

    const registrerManuellDødsfall = () => {
        if (kanSendeSkjema()) {
            settVisfeilmeldinger(false);
            settSubmitRessurs(byggHenterRessurs());
            onSubmit(
                {
                    method: 'POST',
                    data: {
                        dødsfallDato: skjema.felter.dødsfallDato.verdi,
                        begrunnelse: skjema.felter.begrunnelse.verdi,
                        personIdent: person.personIdent,
                    },
                    url: korrigertVedtakURL,
                },
                (response: Ressurs<IBehandling>) => {
                    if (response.status === RessursStatus.SUKSESS) {
                        settRestFeil(undefined);
                        onSuccess();
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
        nullstillSkjema,
        restFeil,
        settVisfeilmeldinger,
        settRestFeil,
    };
};
