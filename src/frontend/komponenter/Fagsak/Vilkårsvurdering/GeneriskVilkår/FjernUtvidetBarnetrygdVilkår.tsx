import * as React from 'react';

import styled from 'styled-components';

import { Flatknapp, Knapp } from 'nav-frontend-knapper';
import { Feilmelding } from 'nav-frontend-typografi';

import { Delete } from '@navikt/ds-icons';
import { useHttp } from '@navikt/familie-http';
import { type Ressurs, RessursStatus } from '@navikt/familie-typer';

import { useBehandling } from '../../../../context/behandlingContext/BehandlingContext';
import type { IBehandling } from '../../../../typer/behandling';
import { VilkårType } from '../../../../typer/vilkår';
import IkonKnapp, { IkonPosisjon } from '../../../Felleskomponenter/IkonKnapp/IkonKnapp';
import UIModalWrapper from '../../../Felleskomponenter/Modal/UIModalWrapper';

const UtførKnapp = styled(IkonKnapp)`
    margin-top: 0.5rem;
`;

interface IProps {
    erLesevisning: boolean;
    personIdent: string;
}

const FjernUtvidetBarnetrygdVilkår: React.FC<IProps> = ({ erLesevisning, personIdent }) => {
    const { request } = useHttp();
    const { åpenBehandling, settÅpenBehandling } = useBehandling();
    const [visModal, settVisModal] = React.useState<boolean>(false);
    const [disabled, settDisabled] = React.useState<boolean>(false);
    const [visFrontendFeilmelding, settVisFrontendFeilmelding] = React.useState<boolean>(false);
    const [feilmelding, settFeilmelding] = React.useState<string>();

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
            <UtførKnapp
                id={`${personIdent}__slett-vilkår-utvidet`}
                onClick={() => settVisModal(true)}
                mini={true}
                erLesevisning={erLesevisning}
                ikonPosisjon={IkonPosisjon.VENSTRE}
                ikon={<Delete title="Fjern vilkår" />}
                label={`Fjern vilkår`}
            />

            {visModal && (
                <UIModalWrapper
                    modal={{
                        tittel: 'Fjern vilkåret utvidet barnetrygd',
                        visModal: visModal,
                        lukkKnapp: false,
                        actions: [
                            <Flatknapp
                                key={'avbryt'}
                                onClick={() => {
                                    settVisFrontendFeilmelding(false);
                                    settFeilmelding(undefined);
                                    settVisModal(false);
                                }}
                                mini={true}
                            >
                                Avbryt
                            </Flatknapp>,
                            <Knapp
                                disabled={disabled}
                                type={'hoved'}
                                key={'bekreft'}
                                onClick={() => fjernVilkårUtvidet()}
                                mini={true}
                            >
                                Bekreft
                            </Knapp>,
                        ],
                    }}
                >
                    Er du sikker?
                    {visFrontendFeilmelding && <Feilmelding>{feilmelding}</Feilmelding>}
                </UIModalWrapper>
            )}
        </>
    );
};

export default FjernUtvidetBarnetrygdVilkår;
