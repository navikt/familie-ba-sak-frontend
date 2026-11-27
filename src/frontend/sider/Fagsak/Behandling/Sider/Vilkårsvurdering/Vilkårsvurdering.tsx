import { queryKeys } from '@hooks/keys/queryKeys';
import { useErLesevisning } from '@hooks/useErLesevisning';
import { useFagsak } from '@hooks/useFagsak';
import { useFeatureToggles } from '@hooks/useFeatureToggles';
import { useHentMigreringsdato } from '@hooks/useHentMigreringsdato';
import { useOppdaterVilkårsvurdering } from '@hooks/useOppdaterVilkårsvurdering';
import { InformationSquareIcon } from '@navikt/aksel-icons';
import {
    BodyShort,
    Detail,
    ErrorMessage,
    ErrorSummary,
    HStack,
    InfoCard,
    List,
    LocalAlert,
    VStack,
} from '@navikt/ds-react';
import { useQueryClient } from '@tanstack/react-query';
import { BehandlingSteg, BehandlingÅrsak } from '@typer/behandling';
import { FeatureToggle } from '@typer/featureToggles';
import { annenVurderingConfig, vilkårConfig } from '@typer/vilkår';
import { erDefinert } from '@utils/commons';
import { Datoformat, isoStringTilFormatertString } from '@utils/dato';
import { erProd } from '@utils/miljø';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useBehandlingContext } from '../../BehandlingContext';
import Skjemasteg, { MAX_SKJEMASTEG_BREDDE } from '../Skjemasteg';
import { FyllUtVilkårsvurderingITestmiljøKnapp } from './FyllUtVilkårsvurderingITestmiljøKnapp';
import { annenVurderingFeilmeldingId } from './GeneriskAnnenVurdering/AnnenVurderingTabell';
import { vilkårFeilmeldingId } from './GeneriskVilkår/VilkårTabell';
import { OppdaterRegisteropplysninger } from './OppdaterRegisteropplysninger';
import { VilkårsvurderingSkjema } from './Skjema/VilkårsvurderingSkjema';
import { TømPersonopplysningerCacheITestmiljøKnapp } from './TømPersonopplysningerCacheITestmiljøKnapp';
import { ManglendeFinnmarkmerkingVarsel } from './Varsel/ManglendeFinnmarkmerkingVarsel';
import { ManglendeSvalbardmerkingVarsel } from './Varsel/ManglendeSvalbardmerkingVarsel';
import styles from './Vilkårsvurdering.module.css';
import { useVilkårsvurderingContext } from './VilkårsvurderingContext';

