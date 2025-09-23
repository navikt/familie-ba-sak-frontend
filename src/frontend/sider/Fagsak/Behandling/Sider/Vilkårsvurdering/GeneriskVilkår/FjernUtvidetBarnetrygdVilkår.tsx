import React, { useState } from 'react';

import styled from 'styled-components';

import { TrashIcon } from '@navikt/aksel-icons';
import { Button, ErrorMessage, Modal } from '@navikt/ds-react';
import { ASpacing5 } from '@navikt/ds-tokens/dist/tokens';
import { useHttp } from '@navikt/familie-http';
import type { Ressurs } from '@navikt/familie-typer';
import { RessursStatus } from '@navikt/familie-typer';

import type { IBehandling } from '../../../../../../typer/behandling';
import { VilkårType } from '../../../../../../typer/vilkår';
import { useBehandlingContext } from '../../../context/BehandlingContext';

const UtførKnapp = styled(Button)`
    margin-top: ${ASpacing5};
`;

interface IProps {
    personIdent: string;
    slettVilkårId: string;
}

const FjernUtvidetBarnetrygdVilkår: React.FC<IProps> = ({ personIdent, slettVilkårId }) => {
    const { request } = useHttp();
    const { behandling, settÅpenBehandling } = useBehandlingContext();
    const [visModal, settVisModal] = useState<boolean>(false);
    const [disabled, settDisabled] = useState<boolean>(false);
    const [visFrontendFeilmelding, settVisFrontendFeilmelding] = useState<boolean>(false);
    const [feilmelding, settFeilmelding] = useState<string>();

    const fjernVilkårUtvidet = () => {
        settDisabled(true);
        request<{ personIdent: string; vilkårType: VilkårType }, IBehandling>({
            method: 'DELETE',
            url: `/familie-ba-sak/api/vilkaarsvurdering/${behandling.behandlingId}/vilkaar`,
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
                    oppdatertBehandling.frontendFeilmelding ?? 'Ukjent feil ved fjerning av vilkåret utvidet barnetrygd'
                );
                settDisabled(false);
            }
        });
    };

    const onCloseModal = () => {
        settVisFrontendFeilmelding(false);
        settFeilmelding(undefined);
        settVisModal(false);
    };

    return (
        <>
            <UtførKnapp
                id={slettVilkårId}
                onClick={() => settVisModal(true)}
                size="small"
                icon={<TrashIcon title="Fjern vilkår" />}
            >
                Fjern vilkår
            </UtførKnapp>

            {visModal && (
                <Modal
                    open
                    onClose={onCloseModal}
                    header={{
                        heading: 'Fjern vilkåret utvidet barnetrygd',
                        size: 'small',
                        closeButton: false,
                    }}
                    width={'35rem'}
                    portal
                >
                    <Modal.Body>
                        Er du sikker?
                        {visFrontendFeilmelding && <ErrorMessage size="small">{feilmelding}</ErrorMessage>}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button disabled={disabled} key={'bekreft'} onClick={() => fjernVilkårUtvidet()} size="small">
                            Bekreft
                        </Button>
                        <Button variant="tertiary" key={'avbryt'} onClick={onCloseModal} size="small">
                            Avbryt
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </>
    );
};

export default FjernUtvidetBarnetrygdVilkår;
