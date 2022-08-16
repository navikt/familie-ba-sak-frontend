import * as React from 'react';

import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Feiloppsummering } from 'nav-frontend-skjema';
import { Feilmelding, Normaltekst } from 'nav-frontend-typografi';

import { Refresh } from '@navikt/ds-icons';
import { Alert } from '@navikt/ds-react';
import { NavdsSpacing2 } from '@navikt/ds-tokens/dist/tokens';
import { FamilieKnapp } from '@navikt/familie-form-elements';
import { byggHenterRessurs, byggTomRessurs, RessursStatus } from '@navikt/familie-typer';
import type { Ressurs } from '@navikt/familie-typer';

import { useBehandling } from '../../../context/behandlingContext/BehandlingContext';
import { useVilkårsvurdering } from '../../../context/Vilkårsvurdering/VilkårsvurderingContext';
import useSakOgBehandlingParams from '../../../hooks/useSakOgBehandlingParams';
import type { IBehandling } from '../../../typer/behandling';
import { BehandlingSteg, BehandlingÅrsak } from '../../../typer/behandling';
import type { IAnnenVurdering, IVilkårResultat } from '../../../typer/vilkår';
import { annenVurderingConfig, vilkårConfig } from '../../../typer/vilkår';
import { datoformat, formaterIsoDato } from '../../../utils/formatter';
import { hentFrontendFeilmelding } from '../../../utils/ressursUtils';
import Skjemasteg from '../../Felleskomponenter/Skjemasteg/Skjemasteg';
import { annenVurderingFeilmeldingId } from './GeneriskAnnenVurdering/AnnenVurderingTabell';
import { vilkårFeilmeldingId } from './GeneriskVilkår/VilkårTabell';
import { HentetLabel } from './Registeropplysninger/HentetLabel';
import VilkårsvurderingSkjema from './VilkårsvurderingSkjema';

const UregistrerteBarnListe = styled.ol`
    margin: ${NavdsSpacing2} 0;
`;

const HentetLabelOgKnappDiv = styled.div`
    display: flex;
    justify-content: left;
    align-items: center;
    .knapp__spinner {
        margin: 0 !important;
    }
    margin-bottom: ${NavdsSpacing2};
`;

interface IProps {
    åpenBehandling: IBehandling;
}

