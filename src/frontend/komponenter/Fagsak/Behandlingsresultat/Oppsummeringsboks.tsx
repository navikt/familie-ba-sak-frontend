import * as React from 'react';

import styled from 'styled-components';

import { Xknapp } from 'nav-frontend-ikonknapper';
import { Element, Normaltekst } from 'nav-frontend-typografi';

import { Alert } from '@navikt/ds-react';
import type { FeltState } from '@navikt/familie-skjema';
import type { Etikett } from '@navikt/familie-tidslinje';

import { useTidslinje } from '../../../context/TidslinjeContext';
import { ytelsetype } from '../../../typer/beregning';
import type {
    IEøsPeriodeStatus,
    IKompetanse,
    IRestEøsPeriode,
    IRestUtenlandskPeriodeBeløp,
    IRestValutakurs,
} from '../../../typer/eøsPerioder';
import { EøsPeriodeStatus, KompetanseResultat } from '../../../typer/eøsPerioder';
import type { Utbetalingsperiode } from '../../../typer/vedtaksperiode';
import {
    datoformat,
    formaterBeløp,
    formaterIsoDato,
    formaterIdent,
    hentAlderSomString,
    sorterUtbetaling,
} from '../../../utils/formatter';
import { kalenderDatoFraDate, serializeIso8601String } from '../../../utils/kalender';

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
`;

interface IProps {
    utbetalingsperiode: Utbetalingsperiode | undefined;
    aktivEtikett: Etikett;
    kompetanser: FeltState<IKompetanse>[];
    utbetaltAnnetLandBeløp: IRestUtenlandskPeriodeBeløp[];
    valutakurser: IRestValutakurs[];
}

const validerUtbetalingsBeløp = (
    utbetalingsperiode: Utbetalingsperiode | undefined,
    kompetanser: FeltState<IKompetanse>[],
    utbetaltAnnetLandBeløp: IRestUtenlandskPeriodeBeløp[],
    valutakurser: IRestValutakurs[]
): Map<string, boolean> => {
    const utbetalingsMap = new Map<string, boolean>();
    utbetalingsperiode?.utbetalingsperiodeDetaljer.forEach(upd => {
        const barnIdent = upd.person.personIdent;
        const kompetanserForBarn = finnKompetanserForBarn(kompetanser, barnIdent);
        const norgeErSekundærland = kompetanserForBarn.find(
            kompetanseForBarn =>
                kompetanseForBarn.resultat.verdi === KompetanseResultat.NORGE_ER_SEKUNDÆRLAND
        )
            ? true
            : false;

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
    felter: FeltState<IKompetanse>[],
    barnIdent: string
): IKompetanse[] => {
    return (
        felter
            .filter(felt => felt.verdi.barnIdenter.verdi.includes(barnIdent))
            ?.map(kompetanse => kompetanse.verdi) ?? []
    );
};

const erAllePerioderUtfyltForBarn = (eøsPeriodeStatus: IEøsPeriodeStatus[]) => {
    return eøsPeriodeStatus.find(eøsPeriode => eøsPeriode.status !== EøsPeriodeStatus.OK)
        ? false
        : true;
};

const Oppsummeringsboks: React.FunctionComponent<IProps> = ({
    utbetalingsperiode,
    aktivEtikett,
    kompetanser,
    utbetaltAnnetLandBeløp,
    valutakurser,
}) => {
    const { settAktivEtikett } = useTidslinje();
    const [utbetalingsBeløpStatusMap, setUtbetalingsBeløpStatusMap] = React.useState(
        new Map<string, boolean>()
    );

    const månedNavnOgÅr = () => {
        const navn = formaterIsoDato(
            serializeIso8601String(kalenderDatoFraDate(aktivEtikett.date)),
            datoformat.MÅNED_ÅR_NAVN
        );
        return navn[0].toUpperCase() + navn.substr(1);
    };

    React.useEffect(() => {
        setUtbetalingsBeløpStatusMap(
            validerUtbetalingsBeløp(
                utbetalingsperiode,
                kompetanser,
                utbetaltAnnetLandBeløp,
                valutakurser
            )
        );
    }, [utbetalingsperiode, kompetanser, utbetaltAnnetLandBeløp, valutakurser]);

    return (
        <div className={'behandlingsresultat-informasjonsboks'}>
            <div className={'behandlingsresultat-informasjonsboks__header'}>
                <div className={'behandlingsresultat-informasjonsboks__header__info'}>
                    <Element>{månedNavnOgÅr()}</Element>

                    {utbetalingsperiode !== undefined ? (
                        <Normaltekst>
                            Totalt utbetalt i mnd
                            <span
                                className={
                                    'behandlingsresultat-informasjonsboks__header__info__totalbeløp'
                                }
                            >
                                {formaterBeløp(utbetalingsperiode.utbetaltPerMnd)}
                            </span>
                        </Normaltekst>
                    ) : (
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
            )}
        </div>
    );
};
export { Oppsummeringsboks };