export function Vilkårsvurdering() {
    const queryClient = useQueryClient();

    const { behandling, settÅpenBehandling } = useBehandlingContext();

    const { erVilkårsvurderingenGyldig, vilkårMedFeil, andreVurderingerMedFeil, vilkårsvurdering } =
        useVilkårsvurderingContext();

    const fagsak = useFagsak();
    const erLesevisning = useErLesevisning();
    const navigate = useNavigate();
    const toggles = useFeatureToggles();

    const [visFeilmeldinger, settVisFeilmeldinger] = useState(false);

    const { data: migreringsdato, error: migreringsdatoError } = useHentMigreringsdato(behandling.behandlingId);

    const {
        mutate: oppdaterVilkårsvurdering,
        isPending: oppdaterVilkårsvurderingIsPending,
        error: oppdaterVilkårsvurderingError,
    } = useOppdaterVilkårsvurdering({
        onSuccess: behandling => {
            queryClient.setQueryData(queryKeys.behandling(behandling), behandling);
            settÅpenBehandling(behandling);
            navigate(`/fagsak/${fagsak.id}/${behandling.behandlingId}/tilkjent-ytelse`);
        },
    });

    const uregistrerteBarn =
        behandling.søknadsgrunnlag?.barnaMedOpplysninger.filter(barn => !barn.erFolkeregistrert) ?? [];

    if (vilkårsvurdering.length === 0) {
        return <div>Finner ingen vilkår på behandlingen.</div>;
    }

    return (
        <Skjemasteg
            skalViseForrigeKnapp={
                behandling.årsak === BehandlingÅrsak.SØKNAD ||
                behandling.årsak === BehandlingÅrsak.AUTOMATISK_BEHANDLING_AV_SØKNAD ||
                behandling.årsak === BehandlingÅrsak.FØDSELSHENDELSE
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
                } else if (erVilkårsvurderingenGyldig) {
                    oppdaterVilkårsvurdering({ behandlingId: behandling.behandlingId });
                } else {
                    settVisFeilmeldinger(true);
                }
            }}
            maxWidthStyle={MAX_SKJEMASTEG_BREDDE}
            senderInn={oppdaterVilkårsvurderingIsPending}
            steg={BehandlingSteg.VILKÅRSVURDERING}
        >
            {erDefinert(migreringsdato) && (
                <Detail className={styles.hentetLabel}>
                    {`Saken ble migrert fra Infotrygd: ${isoStringTilFormatertString({
                        isoString: migreringsdato,
                        tilFormat: Datoformat.DATO,
                    })}`}
                </Detail>
            )}
            {migreringsdatoError && (
                <LocalAlert status="warning">
                    <LocalAlert.Header>
                        <LocalAlert.Title>Klarte ikke å sjekke om saken er migrert fra Infotrygd</LocalAlert.Title>
                    </LocalAlert.Header>
                    <LocalAlert.Content>{migreringsdatoError.message}</LocalAlert.Content>
                </LocalAlert>
            )}
            <OppdaterRegisteropplysninger />
            {!erProd() && !toggles[FeatureToggle.skalSkjuleTestmiljøknapper] && (
                <HStack gap="space-16" marginBlock={'space-32 space-32'}>
                    <FyllUtVilkårsvurderingITestmiljøKnapp behandlingId={behandling.behandlingId} />
                    <TømPersonopplysningerCacheITestmiljøKnapp />
                </HStack>
            )}
            <VStack gap="space-40">
                <VilkårsvurderingSkjema />
                {uregistrerteBarn.length > 0 && (
                    <InfoCard data-color="info">
                        <InfoCard.Message icon={<InformationSquareIcon aria-hidden />}>
                            <BodyShort>
                                Du har registrert følgende barn som ikke er registrert i Folkeregisteret:
                            </BodyShort>
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
                        </InfoCard.Message>
                    </InfoCard>
                )}
                {!erVilkårsvurderingenGyldig && visFeilmeldinger && (
                    <ErrorSummary heading={'For å gå videre må du rette opp følgende:'} size="small">
                        {[
                            ...vilkårMedFeil.map(vilkårResultat => ({
                                feilmelding: `Et vilkår av typen '${
                                    vilkårConfig[vilkårResultat.vilkårType].tittel
                                }' er ikke fullstendig`,
                                skjemaelementId: vilkårFeilmeldingId(vilkårResultat),
                            })),
                            ...andreVurderingerMedFeil.map(annenVurdering => ({
                                feilmelding: `Et vilkår av typen '${
                                    annenVurderingConfig[annenVurdering.type].tittel
                                }' er ikke fullstendig`,
                                skjemaelementId: annenVurderingFeilmeldingId(annenVurdering),
                            })),
                        ].map(item => (
                            <ErrorSummary.Item key={item.skjemaelementId} href={`#${item.skjemaelementId}`}>
                                {item.feilmelding}
                            </ErrorSummary.Item>
                        ))}
                    </ErrorSummary>
                )}
                {oppdaterVilkårsvurderingError && <ErrorMessage>{oppdaterVilkårsvurderingError.message}</ErrorMessage>}
                <ManglendeSvalbardmerkingVarsel />
                <ManglendeFinnmarkmerkingVarsel />
            </VStack>
        </Skjemasteg>
    );
}
