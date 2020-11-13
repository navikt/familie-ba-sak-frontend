import { Ressurs } from '@navikt/familie-typer';
import { useState } from 'react';
import { useFagsakRessurser } from '../../../../../context/FagsakContext';
import { HenleggelseÅrsak } from '../../../../../typer/behandling';
import { IFagsak } from '../../../../../typer/fagsak';
import { useFelt } from '../../../../../familie-skjema/felt';
import { useSkjema } from '../../../../../familie-skjema/skjema';
import { FeltState } from '../../../../../familie-skjema/typer';
import { feil, ok } from '../../../../../familie-skjema/validators';

const useHenleggBehandling = (lukkModal: () => void) => {
    const [visVeivalgModal, settVisVeivalgModal] = useState(false);
    const [begrunnelse, settBegrunnelse] = useState('');

    const { settFagsak } = useFagsakRessurser();
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
                lukkModal();
                settVisVeivalgModal(true);
            }
        );
    };

    return {
        begrunnelse,
        skjema,
        nullstillSkjema,
        onBekreft,
        settBegrunnelse,
        settVisVeivalgModal,
        visVeivalgModal,
    };
};

export default useHenleggBehandling;