const Vilkårsvurdering: React.FunctionComponent<IProps> = ({ åpenBehandling }) => {
    const { fagsakId } = useSakOgBehandlingParams();

    const {
        erVilkårsvurderingenGyldig,
        hentVilkårMedFeil,
        hentAndreVurderingerMedFeil,
        vilkårsvurdering,
    } = useVilkårsvurdering();
    const {
        erLesevisning,
        oppdaterRegisteropplysninger,
        vilkårsvurderingNesteOnClick,
        behandlingsstegSubmitressurs,
    } = useBehandling();

    const registeropplysningerHentetTidpsunkt =
        vilkårsvurdering[0]?.person?.registerhistorikk?.hentetTidspunkt;

    const [visFeilmeldinger, settVisFeilmeldinger] = React.useState(false);
    const [hentOpplysningerRessurs, settHentOpplysningerRessurs] = React.useState(byggTomRessurs());

    const navigate = useNavigate();

    const uregistrerteBarn =
        åpenBehandling.søknadsgrunnlag?.barnaMedOpplysninger.filter(
            barn => !barn.erFolkeregistrert
        ) ?? [];

    if (vilkårsvurdering.length === 0) {
        return <div>Finner ingen vilkår på behandlingen.</div>;
    }

    const skjemaFeilmelding = hentFrontendFeilmelding(behandlingsstegSubmitressurs);

    return (
        <Skjemasteg
            skalViseForrigeKnapp={
                åpenBehandling.årsak === BehandlingÅrsak.SØKNAD ||
                åpenBehandling.årsak === BehandlingÅrsak.FØDSELSHENDELSE
            }
            tittel={'Vilkårsvurdering'}
            forrigeOnClick={() => {
                if (åpenBehandling.årsak === BehandlingÅrsak.SØKNAD) {
                    navigate(`/fagsak/${fagsakId}/${åpenBehandling.behandlingId}/registrer-soknad`);
                } else {
                    navigate(
                        `/fagsak/${fagsakId}/${åpenBehandling.behandlingId}/filtreringsregler`
                    );
                }
            }}
            nesteOnClick={() => {
                if (erLesevisning()) {
                    navigate(`/fagsak/${fagsakId}/${åpenBehandling.behandlingId}/tilkjent-ytelse`);
                } else if (erVilkårsvurderingenGyldig()) {
                    vilkårsvurderingNesteOnClick();
                } else {
                    settVisFeilmeldinger(true);
                }
            }}
            maxWidthStyle={'80rem'}
            senderInn={behandlingsstegSubmitressurs.status === RessursStatus.HENTER}
            steg={BehandlingSteg.VILKÅRSVURDERING}
        >
            <>
                {åpenBehandling?.migreringsdato !== null && (
                    <HentetLabel
                        children={`Saken ble migrert fra Infotrygd: ${formaterIsoDato(
                            åpenBehandling?.migreringsdato,
                            datoformat.DATO
                        )}`}
                    />
                )}
                <HentetLabelOgKnappDiv>
                    <HentetLabel
                        children={
                            registeropplysningerHentetTidpsunkt
                                ? `Registeropplysninger hentet ${formaterIsoDato(
                                      registeropplysningerHentetTidpsunkt,
                                      datoformat.DATO_TID_SEKUNDER
                                  )} fra Folkeregisteret`
                                : 'Kunne ikke hente innhentingstidspunkt for registeropplysninger'
                        }
                    />
                    <FamilieKnapp
                        className={classNames('oppdater-registeropplysninger-knapp')}
                        id={'oppdater-registeropplysninger'}
                        aria-label={'Oppdater registeropplysninger'}
                        title={'Oppdater'}
                        onClick={() => {
                            settHentOpplysningerRessurs(byggHenterRessurs());
                            oppdaterRegisteropplysninger().then(
                                (response: Ressurs<IBehandling>) => {
                                    settHentOpplysningerRessurs(response);
                                }
                            );
                        }}
                        spinner={hentOpplysningerRessurs.status === RessursStatus.HENTER}
                        type={'flat'}
                        mini={true}
                        kompakt={true}
                        erLesevisning={erLesevisning()}
                    >
                        {hentOpplysningerRessurs.status !== RessursStatus.HENTER && (
                            <Refresh style={{ fontSize: '1.5rem' }} role="img" focusable="false" />
                        )}
                    </FamilieKnapp>
                </HentetLabelOgKnappDiv>
                {hentOpplysningerRessurs.status === RessursStatus.FEILET && (
                    <Feilmelding>{hentOpplysningerRessurs.frontendFeilmelding}</Feilmelding>
                )}
            </>
            <VilkårsvurderingSkjema visFeilmeldinger={visFeilmeldinger} />
            {uregistrerteBarn.length > 0 && (
                <Alert variant="info">
                    <Normaltekst>
                        Du har registrert følgende barn som ikke er registrert i Folkeregisteret:
                    </Normaltekst>
                    <UregistrerteBarnListe>
                        {uregistrerteBarn.map(uregistrertBarn => (
                            <li key={`${uregistrertBarn.navn}_${uregistrertBarn.fødselsdato}`}>
                                <Normaltekst>
                                    {`${uregistrertBarn.navn} - ${formaterIsoDato(
                                        uregistrertBarn.fødselsdato,
                                        datoformat.DATO
                                    )}`}
                                </Normaltekst>
                            </li>
                        ))}
                    </UregistrerteBarnListe>

                    <Normaltekst>Dette vil føre til avslag for barna i listen.</Normaltekst>
                </Alert>
            )}
            {(hentVilkårMedFeil().length > 0 || hentAndreVurderingerMedFeil().length > 0) &&
                visFeilmeldinger && (
                    <Feiloppsummering
                        tittel={'For å gå videre må du rette opp følgende:'}
                        feil={[
                            ...hentVilkårMedFeil().map((vilkårResultat: IVilkårResultat) => ({
                                feilmelding: `Et vilkår av typen '${
                                    vilkårConfig[vilkårResultat.vilkårType].tittel
                                }' er ikke fullstendig`,
                                skjemaelementId: vilkårFeilmeldingId(vilkårResultat),
                            })),
                            ...hentAndreVurderingerMedFeil().map(
                                (annenVurdering: IAnnenVurdering) => ({
                                    feilmelding: `Et vilkår av typen '${
                                        annenVurderingConfig[annenVurdering.type].tittel
                                    }' er ikke fullstendig`,
                                    skjemaelementId: annenVurderingFeilmeldingId(annenVurdering),
                                })
                            ),
                        ]}
                    />
                )}
            {skjemaFeilmelding !== '' && skjemaFeilmelding !== undefined && (
                <Feilmelding>{skjemaFeilmelding}</Feilmelding>
            )}
        </Skjemasteg>
    );
};

export default Vilkårsvurdering;
