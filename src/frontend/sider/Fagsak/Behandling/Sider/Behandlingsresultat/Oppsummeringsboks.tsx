import * as React from 'react';
import { useState } from 'react';

import styled from 'styled-components';

import { PlusCircleIcon, TrashIcon, XMarkIcon } from '@navikt/aksel-icons';
import { Alert, BodyShort, Box, Button, Heading, HGrid, VStack } from '@navikt/ds-react';
import { ASpacing10, ASpacing4, ASpacing6 } from '@navikt/ds-tokens/dist/tokens';
import { useHttp } from '@navikt/familie-http';
import type { Etikett } from '@navikt/familie-tidslinje';
import type { Ressurs } from '@navikt/familie-typer';
import { RessursStatus } from '@navikt/familie-typer';

import { kanFjerneSmåbarnstilleggFraPeriode, kanLeggeSmåbarnstilleggTilPeriode } from './OppsummeringsboksUtils';
import { useAppContext } from '../../../../../context/AppContext';
import { useTidslinjeContext } from '../../../../../komponenter/Tidslinje/TidslinjeContext';
import { AlertType, ToastTyper } from '../../../../../komponenter/Toast/typer';
import type { IBehandling } from '../../../../../typer/behandling';
import { Behandlingstype } from '../../../../../typer/behandling';
import { ytelsetype } from '../../../../../typer/beregning';
import type {
    IEøsPeriodeStatus,
    IRestEøsPeriode,
    IRestKompetanse,
    IRestUtenlandskPeriodeBeløp,
    IRestValutakurs,
} from '../../../../../typer/eøsPerioder';
import { EøsPeriodeStatus, KompetanseResultat } from '../../../../../typer/eøsPerioder';
import type { Utbetalingsperiode } from '../../../../../typer/vedtaksperiode';
import { dateTilFormatertString, Datoformat } from '../../../../../utils/dato';
import { formaterBeløp, formaterIdent, hentAlderSomString, sorterUtbetaling } from '../../../../../utils/formatter';
import { useBehandlingContext } from '../../context/BehandlingContext';

const AlertWithBottomMargin = styled(Alert)`
    margin-bottom: 1.5rem;
`;

const UtbetalingsbeløpStack = styled(VStack)`
    padding: ${ASpacing6} ${ASpacing10} ${ASpacing4} 0;
`;

const UtbetalingsbeløpRad: React.FC<React.PropsWithChildren> = ({ children }) => (
    <HGrid columns="1fr 8rem 5rem" gap={'2'}>
        {children}
    </HGrid>
);

const TotaltUtbetaltRad = styled(HGrid)`
    border-top: 1px dashed;
    padding-top: ${ASpacing4};
`;

interface IProps {
    utbetalingsperiode: Utbetalingsperiode | undefined;
    aktivEtikett: Etikett;
    kompetanser: IRestKompetanse[];
    utbetaltAnnetLandBeløp: IRestUtenlandskPeriodeBeløp[];
    valutakurser: IRestValutakurs[];
}

interface ISmåbarnstilleggkorrigering {
    årMåned: string;
}

const finnUtbetalingsBeløpStatusMap = (
    utbetalingsperiode: Utbetalingsperiode | undefined,
    kompetanser: IRestKompetanse[],
    utbetaltAnnetLandBeløp: IRestUtenlandskPeriodeBeløp[],
    valutakurser: IRestValutakurs[]
): Map<string, boolean> => {
    const utbetalingsMap = new Map<string, boolean>();
    utbetalingsperiode?.utbetalingsperiodeDetaljer.forEach(upd => {
        const barnIdent = upd.person.personIdent;
        const kompetanserForBarn = finnKompetanserForBarn(kompetanser, barnIdent);
        const norgeErSekundærland = kompetanserForBarn.some(
            kompetanseForBarn => kompetanseForBarn.resultat === KompetanseResultat.NORGE_ER_SEKUNDÆRLAND
        );
        let skalViseUtbetalingsBeløp = !norgeErSekundærland;

        if (norgeErSekundærland) {
            const kompetanseStatusOk = erAllePerioderUtfyltForBarn(kompetanserForBarn);
            const utbetaltAnnetLandStatusOk = erAllePerioderUtfyltForBarn(
                finnEøsPerioderForBarn(utbetaltAnnetLandBeløp, barnIdent)
            );
            const valutakursStatusOk = erAllePerioderUtfyltForBarn(finnEøsPerioderForBarn(valutakurser, barnIdent));
            skalViseUtbetalingsBeløp = kompetanseStatusOk && utbetaltAnnetLandStatusOk && valutakursStatusOk;
        }
        utbetalingsMap.set(barnIdent, skalViseUtbetalingsBeløp);
    });
    return utbetalingsMap;
};

