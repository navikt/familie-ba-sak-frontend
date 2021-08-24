import * as React from 'react';
import { useEffect, useState } from 'react';

import styled from 'styled-components';

import navFarger from 'nav-frontend-core';
import { EtikettInfo } from 'nav-frontend-etiketter';
import { Flatknapp, Knapp } from 'nav-frontend-knapper';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import { Normaltekst } from 'nav-frontend-typografi';

import { FamilieReactSelect, FamilieSelect } from '@navikt/familie-form-elements';
import { Felt } from '@navikt/familie-skjema';
import { Ressurs, RessursStatus } from '@navikt/familie-typer';

import { useBehandling } from '../../../../context/BehandlingContext';
import { useBrevModul } from '../../../../context/BrevModulContext';
import { useFagsakRessurser } from '../../../../context/FagsakContext';
import useForhåndsvisning from '../../../../hooks/useForhåndsvisning';
import { BehandlingSteg, hentStegNummer } from '../../../../typer/behandling';
import { IFagsak } from '../../../../typer/fagsak';
import { IGrunnlagPerson, PersonType } from '../../../../typer/person';
import { målform } from '../../../../typer/søknad';
import { formaterPersonIdent } from '../../../../utils/formatter';
import { hentFrontendFeilmelding } from '../../../../utils/ressursUtils';
import Knapperekke from '../../Knapperekke';
import PdfVisningModal from '../../PdfVisningModal/PdfVisningModal';
import SkjultLegend from '../../SkjultLegend';
import {
    Brevmal,
    brevmaler,
    selectLabelsForBrevmaler,
    hentSelectOptions,
    BrevtypeSelect,
    ISelectOptionMedBrevtekst,
} from './typer';

interface IProps {
    brevMaler: Brevmal[];
    onSubmitSuccess: () => void;
}

const StyledEtikettInfo = styled(EtikettInfo)`
    background-color: ${navFarger.navLysGra};
    border-color: ${navFarger.navGra60};
`;

const LabelOgEtikett = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Brevskjema = ({ brevMaler, onSubmitSuccess }: IProps) => {
    const { åpenBehandling, erLesevisning } = useBehandling();
    const { hentLogg, settFagsak } = useFagsakRessurser();
    const { hentForhåndsvisning, hentetForhåndsvisning } = useForhåndsvisning();

    const {
        skjema,
        hentSkjemaData,
        kanSendeSkjema,
        mottakersMålform,
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

    const behandlingId =
        åpenBehandling.status === RessursStatus.SUKSESS && åpenBehandling.data.behandlingId;

    return (
        <div>
            <PdfVisningModal
                åpen={visForhåndsvisningModal}
                onRequestClose={() => settForhåndsviningModal(false)}
                pdfdata={hentetForhåndsvisning}
            />
            <SkjemaGruppe
                feil={
                    hentFrontendFeilmelding(skjema.submitRessurs) ||
                    hentFrontendFeilmelding(hentetForhåndsvisning)
                }
            >
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

                {skjema.felter.multiselect.erSynlig && (
                    <FamilieReactSelect
                        {...skjema.felter.multiselect.hentNavInputProps(skjema.visFeilmeldinger)}
                        label={
                            <LabelOgEtikett>
                                <Normaltekst>
                                    {valgtBrevmal.verdi !== ''
                                        ? selectLabelsForBrevmaler[valgtBrevmal.verdi]
                                        : ''}
                                </Normaltekst>
                                <StyledEtikettInfo mini={true}>
                                    {målform[mottakersMålform()]}
                                </StyledEtikettInfo>
                            </LabelOgEtikett>
                        }
                        creatable={true}
                        erLesevisning={erLesevisning()}
                        isMulti={true}
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
            </SkjemaGruppe>
            <Knapperekke>
                <Flatknapp
                    mini
                    spinner={hentetForhåndsvisning.status === RessursStatus.HENTER}
                    disabled={skjemaErLåst}
                    onClick={() => {
                        if (kanSendeSkjema()) {
                            hentForhåndsvisning({
                                method: 'POST',
                                data: hentSkjemaData(),
                                url: `/familie-ba-sak/api/dokument/forhaandsvis-brev/${behandlingId}`,
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
                            const harRegistrertSøknad =
                                hentStegNummer(åpenBehandling.data.steg) >
                                hentStegNummer(BehandlingSteg.REGISTRERE_SØKNAD);
                            settNavigerTilOpplysningsplikt(
                                harRegistrertSøknad &&
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
