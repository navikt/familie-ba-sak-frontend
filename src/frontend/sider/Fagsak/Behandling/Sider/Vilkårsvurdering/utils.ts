import { BehandlingSteg, type IBehandling } from '@typer/behandling';
import type { IGrunnlagPerson } from '@typer/person';
import { PersonTypeVisningsRangering } from '@typer/person';
import type { IPersonResultat, IRestPersonResultat, IRestVilkårResultat } from '@typer/vilkår';
import type { IIsoDatoPeriode } from '@utils/dato';
import { isoStringTilDate, isoStringTilDateMedFallback, nyIsoDatoPeriode, tidenesEnde } from '@utils/dato';
import { differenceInMilliseconds } from 'date-fns';

const periodeDiff = (periodeA: IIsoDatoPeriode, periodeB: IIsoDatoPeriode) => {
    if (!periodeA.fom && !periodeA.tom) {
        return 1;
    }
    return differenceInMilliseconds(
        isoStringTilDateMedFallback({ isoString: periodeA.fom, fallbackDate: tidenesEnde }),
        isoStringTilDateMedFallback({ isoString: periodeB.fom, fallbackDate: tidenesEnde })
    );
};

const sorterVilkårsvurderingForPerson = (vilkårResultater: IRestVilkårResultat[]): IRestVilkårResultat[] => {
    return [...vilkårResultater].sort(
        (a, b) =>
            a.vilkårType.localeCompare(b.vilkårType) ||
            periodeDiff(nyIsoDatoPeriode(a.periodeFom, a.periodeTom), nyIsoDatoPeriode(b.periodeFom, b.periodeTom))
    );
};

/**
 * Funksjon som mapper vilkår for person.
 *
 * @param personResultater perioder fra api
 * @param personer personer på behandlingen
 */
export function mapFraRestPersonResultatTilPersonResultat(
    personResultater: IRestPersonResultat[],
    personer: IGrunnlagPerson[]
): IPersonResultat[] {
    const mappedPersonIdenter = new Set(personResultater.map(pr => pr.personIdent));

    const personerSomSkalSkjermesForBruker: IPersonResultat[] = personer
        .filter(person => person.skjermesForBruker && !mappedPersonIdenter.has(person.personIdent))
        .sort((a, b) => a.navn.localeCompare(b.navn))
        .map(person => ({
            person,
            personIdent: person.personIdent,
            vilkårResultater: [],
            andreVurderinger: [],
        }));

    return personResultater
        .map((personResultat: IRestPersonResultat): IPersonResultat => {
            const person = personer.find(person => person.personIdent === personResultat.personIdent);

            if (person === undefined) {
                throw new Error('Finner ikke person ved validering av vilkårsvurdering');
            }

            return {
                person,
                personIdent: personResultat.personIdent,
                vilkårResultater: sorterVilkårsvurderingForPerson(personResultat.vilkårResultater),
                andreVurderinger: personResultat.andreVurderinger,
            };
        })
        .sort((a: IPersonResultat, b: IPersonResultat) => {
            if (PersonTypeVisningsRangering[a.person.type] > PersonTypeVisningsRangering[b.person.type]) {
                return 1;
            }

            if (PersonTypeVisningsRangering[a.person.type] < PersonTypeVisningsRangering[b.person.type]) {
                return -1;
            }

            return differenceInMilliseconds(
                isoStringTilDate(b.person.fødselsdato),
                isoStringTilDate(a.person.fødselsdato)
            );
        })
        .concat(personerSomSkalSkjermesForBruker);
}

export function utledVilkårSomMåKontrolleresPerPerson(
    behandling: IBehandling,
    vilkårsvurdering: IPersonResultat[]
): Record<string, string[]> {
    return vilkårsvurdering.reduce((acc: Record<string, string[]>, personResultat) => {
        const navn = personResultat.person.navn;

        if (
            behandling.steg === BehandlingSteg.VILKÅRSVURDERING &&
            behandling.søknadsgrunnlag?.erAutomatiskRegistrert &&
            personResultat.person.erManueltLagtTilISøknad
        ) {
            acc[navn] = acc[navn] || [];
            acc[navn].push(`Har ikke relasjon til søker i PDL.`);
        }

        const vilkårSomMåKontrolleres = personResultat.vilkårResultater
            .filter(v => v.erOpprinneligPreutfyltIBehandling === behandling.behandlingId)
            .map(v => v.begrunnelseForManuellKontroll)
            .filter(bfmk => bfmk !== null);

        if (vilkårSomMåKontrolleres.length > 0) {
            acc[navn] = acc[navn] || [];
            acc[navn].push(...vilkårSomMåKontrolleres);
        }

        return acc;
    }, {});
}
