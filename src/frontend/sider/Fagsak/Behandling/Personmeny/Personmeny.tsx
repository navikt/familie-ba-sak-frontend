import { useBehandling } from '@hooks/useBehandling';
import { useFagsakId } from '@hooks/useFagsakId';
import {
    CaretDownFillIcon,
    CaretRightFillIcon,
    CogRotationIcon,
    PersonIcon,
    ShieldLockFillIcon,
} from '@navikt/aksel-icons';
import { BodyShort, Box, CopyButton, Detail, HStack, VStack } from '@navikt/ds-react';
import { personTypeMap } from '@typer/person';
import type { IPersonResultat } from '@typer/vilkår';
import { formaterIdent, hentAlder } from '@utils/formatter';
import classNames from 'classnames';
import type { ReactNode } from 'react';
import { useMemo, useState } from 'react';
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
import Styles from './Personmeny.module.css';
import { Statusikon } from './Statusikon';

export function Personmeny() {
    const fagsakId = useFagsakId();
    const behandling = useBehandling();
    const { pathname, hash } = useLocation();

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
                    <HStack gap="space-8" align="center" wrap={false}>
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
                <HStack gap="space-4" align="center" wrap={false}>
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
                        <HStack gap="space-4" align="center" wrap={false}>
                            <Statusikon status={personstatus} variant="person" />
                            <BodyShort weight="semibold" truncate>
                                {etikett}
                            </BodyShort>
                        </HStack>
                    )}
                    <Detail className={Styles.teller}>{`${antallVurdert}/${vilkår.length}`}</Detail>
                </HStack>
                {/* Ident og vilkår står rett under personens statusikon: caret (20px) + mellomrom (4px) */}
                <HStack
                    gap="space-4"
                    align="center"
                    wrap={false}
                    paddingBlock="space-6 space-2"
                    paddingInline="space-24 space-0"
                >
                    <BodyShort>{formaterIdent(person.personIdent)}</BodyShort>
                    <CopyButton copyText={person.personIdent} size="xsmall" />
                </HStack>
                {erEkspandert && (
                    <VStack as="ul" gap="space-4" className={Styles.liste}>
                        {vilkår.map(({ vilkårFraConfig, vilkårResultater, status }) => {
                            const erAutomatisk = erAutomatiskVurdert(vilkårResultater);
                            const VurdertAvIkon = erAutomatisk ? CogRotationIcon : PersonIcon;
                            // Ikonet vises også før vilkåret er vurdert, men får først tittel når det er vurdert
                            const vurdertAv =
                                status === Vilkårstatus.IKKE_VURDERT
                                    ? undefined
                                    : `Vurdert ${erAutomatisk ? 'automatisk' : 'manuelt'}`;
                            return (
                                <li key={vilkårFraConfig.key}>
                                    {lenke(
                                        lagVilkårHash(personHash, vilkårFraConfig),
                                        Styles.underlenke,
                                        <HStack gap="space-4" align="center" wrap={false}>
                                            <Statusikon status={status} variant="vilkår" />
                                            <BodyShort
                                                truncate
                                                title={vilkårFraConfig.tittel}
                                                className={Styles.vilkårnavn}
                                            >
                                                {vilkårFraConfig.tittel}
                                            </BodyShort>
                                            <VurdertAvIkon
                                                title={vurdertAv}
                                                aria-hidden={!vurdertAv}
                                                fontSize="1.25rem"
                                                className={Styles.vurdertAv}
                                            />
                                        </HStack>
                                    )}
                                </li>
                            );
                        })}
                    </VStack>
                )}
            </Box>
        );
    }

    return (
        <Box
            as="nav"
            aria-label="Personer i behandlingen"
            width="clamp(15rem, 14.6vw, 17.5rem)"
            className={Styles.meny}
        >
            <Detail className={Styles.overskrift}>Saksbehandling</Detail>
            {vilkårsvurdering.map(lagPersonnode)}
        </Box>
    );
}
