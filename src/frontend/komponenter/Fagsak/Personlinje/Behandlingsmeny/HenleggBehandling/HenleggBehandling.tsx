import { FamilieSelect, FamilieTextarea } from '@navikt/familie-form-elements';
import KnappBase, { Flatknapp, Knapp } from 'nav-frontend-knapper';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import React, { useState } from 'react';
import UIModalWrapper from '../../../../Felleskomponenter/Modal/UIModalWrapper';
import {
    BehandlingSteg,
    henleggelseÅrsak,
    HenleggelseÅrsak,
    IBehandling,
} from '../../../../../typer/behandling';
import useHenleggBehandling from './useHenleggBehandling';
import { byggTomRessurs, RessursStatus } from '@navikt/familie-typer';

interface IProps {
    onListElementClick: () => void;
    behandling: IBehandling;
}

interface HenleggelseÅrsakSelect extends HTMLSelectElement {
    value: HenleggelseÅrsak | '';
}

const HenleggBehandling: React.FC<IProps> = ({ onListElementClick, behandling }) => {
    const [visModal, settVisModal] = useState(false);

    const {
        fjernState,
        onBekreft,
        settSubmitRessurs,
        submitRessurs,
        selectedHenleggelseÅrsak,
        settSelectedHenleggelseÅrsak,
        begrunnelse,
        settBegrunnelse,
        valideringsFeil,
        settValideringsfeil,
    } = useHenleggBehandling(() => settVisModal(false));

    const lukkHenleggBehandlingModal = () => {
        fjernState();
        settVisModal(false);
    };

    return (
        <>
            <KnappBase
                mini={true}
                onClick={() => {
                    onListElementClick();
                    settVisModal(true);
                }}
                disabled={
                    ![
                        BehandlingSteg.REGISTRERE_SØKNAD,
                        BehandlingSteg.REGISTRERE_PERSONGRUNNLAG,
                        BehandlingSteg.VILKÅRSVURDERING,
                    ].includes(behandling.steg)
                }
            >
                Henlegg behandling
            </KnappBase>

            <UIModalWrapper
                modal={{
                    actions: [
                        <Flatknapp
                            key={'avbryt'}
                            mini={true}
                            onClick={() => {
                                lukkHenleggBehandlingModal();
                            }}
                            children={'Avbryt'}
                        />,
                        <Knapp
                            key={'bekreft'}
                            type={'hoved'}
                            mini={true}
                            onClick={() => onBekreft(behandling.behandlingId)}
                            children={
                                selectedHenleggelseÅrsak === HenleggelseÅrsak.SØKNAD_TRUKKET
                                    ? 'Bekreft og send brev'
                                    : 'Bekreft'
                            }
                            spinner={submitRessurs.status === RessursStatus.HENTER}
                            disabled={submitRessurs.status === RessursStatus.HENTER}
                        />,
                    ],
                    onClose: () => {
                        lukkHenleggBehandlingModal();
                    },
                    lukkKnapp: true,
                    tittel: 'Henlegg behandling',
                    visModal,
                }}
            >
                <SkjemaGruppe
                    feil={
                        submitRessurs.status === RessursStatus.FEILET
                            ? submitRessurs.frontendFeilmelding
                            : ''
                    }
                >
                    <FamilieSelect
                        feil={valideringsFeil.henleggelseÅrsak}
                        erLesevisning={false}
                        value={selectedHenleggelseÅrsak}
                        name={'Henleggelsesårsak'}
                        label={'Velg årsak'}
                        onChange={(event: React.ChangeEvent<HenleggelseÅrsakSelect>): void => {
                            settSubmitRessurs(byggTomRessurs());
                            settValideringsfeil(valideringsFeil => {
                                return {
                                    ...valideringsFeil,
                                    behandlingÅrsak: '',
                                };
                            });
                            settSelectedHenleggelseÅrsak(event.target.value);
                        }}
                    >
                        <option disabled={true} value={''}>
                            Velg
                        </option>
                        {Object.values(HenleggelseÅrsak).map(årsak => {
                            return (
                                <option
                                    key={årsak}
                                    aria-selected={selectedHenleggelseÅrsak === årsak}
                                    value={årsak}
                                >
                                    {henleggelseÅrsak[årsak]}
                                </option>
                            );
                        })}
                    </FamilieSelect>

                    <FamilieTextarea
                        disabled={false}
                        erLesevisning={false}
                        label={'Begrunnelse'}
                        value={begrunnelse}
                        maxLength={4000}
                        onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                            const tekst = event.target.value;
                            settBegrunnelse(tekst);
                        }}
                    />
                </SkjemaGruppe>
            </UIModalWrapper>
        </>
    );
};

export default HenleggBehandling;
