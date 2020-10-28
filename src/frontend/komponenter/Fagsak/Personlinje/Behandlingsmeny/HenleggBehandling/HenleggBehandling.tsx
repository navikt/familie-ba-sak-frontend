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
import { useHistory } from 'react-router';
import { IFagsak } from '../../../../../typer/fagsak';
import { Normaltekst } from 'nav-frontend-typografi';
import Oppfylt from '../../../../../ikoner/Oppfylt';

interface IProps {
    onListElementClick: () => void;
    fagsak: IFagsak;
    behandling: IBehandling;
}

interface HenleggelseÅrsakSelect extends HTMLSelectElement {
    value: HenleggelseÅrsak | '';
}

const HenleggBehandling: React.FC<IProps> = ({ onListElementClick, fagsak, behandling }) => {
    const history = useHistory();

    const [visModal, settVisModal] = useState(false);

    const lukkHenleggBehandlingModal = () => {
        fjernState();
        settVisModal(false);
    };

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
        visVeivalgModal,
        settVisVeivalgModal,
        feilmelding,
    } = useHenleggBehandling(lukkHenleggBehandlingModal);

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
                <SkjemaGruppe feil={feilmelding}>
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

            <UIModalWrapper
                modal={{
                    className: 'henlegg-behandling__veivalg',
                    actions: [
                        <Knapp
                            key={'Gå til saksoversikten'}
                            mini={true}
                            onClick={() => {
                                history.push(`/fagsak/${fagsak.id}/saksoversikt`);
                            }}
                            children={'Gå til saksoversikten'}
                        />,
                        <Knapp
                            key={'Gå til oppgavebenken'}
                            mini={true}
                            onClick={() => {
                                history.push('/oppgaver');
                            }}
                            children={'Gå til oppgavebenken'}
                        />,
                    ],
                    onClose: () => {
                        settVisVeivalgModal(false);
                    },
                    lukkKnapp: true,
                    tittel: '',
                    visModal: visVeivalgModal,
                }}
            >
                <Normaltekst className="henlegg-behandling__veivalg__tekst">
                    <Oppfylt className="henlegg-behandling__veivalg__ikon" />
                    Behandlingen er henlagt
                </Normaltekst>
            </UIModalWrapper>
        </>
    );
};

export default HenleggBehandling;
