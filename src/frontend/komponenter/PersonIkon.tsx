import { FagsakType } from '@typer/fagsak';
import classNames from 'classnames';

import { PersonCircleFillIcon } from '@navikt/aksel-icons';
import { GuttIkon, JenteIkon, KvinneIkon, MannIkon, NøytralPersonIkon } from '@navikt/familie-ikoner';
import { kjønnType } from '@navikt/familie-typer';

import styles from './PersonIkon.module.css';
import KontorIkonGrønn from '../ikoner/KontorIkonGrønn';
import NavLogo from '../ikoner/NavLogo';
import StatusIkon, { Status } from '../ikoner/StatusIkon';

interface PersonIkonProps {
    fagsakType?: FagsakType;
    kjønn: kjønnType;
    erBarn: boolean;
    størrelse?: 's' | 'm';
    erAdresseBeskyttet?: boolean;
    harTilgang?: boolean;
    erEgenAnsatt?: boolean;
}

export const PersonIkon = ({
    fagsakType,
    kjønn,
    erBarn,
    størrelse = 's',
    erAdresseBeskyttet = false,
    harTilgang = true,
    erEgenAnsatt = false,
}: PersonIkonProps) => {
    if (!harTilgang) {
        return <StatusIkon status={Status.FEIL} />;
    }

    if (erEgenAnsatt) {
        return (
            <div
                className={classNames(styles.ansattIkon, {
                    [styles.ansattStorIkon]: størrelse === 'm',
                    [styles.ansattMannlig]: kjønn === kjønnType.MANN,
                    [styles.ansattKvinnelig]: kjønn === kjønnType.KVINNE,
                    [styles.ansattAdresseBeskyttet]: erAdresseBeskyttet,
                })}
            >
                <NavLogo className={styles.navLogo} />
            </div>
        );
    }

    if (fagsakType === FagsakType.INSTITUSJON) {
        return <KontorIkonGrønn størrelse={størrelse} erAdresseBeskyttet={erAdresseBeskyttet} />;
    }
    const brukStørreIkon = fagsakType === FagsakType.SKJERMET_BARN || fagsakType === FagsakType.BARN_ENSLIG_MINDREÅRIG;

    const størrelseStyles = brukStørreIkon
        ? størrelse === 's'
            ? styles.litenIkonStørre
            : styles.storIkonStørre
        : størrelse === 's'
          ? styles.litenIkon
          : styles.storIkon;

    if (fagsakType === FagsakType.BARN_ENSLIG_MINDREÅRIG) {
        return (
            <PersonCircleFillIcon
                className={classNames(styles.ensligMindreårig, størrelseStyles, {
                    [styles.ensligMindreårigAdresseBeskyttet]: erAdresseBeskyttet,
                })}
            />
        );
    }

    if (kjønn === kjønnType.KVINNE) {
        return erBarn ? (
            <JenteIkon
                className={classNames(styles.kvinnelig, størrelseStyles, {
                    [styles.adresseBeskyttet]: erAdresseBeskyttet,
                })}
            />
        ) : (
            <KvinneIkon
                className={classNames(styles.kvinnelig, størrelseStyles, {
                    [styles.adresseBeskyttet]: erAdresseBeskyttet,
                })}
            />
        );
    }
    if (kjønn === kjønnType.MANN) {
        return erBarn ? (
            <GuttIkon
                className={classNames(styles.mannlig, størrelseStyles, {
                    [styles.adresseBeskyttet]: erAdresseBeskyttet,
                })}
            />
        ) : (
            <MannIkon
                className={classNames(styles.mannlig, størrelseStyles, {
                    [styles.adresseBeskyttet]: erAdresseBeskyttet,
                })}
            />
        );
    }
    return (
        <NøytralPersonIkon
            className={classNames(størrelseStyles, {
                [styles.nøytralAdresseBeskyttet]: erAdresseBeskyttet,
            })}
        />
    );
};
