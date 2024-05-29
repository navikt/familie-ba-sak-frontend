import { useState } from 'react';

import createUseContext from 'constate';
import { useNavigate } from 'react-router-dom';

import { useFelt, useSkjema } from '@navikt/familie-skjema';
import type { Ressurs } from '@navikt/familie-typer';
import { RessursStatus } from '@navikt/familie-typer';

import { useBehandling } from './behandlingContext/BehandlingContext';
import { useFagsakContext } from './Fagsak/FagsakContext';
import useSakOgBehandlingParams from '../hooks/useSakOgBehandlingParams';
import type { IBehandling } from '../typer/behandling';
import { BehandlingSteg } from '../typer/behandling';
import { FagsakType } from '../typer/fagsak';
import type { IInstitusjon, IRegistrerInstitusjon } from '../typer/institusjon';
import { hentFrontendFeilmelding } from '../utils/ressursUtils';

const [InstitusjonProvider, useInstitusjon] = createUseContext(
    ({ åpenBehandling }: { åpenBehandling: IBehandling }) => {
        const { vurderErLesevisning, settÅpenBehandling } = useBehandling();
        const { minimalFagsak } = useFagsakContext();
        const { fagsakId } = useSakOgBehandlingParams();
        const navigate = useNavigate();
        const [submitFeilmelding, settSubmitFeilmelding] = useState<string | undefined>('');

        const fagsak =
            minimalFagsak.status === RessursStatus.SUKSESS ? minimalFagsak.data : undefined;
        const fagsakFeilmelding =
            minimalFagsak.status !== RessursStatus.SUKSESS
                ? hentFrontendFeilmelding(minimalFagsak) || 'Ukjent feil ved henting av fagsak'
                : '';
        const fagsakType = fagsak?.fagsakType;

        const { skjema, onSubmit } = useSkjema<
            {
                institusjon: IInstitusjon | undefined;
                navn: string | undefined;
                adresse: string;
                postnummer: string;
                sted: string;
            },
            IBehandling
        >({
            felter: {
                institusjon: useFelt<IInstitusjon | undefined>({
                    verdi: fagsak?.institusjon,
                }),
                navn: useFelt<string | undefined>({
                    verdi: '',
                }),
                adresse: useFelt<string>({
                    verdi: '',
                }),
                postnummer: useFelt<string>({
                    verdi: '',
                }),
                sted: useFelt<string>({
                    verdi: '',
                }),
            },
            skjemanavn: 'Registrer mottaker',
        });

        const erSkjemaUendret = () => skjema.felter.institusjon.verdi === fagsak?.institusjon;

        const onSubmitMottaker = () => {
            if (
                vurderErLesevisning() ||
                (erSkjemaUendret() && åpenBehandling.steg !== BehandlingSteg.REGISTRERE_INSTITUSJON)
            ) {
                navigate(`/fagsak/${fagsakId}/${åpenBehandling?.behandlingId}/registrer-soknad`);
            } else {
                onSubmit<IRegistrerInstitusjon | undefined>(
                    {
                        data:
                            fagsakType === FagsakType.INSTITUSJON
                                ? skjema.felter.institusjon.verdi
                                : undefined,
                        method: 'POST',
                        url: `/familie-ba-sak/api/behandlinger/${åpenBehandling?.behandlingId}/steg/registrer-institusjon`,
                    },
                    (ressurs: Ressurs<IBehandling>) => {
                        if (ressurs.status === RessursStatus.SUKSESS) {
                            settÅpenBehandling(ressurs);
                            navigate(
                                `/fagsak/${fagsakId}/${åpenBehandling?.behandlingId}/registrer-soknad`
                            );
                        } else {
                            settSubmitFeilmelding(hentFrontendFeilmelding(ressurs));
                        }
                    },
                    (ressurs: Ressurs<IBehandling>) => {
                        settSubmitFeilmelding(hentFrontendFeilmelding(ressurs));
                    }
                );
            }
        };

        return {
            fagsakFeilmelding,
            fagsakType,
            onSubmitMottaker,
            skjema,
            submitFeilmelding,
        };
    }
);

export { InstitusjonProvider, useInstitusjon };
