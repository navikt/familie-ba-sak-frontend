import * as React from 'react';
import { useState } from 'react';

import styled from 'styled-components';

import { Xknapp } from 'nav-frontend-ikonknapper';

import { AddCircle, Delete } from '@navikt/ds-icons';
import { Alert, BodyShort, Button, Label } from '@navikt/ds-react';
import { useHttp } from '@navikt/familie-http';
import type { Etikett } from '@navikt/familie-tidslinje';
import type { Ressurs } from '@navikt/familie-typer';
import { RessursStatus } from '@navikt/familie-typer';

import { useApp } from '../../../context/AppContext';
import { useBehandling } from '../../../context/behandlingContext/BehandlingContext';
import { useTidslinje } from '../../../context/TidslinjeContext';
import type { IBehandling } from '../../../typer/behandling';
import { ytelsetype } from '../../../typer/beregning';
import type {
    IEøsPeriodeStatus,
    IRestEøsPeriode,
    IRestKompetanse,
    IRestUtenlandskPeriodeBeløp,
    IRestValutakurs,
} from '../../../typer/eøsPerioder';
import { EøsPeriodeStatus, KompetanseResultat } from '../../../typer/eøsPerioder';
import type { Utbetalingsperiode } from '../../../typer/vedtaksperiode';
import {
    datoformat,
    formaterBeløp,
    formaterIdent,
    formaterIsoDato,
    hentAlderSomString,
    sorterUtbetaling,
} from '../../../utils/formatter';
import { kalenderDatoFraDate, serializeIso8601String } from '../../../utils/kalender';
import { AlertType, ToastTyper } from '../../Felleskomponenter/Toast/typer';
import {
    erMigreringsBehandling,
    kanFjerneSmåbarnstilleggFraPeriode,
    kanLeggeSmåbarnstilleggTilPeriode,
} from './OppsummeringsboksUtils';

const TableHeaderAlignedRight = styled.th`
    text-align: right;
`;

const TableDataAlignedRight = styled.td`
    text-align: right;
`;

const AlertAlignedRight = styled(Alert)`
    float: right;
`;

const FlexDiv = styled.div`
    display: flex;
`;

const UtbetalingsbeløpTable = styled.table`
    width: 100%;
    padding-bottom: 1rem;
`;

const VenstreTekst = styled(BodyShort)`
    text-align: left;
    font-weight: bold;
    width: 50%;
    margin: 1.25rem 0rem;
`;

const HøyreTekst = styled(BodyShort)`
    text-align: right;
    font-weight: bold;
    width: 50%;
    margin: 1.25rem 2.5rem 1.25rem 0rem;
`;

