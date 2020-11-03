import { byggTomRessurs, Ressurs } from '@navikt/familie-typer';
import { useState } from 'react';
import { useFagsakRessurser } from '../../../../../context/FagsakContext';
import { HenleggelseÅrsak } from '../../../../../typer/behandling';
import { IFagsak } from '../../../../../typer/fagsak';
import { feil, IFelt, nyttFelt, ok } from '../../../../../typer/felt';
import { useSkjema } from '../../../../../typer/skjema';

const useHenleggBehandling = (lukkModal: () => void) => {
    const [visVeivalgModal, settVisVeivalgModal] = useState(false);
    const [begrunnelse, settBegrunnelse] = useState('');

    const { settFagsak } = useFagsakRessurser();
    const { hentFeltProps, onSubmit, oppdaterFeltISkjema, skjema } = useSkjema<IFagsak>({
        felter: {
            årsak: nyttFelt<HenleggelseÅrsak | ''>('', (felt: IFelt<HenleggelseÅrsak | ''>) =>
                felt.verdi !== '' ? ok(felt) : feil(felt, 'Du må velge årsak')
            ),
            begrunnelse: nyttFelt(''),
        },
        skjemanavn: 'henleggbehandling',
        submitRessurs: byggTomRessurs(),
        visFeilmeldinger: false,
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
        hentFeltProps,
        onBekreft,
        oppdaterFeltISkjema,
        settBegrunnelse,
        settVisVeivalgModal,
        skjema,
        visVeivalgModal,
    };
};

export default useHenleggBehandling;
