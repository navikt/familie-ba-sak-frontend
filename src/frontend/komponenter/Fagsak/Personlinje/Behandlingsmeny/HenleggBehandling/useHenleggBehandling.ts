import { useState } from 'react';

import type { FeltState } from '@navikt/familie-skjema';
import { feil, ok, useFelt, useSkjema } from '@navikt/familie-skjema';
import type { Ressurs } from '@navikt/familie-typer';
import { RessursStatus } from '@navikt/familie-typer';

import { useBehandling } from '../../../../../context/behandlingContext/BehandlingContext';
import { useFagsakContext } from '../../../../../context/fagsak/FagsakContext';
import type { HenleggÅrsak, IBehandling } from '../../../../../typer/behandling';
import type { IManueltBrevRequestPåBehandling } from '../../../../../typer/dokument';
import { FagsakType } from '../../../../../typer/fagsak';
import { Brevmal } from '../../../../Felleskomponenter/Hendelsesoversikt/BrevModul/typer';

const useHenleggBehandling = (lukkModal: () => void) => {
    const [visVeivalgModal, settVisVeivalgModal] = useState(false);
    const [begrunnelse, settBegrunnelse] = useState('');
    const [årsak, settÅrsak] = useState('');
    const { settÅpenBehandling } = useBehandling();
    const { minimalFagsak } = useFagsakContext();

    const { onSubmit, skjema, nullstillSkjema } = useSkjema<
        {
            årsak: HenleggÅrsak | '';
            begrunnelse: string;
        },
        IBehandling
    >({
        felter: {
            årsak: useFelt({
                verdi: '',
                valideringsfunksjon: (felt: FeltState<HenleggÅrsak | ''>) =>
                    felt.verdi !== '' ? ok(felt) : feil(felt, 'Du må velge årsak'),
            }),
            begrunnelse: useFelt({
                verdi: '',
                valideringsfunksjon: (felt: FeltState<string>) =>
                    felt.verdi.length > 5
                        ? ok(felt)
                        : feil(
                              felt,
                              'Skriv en begrunnelse som forklarer hvorfor behandlingen henlegges. ' +
                                  'Dette kan gi andre saksbehandlere bedre grunnlag hvis de gjenopptar saken, og kan gjøre det lettere for teamet å feilsøke. ' +
                                  'Var det en teknisk feil? Fikk du feilmelding?'
                          ),
            }),
        },
        skjemanavn: 'henleggbehandling',
    });

    const onBekreft = (behandlingId: number) => {
        onSubmit(
            {
                method: 'PUT',
                data: {
                    årsak: skjema.felter.årsak.verdi,
                    begrunnelse: skjema.felter.begrunnelse.verdi,
                },
                url: `/familie-ba-sak/api/behandlinger/${behandlingId}/steg/henlegg`,
            },
            (ressurs: Ressurs<IBehandling>) => {
                settÅpenBehandling(ressurs);
                settÅrsak(skjema.felter.årsak.verdi);
                lukkModal();
                settVisVeivalgModal(true);
            }
        );
    };

    const fagsakErHentetOk = minimalFagsak.status === RessursStatus.SUKSESS;

    const gjelderInstitusjon =
        fagsakErHentetOk && minimalFagsak.data.fagsakType === FagsakType.INSTITUSJON;

    const mottakerIdentSomSkalBrukes = fagsakErHentetOk
        ? gjelderInstitusjon
            ? minimalFagsak.data.institusjon!.orgNummer
            : minimalFagsak.data.søkerFødselsnummer
        : '';

    const brevmalSomSkalBrukes = gjelderInstitusjon
        ? Brevmal.HENLEGGE_TRUKKET_SØKNAD_INSTITUSJON
        : Brevmal.HENLEGGE_TRUKKET_SØKNAD;

    const hentSkjemaData = (): IManueltBrevRequestPåBehandling => ({
        mottakerIdent: mottakerIdentSomSkalBrukes,
        multiselectVerdier: [],
        brevmal: brevmalSomSkalBrukes,
        barnIBrev: [],
    });

    return {
        begrunnelse,
        skjema,
        nullstillSkjema,
        onBekreft,
        settBegrunnelse,
        settVisVeivalgModal,
        visVeivalgModal,
        hentSkjemaData,
        årsak,
    };
};

export default useHenleggBehandling;
