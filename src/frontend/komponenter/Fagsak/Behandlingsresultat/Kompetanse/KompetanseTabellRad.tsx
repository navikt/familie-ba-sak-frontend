import React from 'react';

import { BodyShort, Table } from '@navikt/ds-react';
import type { OptionType } from '@navikt/familie-form-elements';

import KompetanseTabellRadEndre from './KompetanseTabellRadEndre';
import {
    kompetanseFeilmeldingId,
    useKompetansePeriodeSkjema,
} from '../../../../context/Kompetanse/KompetanseSkjemaContext';
import type { IBehandling } from '../../../../typer/behandling';
import type { IRestKompetanse } from '../../../../typer/eøsPerioder';
import { KompetanseResultat } from '../../../../typer/eøsPerioder';
import { lagPersonLabel } from '../../../../utils/formatter';
import { StatusBarnCelleOgPeriodeCelle } from '../EøsPeriode/fellesKomponenter';

interface IProps {
    kompetanse: IRestKompetanse;
    åpenBehandling: IBehandling;
    visFeilmeldinger: boolean;
}

const KompetanseTabellRad: React.FC<IProps> = ({
    kompetanse,
    åpenBehandling,
    visFeilmeldinger,
}) => {
    const barn: OptionType[] = kompetanse.barnIdenter.map(barn => ({
        value: barn,
        label: lagPersonLabel(barn, åpenBehandling.personer),
    }));

    const {
        erKompetanseEkspandert,
        settErKompetanseEkspandert,
        skjema,
        valideringErOk,
        sendInnSkjema,
        slettKompetanse,
        nullstillSkjema,
        kanSendeSkjema,
        erKompetanseSkjemaEndret,
    } = useKompetansePeriodeSkjema({ barnIKompetanse: barn, kompetanse });

    React.useEffect(() => {
        if (åpenBehandling) {
            nullstillSkjema();
            settErKompetanseEkspandert(false);
        }
    }, [åpenBehandling]);

    React.useEffect(() => {
        if (visFeilmeldinger && erKompetanseEkspandert) {
            kanSendeSkjema();
        }
    }, [visFeilmeldinger, erKompetanseEkspandert]);

    const toggleForm = (visAlert: boolean) => {
        if (erKompetanseEkspandert && visAlert && erKompetanseSkjemaEndret()) {
            alert('Kompetansen har endringer som ikke er lagret!');
        } else {
            settErKompetanseEkspandert(!erKompetanseEkspandert);
            nullstillSkjema();
        }
    };

    const visVurdertKompetanse = () => {
        switch (kompetanse.resultat) {
            case KompetanseResultat.NORGE_ER_PRIMÆRLAND:
                return 'Primærland';
            case KompetanseResultat.NORGE_ER_SEKUNDÆRLAND:
                return 'Sekundærland';
            case KompetanseResultat.TO_PRIMÆRLAND:
                return 'To primærland';
            default:
                return '-';
        }
    };

    return (
        <Table.ExpandableRow
            togglePlacement="right"
            open={erKompetanseEkspandert}
            onOpenChange={() => toggleForm(true)}
            id={kompetanseFeilmeldingId(kompetanse)}
            content={
                <KompetanseTabellRadEndre
                    skjema={skjema}
                    tilgjengeligeBarn={barn}
                    valideringErOk={valideringErOk}
                    sendInnSkjema={sendInnSkjema}
                    toggleForm={toggleForm}
                    slettKompetanse={slettKompetanse}
                    status={kompetanse.status}
                    erAnnenForelderOmfattetAvNorskLovgivning={
                        kompetanse.erAnnenForelderOmfattetAvNorskLovgivning
                    }
                />
            }
        >
            <StatusBarnCelleOgPeriodeCelle
                status={kompetanse.status}
                barnIdenter={kompetanse.barnIdenter}
                personer={åpenBehandling.personer}
                periode={{ fom: kompetanse.fom, tom: kompetanse.tom }}
            />
            <Table.DataCell>
                <BodyShort size="small">{visVurdertKompetanse()}</BodyShort>
            </Table.DataCell>
        </Table.ExpandableRow>
    );
};

export default KompetanseTabellRad;
