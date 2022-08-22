import * as React from 'react';
import { useState } from 'react';

import styled from 'styled-components';

import { Xknapp } from 'nav-frontend-ikonknapper';
import { Element, Normaltekst } from 'nav-frontend-typografi';

import { AddCircle, Delete } from '@navikt/ds-icons';
import { Alert, Button } from '@navikt/ds-react';
import { useHttp } from '@navikt/familie-http';
import type { Etikett } from '@navikt/familie-tidslinje';
import type { Ressurs } from '@navikt/familie-typer';
import { RessursStatus } from '@navikt/familie-typer';

import { useApp } from '../../../context/AppContext';
import { useBehandling } from '../../../context/behandlingContext/BehandlingContext';
import { useTidslinje } from '../../../context/TidslinjeContext';
import type { IBehandling } from '../../../typer/behandling';
import { Behandlingstype } from '../../../typer/behandling';
import { YtelseType, ytelsetype } from '../../../typer/beregning';
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
    hentAlder,
    hentAlderSomString,
    millisekunderIEttÅr,
    sorterUtbetaling,
} from '../../../utils/formatter';
import {
    kalenderDato,
    kalenderDatoFraDate,
    kalenderDatoMedFallback,
    kalenderDiff,
    kalenderDiffMåned,
    serializeIso8601String,
} from '../../../utils/kalender';
import DashedHr from '../../Felleskomponenter/DashedHr/DashedHr';
import { AlertType, ToastTyper } from '../../Felleskomponenter/Toast/typer';

const TableHeaderAlignedRight = styled.th`
    text-align: right;
`;

const TableDataAlignedRight = styled.td`
    text-align: right;
`;

const AlertAlignedRight = styled(Alert)`
    float: right;
`;

const UtbetalingsbeløpTable = styled.table`
    width: 100%;
    padding-bottom: 1.25rem;
`;

interface IProps {
    utbetalingsperiode: Utbetalingsperiode | undefined;
    aktivEtikett: Etikett;
    kompetanser: IRestKompetanse[];
    utbetaltAnnetLandBeløp: IRestUtenlandskPeriodeBeløp[];
    valutakurser: IRestValutakurs[];
}

export interface ISmåbarnstilleggJustering {
    måned: string;
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
    const { settÅpenBehandling, åpenBehandling, erLesevisning } = useBehandling();
    const { settToast } = useApp();
    const { settAktivEtikett } = useTidslinje();

    const aktivMåned = formaterIsoDato(
        serializeIso8601String(kalenderDatoFraDate(aktivEtikett.date)),
        datoformat.ISO_MÅNED
    );

    const [utbetalingsBeløpStatusMap, setUtbetalingsBeløpStatusMap] = React.useState(
        new Map<string, boolean>()
    );
    const [restFeil, settRestFeil] = useState<string | undefined>(undefined);
    const [justererSmåbarnstillegg, setJustererSmåbarnstillegg] = useState<boolean>(false);

    const månedNavnOgÅr = () => {
        const navn = formaterIsoDato(
            serializeIso8601String(kalenderDatoFraDate(aktivEtikett.date)),
            datoformat.MÅNED_ÅR_NAVN
        );
        return navn[0].toUpperCase() + navn.substr(1);
    };

    const fjernSmåbarnstilleggFraMåned = (småbarnstilleggJustering: ISmåbarnstilleggJustering) => {
        setJustererSmåbarnstillegg(true);

        if (åpenBehandling.status === RessursStatus.SUKSESS) {
            request<ISmåbarnstilleggJustering, IBehandling>({
                method: 'DELETE',
                data: småbarnstilleggJustering,
                url: `/familie-ba-sak/api/småbarnstillegg/behandling/${åpenBehandling.data.behandlingId}`,
            }).then((response: Ressurs<IBehandling>) => {
                settToast(ToastTyper.SMÅBARNSTILLEGG_JUSTERT, {
                    alertType: AlertType.SUCCESS,
                    tekst: 'Småbarnstillegg er fjernet',
                });
                settRestFeil(undefined);
                setJustererSmåbarnstillegg(false);
                settÅpenBehandling(response);
            });
        } else {
            settRestFeil('Teknisk feil ved fjerning av småbarnstillegg');
        }
    };

    const leggSmåbarnstilleggTilIMåned = (måned: ISmåbarnstilleggJustering) => {
        setJustererSmåbarnstillegg(true);

        if (åpenBehandling.status === RessursStatus.SUKSESS) {
            request<ISmåbarnstilleggJustering, IBehandling>({
                method: 'POST',
                data: måned,
                url: `/familie-ba-sak/api/småbarnstillegg/behandling/${åpenBehandling.data.behandlingId}`,
            }).then((response: Ressurs<IBehandling>) => {
                if (response.status === RessursStatus.SUKSESS) {
                    settToast(ToastTyper.SMÅBARNSTILLEGG_JUSTERT, {
                        alertType: AlertType.SUCCESS,
                        tekst: 'Småbarnstillegg er lagt til',
                    });
                    settRestFeil(undefined);
                    setJustererSmåbarnstillegg(false);
                    settÅpenBehandling(response);
                } else {
                    settRestFeil('Teknisk feil ved innleggelse av småbarnstillegg');
                }
            });
        }
    };

