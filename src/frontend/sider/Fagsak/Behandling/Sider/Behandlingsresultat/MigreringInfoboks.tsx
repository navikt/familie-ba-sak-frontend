import { useValiderBehandlingsresultat } from '@hooks/useValiderBehandlingsresultat';

import { Box, LocalAlert } from '@navikt/ds-react';

interface IProps {
    behandlingId: number;
}

const MigreringInfoboks = ({ behandlingId }: IProps) => {
    const { error } = useValiderBehandlingsresultat(behandlingId);

    const feilmelding = error?.message;

    if (feilmelding !== undefined) {
        return (
            <Box marginBlock={'space-16'}>
                <LocalAlert status={'error'}>
                    <LocalAlert.Header>
                        <LocalAlert.Title>{feilmelding}</LocalAlert.Title>
                    </LocalAlert.Header>
                </LocalAlert>
            </Box>
        );
    } else return null;
};

export default MigreringInfoboks;
