import { byggTomRessurs, Ressurs } from '@navikt/familie-typer';
import { useState } from 'react';
import { useFagsakRessurser } from '../../../../../context/FagsakContext';
import { HenleggelseÅrsak } from '../../../../../typer/behandling';
import { IFagsak } from '../../../../../typer/fagsak';
import { feil, ok, useFelt } from '../../../../../familie-skjema/felt';
import { useSkjema } from '../../../../../familie-skjema/skjema';
import { FeltState } from '../../../../../familie-skjema/typer';

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
        initialSkjema: {
            felter: {
                årsak: useFelt({
                    value: '',
                    valideringsfunksjon: (felt: FeltState<HenleggelseÅrsak | ''>) =>
                        felt.value !== '' ? ok(felt) : feil(felt, 'Du må velge årsak'),
                }),
                begrunnelse: useFelt({
                    value: '',
                }),
            },
            skjemanavn: 'henleggbehandling',
            submitRessurs: byggTomRessurs(),
            visFeilmeldinger: false,
        },
    });

    const onBekreft = (behandlingId: number) => {
        onSubmit(
            {
                method: 'PUT',
                data: {
                    årsak: skjema.felter.årsak.value,
                    begrunnelse: skjema.felter.begrunnelse.value,
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
        nullstillSkjema,
        onBekreft,
        settBegrunnelse,
        settVisVeivalgModal,
        skjema,
        visVeivalgModal,
    };
};

export default useHenleggBehandling;
