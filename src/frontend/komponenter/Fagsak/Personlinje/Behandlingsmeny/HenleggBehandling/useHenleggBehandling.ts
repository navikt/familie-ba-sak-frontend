import { byggTomRessurs, Ressurs, RessursStatus } from '@navikt/familie-typer';
import { useState } from 'react';
import { useFagsakRessurser } from '../../../../../context/FagsakContext';
import { HenleggelseÅrsak } from '../../../../../typer/behandling';
import { IFagsak } from '../../../../../typer/fagsak';
import { feil, IFelt, nyttFelt, ok } from '../../../../../typer/felt';
import { useSkjema } from '../../../../../typer/skjema';
import {
    Brevmal,
    IBrevData,
} from '../../../../Felleskomponenter/Hendelsesoversikt/BrevModul/typer';

const useHenleggBehandling = (lukkModal: () => void) => {
    const [visVeivalgModal, settVisVeivalgModal] = useState(false);
    const [begrunnelse, settBegrunnelse] = useState('');

    const { fagsak, settFagsak } = useFagsakRessurser();

    const { hentFeltProps, settInitialState, onSubmit, oppdaterFeltISkjema, skjema } = useSkjema<
        IFagsak
    >({
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

    const erTypeSoknedTrukket = () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        fagsak.status;
        return true;
    };

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

    const hentSkjemaData = (): IBrevData => ({
        mottakerIdent:
            fagsak.status === RessursStatus.SUKSESS ? fagsak.data.søkerFødselsnummer : '',
        multiselectVerdier: [],
        brevmal: Brevmal.HENLEGGELSE,
        fritekst: '',
    });

    return {
        begrunnelse,
        hentFeltProps,
        onBekreft,
        erTypeSoknedTrukket,
        oppdaterFeltISkjema,
        settInitialState,
        settBegrunnelse,
        settVisVeivalgModal,
        skjema,
        visVeivalgModal,
        hentSkjemaData,
    };
};

export default useHenleggBehandling;