    const kanFjerneSmåbarnstilleggFraMåned = (utbetalingsperiode: Utbetalingsperiode): boolean => {
        return utbetalingsperiode.utbetalingsperiodeDetaljer.some(
            detalj => detalj.ytelseType === YtelseType.SMÅBARNSTILLEGG
        );
    };

    const kanLeggeSmåbarnstilleggTilMåned = (utbetalingsperiode: Utbetalingsperiode): boolean => {
        const harUtvidet = utbetalingsperiode.ytelseTyper.some(
            ytelsetype => ytelsetype === YtelseType.UTVIDET_BARNETRYGD
        );

        const harBarnUnder3ÅrIPeriode = utbetalingsperiode.utbetalingsperiodeDetaljer.some(
            utbetalingsPerideDetalj =>
                sjekkOmUnder3ÅrIPeriode(utbetalingsPerideDetalj.person.fødselsdato)
        );

        return (
            harUtvidet &&
            harBarnUnder3ÅrIPeriode &&
            !kanFjerneSmåbarnstilleggFraMåned(utbetalingsperiode)
        );
    };

    const sjekkOmUnder3ÅrIPeriode = (fødselsdato: string): boolean => {
        const antallMndForskjell = kalenderDiffMåned(
            kalenderDato(fødselsdato),
            kalenderDatoFraDate(aktivEtikett.date)
        );

        console.log(antallMndForskjell);

        return antallMndForskjell < 36;
    };

    const erMigreringsBehandling = (): boolean => {
        if (åpenBehandling.status === RessursStatus.SUKSESS) {
            return åpenBehandling.data.type === Behandlingstype.MIGRERING_FRA_INFOTRYGD;
        } else {
            return false;
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

    const småbarnstillegJustering: ISmåbarnstilleggJustering = {
        måned: aktivMåned,
    };

    return (
        <div className={'behandlingsresultat-informasjonsboks'}>
            <div className={'behandlingsresultat-informasjonsboks__header'}>
                <div className={'behandlingsresultat-informasjonsboks__header__info'}>
                    {restFeil && (
                        <Alert variant="error" style={{ marginBottom: '1.5rem' }} inline>
                            {restFeil}
                        </Alert>
                    )}

                    <Element>{månedNavnOgÅr()}</Element>

                    {utbetalingsperiode === undefined && (
                        <Normaltekst>Ingen utbetalinger</Normaltekst>
                    )}
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
                                    <Normaltekst>Person</Normaltekst>
                                </th>
                                <th>
                                    <Normaltekst>Sats</Normaltekst>
                                </th>
                                <TableHeaderAlignedRight>
                                    <Normaltekst>Beløp</Normaltekst>
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
                                                <Normaltekst>{`${
                                                    detalj.person.navn
                                                } (${hentAlderSomString(
                                                    detalj.person.fødselsdato
                                                )}) | ${formaterIdent(
                                                    detalj.person.personIdent
                                                )}`}</Normaltekst>
                                            </td>
                                            <td>
                                                <Normaltekst>
                                                    {ytelsetype[detalj.ytelseType].navn}
                                                </Normaltekst>
                                            </td>
                                            <TableDataAlignedRight>
                                                {utbetalingsBeløpStatusMap.get(
                                                    detalj.person.personIdent
                                                ) ? (
                                                    <Normaltekst>
                                                        {formaterBeløp(detalj.utbetaltPerMnd)}
                                                    </Normaltekst>
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

                    <DashedHr />
                    <div style={{ display: 'flex' }}>
                        <Normaltekst
                            style={{
                                textAlign: 'left',
                                fontWeight: 'bold',
                                width: '50%',
                                margin: '1.25rem 0rem',
                            }}
                        >
                            Totalt utbetalt per mnd
                        </Normaltekst>
                        <Normaltekst
                            style={{
                                textAlign: 'right',
                                fontWeight: 'bold',
                                width: '50%',
                                margin: '1.25rem 2.5rem 1.25rem 0rem',
                            }}
                        >
                            {formaterBeløp(utbetalingsperiode.utbetaltPerMnd)}
                        </Normaltekst>
                    </div>

                    {kanFjerneSmåbarnstilleggFraMåned(utbetalingsperiode) &&
                        erMigreringsBehandling() &&
                        erMigreringsBehandling() && (
                            <Button
                                id={'fjern-småbarnstillegg'}
                                variant={'tertiary'}
                                size={'xsmall'}
                                loading={justererSmåbarnstillegg}
                                disabled={justererSmåbarnstillegg || erLesevisning()}
                                onClick={() =>
                                    fjernSmåbarnstilleggFraMåned(småbarnstillegJustering)
                                }
                            >
                                <Delete /> Fjern småbarnstillegg
                            </Button>
                        )}
                    {kanLeggeSmåbarnstilleggTilMåned(utbetalingsperiode) &&
                        erMigreringsBehandling() && (
                            <Button
                                id={'Legg- til-småbarnstillegg'}
                                variant={'tertiary'}
                                size={'xsmall'}
                                loading={justererSmåbarnstillegg}
                                disabled={justererSmåbarnstillegg || erLesevisning()}
                                onClick={() =>
                                    leggSmåbarnstilleggTilIMåned(småbarnstillegJustering)
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
