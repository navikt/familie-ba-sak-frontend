import * as React from 'react';
import { useEffect, useState } from 'react';
import { Flatknapp, Knapp } from 'nav-frontend-knapper';
import { FamilieSelect, FamilieTextarea } from '@navikt/familie-form-elements/dist';
import { IBrevData, TypeBrev, TypeMottaker } from './typer';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import { Ressurs, RessursStatus } from '@navikt/familie-typer';
import PdfVisningModal from '../PdfVisningModal/PdfVisningModal';
import useBrevModul from '../Hendelsesoversikt/useBrevModul';

interface IProps {
    sendBrevOnClick: (brevData: IBrevData) => void;
    innsendtBrev: Ressurs<string>;
    forhåndsvisningOnClick: (brevData: IBrevData) => void;
    hentetForhåndsvisning: Ressurs<string>;
    brevMaler: TypeBrev[];
}

const BrevSkjema = ({
    sendBrevOnClick,
    innsendtBrev,
    forhåndsvisningOnClick,
    hentetForhåndsvisning,
    brevMaler,
}: IProps) => {
    const { brevmal, settBrevmal } = useBrevModul();
    const [mottaker, settMottaker] = useState(TypeMottaker.SØKER);
    const [fritekst, settFritekst] = useState('');
    const [feilmelding, settFeilmelding] = React.useState<string | undefined>(undefined);
    const [visForhåndsvisningModal, settForhåndsviningModal] = useState(false);

    const senderInn = innsendtBrev.status === RessursStatus.HENTER;
    const henterFohåndsvisning = hentetForhåndsvisning.status === RessursStatus.HENTER;

    useEffect(() => {
        settFeilmelding(
            innsendtBrev.status === RessursStatus.FEILET ||
                innsendtBrev.status === RessursStatus.IKKE_TILGANG
                ? innsendtBrev.frontendFeilmelding
                : undefined
        );
    }, [innsendtBrev]);

    useEffect(() => {
        if (hentetForhåndsvisning.status === RessursStatus.SUKSESS) {
            settForhåndsviningModal(true);
        }
    }, [hentetForhåndsvisning]);

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
                {brevMaler.map(mal => {
                    return (
                        <option aria-selected={mal === brevmal} key={mal} value={mal}>
                            {mal}
                        </option>
                    );
                })}
            </FamilieSelect>
            <FamilieTextarea
                disabled={senderInn || henterFohåndsvisning}
                erLesevisning={false}
                label={'Fritekst'}
                value={fritekst}
                maxLength={4000}
                onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                    const tekst = event.target.value;
                    settFritekst(tekst);
                    if (tekst !== '') {
                        settFeilmelding(undefined);
                    }
                }}
            />
            <div className="knapperekke">
                <Knapp
                    mini
                    spinner={senderInn}
                    disabled={senderInn}
                    onClick={() => {
                        if (fritekst === '') {
                            settFeilmelding('Friteksten kan ikke være tom');
                        } else if (!senderInn) {
                            sendBrevOnClick({
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
                        if (fritekst === '') {
                            settFeilmelding('Friteksten kan ikke være tom');
                        } else if (!henterFohåndsvisning) {
                            forhåndsvisningOnClick({
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
            <PdfVisningModal
                åpen={visForhåndsvisningModal}
                onRequestClose={() => settForhåndsviningModal(false)}
                pdfdata={hentetForhåndsvisning}
            />
        </SkjemaGruppe>
    );
};

export default BrevSkjema;
