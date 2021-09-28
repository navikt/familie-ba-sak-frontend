import React, { useEffect, useState, ReactNode } from 'react';

import styled from 'styled-components';

import { Feilmelding } from 'nav-frontend-typografi';

import MånedVelger from './MånedVelger';
import Årvelger from './ÅrVelger';

interface Props {
    id: string;
    feil: ReactNode | undefined;
    value: string | undefined;
    className?: string;
    label?: ReactNode;
    onEndret: (årMåned?: string) => void;
    antallÅrTilbake: number;
    antallÅrFrem: number;
    lesevisning?: boolean;
    disabled?: boolean;
}

const Knapperad = styled.div`
    display: flex;
    flex-direction: row;
`;

const DatolabelStyle = styled.label`
    margin-bottom: 0.5em;
`;

const StyledMånedVelger = styled(MånedVelger)`
    padding-right: 1em;
`;

const StyledFeilmelding = styled(Feilmelding)`
    margin-top: -0.5rem;
    margin-bottom: 0.5rem;
`;

const MånedÅrVelger: React.FC<Props> = ({
    id,
    feil,
    value,
    className,
    label,
    onEndret,
    antallÅrTilbake = 10,
    antallÅrFrem = 4,
    lesevisning = false,
    disabled = false,
}) => {
    const årFraVerdi = () => (value ? parseInt(value.split('-')[0], 10) : undefined);
    const månedFraVerdi = () => (value ? value.split('-')[1] : undefined);

    const [år, settÅr] = useState(årFraVerdi);
    const [måned, settMåned] = useState(månedFraVerdi);

    useEffect(() => {
        if (år && måned) {
            onEndret(`${år}-${måned}`);
        } else {
            onEndret(undefined);
        }
    }, [år, måned]);

    return (
        <div className={className} style={lesevisning ? { minWidth: '140px' } : {}}>
            {label && <DatolabelStyle htmlFor={id}>{label}</DatolabelStyle>}
            <Knapperad>
                <StyledMånedVelger
                    måned={månedFraVerdi()}
                    settMåned={settMåned}
                    lesevisning={lesevisning}
                    disabled={disabled}
                    feil={!!feil && !måned}
                />
                <Årvelger
                    år={årFraVerdi()}
                    settÅr={settÅr}
                    antallÅrTilbake={antallÅrTilbake}
                    antallÅrFrem={antallÅrFrem}
                    lesevisning={lesevisning}
                    disabled={disabled}
                    feil={!!feil && !år}
                />
            </Knapperad>
            {feil && <StyledFeilmelding>{feil}</StyledFeilmelding>}
        </div>
    );
};

export default MånedÅrVelger;
