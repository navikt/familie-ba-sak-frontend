import * as React from 'react';
import { useEffect, useState } from 'react';
import { Flatknapp, Knapp } from 'nav-frontend-knapper';
import { FamilieSelect, FamilieTextarea } from '@navikt/familie-form-elements/dist';
import {
    IBrevData,
    Brevmal,
    MottakerType,
    brevmaler,
    mottakerTyper,
    BrevtypeSelect,
} from './typer';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import { byggTomRessurs, Ressurs, RessursStatus } from '@navikt/familie-typer';
import PdfVisningModal from '../PdfVisningModal/PdfVisningModal';
import { feil, IFelt, nyttFelt, ok } from '../../../typer/felt';
import { useSkjema } from '../../../typer/skjema';
import { useBehandling } from '../../../context/BehandlingContext';
import { useFagsakRessurser } from '../../../context/FagsakContext';
import styled from 'styled-components';
import StyledKnapperekke from '../StyledComponents/StyledKnapperekke';

interface IProps {
    forhåndsvisningOnClick: (brevData: IBrevData) => void;
    hentetForhåndsvisning: Ressurs<string>;
    brevMaler: Brevmal[];
    onSubmitSuccess: () => void;
}

const StyledBrevSkjema = styled.div`
    .skjemagruppe {
        .skjemaelement {
            margin-top: 1rem;
        }
    }
`;

const BrevSkjema = ({
    brevMaler,
    forhåndsvisningOnClick,
    hentetForhåndsvisning,
    onSubmitSuccess,
}: IProps) => {
    const { åpenBehandling } = useBehandling();
    const { hentLogg } = useFagsakRessurser();

    const { skjema, oppdaterFeltISkjema, kanSendeSkjema, hentFeilmelding, onSubmit } = useSkjema<
        string
    >({
        felter: {
            mottaker: nyttFelt<MottakerType>(MottakerType.SØKER),
            brevmal: nyttFelt<Brevmal | ''>('', (felt: IFelt<Brevmal | ''>) =>
                felt.verdi ? ok(felt) : feil(felt, 'Du må velge en brevmal')
            ),
            fritekst: nyttFelt('', (felt: IFelt<string>) =>
                felt.verdi.replace(/\s/g, '').length >= 3
                    ? ok(felt)
                    : feil(
                          felt,
                          'Siden du har valgt “Annet” i feltet over, må du oppgi minst ett dokument '
                      )
            ),
        },
        submitRessurs: byggTomRessurs(),
        visFeilmeldinger: false,
    });

    const [visForhåndsvisningModal, settForhåndsviningModal] = useState(false);

    const skjemaErLåst =
        skjema.submitRessurs.status === RessursStatus.HENTER ||
        hentetForhåndsvisning.status === RessursStatus.HENTER;

    useEffect(() => {
        if (hentetForhåndsvisning.status === RessursStatus.SUKSESS) {
            settForhåndsviningModal(true);
        }
    }, [hentetForhåndsvisning]);

    console.log(skjema);
    return (
        <StyledBrevSkjema>
            <PdfVisningModal
                åpen={visForhåndsvisningModal}
                onRequestClose={() => settForhåndsviningModal(false)}
                pdfdata={hentetForhåndsvisning}
            />
            <SkjemaGruppe
                feil={
                    skjema.submitRessurs.status === RessursStatus.FEILET
                        ? skjema.submitRessurs.frontendFeilmelding
                        : undefined
                }
            >
                <FamilieSelect
                    name="mottaker"
                    label={'Mottaker'}
                    placeholder={'Velg mottaker'}
                    value={skjema.felter.mottaker.verdi}
                    feil={hentFeilmelding('mottaker')}
                    onChange={(event: React.ChangeEvent<HTMLSelectElement>): void => {
                        oppdaterFeltISkjema('mottaker', event.target.value as MottakerType);
                    }}
                >
                    {Object.entries(MottakerType).map(([id, mottakerType]) => {
                        return (
                            <option
                                aria-selected={id === skjema.felter.mottaker.verdi}
                                key={id}
                                value={id}
                            >
                                {mottakerTyper[mottakerType]}
                            </option>
                        );
                    })}
                </FamilieSelect>
                <FamilieSelect
                    name="brevmal"
                    label={'Mal'}
                    placeholder={'Velg mal'}
                    feil={hentFeilmelding('brevmal')}
                    value={skjema.felter.brevmal.verdi}
                    onChange={(event: React.ChangeEvent<BrevtypeSelect>): void => {
                        oppdaterFeltISkjema('brevmal', event.target.value);
                    }}
                >
                    <option disabled={true} value={''}>
                        Velg
                    </option>
                    {brevMaler.map(mal => {
                        return (
                            <option
                                aria-selected={mal === skjema.felter.brevmal.verdi}
                                key={mal}
                                value={mal}
                            >
                                {brevmaler[mal]}
                            </option>
                        );
                    })}
                </FamilieSelect>
                <FamilieTextarea
                    disabled={skjemaErLåst}
                    erLesevisning={false}
                    label={'Fritekst'}
                    feil={hentFeilmelding('fritekst')}
                    value={skjema.felter.fritekst.verdi}
                    maxLength={4000}
                    onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                        oppdaterFeltISkjema('fritekst', event.target.value);
                    }}
                />
            </SkjemaGruppe>
            <StyledKnapperekke>
                <Flatknapp
                    mini
                    spinner={hentetForhåndsvisning.status === RessursStatus.HENTER}
                    disabled={skjemaErLåst}
                    onClick={() => {
                        if (kanSendeSkjema()) {
                            forhåndsvisningOnClick({
                                mottaker: skjema.felter.mottaker.verdi,
                                brevmal: skjema.felter.brevmal.verdi,
                                fritekst: skjema.felter.fritekst.verdi,
                            });
                        }
                    }}
                >
                    Forhåndsvis
                </Flatknapp>
                <Knapp
                    mini
                    spinner={skjema.submitRessurs.status === RessursStatus.HENTER}
                    disabled={skjemaErLåst}
                    onClick={() => {
                        if (åpenBehandling.status === RessursStatus.SUKSESS) {
                            onSubmit(
                                {
                                    method: 'POST',
                                    data: {
                                        mottaker: skjema.felter.mottaker.verdi,
                                        brevmal: skjema.felter.brevmal.verdi,
                                        fritekst: skjema.felter.fritekst.verdi,
                                    },
                                    url: `/familie-ba-sak/api/dokument/send-brev/innhente-opplysninger/${åpenBehandling.data.behandlingId}`,
                                },
                                () => {
                                    onSubmitSuccess();
                                    hentLogg(åpenBehandling.data.behandlingId);
                                }
                            );
                        }
                    }}
                >
                    Send brev
                </Knapp>
            </StyledKnapperekke>
        </StyledBrevSkjema>
    );
};

export default BrevSkjema;
