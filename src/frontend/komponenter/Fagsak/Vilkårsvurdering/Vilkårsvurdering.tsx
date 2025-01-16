import * as React from 'react';

import classNames from 'classnames';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

import { ArrowsSquarepathIcon } from '@navikt/aksel-icons';
import { Alert, BodyShort, Button, ErrorMessage, ErrorSummary } from '@navikt/ds-react';
import { ASpacing2 } from '@navikt/ds-tokens/dist/tokens';
import type { Ressurs } from '@navikt/familie-typer';
import { byggHenterRessurs, byggTomRessurs, RessursStatus } from '@navikt/familie-typer';

import { FyllUtVilkårsvurderingITestmiljøKnapp } from './FyllUtVilkårsvurderingITestmiljøKnapp';
import { annenVurderingFeilmeldingId } from './GeneriskAnnenVurdering/AnnenVurderingTabell';
import { vilkårFeilmeldingId } from './GeneriskVilkår/VilkårTabell';
import { HentetLabel } from './Registeropplysninger/HentetLabel';
import VilkårsvurderingSkjema from './Skjema/VilkårsvurderingSkjema';
import { useBehandling } from '../../../context/behandlingContext/BehandlingContext';
import { useVilkårsvurdering } from '../../../context/Vilkårsvurdering/VilkårsvurderingContext';
import useSakOgBehandlingParams from '../../../hooks/useSakOgBehandlingParams';
import type { IBehandling } from '../../../typer/behandling';
import { BehandlingSteg, BehandlingÅrsak } from '../../../typer/behandling';
import type { IAnnenVurdering, IVilkårResultat } from '../../../typer/vilkår';
import { annenVurderingConfig, vilkårConfig } from '../../../typer/vilkår';
import { Datoformat, isoStringTilFormatertString } from '../../../utils/dato';
import { erProd } from '../../../utils/miljø';
import { hentFrontendFeilmelding } from '../../../utils/ressursUtils';
import Skjemasteg from '../../Felleskomponenter/Skjemasteg/Skjemasteg';

const UregistrerteBarnListe = styled.ol`
    margin: ${ASpacing2} 0;
`;

const HentetLabelOgKnappDiv = styled.div`
    display: flex;
    justify-content: left;
    align-items: center;
    margin-bottom: ${ASpacing2};
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
        vurderErLesevisning,
        oppdaterRegisteropplysninger,
        vilkårsvurderingNesteOnClick,
        behandlingsstegSubmitressurs,
    } = useBehandling();

    const erLesevisning = vurderErLesevisning();

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
                if (erLesevisning) {
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
                        size={'small'}
                        children={`Saken ble migrert fra Infotrygd: ${isoStringTilFormatertString({
                            isoString: åpenBehandling?.migreringsdato,
                            tilFormat: Datoformat.DATO,
                        })}`}
                    />
                )}
                <HentetLabelOgKnappDiv>
                    <HentetLabel
                        size={'small'}
                        children={
                            registeropplysningerHentetTidpsunkt
                                ? `Registeropplysninger hentet ${isoStringTilFormatertString({
                                      isoString: registeropplysningerHentetTidpsunkt,
                                      tilFormat: Datoformat.DATO_TID_SEKUNDER,
                                  })} fra Folkeregisteret`
                                : 'Kunne ikke hente innhentingstidspunkt for registeropplysninger'
                        }
                    />
                    {!erLesevisning && (
                        <Button
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
                            loading={hentOpplysningerRessurs.status === RessursStatus.HENTER}
                            variant="tertiary"
                            size="xsmall"
                            icon={<ArrowsSquarepathIcon fontSize={'1.5rem'} focusable="false" />}
                        />
                    )}
                </HentetLabelOgKnappDiv>
                {hentOpplysningerRessurs.status === RessursStatus.FEILET && (
                    <ErrorMessage>{hentOpplysningerRessurs.frontendFeilmelding}</ErrorMessage>
                )}
            </>

            {!erProd() && (
                <FyllUtVilkårsvurderingITestmiljøKnapp behandlingId={åpenBehandling.behandlingId} />
            )}

            <VilkårsvurderingSkjema visFeilmeldinger={visFeilmeldinger} />
            {uregistrerteBarn.length > 0 && (
                <Alert variant="info">
                    <BodyShort>
                        Du har registrert følgende barn som ikke er registrert i Folkeregisteret:
                    </BodyShort>
                    <UregistrerteBarnListe>
                        {uregistrerteBarn.map(uregistrertBarn => (
                            <li key={`${uregistrertBarn.navn}_${uregistrertBarn.fødselsdato}`}>
                                <BodyShort>
                                    {`${uregistrertBarn.navn} - ${isoStringTilFormatertString({
                                        isoString: uregistrertBarn.fødselsdato,
                                        tilFormat: Datoformat.DATO,
                                    })}`}
                                </BodyShort>
                            </li>
                        ))}
                    </UregistrerteBarnListe>

                    <BodyShort>Dette vil føre til avslag for barna i listen.</BodyShort>
                </Alert>
            )}
            {(hentVilkårMedFeil().length > 0 || hentAndreVurderingerMedFeil().length > 0) &&
                visFeilmeldinger && (
                    <ErrorSummary
                        heading={'For å gå videre må du rette opp følgende:'}
                        size="small"
                    >
                        {[
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
                        ].map(item => (
                            <ErrorSummary.Item href={`#${item.skjemaelementId}`}>
                                {item.feilmelding}
                            </ErrorSummary.Item>
                        ))}
                    </ErrorSummary>
                )}
            {skjemaFeilmelding !== '' && skjemaFeilmelding !== undefined && (
                <ErrorMessage>{skjemaFeilmelding}</ErrorMessage>
            )}
        </Skjemasteg>
    );
};

export default Vilkårsvurdering;
