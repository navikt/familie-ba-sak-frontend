import { useBehandling } from '@hooks/useBehandling';
import { useErLesevisning } from '@hooks/useErLesevisning';
import { BekreftEndringModalProvider } from '@sider/Fagsak/Behandling/Sider/RegistrerSøknad/form/BekreftEndringModalContext';
import { RegistrerSøknadForm } from '@sider/Fagsak/Behandling/Sider/RegistrerSøknad/form/RegistrerSøknadForm';
import { SøknadRegistrert } from '@sider/Fagsak/Behandling/Sider/RegistrerSøknad/SøknadRegistrert';
import { Steg } from '@sider/Fagsak/Behandling/Sider/Steg';

export function RegistrerSøknad() {
    const behandling = useBehandling();
    const erLesevisning = useErLesevisning();

    return (
        <BekreftEndringModalProvider>
            <Steg tittel={'Registrer opplysninger fra søknaden'} maxWidth={'60rem'}>
                {behandling.søknadsgrunnlag && !erLesevisning && <SøknadRegistrert />}
                <RegistrerSøknadForm />
            </Steg>
        </BekreftEndringModalProvider>
    );
}
