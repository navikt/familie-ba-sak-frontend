import React, { ChangeEvent } from 'react';
import { Input } from 'nav-frontend-skjema';
import { IkonFeil, IkonGyldig } from '@navikt/familie-header';
import './datoinput.less';
import moment from 'moment';

const navGronn = '#06893A';

export interface IDatoInputProps {
    label?: string;
    placeholder?: string;
    className?: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    datoFormat?: string;
    settValiderFeil?: (feil: boolean) => void;
}

export const DatoInput: React.FC<IDatoInputProps> = ({
    label,
    placeholder = 'DD.MM.ÅÅÅÅ',
    className,
    onChange,
    settValiderFeil,
    datoFormat = 'DD.MM.YYYY',
}) => {
    const [feilPrompt, settFeilPrompt] = React.useState(false);
    const [verdi, settVerdi] = React.useState('');

    const validateVerdi = (verdi: string) => {
        return verdi === '' || moment(verdi, datoFormat, true).isValid();
    };

    return (
        <div className="datoinput">
            <Input
                label={label}
                placeholder={placeholder}
                className={className}
                onChange={event => {
                    settVerdi(event.target.value);
                    const valid = validateVerdi(event.target.value);
                    settFeilPrompt(!valid);
                    settValiderFeil && settValiderFeil(!valid);
                    onChange && onChange(event);
                }}
            />
            {feilPrompt && (
                <div className="datoinput__feilprompt">
                    <IkonFeil />
                </div>
            )}
            {verdi != '' && !feilPrompt && (
                <div className="datoinput__feilprompt">
                    <IkonGyldig color={navGronn} />
                </div>
            )}
        </div>
    );
};
