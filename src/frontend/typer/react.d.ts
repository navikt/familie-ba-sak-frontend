// Unused import - only used to make this file a module (otherwise declare global won't work)
// https://github.com/mui/material-ui/issues/35287#issuecomment-1337250566
// Uten denne så klager ts på at onResize og onResizeCapture ikke er definert på alle våre ikoner
// eslint-disable-next-line
import React from 'react';

declare global {
    namespace React {
        interface DOMAttributes<T> {
            onResize?: ReactEventHandler<T> | undefined;
            onResizeCapture?: ReactEventHandler<T> | undefined;
            nonce?: string | undefined;
        }
    }
}
