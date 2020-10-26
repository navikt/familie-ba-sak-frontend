import { FamilieSelect, FamilieTextarea } from '@navikt/familie-form-elements';
import KnappBase, { Flatknapp, Knapp } from 'nav-frontend-knapper';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import React, { useState } from 'react';
import UIModalWrapper from '../../../../Felleskomponenter/Modal/UIModalWrapper';
import { henleggelseÅrsak, HenleggelseÅrsak } from '../../../../../typer/behandling';
import { IFagsak } from '../../../../../typer/fagsak';
import useHenleggBehandling from './useHenleggBehandling';
import { byggTomRessurs, RessursStatus } from '@navikt/familie-typer';

interface IProps {
    onListElementClick: () => void;
    fagsak: IFagsak;
}

interface HenleggelseÅrsakSelect extends HTMLSelectElement {
    value: HenleggelseÅrsak | '';
}

const HenleggBehandling: React.FC<IProps> = ({ onListElementClick }) => {
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
                                fjernState();
                                lukkHenleggBehandlingModal();
                            }}
                            children={'Avbryt'}
                        />,
                        <Knapp
                            key={'bekreft'}
                            type={'hoved'}
                            mini={true}
                            onClick={() => onBekreft()}
                            children={'Bekreft'}
                            spinner={submitRessurs.status === RessursStatus.HENTER}
                            disabled={submitRessurs.status === RessursStatus.HENTER}
                        />,
                    ],
                    onClose: () => {
                        fjernState();
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
