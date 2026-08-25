import { useBehandling } from '@hooks/useBehandling';
import { useBruker } from '@hooks/useBruker';
import { useFagsak } from '@hooks/useFagsak';
import { erFagsakAvTypeEnsligMindreårig, erFagsakAvTypeInstitusjon, erFagsakAvTypeSkjermetBarn } from '@typer/fagsak';
import { ForelderBarnRelasjonRolle } from '@typer/person';
import type { IBarnMedOpplysninger } from '@typer/søknad';
import { isoStringTilDate } from '@utils/dato';

function sorterBarn(barn1: IBarnMedOpplysninger, barn2: IBarnMedOpplysninger) {
    const barn1ManglerIdent = !barn1.ident;
    const barn2ManglerIdent = !barn2.ident;

    if (barn1ManglerIdent && barn2ManglerIdent) return 0;
    if (barn1ManglerIdent) return 1;
    if (barn2ManglerIdent) return -1;

    if (!barn1.fødselsdato && !barn2.fødselsdato) return 0;
    if (!barn1.fødselsdato) return 1;
    if (!barn2.fødselsdato) return -1;

    return isoStringTilDate(barn2.fødselsdato).getTime() - isoStringTilDate(barn1.fødselsdato).getTime();
}

export function useValgbareBarn(): IBarnMedOpplysninger[] {
    const fagsak = useFagsak();
    const bruker = useBruker();
    const behandling = useBehandling();

    const gjelderInstitusjon = erFagsakAvTypeInstitusjon(fagsak);
    const gjelderEnsligMindreårig = erFagsakAvTypeEnsligMindreårig(fagsak);
    const gjelderSkjermetBarn = erFagsakAvTypeSkjermetBarn(fagsak);

    if (behandling.søknadsgrunnlag) {
        return behandling.søknadsgrunnlag.barnaMedOpplysninger
            .map(barn => ({
                ...barn,
                merket: barn.inkludertISøknaden,
            }))
            .toSorted(sorterBarn);
    }

    if (gjelderInstitusjon || gjelderEnsligMindreårig || gjelderSkjermetBarn) {
        return [
            {
                merket: true,
                ident: bruker.personIdent,
                navn: bruker.navn,
                fødselsdato: bruker.fødselsdato,
                manueltRegistrert: false,
                erFolkeregistrert: true,
            },
        ];
    }

    return bruker.forelderBarnRelasjon
        .filter(relasjon => relasjon.relasjonRolle === ForelderBarnRelasjonRolle.BARN)
        .map(relasjon => ({
            merket: false,
            ident: relasjon.personIdent,
            navn: relasjon.navn,
            fødselsdato: relasjon.fødselsdato,
            manueltRegistrert: false,
            erFolkeregistrert: true,
        }))
        .toSorted(sorterBarn);
}
