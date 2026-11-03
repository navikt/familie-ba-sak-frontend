import { useBehandling } from '@hooks/useBehandling';
import { useFagsakId } from '@hooks/useFagsakId';
import {
    CaretDownFillIcon,
    CaretRightFillIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    ShieldLockFillIcon,
} from '@navikt/aksel-icons';
import { BodyShort, Box, Button, CopyButton, Detail, HStack, Stack, VStack } from '@navikt/ds-react';
import { personTypeMap } from '@typer/person';
import type { IPersonResultat } from '@typer/vilkår';
import { formaterIdent, hentAlder } from '@utils/formatter';
import classNames from 'classnames';
import type { ReactNode } from 'react';
import { Activity, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { erSidenAktiv, sider } from '../Sider/sider';
import { mapFraRestPersonResultatTilPersonResultat } from '../Sider/Vilkårsvurdering/utils';
import {
    erAutomatiskVurdert,
    finnValgtPersonIndex,
    finnVilkårForPerson,
    lagPersonHash,
    lagVilkårHash,
    utledPersonstatus,
    utledVilkårstatus,
    Vilkårstatus,
} from '../Sider/Vilkårsvurdering/vilkårstatus';
import { useVenstremeny } from '../Venstremeny/useVenstremeny';
import Styles from './Personmeny.module.css';
import { Statusikon } from './Statusikon';

export function Personmeny() {
    const fagsakId = useFagsakId();
    const behandling = useBehandling();
    const { pathname, hash } = useLocation();

    const [erÅpen, settErÅpen] = useVenstremeny();
    const [ekspanderingOverstyrt, settEkspanderingOverstyrt] = useState<Record<string, boolean>>({});

    const vilkårsvurdering = useMemo(
        () => mapFraRestPersonResultatTilPersonResultat(behandling.personResultater, behandling.personer),
        [behandling]
    );

    const vilkårsvurderingPath = `/fagsak/${fagsakId}/${behandling.behandlingId}/${sider.VILKÅRSVURDERING.href}`;
    const erPåVilkårsvurdering = pathname.endsWith(sider.VILKÅRSVURDERING.href);
    const kanNavigere = erSidenAktiv(sider.VILKÅRSVURDERING, behandling);
    const valgtIndex = erPåVilkårsvurdering ? finnValgtPersonIndex(hash, vilkårsvurdering) : undefined;

    function lenke(anker: string, className: string, children: ReactNode) {
        if (!kanNavigere) {
            return <span className={classNames(className, Styles.inaktiv)}>{children}</span>;
        }
        return (
            <Link to={`${vilkårsvurderingPath}#${anker}`} className={className} draggable={false}>
                {children}
            </Link>
        );
    }

    function lagPersonnode(personResultat: IPersonResultat, index: number) {
        const { person } = personResultat;
        const personHash = lagPersonHash(index, personResultat);
        const erValgt = index === valgtIndex;
        const erEkspandert = ekspanderingOverstyrt[personHash] ?? erValgt;
        const etikett = `${personTypeMap[person.type]} (${hentAlder(person.fødselsdato)} år)`;

        if (person.skjermesForBruker) {
            return (
                <Box key={person.personIdent} className={classNames(Styles.person, { [Styles.valgt]: erValgt })}>
                    <HStack gap="space-8" align="center" wrap={false} className={Styles.personrad}>
                        <ShieldLockFillIcon aria-hidden fontSize="1rem" color="var(--ax-warning-500)" />
                        {lenke(personHash, Styles.personlenke, <BodyShort>{person.navn}</BodyShort>)}
                    </HStack>
                </Box>
            );
        }

        const vilkår = finnVilkårForPerson(personResultat).map(v => ({
            ...v,
            status: utledVilkårstatus(v.vilkårResultater),
        }));
        const antallVurdert = vilkår.filter(v => v.status !== Vilkårstatus.IKKE_VURDERT).length;
        const personstatus = utledPersonstatus(vilkår.map(v => v.status));

        return (
            <Box key={person.personIdent} className={classNames(Styles.person, { [Styles.valgt]: erValgt })}>
                <HStack gap="space-4" align="center" wrap={false} className={Styles.personrad}>
                    <button
                        type="button"
                        className={Styles.caret}
                        aria-expanded={erEkspandert}
                        aria-label={`${erEkspandert ? 'Skjul' : 'Vis'} vilkår for ${etikett}`}
                        onClick={() =>
                            settEkspanderingOverstyrt(forrige => ({ ...forrige, [personHash]: !erEkspandert }))
                        }
                    >
                        {erEkspandert ? <CaretDownFillIcon aria-hidden /> : <CaretRightFillIcon aria-hidden />}
                    </button>
                    {lenke(
                        personHash,
                        Styles.personlenke,
                        <HStack gap="space-8" align="center" wrap={false}>
                            <Statusikon status={personstatus} variant="person" />
                            <BodyShort>{etikett}</BodyShort>
                        </HStack>
                    )}
                    <BodyShort className={Styles.teller}>{`${antallVurdert}/${vilkår.length}`}</BodyShort>
                </HStack>
                <HStack align="center" wrap={false} className={Styles.ident}>
                    <BodyShort>{formaterIdent(person.personIdent)}</BodyShort>
                    <CopyButton copyText={person.personIdent} size="small" />
                </HStack>
                {erEkspandert && (
                    <VStack as="ul" className={Styles.liste}>
                        {vilkår.map(({ vilkårFraConfig, vilkårResultater, status }) => (
                            <li key={vilkårFraConfig.key}>
                                {lenke(
                                    lagVilkårHash(personHash, vilkårFraConfig),
                                    Styles.underlenke,
                                    <HStack gap="space-8" align="center" justify="space-between" wrap={false}>
                                        <HStack gap="space-8" align="center" wrap={false}>
                                            <Statusikon status={status} variant="vilkår" />
                                            <BodyShort>{vilkårFraConfig.tittel}</BodyShort>
                                        </HStack>
                                        {status !== Vilkårstatus.IKKE_VURDERT && (
                                            <BodyShort className={Styles.vurdertAv}>
                                                {erAutomatiskVurdert(vilkårResultater) ? 'auto' : 'manuell'}
                                            </BodyShort>
                                        )}
                                    </HStack>
                                )}
                            </li>
                        ))}
                    </VStack>
                )}
            </Box>
        );
    }

    return (
        <Stack direction="row-reverse">
            <Button
                title={erÅpen ? 'Skjul venstremeny' : 'Vis venstremeny'}
                aria-label={erÅpen ? 'Skjul venstremeny' : 'Vis venstremeny'}
                className={Styles.knapp}
                variant="secondary"
                size="small"
                icon={erÅpen ? <ChevronLeftIcon aria-hidden /> : <ChevronRightIcon aria-hidden />}
                onMouseDown={e => e.preventDefault()}
                onClick={() => settErÅpen(prev => !prev)}
            />
            <Activity mode={erÅpen ? 'visible' : 'hidden'}>
                <Box as="nav" aria-label="Personer i behandlingen" width="clamp(17rem, 18vw, 24rem)">
                    <Detail className={Styles.overskrift}>Saksbehandling</Detail>
                    <VStack gap="space-8">{vilkårsvurdering.map(lagPersonnode)}</VStack>
                </Box>
            </Activity>
        </Stack>
    );
}
