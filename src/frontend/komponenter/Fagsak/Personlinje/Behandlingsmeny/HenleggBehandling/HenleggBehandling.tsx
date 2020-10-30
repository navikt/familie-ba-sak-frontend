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
import { RessursStatus } from '@navikt/familie-typer';
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

    const {
        hentFeltProps,
        onBekreft,
        oppdaterFeltISkjema,
        settVisVeivalgModal,
        skjema,
        visVeivalgModal,
    } = useHenleggBehandling(() => {
        settVisModal(false);
    });

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
                        BehandlingSteg.SEND_TIL_BESLUTTER,
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
                                settVisModal(false);
                            }}
                            children={'Avbryt'}
                        />,
                        <Knapp
                            key={'bekreft'}
                            type={'hoved'}
                            mini={true}
                            onClick={() => onBekreft(behandling.behandlingId)}
                            children={
                                skjema.felter.årsak.verdi === 'SØKNAD_TRUKKET'
                                    ? 'Bekreft og send brev'
                                    : 'Bekreft'
                            }
                        />,
                    ],
                    onClose: () => {
                        settVisModal(false);
                    },
                    lukkKnapp: true,
                    tittel: 'Henlegg behandling',
                    visModal,
                }}
            >
                <SkjemaGruppe
                    feil={
                        skjema.submitRessurs.status === RessursStatus.FEILET
                            ? skjema.submitRessurs.frontendFeilmelding
                            : undefined
                    }
                >
                    <FamilieSelect
                        {...hentFeltProps('årsak')}
                        label={'Velg årsak'}
                        onChange={(event: React.ChangeEvent<HenleggelseÅrsakSelect>): void => {
                            oppdaterFeltISkjema('årsak', event.target.value);
                        }}
                    >
                        <option disabled={true} value={''}>
                            Velg
                        </option>
                        {Object.values(HenleggelseÅrsak).map(årsak => {
                            return (
                                <option
                                    key={årsak}
                                    aria-selected={skjema.felter.årsak.verdi === årsak}
                                    value={årsak}
                                >
                                    {henleggelseÅrsak[årsak]}
                                </option>
                            );
                        })}
                    </FamilieSelect>

                    <FamilieTextarea
                        {...hentFeltProps('begrunnelse')}
                        label={'Begrunnelse'}
                        erLesevisning={false}
                        maxLength={4000}
                        onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                            oppdaterFeltISkjema('begrunnelse', event.target.value);
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
