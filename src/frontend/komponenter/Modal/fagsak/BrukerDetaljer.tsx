import React from 'react';

import { BodyShort } from '@navikt/ds-react';

import type { IPersonInfo } from '../../../typer/person';
import { formaterNavnAlderOgIdent } from '../../../utils/formatter';

const kulepunkt = `\u2022` + '   ';

interface Props {
    bruker: IPersonInfo;
}

export function BrukerDetaljer({ bruker }: Props) {
    return <BodyShort>{kulepunkt + formaterNavnAlderOgIdent(bruker)}</BodyShort>;
}
