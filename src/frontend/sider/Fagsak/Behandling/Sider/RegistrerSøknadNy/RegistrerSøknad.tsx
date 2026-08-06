import { useBehandling } from '@hooks/useBehandling';
import { useErLesevisning } from '@hooks/useErLesevisning';
import { useFeatureToggles } from '@hooks/useFeatureToggles';
import { RegistrerSøknad as RegistrerSøknadGammel } from '@sider/Fagsak/Behandling/Sider/RegistrerSøknad/RegistrerSøknad';
import { SøknadProvider } from '@sider/Fagsak/Behandling/Sider/RegistrerSøknad/SøknadContext';
import { BekreftEndringModalProvider } from '@sider/Fagsak/Behandling/Sider/RegistrerSøknadNy/form/BekreftEndringModalContext';
import { RegistrerSøknadForm } from '@sider/Fagsak/Behandling/Sider/RegistrerSøknadNy/form/RegistrerSøknadForm';
import { SøknadRegistrert } from '@sider/Fagsak/Behandling/Sider/RegistrerSøknadNy/SøknadRegistrert';
import { Steg } from '@sider/Fagsak/Behandling/Sider/Steg';
import { FeatureToggle } from '@typer/featureToggles';

export function RegistrerSøknad() {
    const behandling = useBehandling();
    const erLesevisning = useErLesevisning();
    const toggles = useFeatureToggles();

    if (toggles[FeatureToggle.brukNyRegistrerSøknad]) {
        return (
            <BekreftEndringModalProvider>
                <Steg tittel={'Registrer opplysninger fra søknaden'} maxWidth={'60rem'}>
                    {behandling.søknadsgrunnlag && !erLesevisning && <SøknadRegistrert />}
                    <RegistrerSøknadForm />
                </Steg>
            </BekreftEndringModalProvider>
        );
    }

    return (
        <SøknadProvider>
            <RegistrerSøknadGammel />
        </SøknadProvider>
    );
}
