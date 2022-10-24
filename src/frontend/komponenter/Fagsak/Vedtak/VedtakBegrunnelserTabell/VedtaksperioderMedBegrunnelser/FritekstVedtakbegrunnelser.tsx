import React from 'react';

import styled from 'styled-components';

import navFarger from 'nav-frontend-core';
import { Label, SkjemaGruppe } from 'nav-frontend-skjema';

import { ExternalLink } from '@navikt/ds-icons';
import { BodyLong, Button, Heading, Link, Tag } from '@navikt/ds-react';
import { FamilieKnapp, FamilieTextarea } from '@navikt/familie-form-elements';
import type { FeltState } from '@navikt/familie-skjema';
import { RessursStatus } from '@navikt/familie-typer';

import { useBehandling } from '../../../../../context/behandlingContext/BehandlingContext';
import Pluss from '../../../../../ikoner/Pluss';
import Slett from '../../../../../ikoner/Slett';
import { målform } from '../../../../../typer/søknad';
import type { IFritekstFelt } from '../../../../../utils/fritekstfelter';
import { hentFrontendFeilmelding } from '../../../../../utils/ressursUtils';
import HelpText from '../../../../Felleskomponenter/HelpText';
import Knapperekke from '../../../../Felleskomponenter/Knapperekke';
import SkjultLegend from '../../../../Felleskomponenter/SkjultLegend';
import { useVedtaksperiodeMedBegrunnelser } from '../Context/VedtaksperiodeMedBegrunnelserContext';

const FritekstContainer = styled.div`
    background-color: ${navFarger.navGraBakgrunn};
    padding: 1rem;
`;

const FamilieTextareaBegrunnelseFritekst = styled(FamilieTextarea)`
    .skjemaelement {
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
    }
`;

const StyledList = styled.ul`
    padding-inline-start: 1rem;
    margin: 0;
`;

const StyledFamilieFritekstFelt = styled.div`
    display: flex;

    .textarea__container {
        width: 100% !important;
    }
`;

const StyledLabel = styled(Label)`
    margin-bottom: 0;
`;

const InfoBoks = styled.div`
    margin-right: 5.6875rem;
    display: flex;
    align-items: center;
    text-align: center;
`;

const StyledTag = styled(Tag)`
    margin-left: auto;
    background-color: ${navFarger.navLysGra};
    border-color: ${navFarger.navGra60};
`;

const SletteKnapp = styled(Button)`
    margin-left: 0.5rem;
    height: 2.75rem;
`;

const StyledHelpText = styled(HelpText)`
    margin: 0.6rem;

    & + .navds-popover {
        max-width: 25rem;
        text-align: left;
    }
`;

const ItalicText = styled(BodyLong)`
    font-style: italic;
`;

