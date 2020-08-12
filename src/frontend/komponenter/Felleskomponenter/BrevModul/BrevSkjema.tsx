import * as React from 'react';
import { useState } from 'react';
import { Knapp } from 'nav-frontend-knapper';
import { FamilieSelect, FamilieTextarea } from '@navikt/familie-form-elements/dist';
import { IPar } from '../../../typer/common';
import {
    brevtyper,
    IBrevData,
    mottakertyper,
    TypeBrev,
    TypeMottaker,
    TypeÅrsak,
    årsaktyper,
} from './typer';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import { Ressurs, RessursStatus } from '@navikt/familie-typer';
import { IFagsak } from '../../../typer/fagsak';

interface IProps {
    sendtBrev: Ressurs<IFagsak>;
    sendBrev: (brevData: IBrevData) => void;
}

const BrevSkjema = ({ sendtBrev, sendBrev }: IProps) => {
    const brevMalErRevurdering = true; //erstatt med sjekk av mal
    const visFritekst = (brevmal: TypeBrev, årsak: TypeÅrsak) => {
        return brevmal == TypeBrev.DOKUMENTASJON || årsak == TypeÅrsak.ANNEN;
    };

    const [mottaker, settMottaker] = useState(TypeMottaker.SØKER);
    const [brevmal, settBrevmal] = useState(TypeBrev.DOKUMENTASJON);
    const [årsak, settÅrsak] = useState(TypeÅrsak.DOKUMENTASJON);
    const [fritekst, settFritekst] = useState('');

    const senderInn = sendtBrev.status === RessursStatus.HENTER;
    const feilmelding =
        sendtBrev.status === RessursStatus.FEILET || sendtBrev.status === RessursStatus.IKKE_TILGANG
            ? sendtBrev.frontendFeilmelding
            : '';

    return (
        <SkjemaGruppe feil={feilmelding}>
            <FamilieSelect
                name="mottaker"
                label={'Mottaker'}
                placeholder={'Velg mottaker'}
                bredde="xxl"
                onChange={(event: React.ChangeEvent<HTMLSelectElement>): void => {
                    settMottaker(event.target.value as TypeMottaker);
                }}
            >
                {Object.values(mottakertyper)
                    //.filter((type: IPar) => type.id !== TypeSøker.ORDINÆR)
                    .map((type: IPar) => {
                        return (
                            <option
                                aria-selected={type.id === mottaker}
                                key={type.id}
                                value={type.id}
                            >
                                {type.navn}
                            </option>
                        );
                    })}
            </FamilieSelect>
            <FamilieSelect
                name="brevmal"
                label={'Mal'}
                placeholder={'Velg mal'}
                bredde="xxl"
                onChange={(event: React.ChangeEvent<HTMLSelectElement>): void => {
                    settBrevmal(event.target.value as TypeBrev);
                }}
            >
                {Object.values(brevtyper)
                    //.filter((type: IPar) => type.id !== TypeSøker.ORDINÆR)
                    .map((type: IPar) => {
                        return (
                            <option
                                aria-selected={type.id === brevmal}
                                key={type.id}
                                value={type.id}
                            >
                                {type.navn}
                            </option>
                        );
                    })}
            </FamilieSelect>
            {brevMalErRevurdering && (
                <FamilieSelect
                    name="årsakskode"
                    label={'Årsak'}
                    placeholder={'Velg årsak'}
                    bredde="xxl"
                    onChange={(event: React.ChangeEvent<HTMLSelectElement>): void => {
                        settÅrsak(event.target.value as TypeÅrsak);
                    }}
                >
                    {Object.values(årsaktyper)
                        //.filter((type: IPar) => type.id !== TypeSøker.ORDINÆR)
                        .map((type: IPar) => {
                            return (
                                <option
                                    aria-selected={type.id === årsak}
                                    key={type.id}
                                    value={type.id}
                                >
                                    {type.navn}
                                </option>
                            );
                        })}
                </FamilieSelect>
            )}
            {visFritekst(brevmal, årsak) && (
                <div className="input--xxl">
                    <FamilieTextarea
                        erLesevisning={false}
                        label={'Fritekst'}
                        value={fritekst}
                        maxLength={4000} // TODO: Må endres og tas med i familieTextarea
                        onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                            settFritekst(event.target.value);
                        }}
                    />
                </div>
            )}
            <div>
                <Knapp
                    type={'hoved'}
                    spinner={senderInn}
                    disabled={senderInn}
                    onClick={() => {
                        if (!senderInn) {
                            sendBrev({
                                mottaker: TypeMottaker.SØKER,
                                brevmal: TypeBrev.DOKUMENTASJON,
                                årsak: TypeÅrsak.DOKUMENTASJON,
                            });
                        }
                    }}
                    children={'Send brev'}
                />
                <a href="https://www.nav.no">Forhåndsvis</a>
            </div>
        </SkjemaGruppe>
    );
};

export default BrevSkjema;
