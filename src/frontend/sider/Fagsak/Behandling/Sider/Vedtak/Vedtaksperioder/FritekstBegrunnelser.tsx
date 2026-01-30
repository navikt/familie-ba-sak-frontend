import React from 'react';

import styled from 'styled-components';

import { ExternalLinkIcon, PlusCircleIcon, TrashIcon } from '@navikt/aksel-icons';
import { BodyLong, Button, Fieldset, Heading, HelpText, Label, Link, Tag, Textarea } from '@navikt/ds-react';
import type { FeltState } from '@navikt/familie-skjema';
import { RessursStatus } from '@navikt/familie-typer';

import { useVedtaksperiodeContext } from './VedtaksperiodeContext';
import Knapperekke from '../../../../../../komponenter/Knapperekke';
import { målform } from '../../../../../../typer/søknad';
import type { IFritekstFelt } from '../../../../../../utils/fritekstfelter';
import { hentFrontendFeilmelding } from '../../../../../../utils/ressursUtils';
import { useBehandlingContext } from '../../../context/BehandlingContext';

const FritekstContainer = styled.div`
    padding: 1rem;
`;

const TextareaBegrunnelseFritekst = styled(Textarea)`
    margin-bottom: 0.5rem;
    display: flex;
    flex: auto;
`;

const StyledList = styled.ul`
    padding-inline-start: 1rem;
    margin: 0;
`;

const StyledFamilieFritekstFelt = styled.div`
    display: flex;
    align-items: center;
`;

const StyledLabel = styled(Label)`
    margin-bottom: 0;
`;

const InfoBoks = styled.div`
    margin-right: 5.85rem;
    display: flex;
    align-items: center;
`;

const StyledTag = styled(Tag)`
    margin-left: auto;
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

const FritekstBegrunnelser: React.FC = () => {
    const { vurderErLesevisning, søkersMålform } = useBehandlingContext();
    const erLesevisning = vurderErLesevisning();
    const {
        skjema,
        leggTilFritekst,
        makslengdeFritekst,
        maksAntallKulepunkter,
        onPanelClose,
        putVedtaksperiodeMedFritekster,
        vedtaksperiodeMedBegrunnelser,
    } = useVedtaksperiodeContext();

    const erMaksAntallKulepunkter = skjema.felter.fritekster.verdi.length >= maksAntallKulepunkter;

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

    if (!vedtaksperiodeMedBegrunnelser.fritekster.length && !skjema.felter.fritekster.verdi.length) {
        return (
            <>
                {!erLesevisning && (
                    <Button
                        variant={'tertiary'}
                        onClick={leggTilFritekst}
                        id={`legg-til-fritekst`}
                        size={'small'}
                        icon={<PlusCircleIcon />}
                    >
                        {'Legg til fritekst'}
                    </Button>
                )}
            </>
        );
    }

    return (
        <FritekstContainer>
            <InfoBoks>
                <StyledLabel>Fritekst til kulepunkt i brev</StyledLabel>
                <StyledHelpText placement="top-start">
                    <BodyLong size="small" spacing>
                        Brev som sendes ut bør være så kortfattede og presise som mulig.{' '}
                        <Link
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://navno.sharepoint.com/sites/intranett-kommunikasjon/SitePages/Spr%C3%A5k.aspx"
                        >
                            Se retningslinjer for klarspråk.
                            <ExternalLinkIcon fontSize={'1.3rem'} />
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
                <StyledTag variant="neutral" size="small">
                    Skriv {målform[søkersMålform].toLowerCase()}
                </StyledTag>
            </InfoBoks>
            <Fieldset
                error={skjema.visFeilmeldinger && hentFrontendFeilmelding(skjema.submitRessurs)}
                legend={'Fritekst til kulepunkt i brev'}
                hideLegend
            >
                {erLesevisning ? (
                    <StyledList>
                        {skjema.felter.fritekster.verdi.map((fritekst: FeltState<IFritekstFelt>) => (
                            <li>{fritekst.verdi.tekst}</li>
                        ))}
                    </StyledList>
                ) : (
                    skjema.felter.fritekster.verdi.map((fritekst: FeltState<IFritekstFelt>) => {
                        const fritekstId = fritekst.verdi.id;

                        return (
                            <StyledFamilieFritekstFelt key={`fritekst-${fritekstId}`}>
                                <TextareaBegrunnelseFritekst
                                    key={`fritekst-${fritekstId}`}
                                    id={`${fritekstId}`}
                                    className={'fritekst-textarea'}
                                    label={`Kulepunkt ${fritekstId}`}
                                    hideLabel
                                    resize
                                    value={fritekst.verdi.tekst}
                                    maxLength={makslengdeFritekst}
                                    onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
                                        onChangeFritekst(event, fritekstId)
                                    }
                                    error={skjema.visFeilmeldinger && fritekst.feilmelding}
                                    /* eslint-disable-next-line jsx-a11y/no-autofocus */
                                    autoFocus
                                />
                                <SletteKnapp
                                    variant={'tertiary'}
                                    onClick={() => {
                                        skjema.felter.fritekster.validerOgSettFelt([
                                            ...skjema.felter.fritekster.verdi.filter(
                                                mapFritekst => mapFritekst.verdi.id !== fritekst.verdi.id
                                            ),
                                        ]);
                                    }}
                                    id={`fjern_fritekst-${fritekstId}`}
                                    size={'small'}
                                    aria-label={'Fjern fritekst'}
                                    icon={<TrashIcon />}
                                >
                                    {'Fjern'}
                                </SletteKnapp>
                            </StyledFamilieFritekstFelt>
                        );
                    })
                )}
            </Fieldset>
            {!erMaksAntallKulepunkter && !erLesevisning && (
                <Button
                    variant={'tertiary'}
                    onClick={leggTilFritekst}
                    id={`legg-til-fritekst`}
                    size={'small'}
                    icon={<PlusCircleIcon />}
                >
                    {'Legg til fritekst'}
                </Button>
            )}
            {!erLesevisning && (
                <Knapperekke>
                    <Button
                        onClick={putVedtaksperiodeMedFritekster}
                        size="small"
                        variant="primary"
                        loading={skjema.submitRessurs.status === RessursStatus.HENTER}
                        disabled={skjema.submitRessurs.status === RessursStatus.HENTER}
                    >
                        Lagre
                    </Button>
                    <Button
                        onClick={() => {
                            onPanelClose(false);
                        }}
                        size="small"
                        variant="tertiary"
                    >
                        Avbryt
                    </Button>
                </Knapperekke>
            )}
        </FritekstContainer>
    );
};

export default FritekstBegrunnelser;
