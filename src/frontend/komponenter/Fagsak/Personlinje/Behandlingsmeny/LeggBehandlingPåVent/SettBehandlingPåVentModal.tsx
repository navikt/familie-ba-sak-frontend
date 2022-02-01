import React from 'react';

import styled from 'styled-components';

import { Flatknapp, Knapp } from 'nav-frontend-knapper';
import { SkjemaGruppe } from 'nav-frontend-skjema';

import { FamilieSelect } from '@navikt/familie-form-elements';
import { ISkjema } from '@navikt/familie-skjema';
import { RessursStatus } from '@navikt/familie-typer';

import { IBehandling, SettPåVentÅrsak, settPåVentÅrsaker } from '../../../../../typer/behandling';
import { FamilieIsoDate } from '../../../../../utils/kalender';
import { hentFrontendFeilmelding } from '../../../../../utils/ressursUtils';
import { FamilieDatovelgerWrapper } from '../../../../../utils/skjema/FamilieDatovelgerWrapper';
import UIModalWrapper from '../../../../Felleskomponenter/Modal/UIModalWrapper';

const Feltmargin = styled.div`
    margin-bottom: 1.5rem;
`;

interface IProps {
    visModal: boolean;
    onAvbryt: () => void;
    settBehandlingPåVent: () => void;
    skjema: ISkjema<
        { frist: FamilieIsoDate | undefined; årsak: SettPåVentÅrsak | undefined },
        IBehandling
    >;
    erBehandlingAlleredePåVent: boolean;
}

export const SettBehandlingPåVentModal: React.FC<IProps> = ({
    visModal,
    onAvbryt,
    settBehandlingPåVent,
    skjema,
    erBehandlingAlleredePåVent,
}) => {
    const årsaker = Object.keys(SettPåVentÅrsak).filter(key =>
        isNaN(Number(key))
    ) as SettPåVentÅrsak[];

    return (
        <UIModalWrapper
            modal={{
                tittel: 'Sett behandlingen på vent',
                visModal: visModal,
                lukkKnapp: true,
                onClose: onAvbryt,
                actions: [
                    <Flatknapp key={'Avbryt'} mini onClick={onAvbryt} children={'Avbryt'} />,
                    <Knapp
                        type={'hoved'}
                        key={erBehandlingAlleredePåVent ? 'Oppdater' : 'Bekreft'}
                        mini={true}
                        onClick={settBehandlingPåVent}
                        children={'Bekreft'}
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
                    <FamilieDatovelgerWrapper
                        {...skjema.felter.frist.hentNavInputProps(skjema.visFeilmeldinger)}
                        valgtDato={skjema.felter.frist.verdi}
                        label={'Frist'}
                        placeholder={'DD.MM.ÅÅÅÅ'}
                    />
                </Feltmargin>
                <FamilieSelect
                    {...skjema.felter.årsak.hentNavInputProps(skjema.visFeilmeldinger)}
                    label={'Årsak'}
                    placeholder={'Tema'}
                >
                    <option value={undefined}>Velg årsak</option>
                    {årsaker.map(årsak => (
                        <option value={årsak.valueOf()} key={årsak.valueOf()}>
                            {settPåVentÅrsaker[årsak]}
                        </option>
                    ))}
                </FamilieSelect>
            </SkjemaGruppe>
        </UIModalWrapper>
    );
};
