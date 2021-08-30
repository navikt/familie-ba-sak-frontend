import { useState } from 'react';

import { useSkjema, useFelt, FeltState, feil, ok } from '@navikt/familie-skjema';
import { Ressurs, RessursStatus } from '@navikt/familie-typer';

import { useFagsakRessurser } from '../../../../../context/FagsakContext';
import { HenleggÅrsak } from '../../../../../typer/behandling';
import { IManueltBrevRequestPåBehandling } from '../../../../../typer/dokument';
import { IFagsak } from '../../../../../typer/fagsak';
import { Brevmal } from '../../../../Felleskomponenter/Hendelsesoversikt/BrevModul/typer';

const useHenleggBehandling = (lukkModal: () => void) => {
    const [visVeivalgModal, settVisVeivalgModal] = useState(false);
    const [begrunnelse, settBegrunnelse] = useState('');
    const [årsak, settÅrsak] = useState('');

    const { fagsak, settFagsak } = useFagsakRessurser();
    const { onSubmit, skjema, nullstillSkjema } = useSkjema<
        {
            årsak: HenleggÅrsak | '';
            begrunnelse: '';
        },
        IFagsak
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
                url: `/familie-ba-sak/api/behandlinger/${behandlingId}/henlegg`,
            },
            (ressurs: Ressurs<IFagsak>) => {
                settFagsak(ressurs);
                settÅrsak(skjema.felter.årsak.verdi);
                lukkModal();
                settVisVeivalgModal(true);
            }
        );
    };

    const hentSkjemaData = (): IManueltBrevRequestPåBehandling => ({
        mottakerIdent:
            fagsak.status === RessursStatus.SUKSESS ? fagsak.data.søkerFødselsnummer : '',
        multiselectVerdier: [],
        brevmal: Brevmal.HENLEGGE_TRUKKET_SØKNAD,
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
