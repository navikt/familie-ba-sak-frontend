import { useState } from 'react';

import { useSkjema, useFelt, feil, ok } from '@navikt/familie-skjema';
import type { FeltState } from '@navikt/familie-skjema';
import { RessursStatus } from '@navikt/familie-typer';
import type { Ressurs } from '@navikt/familie-typer';

import { useBehandling } from '../../../../../context/behandlingContext/BehandlingContext';
import { useFagsakContext } from '../../../../../context/FagsakContext';
import type { HenleggÅrsak, IBehandling } from '../../../../../typer/behandling';
import type { IManueltBrevRequestPåBehandling } from '../../../../../typer/dokument';
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
            begrunnelse: '';
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

    const hentSkjemaData = (): IManueltBrevRequestPåBehandling => ({
        mottakerIdent:
            minimalFagsak.status === RessursStatus.SUKSESS
                ? minimalFagsak.data.søkerFødselsnummer
                : '',
        multiselectVerdier: [],
        brevmal: Brevmal.HENLEGGE_TRUKKET_SØKNAD,
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
