import * as React from 'react';

import classNames from 'classnames';
import { useHistory } from 'react-router';
import styled from 'styled-components';

import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Feiloppsummering } from 'nav-frontend-skjema';
import { Feilmelding, Normaltekst } from 'nav-frontend-typografi';

import { Refresh } from '@navikt/ds-icons';
import { FamilieKnapp } from '@navikt/familie-form-elements';
import { byggHenterRessurs, byggTomRessurs, Ressurs, RessursStatus } from '@navikt/familie-typer';

import { useBehandling } from '../../../context/behandlingContext/BehandlingContext';
import { useFagsakRessurser } from '../../../context/FagsakContext';
import { useVilkårsvurdering } from '../../../context/Vilkårsvurdering/VilkårsvurderingContext';
import { BehandlingÅrsak, IBehandling } from '../../../typer/behandling';
import { IFagsak } from '../../../typer/fagsak';
import {
    annenVurderingConfig,
    IAnnenVurdering,
    IVilkårResultat,
    vilkårConfig,
} from '../../../typer/vilkår';
import { hentAktivVedtakPåBehandlig } from '../../../utils/fagsak';
import { datoformat, formaterIsoDato } from '../../../utils/formatter';
import Skjemasteg from '../../Felleskomponenter/Skjemasteg/Skjemasteg';
import useFagsakApi from '../useFagsakApi';
import { VedtakBegrunnelserProvider } from '../Vedtak/VedtakBegrunnelserTabell/Context/VedtakBegrunnelserContext';
import { annenVurderingFeilmeldingId } from './GeneriskAnnenVurdering/AnnenVurderingTabell';
import { vilkårFeilmeldingId } from './GeneriskVilkår/VilkårTabell';
import { HentetLabel } from './Registeropplysninger/HentetLabel';
import VilkårsvurderingSkjema from './VilkårsvurderingSkjema';

const UregistrerteBarnListe = styled.ol`
    margin: 0.5rem 0;
`;

const HentetLabelOgKnappDiv = styled.div`
    display: flex;
    justify-content: left;
    align-items: center;
    .knapp__spinner {
        margin: 0 !important;
    }
`;

interface IProps {
    fagsak: IFagsak;
    åpenBehandling: IBehandling;
}

const Vilkårsvurdering: React.FunctionComponent<IProps> = ({ fagsak, åpenBehandling }) => {
    const {
        erVilkårsvurderingenGyldig,
        hentVilkårMedFeil,
        hentAndreVurderingerMedFeil,
        vilkårsvurdering,
    } = useVilkårsvurdering();
    const { erLesevisning } = useBehandling();
    const { oppdaterRegisteropplysninger } = useFagsakRessurser();

    const registeropplysningerHentetTidpsunkt =
        vilkårsvurdering[0].person.registerhistorikk?.hentetTidspunkt;

    const [visFeilmeldinger, settVisFeilmeldinger] = React.useState(false);
    const [hentOpplysningerRessurs, settHentOpplysningerRessurs] = React.useState(byggTomRessurs());
    const [opprettelseFeilmelding, settOpprettelseFeilmelding] = React.useState('');

    const history = useHistory();
    const { validerVilkårsvurderingOgSendInn, senderInn } = useFagsakApi(
        settVisFeilmeldinger,
        settOpprettelseFeilmelding
    );

    const aktivVedtak = hentAktivVedtakPåBehandlig(åpenBehandling);
    const uregistrerteBarn =
        åpenBehandling.søknadsgrunnlag?.barnaMedOpplysninger.filter(
            barn => !barn.erFolkeregistrert
        ) ?? [];

    if (vilkårsvurdering.length === 0) {
        return <div>Finner ingen vilkår på behandlingen.</div>;
    }

    return (
        <Skjemasteg
            skalViseForrigeKnapp={
                åpenBehandling.årsak === BehandlingÅrsak.SØKNAD ||
                åpenBehandling.årsak === BehandlingÅrsak.FØDSELSHENDELSE
            }
            tittel={'Vilkårsvurdering'}
            forrigeOnClick={() => {
                if (åpenBehandling.årsak === BehandlingÅrsak.SØKNAD) {
                    history.push(
                        `/fagsak/${fagsak.id}/${åpenBehandling.behandlingId}/registrer-soknad`
                    );
                } else {
                    history.push(
                        `/fagsak/${fagsak.id}/${åpenBehandling.behandlingId}/filtreringsregler`
                    );
                }
            }}
            nesteOnClick={() => {
                if (erLesevisning()) {
                    history.push(
                        `/fagsak/${fagsak.id}/${åpenBehandling.behandlingId}/tilkjent-ytelse`
                    );
                } else if (erVilkårsvurderingenGyldig()) {
                    validerVilkårsvurderingOgSendInn(fagsak);
                } else {
                    settVisFeilmeldinger(true);
                }
            }}
            maxWidthStyle={'80rem'}
            senderInn={senderInn}
        >
            <>
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
                            oppdaterRegisteropplysninger(åpenBehandling.behandlingId).then(
                                (response: Ressurs<IFagsak>) => {
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
            <VedtakBegrunnelserProvider aktivVedtak={aktivVedtak}>
                <VilkårsvurderingSkjema visFeilmeldinger={visFeilmeldinger} />
            </VedtakBegrunnelserProvider>
            {uregistrerteBarn.length > 0 && (
                <AlertStripeInfo>
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
                </AlertStripeInfo>
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
            {visFeilmeldinger && opprettelseFeilmelding !== '' && (
                <Feilmelding>{opprettelseFeilmelding}</Feilmelding>
            )}
        </Skjemasteg>
    );
};

export default Vilkårsvurdering;
