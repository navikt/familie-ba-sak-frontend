import React, { useState } from 'react';

import styled from 'styled-components';

import { Delete } from '@navikt/ds-icons';
import { Button, ErrorMessage } from '@navikt/ds-react';
import { NavdsSpacing5 } from '@navikt/ds-tokens/dist/tokens';
import { useHttp } from '@navikt/familie-http';
import { RessursStatus } from '@navikt/familie-typer';
import type { Ressurs } from '@navikt/familie-typer';

import { useBehandling } from '../../../../context/behandlingContext/BehandlingContext';
import type { IBehandling } from '../../../../typer/behandling';
import { VilkårType } from '../../../../typer/vilkår';
import UIModalWrapper from '../../../Felleskomponenter/Modal/UIModalWrapper';

const UtførKnapp = styled(Button)`
    margin-top: ${NavdsSpacing5};
`;

interface IProps {
    personIdent: string;
    slettVilkårId: string;
}

const FjernUtvidetBarnetrygdVilkår: React.FC<IProps> = ({ personIdent, slettVilkårId }) => {
    const { request } = useHttp();
    const { åpenBehandling, settÅpenBehandling } = useBehandling();
    const [visModal, settVisModal] = useState<boolean>(false);
    const [disabled, settDisabled] = useState<boolean>(false);
    const [visFrontendFeilmelding, settVisFrontendFeilmelding] = useState<boolean>(false);
    const [feilmelding, settFeilmelding] = useState<string>();

    const fjernVilkårUtvidet = () => {
        if (åpenBehandling.status === RessursStatus.SUKSESS) {
            settDisabled(true);
            request<{ personIdent: string; vilkårType: VilkårType }, IBehandling>({
                method: 'DELETE',
                url: `/familie-ba-sak/api/vilkaarsvurdering/${åpenBehandling.data.behandlingId}/vilkaar`,
                data: {
                    personIdent: personIdent,
                    vilkårType: VilkårType.UTVIDET_BARNETRYGD,
                },
            }).then((oppdatertBehandling: Ressurs<IBehandling>) => {
                if (oppdatertBehandling.status === RessursStatus.SUKSESS) {
                    settÅpenBehandling(oppdatertBehandling);
                } else if (
                    oppdatertBehandling.status === RessursStatus.FUNKSJONELL_FEIL ||
                    oppdatertBehandling.status === RessursStatus.FEILET ||
                    oppdatertBehandling.status === RessursStatus.IKKE_TILGANG
                ) {
                    settVisFrontendFeilmelding(true);
                    settFeilmelding(
                        oppdatertBehandling.frontendFeilmelding ??
                            'Ukjent feil ved fjerning av vilkåret utvidet barnetrygd'
                    );
                    settDisabled(false);
                }
            });
        }
    };

    return (
        <>
            <UtførKnapp id={slettVilkårId} onClick={() => settVisModal(true)} size="small">
                <Delete title="Fjern vilkår" /> Fjern vilkår
            </UtførKnapp>

            {visModal && (
                <UIModalWrapper
                    modal={{
                        tittel: 'Fjern vilkåret utvidet barnetrygd',
                        visModal: visModal,
                        lukkKnapp: false,
                        actions: [
                            <Button
                                variant="tertiary"
                                key={'avbryt'}
                                onClick={() => {
                                    settVisFrontendFeilmelding(false);
                                    settFeilmelding(undefined);
                                    settVisModal(false);
                                }}
                                size="small"
                            >
                                Avbryt
                            </Button>,
                            <Button
                                disabled={disabled}
                                key={'bekreft'}
                                onClick={() => fjernVilkårUtvidet()}
                                size="small"
                            >
                                Bekreft
                            </Button>,
                        ],
                    }}
                >
                    Er du sikker?
                    {visFrontendFeilmelding && (
                        <ErrorMessage size="small">{feilmelding}</ErrorMessage>
                    )}
                </UIModalWrapper>
            )}
        </>
    );
};

export default FjernUtvidetBarnetrygdVilkår;
