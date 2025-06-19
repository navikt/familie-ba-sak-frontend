import React from 'react';

import { BodyShort } from '@navikt/ds-react';

import type { IPersonInfo } from '../../../typer/person';
import { formaterNavnAlderOgIdent } from '../../../utils/formatter';

const kulepunkt = `\u2022`;

interface Props {
    person: IPersonInfo;
}

export function PersonDetaljer({ person }: Props) {
    return <BodyShort>{kulepunkt + ' ' + formaterNavnAlderOgIdent(person)}</BodyShort>;
}