const AlertWithBottomMargin = styled(Alert)`
    margin-bottom: 1.5rem;
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
            kompetanseForBarn =>
                kompetanseForBarn.resultat === KompetanseResultat.NORGE_ER_SEKUNDÆRLAND
        );
        let skalViseUtbetalingsBeløp = !norgeErSekundærland;

        if (norgeErSekundærland) {
            const kompetanseStatusOk = erAllePerioderUtfyltForBarn(kompetanserForBarn);
            const utbetaltAnnetLandStatusOk = erAllePerioderUtfyltForBarn(
                finnEøsPerioderForBarn(utbetaltAnnetLandBeløp, barnIdent)
            );
            const valutakursStatusOk = erAllePerioderUtfyltForBarn(
                finnEøsPerioderForBarn(valutakurser, barnIdent)
            );
            skalViseUtbetalingsBeløp =
                kompetanseStatusOk && utbetaltAnnetLandStatusOk && valutakursStatusOk;
        }
        utbetalingsMap.set(barnIdent, skalViseUtbetalingsBeløp);
    });
    return utbetalingsMap;
};

const finnEøsPerioderForBarn = (
    restEøsPerioder: IRestEøsPeriode[],
    barnIdent: string
): IRestEøsPeriode[] => {
    return (
        restEøsPerioder.filter(restEøsPeriode => restEøsPeriode.barnIdenter.includes(barnIdent)) ??
        []
    );
};

const finnKompetanserForBarn = (
    kompetanseFelter: IRestKompetanse[],
    barnIdent: string
): IRestKompetanse[] => {
    return (
        kompetanseFelter.filter(kompetanseFelt => kompetanseFelt.barnIdenter.includes(barnIdent)) ??
        []
    );
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
    const { settÅpenBehandling, åpenBehandling, vurderErLesevisning } = useBehandling();
    const { settToast } = useApp();
    const { settAktivEtikett } = useTidslinje();

    const [utbetalingsBeløpStatusMap, setUtbetalingsBeløpStatusMap] = React.useState(
        new Map<string, boolean>()
    );
    const [restFeil, settRestFeil] = useState<string | undefined>(undefined);
    const [justererSmåbarnstillegg, setJustererSmåbarnstillegg] = useState<boolean>(false);

    const aktivÅrOgMåned = formaterIsoDato(
        serializeIso8601String(kalenderDatoFraDate(aktivEtikett.date)),
        datoformat.ISO_MÅNED
    );
    const månedNavnOgÅr = () => {
        const navn = formaterIsoDato(
            serializeIso8601String(kalenderDatoFraDate(aktivEtikett.date)),
            datoformat.MÅNED_ÅR_NAVN
        );
        return navn[0].toUpperCase() + navn.substr(1);
    };
    const småbarnstilleggkorrigeringUrl = `/familie-ba-sak/api/småbarnstilleggkorrigering/behandling`;

    const fjernSmåbarnstilleggFraMåned = (
        småbarnstilleggkorrigering: ISmåbarnstilleggkorrigering
    ) => {
        setJustererSmåbarnstillegg(true);

        if (åpenBehandling.status === RessursStatus.SUKSESS) {
            request<ISmåbarnstilleggkorrigering, IBehandling>({
                method: 'DELETE',
                data: småbarnstilleggkorrigering,
                url: `${småbarnstilleggkorrigeringUrl}/${åpenBehandling.data.behandlingId}`,
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
        }
    };

    const leggSmåbarnstilleggTilIMåned = (
        småbarnstilleggkorrigering: ISmåbarnstilleggkorrigering
    ) => {
        setJustererSmåbarnstillegg(true);

        if (åpenBehandling.status === RessursStatus.SUKSESS) {
            request<ISmåbarnstilleggkorrigering, IBehandling>({
                method: 'POST',
                data: småbarnstilleggkorrigering,
                url: `${småbarnstilleggkorrigeringUrl}/${åpenBehandling.data.behandlingId}`,
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
        }
    };

    React.useEffect(() => {
        setUtbetalingsBeløpStatusMap(
            finnUtbetalingsBeløpStatusMap(
                utbetalingsperiode,
                kompetanser,
                utbetaltAnnetLandBeløp,
                valutakurser
            )
        );
    }, [utbetalingsperiode, kompetanser, utbetaltAnnetLandBeløp, valutakurser]);

    const småbarnstilleggKorrigering: ISmåbarnstilleggkorrigering = {
        årMåned: aktivÅrOgMåned,
    };

    return (
        <div className={'behandlingsresultat-informasjonsboks'}>
            <div className={'behandlingsresultat-informasjonsboks__header'}>
                <div className={'behandlingsresultat-informasjonsboks__header__info'}>
                    {restFeil && (
                        <AlertWithBottomMargin variant="error" inline>
                            {restFeil}
                        </AlertWithBottomMargin>
                    )}

                    <Label>{månedNavnOgÅr()}</Label>

                    {utbetalingsperiode === undefined && <BodyShort>Ingen utbetalinger</BodyShort>}
                </div>
                <Xknapp
                    onClick={() => {
                        settAktivEtikett(undefined);
                    }}
                />
            </div>
            {utbetalingsperiode !== undefined && (
                <>
                    <UtbetalingsbeløpTable>
                        <thead>
                            <tr>
                                <th>
                                    <BodyShort>Person</BodyShort>
                                </th>
                                <th>
                                    <BodyShort>Sats</BodyShort>
                                </th>
                                <TableHeaderAlignedRight>
                                    <BodyShort>Beløp</BodyShort>
                                </TableHeaderAlignedRight>
                            </tr>
                        </thead>
                        <tbody>
                            {utbetalingsperiode.utbetalingsperiodeDetaljer
                                .sort(sorterUtbetaling)
                                .map((detalj, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>
                                                <BodyShort>{`${
                                                    detalj.person.navn
                                                } (${hentAlderSomString(
                                                    detalj.person.fødselsdato
                                                )}) | ${formaterIdent(
                                                    detalj.person.personIdent
                                                )}`}</BodyShort>
                                            </td>
                                            <td>
                                                <BodyShort>
                                                    {ytelsetype[detalj.ytelseType].navn}
                                                </BodyShort>
                                            </td>
                                            <TableDataAlignedRight>
                                                {utbetalingsBeløpStatusMap.get(
                                                    detalj.person.personIdent
                                                ) ? (
                                                    <BodyShort>
                                                        {formaterBeløp(detalj.utbetaltPerMnd)}
                                                    </BodyShort>
                                                ) : (
                                                    <AlertAlignedRight
                                                        variant="warning"
                                                        children={'Må beregnes'}
                                                        size={'small'}
                                                        inline
                                                    />
                                                )}
                                            </TableDataAlignedRight>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </UtbetalingsbeløpTable>

                    <div className="dashed-hr" style={{ marginRight: '2.5rem' }}>
                        <div className="line" />
                    </div>
                    <FlexDiv>
                        <VenstreTekst>Totalt utbetalt per mnd</VenstreTekst>
                        <HøyreTekst>{formaterBeløp(utbetalingsperiode.utbetaltPerMnd)}</HøyreTekst>
                    </FlexDiv>

                    {kanFjerneSmåbarnstilleggFraPeriode(utbetalingsperiode) &&
                        erMigreringsBehandling(åpenBehandling) && (
                            <Button
                                id={'fjern-småbarnstillegg'}
                                variant={'tertiary'}
                                size={'xsmall'}
                                loading={justererSmåbarnstillegg}
                                disabled={justererSmåbarnstillegg || vurderErLesevisning()}
                                onClick={() =>
                                    fjernSmåbarnstilleggFraMåned(småbarnstilleggKorrigering)
                                }
                            >
                                <Delete aria-hidden /> Fjern småbarnstillegg
                            </Button>
                        )}
                    {kanLeggeSmåbarnstilleggTilPeriode(utbetalingsperiode, aktivEtikett.date) &&
                        erMigreringsBehandling(åpenBehandling) && (
                            <Button
                                id={'legg-til-småbarnstillegg'}
                                variant={'tertiary'}
                                size={'xsmall'}
                                loading={justererSmåbarnstillegg}
                                disabled={justererSmåbarnstillegg || vurderErLesevisning()}
                                onClick={() =>
                                    leggSmåbarnstilleggTilIMåned(småbarnstilleggKorrigering)
                                }
                            >
                                <AddCircle aria-hidden /> Legg til småbarnstillegg
                            </Button>
                        )}
                </>
            )}
        </div>
    );
};
export { Oppsummeringsboks };
