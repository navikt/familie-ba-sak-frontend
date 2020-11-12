import * as React from 'react';
import { useEffect, useState } from 'react';
import { Flatknapp, Knapp } from 'nav-frontend-knapper';
import { FamilieSelect, FamilieTextarea } from '@navikt/familie-form-elements/dist';
import {
    IBrevData,
    Brevmal,
    brevmaler,
    selectLabelsForBrevmaler,
    hentSelectOptions,
    BrevtypeSelect,
    ISelectOptionMedBrevtekst,
} from './typer';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import { Ressurs, RessursStatus } from '@navikt/familie-typer';
import { useBehandling } from '../../../../context/BehandlingContext';
import { useFagsakRessurser } from '../../../../context/FagsakContext';
import PdfVisningModal from '../../PdfVisningModal/PdfVisningModal';
import { IGrunnlagPerson, PersonType } from '../../../../typer/person';
import { formaterPersonIdent } from '../../../../utils/formatter';
import Knapperekke from '../../Knapperekke';
import { useBrevModul } from '../../../../context/BrevModulContext';
import { IFagsak } from '../../../../typer/fagsak';
import FamilieReactSelect from '../../FamilieReactSelect';
import { EtikettInfo } from 'nav-frontend-etiketter';
import { Normaltekst } from 'nav-frontend-typografi';
import { målform } from '../../../../typer/søknad';
import styled from 'styled-components';
import navFarger from 'nav-frontend-core';
import SkjultLegend from '../../SkjultLegend';
import { Felt, Valideringsstatus } from '../../../../familie-skjema/typer';

interface IProps {
    forhåndsvisningOnClick: (brevData: IBrevData) => void;
    hentetForhåndsvisning: Ressurs<string>;
    brevMaler: Brevmal[];
    onSubmitSuccess: () => void;
}

const StyledEtikettInfo = styled(EtikettInfo)`
    background-color: ${navFarger.navLysGra};
    border-color: ${navFarger.navGra60};
`;

const Brevskjema = ({
    brevMaler,
    forhåndsvisningOnClick,
    hentetForhåndsvisning,
    onSubmitSuccess,
}: IProps) => {
    const { åpenBehandling, erLesevisning } = useBehandling();
    const { hentLogg, settFagsak } = useFagsakRessurser();

    const {
        skjema,
        hentSkjemaData,
        kanSendeSkjema,
        mottakersMålform,
        multiselectInneholderAnnet,
        onSubmit,
        personer,
        settNavigerTilOpplysningsplikt,
    } = useBrevModul();

    const [visForhåndsvisningModal, settForhåndsviningModal] = useState(false);

    useEffect(() => {
        if (hentetForhåndsvisning.status === RessursStatus.SUKSESS) {
            settForhåndsviningModal(true);
        }
    }, [hentetForhåndsvisning]);

    useEffect(() => {
        settForhåndsviningModal(false);
    }, []);

    const skjemaErLåst =
        skjema.submitRessurs.status === RessursStatus.HENTER ||
        hentetForhåndsvisning.status === RessursStatus.HENTER;

    const valgtBrevmal: Felt<Brevmal | ''> = skjema.felter.brevmal;

    const submitFeil =
        skjema.submitRessurs.status === RessursStatus.FEILET
            ? skjema.submitRessurs.frontendFeilmelding
            : undefined;

    const hentetForhåndsvisningFeil =
        hentetForhåndsvisning.status === RessursStatus.FEILET
            ? hentetForhåndsvisning.frontendFeilmelding
            : undefined;

    return (
        <div>
            <PdfVisningModal
                åpen={visForhåndsvisningModal}
                onRequestClose={() => settForhåndsviningModal(false)}
                pdfdata={hentetForhåndsvisning}
            />
            <SkjemaGruppe feil={submitFeil || hentetForhåndsvisningFeil}>
                <SkjultLegend>Send brev</SkjultLegend>
                <FamilieSelect
                    {...skjema.felter.mottakerIdent.hentNavInputProps(skjema.visFeilmeldinger)}
                    label={'Mottaker'}
                    placeholder={'Velg mottaker'}
                    onChange={(event: React.ChangeEvent<HTMLSelectElement>): void => {
                        skjema.felter.mottakerIdent.onChange(event.target.value);
                    }}
                >
                    <option value={''}>Velg</option>
                    {personer
                        .filter((person: IGrunnlagPerson) => person.type !== PersonType.BARN)
                        .map(person => {
                            return (
                                <option
                                    aria-selected={
                                        person.personIdent === skjema.felter.mottakerIdent.verdi
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
                    {...skjema.felter.brevmal.hentNavInputProps(skjema.visFeilmeldinger)}
                    label={'Mal'}
                    placeholder={'Velg mal'}
                    onChange={(event: React.ChangeEvent<BrevtypeSelect>): void => {
                        skjema.felter.brevmal.onChange(event.target.value);
                    }}
                >
                    <option value={''}>Velg</option>
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

                {valgtBrevmal.valideringsstatus === Valideringsstatus.OK && (
                    <FamilieReactSelect
                        {...skjema.felter.multiselect.hentNavInputProps(skjema.visFeilmeldinger)}
                        label={
                            valgtBrevmal.verdi !== ''
                                ? selectLabelsForBrevmaler[valgtBrevmal.verdi]
                                : ''
                        }
                        erLesevisning={erLesevisning()}
                        isMulti={true}
                        placeholder={'Velg'}
                        noOptionsMessage={() => 'Ingen valg'}
                        onChange={valgteOptions => {
                            skjema.felter.multiselect.onChange(
                                valgteOptions === null
                                    ? []
                                    : (valgteOptions as ISelectOptionMedBrevtekst[])
                            );
                        }}
                        options={hentSelectOptions(valgtBrevmal.verdi)}
                    />
                )}

                {multiselectInneholderAnnet() && (
                    <FamilieTextarea
                        {...skjema.felter.fritekst.hentNavInputProps(skjema.visFeilmeldinger)}
                        disabled={skjemaErLåst}
                        label={
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Normaltekst>Fritekst</Normaltekst>
                                <StyledEtikettInfo mini={true}>
                                    {målform[mottakersMålform]}
                                </StyledEtikettInfo>
                            </div>
                        }
                        erLesevisning={false}
                        maxLength={4000}
                    />
                )}
            </SkjemaGruppe>
            <Knapperekke>
                <Flatknapp
                    mini
                    spinner={hentetForhåndsvisning.status === RessursStatus.HENTER}
                    disabled={skjemaErLåst}
                    onClick={() => {
                        if (kanSendeSkjema()) {
                            forhåndsvisningOnClick(hentSkjemaData());
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
                            settNavigerTilOpplysningsplikt(
                                skjema.felter.brevmal.verdi === Brevmal.INNHENTE_OPPLYSNINGER
                            );
                            onSubmit(
                                {
                                    method: 'POST',
                                    data: hentSkjemaData(),
                                    url: `/familie-ba-sak/api/dokument/send-brev/${åpenBehandling.data.behandlingId}`,
                                },
                                (ressurs: Ressurs<IFagsak>) => {
                                    onSubmitSuccess();
                                    settFagsak(ressurs);
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
