import type { ReactNode } from 'react';

import { Box, Heading, Radio, RadioGroup } from '@navikt/ds-react';
import type { Felt } from '@navikt/familie-skjema';

import { Målform, målform } from '../typer/søknad';

interface IProps {
    målformFelt: Felt<Målform | undefined>;
    visFeilmeldinger: boolean;
    erLesevisning: boolean;
    Legend?: ReactNode;
}

const MålformVelger = ({
    målformFelt,
    visFeilmeldinger,
    erLesevisning,
    Legend = <Heading size={'medium'} level={'2'} children={'Målform'} />,
}: IProps) => {
    const radioOnChange = (målform: Målform) => {
        målformFelt.validerOgSettFelt(målform);
    };

    return (
        <Box marginBlock={'space-32'}>
            <RadioGroup
                {...målformFelt.hentNavBaseSkjemaProps(visFeilmeldinger)}
                readOnly={erLesevisning}
                value={målformFelt.verdi ? målform[målformFelt.verdi] : ''}
                legend={Legend}
            >
                <Box paddingInline={'space-16 space-0'}>
                    <Radio
                        value={målform[Målform.NB]}
                        name={'registrer-søknad-målform'}
                        checked={målformFelt.verdi === Målform.NB}
                        onChange={() => radioOnChange(Målform.NB)}
                        id={'målform-nb'}
                    >
                        {målform[Målform.NB]}
                    </Radio>
                    <Radio
                        value={målform[Målform.NN]}
                        name={'registrer-søknad-målform'}
                        checked={målformFelt.verdi === Målform.NN}
                        onChange={() => radioOnChange(Målform.NN)}
                    >
                        {målform[Målform.NN]}
                    </Radio>
                </Box>
            </RadioGroup>
        </Box>
    );
};

export default MålformVelger;
