import React, { useState } from 'react';

import deepEqual from 'deep-equal';

import { Collapse, Expand } from '@navikt/ds-icons';
import { BodyShort, Button } from '@navikt/ds-react';
import type { OptionType } from '@navikt/familie-form-elements';
import type { FeltState } from '@navikt/familie-skjema';

import type { IBehandling } from '../../../../typer/behandling';
import type { IKompetanse } from '../../../../typer/eøsPerioder';
import { EøsPeriodeStatus, KompetanseResultat } from '../../../../typer/eøsPerioder';
import { lagPersonLabel } from '../../../../utils/formatter';
import {
    EkspanderbarTr,
    EkspandertTd,
    StatusBarnCelleOgPeriodeCelle,
} from '../EøsPeriode/fellesKomponenter';
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
        <>
            <EkspanderbarTr ekspandert={ekspandertKompetanse}>
                <StatusBarnCelleOgPeriodeCelle
                    status={kompetanse.verdi.status}
                    barnIdenter={kompetanse.verdi.barnIdenter.verdi}
                    personer={åpenBehandling.personer}
                    periode={kompetanse.verdi.periode.verdi}
                />
                <td>
                    <BodyShort size="small">{visVurdertKompetanse()}</BodyShort>
                </td>
                <td>
                    <Button
                        id={kompetanseFeilmeldingId(kompetanse)}
                        variant="tertiary"
                        onClick={() => toggleForm(true)}
                        size="xsmall"
                    >
                        <BodyShort>
                            {!ekspandertKompetanse
                                ? kompetanse.verdi?.status === EøsPeriodeStatus.OK
                                    ? 'Endre'
                                    : 'Fastsett kompetanse'
                                : `Lukk`}
                        </BodyShort>
                        {ekspandertKompetanse ? (
                            <Collapse width="22" height="22" />
                        ) : (
                            <Expand width="22" height="22" />
                        )}
                    </Button>
                </td>
            </EkspanderbarTr>
            {ekspandertKompetanse && (
                <tr>
                    <EkspandertTd colSpan={4}>
                        <KompetanseTabellRadEndre
                            redigerbartKompetanse={redigerbartKompetanse}
                            tilgjengeligeBarn={barn}
                            visFeilmeldinger={visFeilmeldinger}
                            settRedigerbartKompetanse={settRedigerbartKompetanse}
                            toggleForm={toggleForm}
                            settEkspandertKompetanse={settEkspandertKompetanse}
                        />
                    </EkspandertTd>
                </tr>
            )}
        </>
    );
};

export default KompetanseTabellRad;
