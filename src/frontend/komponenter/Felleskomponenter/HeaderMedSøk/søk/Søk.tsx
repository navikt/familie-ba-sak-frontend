import React, { useState } from 'react';

import styled from 'styled-components';

import Popover, { PopoverOrientering } from 'nav-frontend-popover';
import { Input, InputProps } from 'nav-frontend-skjema';

import { Ressurs, RessursStatus } from '@navikt/familie-typer';

import SkjultLabel from '../../SkjultLabel';
import SøkResultater from './SøkResultater';
import { ISøkResultat } from './typer';

export interface SøkProps extends InputProps {
    formaterResultat?: (søkResultat: ISøkResultat) => React.ReactNode;
    label: React.ReactNode;
    nullstillSøkResultater: () => void;
    søk: (value: string) => void;
    søkResultater: Ressurs<ISøkResultat[]>;
    søkResultatOnClick: (søkResultat: ISøkResultat) => void;
}

const SøkContainer = styled.div`
    width: 20rem;
    position: relative;
    margin: 0 1rem;
`;

export const inputId = 'sok-input';

export const Søk = ({
    formaterResultat,
    label,
    nullstillSøkResultater,
    søk,
    søkResultatOnClick,
    søkResultater,
    ...props
}: SøkProps) => {
    const [verdi, settVerdi] = useState('');
    const [anker, settAnker] = useState<HTMLElement | undefined>(undefined);
    const [valgtSøkResultat, settValgtSøkResultat] = useState(-1);

    const settAnkerPåInput = () => {
        settAnker(document.getElementById(inputId) as HTMLElement);
    };

    const nullstillInput = (lukkPopover = false) => {
        settVerdi('');
        lukkPopover && settAnker(undefined);
        nullstillSøkResultater();
    };

    const utløserSøk = () => {
        søk(verdi.replace(/ /g, ''));
        settAnkerPåInput();
    };

    const onChange = (event: React.ChangeEvent) => {
        const nyVerdi = (event.target as HTMLInputElement).value;
        settVerdi(nyVerdi);

        if (nyVerdi === '') {
            nullstillSøkResultater();
            settAnker(undefined);
        }
    };

    return (
        <SøkContainer>
            {typeof label === 'string' ? (
                <SkjultLabel htmlFor={inputId}>{label}</SkjultLabel>
            ) : (
                label
            )}
            <Input
                aria-label={props.placeholder}
                id={inputId}
                onChange={onChange}
                onKeyDown={event => {
                    switch (event.key) {
                        case 'ArrowUp':
                            settValgtSøkResultat(valgtSøkResultat >= 0 ? valgtSøkResultat - 1 : -1);
                            break;
                        case 'ArrowDown':
                            settValgtSøkResultat(
                                valgtSøkResultat <
                                    (søkResultater.status === RessursStatus.SUKSESS
                                        ? søkResultater.data.length - 1
                                        : -1)
                                    ? valgtSøkResultat + 1
                                    : -1
                            );
                            break;
                        case 'Enter':
                            if (
                                valgtSøkResultat !== -1 &&
                                søkResultater.status === RessursStatus.SUKSESS
                            ) {
                                søkResultatOnClick(søkResultater.data[valgtSøkResultat]);
                            } else {
                                utløserSøk();
                            }
                            break;
                    }
                }}
                onClick={() => settAnkerPåInput()}
                value={verdi}
                {...props}
            />

            <Popover
                id={'søkresultat'}
                ankerEl={anker}
                orientering={PopoverOrientering.UnderVenstre}
                autoFokus={false}
                onRequestClose={() => {
                    nullstillInput(true);
                }}
                tabIndex={-1}
                utenPil={true}
            >
                <SøkResultater
                    formaterResultat={formaterResultat}
                    søkResultatOnClick={søkResultatOnClick}
                    søkResultater={søkResultater}
                    valgtSøkResultat={valgtSøkResultat}
                />
            </Popover>
        </SøkContainer>
    );
};