const FritekstVedtakbegrunnelser: React.FC = () => {
    const { vurderErLesevisning, søkersMålform } = useBehandling();
    const {
        skjema,
        leggTilFritekst,
        id,
        makslengdeFritekst,
        maksAntallKulepunkter,
        onPanelClose,
        putVedtaksperiodeMedFritekster,
        vedtaksperiodeMedBegrunnelser,
    } = useVedtaksperiodeMedBegrunnelser();

    const erMaksAntallKulepunkter = skjema.felter.fritekster.verdi.length >= maksAntallKulepunkter;

    const skjemaGruppeId = `Fritekster ${id}`;

    const onChangeFritekst = (event: React.ChangeEvent<HTMLTextAreaElement>, fritekstId: number) =>
        skjema.felter.fritekster.validerOgSettFelt([
            ...skjema.felter.fritekster.verdi.map(mapFritekst => {
                if (mapFritekst.verdi.id === fritekstId) {
                    return mapFritekst.valider({
                        ...mapFritekst,
                        verdi: {
                            ...mapFritekst.verdi,
                            tekst: event.target.value,
                        },
                    });
                } else {
                    return mapFritekst;
                }
            }),
        ]);

    return vedtaksperiodeMedBegrunnelser.fritekster.length > 0 ||
        skjema.felter.fritekster.verdi.length > 0 ? (
        <FritekstContainer>
            <SkjultLegend>Fritekst til kulepunkt i brev</SkjultLegend>
            <InfoBoks>
                <StyledLabel htmlFor={skjemaGruppeId}>Fritekst til kulepunkt i brev</StyledLabel>
                <StyledHelpText placement="top-start">
                    <BodyLong size="small" spacing>
                        Brev som sendes ut bør være så kortfattede og presise som mulig.{' '}
                        <Link
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://navno.sharepoint.com/sites/intranett-kommunikasjon/SitePages/Spr%C3%A5k.aspx"
                        >
                            Se retningslinjer for klarspråk.
                            <ExternalLink />
                        </Link>
                    </BodyLong>
                    <Heading level="3" size="xsmall">
                        Eksempler på formulering:
                    </Heading>
                    <ItalicText size="small" spacing>
                        Barnevernet har bekreftet at de overtok omsorgen for barnet mars 2021
                    </ItalicText>
                    <ItalicText size="small">
                        Opplysningene fra Folkeregisteret viser at barnet ikke bor sammen med deg
                    </ItalicText>
                </StyledHelpText>
                <StyledTag variant="info" size="small">
                    Skriv {målform[søkersMålform].toLowerCase()}
                </StyledTag>
            </InfoBoks>

            {vurderErLesevisning() ? (
                <StyledList id={skjemaGruppeId}>
                    {skjema.felter.fritekster.verdi.map((fritekst: FeltState<IFritekstFelt>) => (
                        <li>{fritekst.verdi.tekst}</li>
                    ))}
                </StyledList>
            ) : (
                <>
                    <SkjemaGruppe
                        id={skjemaGruppeId}
                        feil={
                            skjema.visFeilmeldinger && hentFrontendFeilmelding(skjema.submitRessurs)
                        }
                    >
                        {skjema.felter.fritekster.verdi.map(
                            (fritekst: FeltState<IFritekstFelt>) => {
                                const fritekstId = fritekst.verdi.id;

                                return (
                                    <StyledFamilieFritekstFelt key={`fritekst-${fritekstId}`}>
                                        <FamilieTextareaBegrunnelseFritekst
                                            erLesevisning={false}
                                            key={`fritekst-${fritekstId}`}
                                            id={`${fritekstId}`}
                                            className={'fritekst-textarea'}
                                            label={`Kulepunkt ${fritekstId}`}
                                            hideLabel
                                            resize
                                            value={fritekst.verdi.tekst}
                                            maxLength={makslengdeFritekst}
                                            onChange={event => onChangeFritekst(event, fritekstId)}
                                            error={skjema.visFeilmeldinger && fritekst.feilmelding}
                                            /* eslint-disable-next-line jsx-a11y/no-autofocus */
                                            autoFocus
                                        />
                                        <SletteKnapp
                                            variant={'tertiary'}
                                            onClick={() => {
                                                skjema.felter.fritekster.validerOgSettFelt([
                                                    ...skjema.felter.fritekster.verdi.filter(
                                                        mapFritekst =>
                                                            mapFritekst.verdi.id !==
                                                            fritekst.verdi.id
                                                    ),
                                                ]);
                                            }}
                                            id={`fjern_fritekst-${fritekstId}`}
                                            size={'small'}
                                            aria-label={'Fjern fritekst'}
                                            icon={<Slett />}
                                            iconPosition={'right'}
                                        >
                                            {'Fjern'}
                                        </SletteKnapp>
                                    </StyledFamilieFritekstFelt>
                                );
                            }
                        )}
                    </SkjemaGruppe>
                    {!erMaksAntallKulepunkter && !vurderErLesevisning() && (
                        <Button
                            variant={'tertiary'}
                            onClick={leggTilFritekst}
                            id={`legg-til-fritekst`}
                            size={'small'}
                            icon={<Pluss />}
                        >
                            {'Legg til fritekst'}
                        </Button>
                    )}
                    <Knapperekke>
                        <FamilieKnapp
                            erLesevisning={vurderErLesevisning()}
                            onClick={() => {
                                putVedtaksperiodeMedFritekster();
                            }}
                            size="small"
                            variant="secondary"
                            loading={skjema.submitRessurs.status === RessursStatus.HENTER}
                            disabled={skjema.submitRessurs.status === RessursStatus.HENTER}
                        >
                            Lagre
                        </FamilieKnapp>
                        <FamilieKnapp
                            erLesevisning={vurderErLesevisning()}
                            onClick={() => {
                                onPanelClose(false);
                            }}
                            size="small"
                            variant="tertiary"
                        >
                            Avbryt
                        </FamilieKnapp>
                    </Knapperekke>
                </>
            )}
        </FritekstContainer>
    ) : !vurderErLesevisning() ? (
        <Button
            variant={'tertiary'}
            onClick={leggTilFritekst}
            id={`legg-til-fritekst`}
            size={'small'}
            icon={<Pluss />}
        >
            {'Legg til fritekst'}
        </Button>
    ) : null;
};

export default FritekstVedtakbegrunnelser;
