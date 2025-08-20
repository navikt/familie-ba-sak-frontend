import React from 'react';

import classNames from 'classnames';

import { PersonCircleFillIcon } from '@navikt/aksel-icons';
import { AGreen400, AOrange600 } from '@navikt/ds-tokens/dist/tokens';
import {
    GuttIkon,
    JenteIkon,
    KvinneIkon,
    MannIkon,
    NøytralPersonIkon,
} from '@navikt/familie-ikoner';
import { kjønnType } from '@navikt/familie-typer';

import styles from './PersonIkon.module.css';
import KontorIkonGrønn from '../ikoner/KontorIkonGrønn';
import StatusIkon, { Status } from '../ikoner/StatusIkon';
import { FagsakType } from '../typer/fagsak';

interface PersonIkonProps {
    fagsakType?: FagsakType;
    kjønn: kjønnType;
    erBarn: boolean;
    størrelse?: 's' | 'm';
    erAdresseBeskyttet?: boolean;
    harTilgang?: boolean;
}

export const PersonIkon = ({
    fagsakType,
    kjønn,
    erBarn,
    størrelse = 's',
    erAdresseBeskyttet = false,
    harTilgang = true,
}: PersonIkonProps) => {
    if (!harTilgang) {
        return <StatusIkon status={Status.FEIL} />;
    }

    if (fagsakType === FagsakType.INSTITUSJON) {
        if (størrelse === 'm') {
            return (
                <KontorIkonGrønn
                    height="32"
                    width="32"
                    color={erAdresseBeskyttet ? AOrange600 : AGreen400}
                />
            );
        }
        return (
            <KontorIkonGrønn
                height="24"
                width="24"
                color={erAdresseBeskyttet ? AOrange600 : AGreen400}
            />
        );
    }

    if (fagsakType === FagsakType.SKJERMET_BARN) {
        if (kjønn === kjønnType.KVINNE) {
            return (
                <JenteIkon
                    className={classNames(styles.kvinnelig, {
                        [styles.litenIkon]: størrelse === 's',
                        [styles.størreIkon]: størrelse === 'm',
                        [styles.adresseBeskyttet]: erAdresseBeskyttet,
                    })}
                />
            );
        }
        if (kjønn === kjønnType.MANN) {
            return (
                <GuttIkon
                    className={classNames(styles.mannlig, {
                        [styles.litenIkon]: størrelse === 's',
                        [styles.størreIkon]: størrelse === 'm',
                        [styles.adresseBeskyttet]: erAdresseBeskyttet,
                    })}
                />
            );
        }
    }

    if (fagsakType === FagsakType.BARN_ENSLIG_MINDREÅRIG) {
        return (
            <PersonCircleFillIcon
                className={classNames({
                    [styles.litenIkon]: størrelse === 's',
                    [styles.størreIkon]: størrelse === 'm',
                    [styles.ensligAdresseBeskyttet]: erAdresseBeskyttet,
                })}
            />
        );
    }

    if (kjønn === kjønnType.KVINNE) {
        return erBarn ? (
            <JenteIkon
                className={classNames(styles.kvinnelig, {
                    [styles.mindreIkon]: størrelse === 's',
                    [styles.storIkon]: størrelse === 'm',
                    [styles.adresseBeskyttet]: erAdresseBeskyttet,
                })}
            />
        ) : (
            <KvinneIkon
                className={classNames(styles.kvinnelig, {
                    [styles.mindreIkon]: størrelse === 's',
                    [styles.storIkon]: størrelse === 'm',
                    [styles.adresseBeskyttet]: erAdresseBeskyttet,
                })}
            />
        );
    }
    if (kjønn === kjønnType.MANN) {
        return erBarn ? (
            <GuttIkon
                className={classNames(styles.mannlig, {
                    [styles.mindreIkon]: størrelse === 's',
                    [styles.storIkon]: størrelse === 'm',
                    [styles.adresseBeskyttet]: erAdresseBeskyttet,
                })}
            />
        ) : (
            <MannIkon
                className={classNames(styles.mannlig, {
                    [styles.mindreIkon]: størrelse === 's',
                    [styles.storIkon]: størrelse === 'm',
                    [styles.adresseBeskyttet]: erAdresseBeskyttet,
                })}
            />
        );
    }
    return (
        <NøytralPersonIkon
            className={classNames(styles.mannlig, {
                [styles.mindreIkon]: størrelse === 's',
                [styles.storIkon]: størrelse === 'm',
                [styles.nøytralAdresseBeskyttet]: erAdresseBeskyttet,
            })}
        />
    );
};
