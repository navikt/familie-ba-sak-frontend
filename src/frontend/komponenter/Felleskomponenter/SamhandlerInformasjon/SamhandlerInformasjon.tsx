import * as React from 'react';

import { BodyShort, Heading } from '@navikt/ds-react';
import Clipboard from '@navikt/familie-clipboard';

import KontorIkonGrønn from '../../../ikoner/KontorIkonGrønn';
import type { ISamhandlerInfo } from '../../../typer/samhandler';
import { formaterIdent } from '../../../utils/formatter';

interface IProps {
    samhandler: ISamhandlerInfo;
    somOverskrift?: boolean;
    width?: string;
}

const SamhandlerInformasjon: React.FunctionComponent<IProps> = ({
    samhandler,
    somOverskrift = false,
}) => {
    const navn = samhandler.navn;
    return (
        <div className={'samhandlerinformasjon'}>
            {somOverskrift && (
                <>
                    <KontorIkonGrønn className={'kontor-ikon'} height={32} width={32} />
                    <Heading level="2" size="medium" className={'navn'} title={navn}>
                        {navn}
                    </Heading>
                    <Heading level="2" size="medium" as="span">
                        &ensp;|&ensp;
                    </Heading>
                    <Clipboard>
                        <Heading level="2" size="medium" as="span">
                            {formaterIdent(samhandler.orgNummer)}
                        </Heading>
                    </Clipboard>
                    <Heading level="2" size="medium" as="span">
                        &ensp;|&ensp;
                    </Heading>
                    <Heading level="2" size="medium" as="span">
                        Institusjon
                    </Heading>
                </>
            )}

            {!somOverskrift && (
                <>
                    <KontorIkonGrønn
                        className={'kontor-ikon--for-normaltekst'}
                        height={24}
                        width={24}
                    />
                    <BodyShort className={'navn'} title={navn}>
                        {navn}
                    </BodyShort>
                    <BodyShort>&ensp;|&ensp;</BodyShort>
                    <Clipboard>
                        <BodyShort>{formaterIdent(samhandler.orgNummer)}</BodyShort>
                    </Clipboard>
                    <BodyShort>&ensp;|&ensp;</BodyShort>
                    <BodyShort>Institusjon</BodyShort>
                </>
            )}
        </div>
    );
};

export default SamhandlerInformasjon;
