import { useSaksbehandler } from '@hooks/useSaksbehandler';
import type { IPar } from '@typer/common';
import type { IsoDatoString } from '@utils/dato';

import { Box, Button, Fieldset, HStack, Select } from '@navikt/ds-react';
import { Valideringsstatus } from '@navikt/familie-skjema';
import { RessursStatus } from '@navikt/familie-typer';

import { useOppgavebenkContext } from './OppgavebenkContext';
import type { IOppgaveFelt } from './oppgavefelter';
import DatovelgerForGammelSkjemaløsning from '../../komponenter/Datovelger/DatovelgerForGammelSkjemaløsning';

export function FilterSkjema() {
    const { hentOppgaver, oppgaver, oppgaveFelter, settVerdiPåOppgaveFelt, tilbakestillOppgaveFelter, validerSkjema } =
        useOppgavebenkContext();

    const saksbehandler = useSaksbehandler();

    function onHentOppgaver() {
        if (validerSkjema()) {
            hentOppgaver();
        }
    }

    function tilOppgaveFeltKomponent(oppgaveFelt: IOppgaveFelt) {
        switch (oppgaveFelt.filter?.type) {
            case 'dato':
                return (
                    <DatovelgerForGammelSkjemaløsning
                        key={oppgaveFelt.nøkkel}
                        label={oppgaveFelt.label}
                        onDateChange={(dato: IsoDatoString) => {
                            settVerdiPåOppgaveFelt(oppgaveFelt, dato);
                        }}
                        value={oppgaveFelt.filter.selectedValue}
                        visFeilmeldinger={oppgaveFelt.valideringsstatus === Valideringsstatus.FEIL}
                        feilmelding={oppgaveFelt.feilmelding}
                    />
                );
            case 'select':
                return (
                    <Box as={'div'}>
                        <Select
                            label={oppgaveFelt.label}
                            onChange={event => settVerdiPåOppgaveFelt(oppgaveFelt, event.target.value)}
                            key={oppgaveFelt.nøkkel}
                            value={oppgaveFelt.filter.selectedValue}
                            error={
                                oppgaveFelt.valideringsstatus === Valideringsstatus.FEIL
                                    ? oppgaveFelt.feilmelding
                                    : undefined
                            }
                            data-cy={`select-${oppgaveFelt.label}`}
                        >
                            {oppgaveFelt.filter.nøkkelPar &&
                                Object.values(oppgaveFelt.filter.nøkkelPar)
                                    .filter((par: IPar) =>
                                        oppgaveFelt.erSynlig ? oppgaveFelt.erSynlig(par, saksbehandler) : true
                                    )
                                    .map((par: IPar) => {
                                        return (
                                            <option
                                                aria-selected={
                                                    oppgaveFelt.filter && oppgaveFelt.filter.selectedValue === par.id
                                                }
                                                key={par.id}
                                                value={par.id}
                                            >
                                                {par.navn}
                                            </option>
                                        );
                                    })}
                        </Select>
                    </Box>
                );
            default:
                return null;
        }
    }

    return (
        <Fieldset legend={'Oppgavebenken filterskjema'} hideLegend={true}>
            <HStack justify={'start'} align={'start'} gap={'space-16'}>
                {Object.values(oppgaveFelter)
                    .filter(oppgaveFelt => oppgaveFelt.filter)
                    .map(tilOppgaveFeltKomponent)}
                <HStack
                    justify={'start'}
                    align={'center'}
                    gap={'space-16'}
                    wrap={false}
                    marginBlock={'space-32 space-0'}
                >
                    <Button
                        variant={'primary'}
                        onClick={onHentOppgaver}
                        loading={oppgaver.status === RessursStatus.HENTER}
                    >
                        Hent oppgaver
                    </Button>
                    <Button variant="secondary" onClick={tilbakestillOppgaveFelter}>
                        Tilbakestill filtrering
                    </Button>
                </HStack>
            </HStack>
        </Fieldset>
    );
}
