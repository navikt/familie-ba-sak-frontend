import React, { useState } from 'react';

import deepEqual from 'deep-equal';

import { BodyShort, Table } from '@navikt/ds-react';
import type { OptionType } from '@navikt/familie-form-elements';
import type { FeltState } from '@navikt/familie-skjema';

import type { IBehandling } from '../../../../typer/behandling';
import type { IKompetanse } from '../../../../typer/eøsPerioder';
import { KompetanseResultat } from '../../../../typer/eøsPerioder';
import { lagPersonLabel } from '../../../../utils/formatter';
import { StatusBarnCelleOgPeriodeCelle } from '../EøsPeriode/fellesKomponenter';
import { kompetanseFeilmeldingId } from './KompetanseSkjema';
import KompetanseTabellRadEndre from './KompetanseTabellRadEndre';

interface IProps {
    kompetanse: FeltState<IKompetanse>;
    åpenBehandling: IBehandling;
    visFeilmeldinger: boolean;
}

const KompetanseTabellRad: React.FC<IProps> = ({
    kompetanse,
    åpenBehandling,
    visFeilmeldinger,
}) => {
    const [ekspandertKompetanse, settEkspandertKompetanse] = React.useState<boolean>(false);
    const [redigerbartKompetanse, settRedigerbartKompetanse] =
        useState<FeltState<IKompetanse>>(kompetanse);

    const visVurdertKompetanse = () => {
        switch (kompetanse.verdi?.resultat?.verdi) {
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

    const toggleForm = (visAlert: boolean) => {
        if (ekspandertKompetanse && visAlert && !deepEqual(kompetanse, redigerbartKompetanse)) {
            alert('Kompetansen har endringer som ikke er lagret!');
        } else {
            settEkspandertKompetanse(!ekspandertKompetanse);
            settRedigerbartKompetanse(kompetanse);
        }
    };

    const barn: OptionType[] = kompetanse.verdi?.barnIdenter.verdi.map(barn => ({
        value: barn,
        label: lagPersonLabel(barn, åpenBehandling.personer),
    }));

    return (
        <Table.ExpandableRow
            togglePlacement="right"
            open={ekspandertKompetanse}
            onOpenChange={() => toggleForm(true)}
            id={kompetanseFeilmeldingId(redigerbartKompetanse)}
            content={
                <KompetanseTabellRadEndre
                    redigerbartKompetanse={redigerbartKompetanse}
                    tilgjengeligeBarn={barn}
                    visFeilmeldinger={visFeilmeldinger}
                    settRedigerbartKompetanse={settRedigerbartKompetanse}
                    toggleForm={toggleForm}
                    settEkspandertKompetanse={settEkspandertKompetanse}
                />
            }
        >
            <StatusBarnCelleOgPeriodeCelle
                status={kompetanse.verdi.status}
                barnIdenter={kompetanse.verdi.barnIdenter.verdi}
                personer={åpenBehandling.personer}
                periode={kompetanse.verdi.periode.verdi}
            />
            <Table.DataCell>
                <BodyShort size="small">{visVurdertKompetanse()}</BodyShort>
            </Table.DataCell>
        </Table.ExpandableRow>
    );
};

export default KompetanseTabellRad;
