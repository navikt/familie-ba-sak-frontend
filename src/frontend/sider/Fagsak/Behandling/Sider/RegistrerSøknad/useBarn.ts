import {
    sjekkGjelderEnsligMindreårig,
    sjekkGjelderInstitusjon,
    sjekkGjelderSkjermetBarn,
} from '../../../../../typer/fagsak';
import { ForelderBarnRelasjonRolle } from '../../../../../typer/person';
import { sorterBarnMedOpplysninger } from '../../../../../typer/søknad';
import { useBrukerContext } from '../../../BrukerContext';
import { useFagsakContext } from '../../../FagsakContext';
import { useBehandlingContext } from '../../context/BehandlingContext';

export function useBarn() {
    const { fagsak } = useFagsakContext();
    const { bruker } = useBrukerContext();
    const { behandling } = useBehandlingContext();

    if (behandling.søknadsgrunnlag) {
        return behandling.søknadsgrunnlag.barnaMedOpplysninger.toSorted(sorterBarnMedOpplysninger);
    }

    const gjelderInstitusjon = sjekkGjelderInstitusjon(fagsak);
    const gjelderEnsligMindreårig = sjekkGjelderEnsligMindreårig(fagsak);
    const gjelderSkjermetBarn = sjekkGjelderSkjermetBarn(fagsak);

    if (gjelderInstitusjon || gjelderEnsligMindreårig || gjelderSkjermetBarn) {
        return [
            {
                ident: bruker.personIdent,
                navn: bruker.navn,
                fødselsdato: bruker.fødselsdato,
                manueltRegistrert: false,
                erFolkeregistrert: true,
                inkludertISøknaden: false,
            },
        ];
    }

    return bruker.forelderBarnRelasjon
        .filter(relasjon => relasjon.relasjonRolle === ForelderBarnRelasjonRolle.BARN)
        .map(relasjon => ({
            ident: relasjon.personIdent,
            navn: relasjon.navn,
            fødselsdato: relasjon.fødselsdato,
            manueltRegistrert: false,
            erFolkeregistrert: true,
            inkludertISøknaden: false,
        }))
        .toSorted(sorterBarnMedOpplysninger);
}
