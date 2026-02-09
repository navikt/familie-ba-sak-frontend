import * as React from 'react';

import { useNavigate } from 'react-router';

import { Alert, BodyShort, Detail, ErrorMessage, ErrorSummary, HStack, List, VStack } from '@navikt/ds-react';
import { RessursStatus } from '@navikt/familie-typer';

import { FyllUtVilkårsvurderingITestmiljøKnapp } from './FyllUtVilkårsvurderingITestmiljøKnapp';
import { annenVurderingFeilmeldingId } from './GeneriskAnnenVurdering/AnnenVurderingTabell';
import { vilkårFeilmeldingId } from './GeneriskVilkår/VilkårTabell';
import { OppdaterRegisteropplysninger } from './OppdaterRegisteropplysninger';
import VilkårsvurderingSkjema from './Skjema/VilkårsvurderingSkjema';
import { TømPersonopplysningerCacheITestmiljøKnapp } from './TømPersonopplysningerCacheITestmiljøKnapp';
import { ManglendeFinnmarkmerkingVarsel } from './Varsel/ManglendeFinnmarkmerkingVarsel';
import styles from './Vilkårsvurdering.module.css';
import { useVilkårsvurderingContext } from './VilkårsvurderingContext';
import { useFeatureToggles } from '../../../../../hooks/useFeatureToggles';
import { BehandlingSteg, BehandlingÅrsak } from '../../../../../typer/behandling';
import { FeatureToggle } from '../../../../../typer/featureToggles';
import {
    annenVurderingConfig,
    type IAnnenVurdering,
    type IVilkårResultat,
    vilkårConfig,
} from '../../../../../typer/vilkår';
import { Datoformat, isoStringTilFormatertString } from '../../../../../utils/dato';
import { erProd } from '../../../../../utils/miljø';
import { hentFrontendFeilmelding } from '../../../../../utils/ressursUtils';
import { useBehandlingContext } from '../../context/BehandlingContext';
import Skjemasteg from '../Skjemasteg';
import { ManglendeSvalbardmerkingVarsel } from './Varsel/ManglendeSvalbardmerkingVarsel';
import { useFagsakContext } from '../../../FagsakContext';

export function Vilkårsvurdering() {
    const toggles = useFeatureToggles();

    const { fagsak } = useFagsakContext();
    const { behandling, vurderErLesevisning, vilkårsvurderingNesteOnClick, behandlingsstegSubmitressurs } =
        useBehandlingContext();

    const { erVilkårsvurderingenGyldig, hentVilkårMedFeil, hentAndreVurderingerMedFeil, vilkårsvurdering } =
        useVilkårsvurderingContext();

    const erLesevisning = vurderErLesevisning();

    const [visFeilmeldinger, settVisFeilmeldinger] = React.useState(false);

    const navigate = useNavigate();

    const uregistrerteBarn =
        behandling.søknadsgrunnlag?.barnaMedOpplysninger.filter(barn => !barn.erFolkeregistrert) ?? [];

    if (vilkårsvurdering.length === 0) {
        return <div>Finner ingen vilkår på behandlingen.</div>;
    }

    const skjemaFeilmelding = hentFrontendFeilmelding(behandlingsstegSubmitressurs);

    return (
        <Skjemasteg
            skalViseForrigeKnapp={
                behandling.årsak === BehandlingÅrsak.SØKNAD || behandling.årsak === BehandlingÅrsak.FØDSELSHENDELSE
            }
            tittel={'Vilkårsvurdering'}
            forrigeOnClick={() => {
                if (behandling.årsak === BehandlingÅrsak.SØKNAD) {
                    navigate(`/fagsak/${fagsak.id}/${behandling.behandlingId}/registrer-soknad`);
                } else {
                    navigate(`/fagsak/${fagsak.id}/${behandling.behandlingId}/filtreringsregler`);
                }
            }}
            nesteOnClick={() => {
                if (erLesevisning) {
                    navigate(`/fagsak/${fagsak.id}/${behandling.behandlingId}/tilkjent-ytelse`);
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
                {behandling?.migreringsdato !== null && (
                    <Detail
                        className={styles.hentetLabel}
                        children={`Saken ble migrert fra Infotrygd: ${isoStringTilFormatertString({
                            isoString: behandling?.migreringsdato,
                            tilFormat: Datoformat.DATO,
                        })}`}
                    />
                )}
                <OppdaterRegisteropplysninger />
            </>
            {!erProd() && !toggles[FeatureToggle.skalSkjuleTestmiljøknapper] && (
                <HStack gap="4" marginBlock={'8 8'}>
                    <FyllUtVilkårsvurderingITestmiljøKnapp behandlingId={behandling.behandlingId} />
                    <TømPersonopplysningerCacheITestmiljøKnapp />
                </HStack>
            )}
            <VStack gap="space-8">
                <VilkårsvurderingSkjema visFeilmeldinger={visFeilmeldinger} />
                {uregistrerteBarn.length > 0 && (
                    <Alert variant="info">
                        <BodyShort>Du har registrert følgende barn som ikke er registrert i Folkeregisteret:</BodyShort>
                        <List as={'ol'}>
                            {uregistrerteBarn.map(uregistrertBarn => (
                                <List.Item key={`${uregistrertBarn.navn}_${uregistrertBarn.fødselsdato}`}>
                                    <BodyShort>
                                        {`${uregistrertBarn.navn} - ${isoStringTilFormatertString({
                                            isoString: uregistrertBarn.fødselsdato,
                                            tilFormat: Datoformat.DATO,
                                        })}`}
                                    </BodyShort>
                                </List.Item>
                            ))}
                        </List>
                        <BodyShort>Dette vil føre til avslag for barna i listen.</BodyShort>
                    </Alert>
                )}
                {(hentVilkårMedFeil().length > 0 || hentAndreVurderingerMedFeil().length > 0) && visFeilmeldinger && (
                    <ErrorSummary heading={'For å gå videre må du rette opp følgende:'} size="small">
                        {[
                            ...hentVilkårMedFeil().map((vilkårResultat: IVilkårResultat) => ({
                                feilmelding: `Et vilkår av typen '${
                                    vilkårConfig[vilkårResultat.vilkårType].tittel
                                }' er ikke fullstendig`,
                                skjemaelementId: vilkårFeilmeldingId(vilkårResultat),
                            })),
                            ...hentAndreVurderingerMedFeil().map((annenVurdering: IAnnenVurdering) => ({
                                feilmelding: `Et vilkår av typen '${
                                    annenVurderingConfig[annenVurdering.type].tittel
                                }' er ikke fullstendig`,
                                skjemaelementId: annenVurderingFeilmeldingId(annenVurdering),
                            })),
                        ].map(item => (
                            <ErrorSummary.Item href={`#${item.skjemaelementId}`}>{item.feilmelding}</ErrorSummary.Item>
                        ))}
                    </ErrorSummary>
                )}
                {skjemaFeilmelding !== '' && skjemaFeilmelding !== undefined && (
                    <ErrorMessage>{skjemaFeilmelding}</ErrorMessage>
                )}
                <ManglendeSvalbardmerkingVarsel />
                <ManglendeFinnmarkmerkingVarsel />
            </VStack>
        </Skjemasteg>
    );
}
