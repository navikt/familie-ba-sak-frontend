import React, { useState } from 'react';

import deepEqual from 'deep-equal';
import styled from 'styled-components';

import { Normaltekst } from 'nav-frontend-typografi';

import { OptionType } from '@navikt/familie-form-elements';
import { FeltState } from '@navikt/familie-skjema';

import FamilieChevron from '../../../../ikoner/FamilieChevron';
import { IKompetanse } from '../../../../typer/kompetanse';
import IkonKnapp from '../../../Felleskomponenter/IkonKnapp/IkonKnapp';
import KompetanseIkon from './KompetanseIkon';
import { kompetanseFeilmeldingId } from './KompetanseSkjema';
import KompetanseTabellRadEndre from './KompetanseTabellRadEndre';

interface IEkspanderbarTrProps {
    ekspandert?: boolean;
}

const EkspanderbarTr = styled.tr`
    td {
        border-bottom: ${(props: IEkspanderbarTrProps) =>
            props.ekspandert ? 'none' : '1px solid rgba(0, 0, 0, 0.15)'} !important;
        vertical-align: top;
    }
`;

const ToggleFormKnappTd = styled.td`
    text-align: right !important;
    padding-right: 0 !important;
`;

const KompetanseVurdertCelle = styled.div`
    display: flex;
    svg {
        margin-right: 1rem;
    }
`;

const BarnDiv = styled.div`
    display: inline-block;
`;

const EkspandertTd = styled.td`
    padding: 0 1rem 1rem 1.6rem;
`;

interface IProps {
    kompetanse: FeltState<IKompetanse>;
    visFeilmeldinger: boolean;
}

const KompetanseTabellRad: React.FC<IProps> = ({ kompetanse, visFeilmeldinger }) => {
    const [ekspandertKompetanse, settEkspandertKompetanse] = React.useState<boolean>(false);
    const [redigerbartKompetanse, settRedigerbartKompetanse] =
        useState<FeltState<IKompetanse>>(kompetanse);

    const visVurdertKompetanse = () => {
        if (kompetanse.verdi?.primærland?.verdi === 'NO') {
            return 'Primærland';
        } else if (kompetanse.verdi?.sekundærland?.verdi === 'NO') {
            return 'Sekundærland';
        } else {
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

    const barn: OptionType[] = kompetanse.verdi?.barn.verdi.map(barn => ({
        value: barn + '',
        label: barn + '',
    }));

    return (
        <>
            <EkspanderbarTr ekspandert={ekspandertKompetanse}>
                <td>
                    <KompetanseVurdertCelle>
                        <KompetanseIkon vurdert={undefined} width={20} heigth={20} />
                        <BarnDiv>
                            {kompetanse.verdi?.barn.verdi.map(barn => (
                                <Normaltekst key={barn}>{barn}</Normaltekst>
                            ))}
                        </BarnDiv>
                    </KompetanseVurdertCelle>
                </td>
                <td>{`${kompetanse.verdi?.fom.verdi ? kompetanse.verdi?.fom.verdi : ''} - ${
                    kompetanse.verdi?.tom.verdi
                }`}</td>
                <td>{visVurdertKompetanse()}</td>
                <ToggleFormKnappTd>
                    <IkonKnapp
                        id={kompetanseFeilmeldingId(kompetanse)}
                        erLesevisning={false}
                        label={ekspandertKompetanse ? `Skjul` : `Vis`}
                        onClick={() => toggleForm(true)}
                        ikon={<FamilieChevron retning={ekspandertKompetanse ? 'opp' : 'ned'} />}
                        mini={true}
                    />
                </ToggleFormKnappTd>
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
