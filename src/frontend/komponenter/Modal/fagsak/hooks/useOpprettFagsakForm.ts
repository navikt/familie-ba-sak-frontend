import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import type { OpprettFagsakPayload } from '../../../../api/opprettFagsak';
import { ModalType } from '../../../../context/ModalContext';
import { HentFagsakerQueryKeyFactory } from '../../../../hooks/useHentFagsaker';
import { useModal } from '../../../../hooks/useModal';
import { useOnFormSubmitSuccessful } from '../../../../hooks/useOnFormSubmitSuccessful';
import { useOpprettFagsak } from '../../../../hooks/useOpprettFagsak';
import { FagsakType, type IBaseFagsak, sjekkHarNormalFagsak } from '../../../../typer/fagsak';
import { hentAktivBehandlingPåMinimalFagsak } from '../../../../utils/fagsak';
import {
    OpprettFagsakFeltnavn,
    type OpprettFagsakFormValues,
    OpprettFagsakServerErrors,
} from '../form/OpprettFagsakForm';

interface Props {
    personIdent?: string;
    fagsaker: IBaseFagsak[] | undefined;
}

export function useOpprettFagsakForm({ personIdent, fagsaker }: Props) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { lukkModal } = useModal(ModalType.OPPRETT_FAGSAK);

    const harNormalFagsak = sjekkHarNormalFagsak(fagsaker);

    const form = useForm<OpprettFagsakFormValues>({
        values: {
            [OpprettFagsakFeltnavn.FAGSAKTYPE]: harNormalFagsak ? FagsakType.INSTITUSJON : FagsakType.NORMAL,
            [OpprettFagsakFeltnavn.SAMHANDLER]: null,
            [OpprettFagsakFeltnavn.SKJERMET_BARN_SØKER]: '',
        },
    });

    const { control, setError, reset } = form;

    useOnFormSubmitSuccessful(control, () => reset());

    const { mutateAsync } = useOpprettFagsak();

    async function onSubmit(values: OpprettFagsakFormValues) {
        const { fagsaktype, samhandler, skjermetBarnSøker } = values;
        const errorId = OpprettFagsakServerErrors.onSubmitError.id;
        if (personIdent === undefined) {
            setError(errorId, { message: 'Forventer en definert person ident her.' });
            return;
        }
        if (fagsaktype === '') {
            setError(errorId, { message: 'Fagsaktype er påkrevd.' });
            return;
        }
        if (fagsaktype === FagsakType.INSTITUSJON && samhandler === null) {
            setError(errorId, { message: `Institusjon er påkrevd for fagsaktype institusjon.` });
            return;
        }
        const payload: OpprettFagsakPayload = {
            personIdent: personIdent,
            fagsakType: fagsaktype,
            institusjon: samhandler
                ? {
                      orgNummer: samhandler.orgNummer,
                      tssEksternId: samhandler.tssEksternId,
                  }
                : null,
            skjermetBarnSøker: skjermetBarnSøker
                ? {
                      søkersIdent: skjermetBarnSøker,
                  }
                : null,
        };
        return mutateAsync(payload)
            .then(fagsak => {
                queryClient.invalidateQueries({
                    queryKey: HentFagsakerQueryKeyFactory.fagsaker(personIdent),
                });
                lukkModal();
                const aktivBehandling = hentAktivBehandlingPåMinimalFagsak(fagsak);
                if (aktivBehandling) {
                    navigate(`/fagsak/${fagsak.id}/${aktivBehandling.behandlingId}`);
                } else {
                    navigate(`/fagsak/${fagsak.id}/saksoversikt`);
                }
            })
            .catch(error => setError(errorId, { message: error.message ?? 'Feil oppstod.' }));
    }

    return { form, onSubmit };
}