const finnEøsPerioderForBarn = (restEøsPerioder: IRestEøsPeriode[], barnIdent: string): IRestEøsPeriode[] => {
    return restEøsPerioder.filter(restEøsPeriode => restEøsPeriode.barnIdenter.includes(barnIdent)) ?? [];
};

const finnKompetanserForBarn = (kompetanseFelter: IRestKompetanse[], barnIdent: string): IRestKompetanse[] => {
    return kompetanseFelter.filter(kompetanseFelt => kompetanseFelt.barnIdenter.includes(barnIdent)) ?? [];
};

const erAllePerioderUtfyltForBarn = (eøsPeriodeStatus: IEøsPeriodeStatus[]) => {
    return eøsPeriodeStatus.every(eøsPeriode => eøsPeriode.status === EøsPeriodeStatus.OK);
};

const Oppsummeringsboks: React.FunctionComponent<IProps> = ({
    utbetalingsperiode,
    aktivEtikett,
    kompetanser,
    utbetaltAnnetLandBeløp,
    valutakurser,
}) => {
    const { request } = useHttp();
    const { settÅpenBehandling, behandling, vurderErLesevisning } = useBehandlingContext();
    const erLesevisning = vurderErLesevisning();
    const { settToast } = useAppContext();
    const { settAktivEtikett } = useTidslinjeContext();

    const [utbetalingsBeløpStatusMap, setUtbetalingsBeløpStatusMap] = React.useState(new Map<string, boolean>());
    const [restFeil, settRestFeil] = useState<string | undefined>(undefined);
    const [justererSmåbarnstillegg, setJustererSmåbarnstillegg] = useState<boolean>(false);

    const aktivÅrOgMåned = dateTilFormatertString({
        date: aktivEtikett.date,
        tilFormat: Datoformat.ISO_MÅNED,
    });
    const månedNavnOgÅr = () => {
        const navn = dateTilFormatertString({
            date: aktivEtikett.date,
            tilFormat: Datoformat.MÅNED_ÅR_NAVN,
        });
        return navn[0].toUpperCase() + navn.substr(1);
    };
    const småbarnstilleggkorrigeringUrl = `/familie-ba-sak/api/småbarnstilleggkorrigering/behandling`;

    const fjernSmåbarnstilleggFraMåned = (småbarnstilleggkorrigering: ISmåbarnstilleggkorrigering) => {
        setJustererSmåbarnstillegg(true);

        request<ISmåbarnstilleggkorrigering, IBehandling>({
            method: 'DELETE',
            data: småbarnstilleggkorrigering,
            url: `${småbarnstilleggkorrigeringUrl}/${behandling.behandlingId}`,
        }).then((response: Ressurs<IBehandling>) => {
            if (response.status === RessursStatus.SUKSESS) {
                settToast(ToastTyper.SMÅBARNSTILLEGG_KORRIGERT, {
                    alertType: AlertType.SUCCESS,
                    tekst: 'Småbarnstillegg er fjernet',
                });
                settRestFeil(undefined);
                settÅpenBehandling(response);
            } else {
                settRestFeil('Teknisk feil ved fjerning av småbarnstillegg');
            }
            setJustererSmåbarnstillegg(false);
        });
    };

    const leggSmåbarnstilleggTilIMåned = (småbarnstilleggkorrigering: ISmåbarnstilleggkorrigering) => {
        setJustererSmåbarnstillegg(true);

        request<ISmåbarnstilleggkorrigering, IBehandling>({
            method: 'POST',
            data: småbarnstilleggkorrigering,
            url: `${småbarnstilleggkorrigeringUrl}/${behandling.behandlingId}`,
        }).then((response: Ressurs<IBehandling>) => {
            if (response.status === RessursStatus.SUKSESS) {
                settToast(ToastTyper.SMÅBARNSTILLEGG_KORRIGERT, {
                    alertType: AlertType.SUCCESS,
                    tekst: 'Småbarnstillegg er lagt til',
                });
                settRestFeil(undefined);
                settÅpenBehandling(response);
            } else {
                settRestFeil('Teknisk feil ved innleggelse av småbarnstillegg');
            }
            setJustererSmåbarnstillegg(false);
        });
    };

    React.useEffect(() => {
        setUtbetalingsBeløpStatusMap(
            finnUtbetalingsBeløpStatusMap(utbetalingsperiode, kompetanser, utbetaltAnnetLandBeløp, valutakurser)
        );
    }, [utbetalingsperiode, kompetanser, utbetaltAnnetLandBeløp, valutakurser]);

    const småbarnstilleggKorrigering: ISmåbarnstilleggkorrigering = {
        årMåned: aktivÅrOgMåned,
    };

    return (
        <Box borderColor="border-strong" borderWidth="1" padding="10">
            <HGrid columns={'1fr 3rem'} align="center">
                <Heading level={'3'} size="xsmall">
                    {månedNavnOgÅr()}
                </Heading>
                <Button
                    variant="tertiary"
                    icon={<XMarkIcon />}
                    onClick={() => {
                        settAktivEtikett(undefined);
                    }}
                />
            </HGrid>
            {restFeil && <AlertWithBottomMargin variant="error">{restFeil}</AlertWithBottomMargin>}
            {utbetalingsperiode === undefined ? (
                <BodyShort spacing>Ingen utbetalinger</BodyShort>
            ) : (
                <>
                    <UtbetalingsbeløpStack gap={'4'}>
                        <UtbetalingsbeløpRad>
                            <BodyShort>Person</BodyShort>
                            <BodyShort>Sats</BodyShort>
                            <BodyShort align="end">Beløp</BodyShort>
                        </UtbetalingsbeløpRad>
                        {utbetalingsperiode.utbetalingsperiodeDetaljer.sort(sorterUtbetaling).map(detalj => (
                            <UtbetalingsbeløpRad key={detalj.person.navn + detalj.ytelseType}>
                                <BodyShort>{`${detalj.person.navn} (${hentAlderSomString(
                                    detalj.person.fødselsdato
                                )}) | ${formaterIdent(detalj.person.personIdent)}`}</BodyShort>
                                <BodyShort>{ytelsetype[detalj.ytelseType].navn}</BodyShort>
                                {utbetalingsBeløpStatusMap.get(detalj.person.personIdent) ? (
                                    <BodyShort align="end">{formaterBeløp(detalj.utbetaltPerMnd)}</BodyShort>
                                ) : (
                                    <Alert variant="warning" children={'Må beregnes'} size={'small'} inline />
                                )}
                            </UtbetalingsbeløpRad>
                        ))}
                        <TotaltUtbetaltRad columns="1fr 5rem">
                            <BodyShort weight="semibold">Totalt utbetalt per mnd</BodyShort>
                            <BodyShort weight="semibold" align="end">
                                {formaterBeløp(utbetalingsperiode.utbetaltPerMnd)}
                            </BodyShort>
                        </TotaltUtbetaltRad>
                    </UtbetalingsbeløpStack>

                    {kanFjerneSmåbarnstilleggFraPeriode(utbetalingsperiode) &&
                        behandling.type === Behandlingstype.MIGRERING_FRA_INFOTRYGD && (
                            <Button
                                id={'fjern-småbarnstillegg'}
                                variant={'tertiary'}
                                size={'xsmall'}
                                loading={justererSmåbarnstillegg}
                                disabled={justererSmåbarnstillegg || erLesevisning}
                                onClick={() => fjernSmåbarnstilleggFraMåned(småbarnstilleggKorrigering)}
                                icon={<TrashIcon aria-hidden />}
                            >
                                Fjern småbarnstillegg
                            </Button>
                        )}
                    {kanLeggeSmåbarnstilleggTilPeriode(utbetalingsperiode, aktivEtikett.date) &&
                        behandling.type === Behandlingstype.MIGRERING_FRA_INFOTRYGD && (
                            <Button
                                id={'legg-til-småbarnstillegg'}
                                variant={'tertiary'}
                                size={'xsmall'}
                                loading={justererSmåbarnstillegg}
                                disabled={justererSmåbarnstillegg || erLesevisning}
                                onClick={() => leggSmåbarnstilleggTilIMåned(småbarnstilleggKorrigering)}
                                icon={<PlusCircleIcon aria-hidden />}
                            >
                                Legg til småbarnstillegg
                            </Button>
                        )}
                </>
            )}
        </Box>
    );
};
export { Oppsummeringsboks };
