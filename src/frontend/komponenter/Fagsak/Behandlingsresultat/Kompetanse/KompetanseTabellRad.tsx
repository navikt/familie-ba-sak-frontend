import React, { useState } from 'react';

import deepEqual from 'deep-equal';
import styled from 'styled-components';

import { BodyShort } from '@navikt/ds-react';
import type { OptionType } from '@navikt/familie-form-elements';
import type { FeltState } from '@navikt/familie-skjema';

import FamilieChevron from '../../../../ikoner/FamilieChevron';
import type { IBehandling } from '../../../../typer/behandling';
import type { IKompetanse } from '../../../../typer/kompetanse';
import { KompetanseStatus, KompetanseResultat } from '../../../../typer/kompetanse';
import { datoformat, formaterIsoDato, hentAlder } from '../../../../utils/formatter';
import type { IYearMonthPeriode } from '../../../../utils/kalender';
import IkonKnapp from '../../../Felleskomponenter/IkonKnapp/IkonKnapp';
import StatusIkon, { Status } from '../../../Felleskomponenter/StatusIkon';
import { kompetanseFeilmeldingId } from './KompetanseSkjema';
import KompetanseTabellRadEndre from './KompetanseTabellRadEndre';

interface IEkspanderbarTrProps {
    ekspandert?: boolean;
}

const mapKompetanseStatusTilStatus: Record<KompetanseStatus, Status> = {
    IKKE_UTFYLT: Status.ADVARSEL,
    UFULLSTENDIG: Status.FEIL,
    OK: Status.OK,
};

const EkspanderbarTr = styled.tr`
    td {
        border-bottom: ${(props: IEkspanderbarTrProps) =>
            props.ekspandert
                ? 'none'
                : '1px solid rgba(0, 0, 0, 0.15)'} !important; // Denne !important er nødvendig
        vertical-align: top;
    }

    & td:last-child {
        text-align: right;
        padding-right: 0;
    }
`;

const KompetanseVurdertCelle = styled.div`
    display: flex;
    svg {
        margin-right: 1rem;
    }
`;

const BarnDiv = styled.div`
    display: inline-block;
    margin-top: 1px;
`;

const EkspandertTd = styled.td`
    padding: 0 1rem 1rem 1.6rem;
`;

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

    const lagLabelBarn = (barnetsIdent: string): string => {
        const barnet = åpenBehandling.personer.find(person => person.personIdent === barnetsIdent);
        if (barnet) {
            return `${barnet.navn} (${hentAlder(barnet.fødselsdato)} år) ${barnet.personIdent}`;
        } else {
            return barnetsIdent;
        }
    };

    const barn: OptionType[] = kompetanse.verdi?.barnIdenter.verdi.map(barn => ({
        value: barn,
        label: lagLabelBarn(barn),
    }));

    const formatterPeriode = (periode: IYearMonthPeriode): string => {
        return `${formaterIsoDato(periode.fom, datoformat.MÅNED_ÅR_KORTNAVN)} - ${
            periode.tom ? formaterIsoDato(periode.tom, datoformat.MÅNED_ÅR_KORTNAVN) : ''
        }`;
    };

    return (
        <>
            <EkspanderbarTr ekspandert={ekspandertKompetanse}>
                <td>
                    <KompetanseVurdertCelle>
                        <div>
                            <StatusIkon
                                status={mapKompetanseStatusTilStatus[kompetanse.verdi.status]}
                                width={20}
                                heigth={20}
                            />
                        </div>
                        <BarnDiv>
                            {kompetanse.verdi?.barnIdenter.verdi.map(barn => (
                                <BodyShort size="small" key={barn}>
                                    {lagLabelBarn(barn)}
                                </BodyShort>
                            ))}
                        </BarnDiv>
                    </KompetanseVurdertCelle>
                </td>
                <td>
                    <BodyShort size="small">
                        {formatterPeriode(kompetanse.verdi.periode.verdi)}
                    </BodyShort>
                </td>
                <td>
                    <BodyShort size="small">{visVurdertKompetanse()}</BodyShort>
                </td>
                <td>
                    <IkonKnapp
                        id={kompetanseFeilmeldingId(kompetanse)}
                        erLesevisning={false}
                        label={
                            !ekspandertKompetanse
                                ? redigerbartKompetanse.verdi.status === KompetanseStatus.OK
                                    ? 'Endre'
                                    : 'Fastsett kompetanse'
                                : `Lukk`
                        }
                        onClick={() => toggleForm(true)}
                        ikon={<FamilieChevron retning={ekspandertKompetanse ? 'opp' : 'ned'} />}
                        mini={true}
                    />
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
