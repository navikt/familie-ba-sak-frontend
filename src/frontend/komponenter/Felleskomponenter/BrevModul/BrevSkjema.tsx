import * as React from 'react';
import { useState } from 'react';
import { Flatknapp, Knapp } from 'nav-frontend-knapper';
import { FamilieSelect, FamilieTextarea } from '@navikt/familie-form-elements/dist';
import { IBrevData, TypeBrev, TypeMottaker } from './typer';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import { Ressurs, RessursStatus } from '@navikt/familie-typer';
import { IFagsak } from '../../../typer/fagsak';

interface IProps {
    sendBrev: (brevData: IBrevData) => void;
    innsendtBrev: Ressurs<IFagsak>;
    hentForhåndsvisning: (brevData: IBrevData) => void;
    hentetForhåndsvisning: Ressurs<string>;
}

const BrevSkjema = ({
    sendBrev,
    innsendtBrev,
    hentForhåndsvisning,
    hentetForhåndsvisning,
}: IProps) => {
    const [mottaker, settMottaker] = useState(TypeMottaker.SØKER);
    const [brevmal, settBrevmal] = useState(TypeBrev.OPPLYSNINGER);
    const [fritekst, settFritekst] = useState('');

    const senderInn = innsendtBrev.status === RessursStatus.HENTER;
    const henterFohåndsvisning = hentetForhåndsvisning.status === RessursStatus.HENTER; // TODO: Egen for innsendt brev?

    const feilmelding =
        innsendtBrev.status === RessursStatus.FEILET ||
        innsendtBrev.status === RessursStatus.IKKE_TILGANG
            ? innsendtBrev.frontendFeilmelding
            : '';

    return (
        <SkjemaGruppe className={'brevskjema'} feil={feilmelding}>
            <FamilieSelect
                name="mottaker"
                label={'Mottaker'}
                placeholder={'Velg mottaker'}
                bredde="xxl"
                onChange={(event: React.ChangeEvent<HTMLSelectElement>): void => {
                    settMottaker(event.target.value as TypeMottaker);
                }}
            >
                {Object.entries(TypeMottaker).map(([id, navn]) => {
                    return (
                        <option aria-selected={id === mottaker} key={id} value={id}>
                            {navn}
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
                {Object.entries(TypeBrev).map(([id, navn]) => {
                    return (
                        <option aria-selected={id === brevmal} key={id} value={id}>
                            {navn}
                        </option>
                    );
                })}
            </FamilieSelect>
            <div className="input--xxl">
                <FamilieTextarea
                    erLesevisning={false}
                    label={'Fritekst'}
                    value={fritekst}
                    maxLength={4000}
                    onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                        settFritekst(event.target.value);
                    }}
                />
            </div>
            <div>
                <Knapp
                    mini
                    spinner={senderInn}
                    disabled={senderInn}
                    onClick={() => {
                        if (!senderInn) {
                            sendBrev({
                                mottaker: mottaker,
                                brevmal: brevmal,
                                fritekst: fritekst,
                            });
                        }
                    }}
                >
                    Send brev
                </Knapp>
                <Flatknapp
                    mini
                    spinner={henterFohåndsvisning}
                    disabled={henterFohåndsvisning}
                    onClick={() => {
                        if (!henterFohåndsvisning) {
                            hentForhåndsvisning({
                                mottaker: mottaker,
                                brevmal: brevmal,
                                fritekst: fritekst,
                            });
                        }
                    }}
                >
                    Forhåndsvis
                </Flatknapp>
            </div>
        </SkjemaGruppe>
    );
};

export default BrevSkjema;
