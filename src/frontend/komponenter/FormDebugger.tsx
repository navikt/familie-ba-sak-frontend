import { useFormContext } from 'react-hook-form';

const style = {
    background: 'rgba(100, 100, 100, 0.1)',
    borderRadius: '7px',
    padding: '1rem',
};

/**
 * Brukt for å debugge form state. Skal ikke brukes i produksjon.
 */
// noinspection JSUnusedGlobalSymbols
export function FormDebugger() {
    const { watch } = useFormContext();
    return (
        <>
            <pre style={style}>{JSON.stringify(watch(), null, 2)}</pre>
        </>
    );
}
