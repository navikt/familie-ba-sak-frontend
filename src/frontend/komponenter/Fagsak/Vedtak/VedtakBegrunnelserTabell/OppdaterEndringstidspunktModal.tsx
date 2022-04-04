import React from 'react';

import styled from 'styled-components';

import { Flatknapp, Knapp } from 'nav-frontend-knapper';
import { SkjemaGruppe } from 'nav-frontend-skjema';

import type { ISkjema } from '@navikt/familie-skjema';
import { RessursStatus } from '@navikt/familie-typer';

import type { IBehandling } from '../../../../typer/behandling';
import type { FamilieIsoDate } from '../../../../utils/kalender';
import { hentFrontendFeilmelding } from '../../../../utils/ressursUtils';
import UIModalWrapper from '../../../Felleskomponenter/Modal/UIModalWrapper';
import { StyledFamilieDatovelger } from '../../Dokumentutsending/DeltBosted/DeltBostedAvtaler';

const Feltmargin = styled.div`
    margin-bottom: 2rem;
`;

interface IProps {
    visModal: boolean;
    onAvbryt: () => void;
    oppdaterEndringstidspunkt: () => void;
    skjema: ISkjema<{ endringstidspunkt: FamilieIsoDate | undefined }, IBehandling>;
}

export const OppdaterEndringstidspunktModal: React.FC<IProps> = ({
    visModal,
    onAvbryt,
    oppdaterEndringstidspunkt,
    skjema,
}) => {
    return (
        <UIModalWrapper
            modal={{
                tittel: 'Oppdater endringstidspunkt',
                visModal: visModal,
                lukkKnapp: true,
                onClose: onAvbryt,
                actions: [
                    <Flatknapp key={'Avbryt'} mini onClick={onAvbryt} children={'Avbryt'} />,
                    <Knapp
                        type={'hoved'}
                        key={'Oppdater'}
                        mini={true}
                        onClick={oppdaterEndringstidspunkt}
                        children={'Oppdater'}
                        spinner={skjema.submitRessurs.status === RessursStatus.HENTER}
                        disabled={skjema.submitRessurs.status === RessursStatus.HENTER}
                    />,
                ],
            }}
        >
            <SkjemaGruppe
                feil={hentFrontendFeilmelding(skjema.submitRessurs)}
                utenFeilPropagering={true}
            >
                <Feltmargin>
                    <StyledFamilieDatovelger
                        {...skjema.felter.endringstidspunkt.hentNavInputProps(
                            skjema.visFeilmeldinger
                        )}
                        feil={
                            !!skjema.felter.endringstidspunkt.feilmelding && skjema.visFeilmeldinger
                        }
                        valgtDato={skjema.felter.endringstidspunkt.verdi}
                        label={'Endringstidspunkt'}
                        placeholder={'DD.MM.ÅÅÅÅ'}
                        allowInvalidDateSelection={false}
                        limitations={{
                            maxDate: new Date().toISOString(),
                        }}
                    />
                </Feltmargin>
            </SkjemaGruppe>
        </UIModalWrapper>
    );
};
