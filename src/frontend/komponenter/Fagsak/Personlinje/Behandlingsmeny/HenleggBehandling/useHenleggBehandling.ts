import { Ressurs, RessursStatus } from '@navikt/familie-typer';
import { useState } from 'react';
import { useFagsakRessurser } from '../../../../../context/FagsakContext';
import { HenleggelseÅrsak } from '../../../../../typer/behandling';
import { IFagsak } from '../../../../../typer/fagsak';
import { useFelt } from '../../../../../familie-skjema/felt';
import { useSkjema } from '../../../../../familie-skjema/skjema';
import { FeltState } from '../../../../../familie-skjema/typer';
import { feil, ok } from '../../../../../familie-skjema/validators';
import {
    Brevmal,
    IBrevData,
} from '../../../../Felleskomponenter/Hendelsesoversikt/BrevModul/typer';

const useHenleggBehandling = (lukkModal: () => void) => {
    const [visVeivalgModal, settVisVeivalgModal] = useState(false);
    const [begrunnelse, settBegrunnelse] = useState('');
    const [årsak, settÅrsak] = useState('');

    const { fagsak, settFagsak } = useFagsakRessurser();
    const { onSubmit, skjema, nullstillSkjema } = useSkjema<
        {
            årsak: HenleggelseÅrsak | '';
            begrunnelse: '';
        },
        IFagsak
    >({
        felter: {
            årsak: useFelt({
                verdi: '',
                valideringsfunksjon: (felt: FeltState<HenleggelseÅrsak | ''>) =>
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

    const hentSkjemaData = (): IBrevData => ({
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
