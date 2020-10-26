import * as React from 'react';
import { useEffect, useState } from 'react';
import { Flatknapp, Knapp } from 'nav-frontend-knapper';
import { FamilieSelect, FamilieTextarea } from '@navikt/familie-form-elements/dist';
import { IBrevData, Brevmal, brevmaler, BrevtypeSelect } from './typer';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import { byggTomRessurs, Ressurs, RessursStatus } from '@navikt/familie-typer';
import { useBehandling } from '../../../../context/BehandlingContext';
import { useFagsakRessurser } from '../../../../context/FagsakContext';
import { nyttFelt, IFelt, ok, feil } from '../../../../typer/felt';
import { useSkjema } from '../../../../typer/skjema';
import PdfVisningModal from '../../PdfVisningModal/PdfVisningModal';
import { IGrunnlagPerson, PersonType } from '../../../../typer/person';
import { formaterPersonIdent } from '../../../../utils/formatter';
import { fjernWhitespace } from '../../../../utils/commons';
import Knapperekke from '../../Knapperekke';

interface IProps {
    forhåndsvisningOnClick: (brevData: IBrevData) => void;
    hentetForhåndsvisning: Ressurs<string>;
    brevMaler: Brevmal[];
    onSubmitSuccess: () => void;
}

const Brevskjema = ({
    brevMaler,
    forhåndsvisningOnClick,
    hentetForhåndsvisning,
    onSubmitSuccess,
}: IProps) => {
    const { åpenBehandling } = useBehandling();
    const { hentLogg } = useFagsakRessurser();

    const { hentFeltProps, kanSendeSkjema, onSubmit, oppdaterFeltISkjema, skjema } = useSkjema<
        string
    >({
        felter: {
            mottaker: nyttFelt<string>('', (felt: IFelt<string>) =>
                felt.verdi.length >= 1 ? ok(felt) : feil(felt, 'Du må velge en mottaker')
            ),
            brevmal: nyttFelt<Brevmal | ''>('', (felt: IFelt<Brevmal | ''>) =>
                felt.verdi ? ok(felt) : feil(felt, 'Du må velge en brevmal')
            ),
            fritekst: nyttFelt('', (felt: IFelt<string>) =>
                fjernWhitespace(felt.verdi).length >= 3
                    ? ok(felt)
                    : feil(
                          felt,
                          'Du må fylle ut fritekst'
                          // Teksten under skal inn når vi får på plass multiselect
                          //'Siden du har valgt “Annet” i feltet over, må du oppgi minst ett dokument '
                      )
            ),
        },
        skjemanavn: 'brevmodul',
        submitRessurs: byggTomRessurs(),
        visFeilmeldinger: false,
    });

    const [visForhåndsvisningModal, settForhåndsviningModal] = useState(false);

    const personer =
        åpenBehandling.status === RessursStatus.SUKSESS ? åpenBehandling.data.personer : [];
    const skjemaErLåst =
        skjema.submitRessurs.status === RessursStatus.HENTER ||
        hentetForhåndsvisning.status === RessursStatus.HENTER;

    useEffect(() => {
        if (hentetForhåndsvisning.status === RessursStatus.SUKSESS) {
            settForhåndsviningModal(true);
        }
    }, [hentetForhåndsvisning]);

    return (
        <div>
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
                    {...hentFeltProps('mottaker')}
                    label={'Mottaker'}
                    placeholder={'Velg mottaker'}
                    onChange={(event: React.ChangeEvent<HTMLSelectElement>): void => {
                        oppdaterFeltISkjema('mottaker', event.target.value);
                    }}
                >
                    <option disabled={true} value={''}>
                        Velg
                    </option>
                    {personer
                        .filter((person: IGrunnlagPerson) => person.type !== PersonType.BARN)
                        .map(person => {
                            return (
                                <option
                                    aria-selected={
                                        person.personIdent === skjema.felter.mottaker.verdi
                                    }
                                    key={person.personIdent}
                                    value={person.personIdent}
                                >
                                    {formaterPersonIdent(person.personIdent)}
                                </option>
                            );
                        })}
                </FamilieSelect>
                <FamilieSelect
                    {...hentFeltProps('brevmal')}
                    label={'Mal'}
                    placeholder={'Velg mal'}
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
                    {...hentFeltProps('fritekst')}
                    disabled={skjemaErLåst}
                    label={'Fritekst'}
                    erLesevisning={false}
                    maxLength={4000}
                    onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                        oppdaterFeltISkjema('fritekst', event.target.value);
                    }}
                />
            </SkjemaGruppe>
            <Knapperekke>
                <Flatknapp
                    mini
                    spinner={hentetForhåndsvisning.status === RessursStatus.HENTER}
                    disabled={skjemaErLåst}
                    onClick={() => {
                        if (kanSendeSkjema()) {
                            forhåndsvisningOnClick({
                                mottakerIdent: skjema.felter.mottaker.verdi,
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
            </Knapperekke>
        </div>
    );
};

export default Brevskjema;
