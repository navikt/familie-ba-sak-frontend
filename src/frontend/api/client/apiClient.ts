import axios, { AxiosError, type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios';

type OnFulfilled = (response: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>;
type OnRejected = (error: AxiosError) => unknown | Promise<unknown>;

interface Interceptor {
    onFulfilled?: OnFulfilled;
    onRejected?: OnRejected;
}

export enum RessursStatus {
    SUKSESS = 'SUKSESS',
    FEILET = 'FEILET',
    IKKE_TILGANG = 'IKKE_TILGANG',
    FUNKSJONELL_FEIL = 'FUNKSJONELL_FEIL',
}

type Ressurs<T> =
    | {
          status: RessursStatus.SUKSESS;
          data: T;
          melding: string;
          frontendFeilmelding?: string | null;
          stacktrace?: string | null;
          callId?: string | null;
      }
    | {
          status: RessursStatus.FEILET | RessursStatus.IKKE_TILGANG | RessursStatus.FUNKSJONELL_FEIL;
          data?: undefined;
          melding: string;
          frontendFeilmelding?: string | null;
          stacktrace?: string | null;
          callId?: string | null;
      };

const DEFAULT_TIME_OUT = 60_000;
const DEFAULT_TIME_OUT_MESSAGE =
    'Nettverkskallet tok for lang tid. Prøv igjen senere eller kontakt brukerstøtte hvis problemet vedvarer.';

const DEFAULT_FALLBACK_FEILMELDING = 'En ukjent feil oppstod.';

const DEFAULT_FALLBACK_SERVER_FEILMELDING =
    'Det oppstod en feil på serveren. Prøv igjen senere eller kontakt brukerstøtte hvis problemet vedvarer.';

const DEFAULT_FALLBACK_NETTVERK_FEILMELDING =
    'Får ikke kontakt med serveren. Sjekk internettforbindelsen din og prøv igjen.';

const DEFAULT_HTTP_STATUS_FALLBACK_FEILMELDINGER: Partial<Record<number, string>> = {
    400: 'Den innsendte forespørselen var ugyldig.',
    401: 'Du er ikke innlogget eller økten din har utløpt. Logg inn på nytt.',
    403: 'Du har ikke tilgang til denne ressursen.',
    429: 'Du har sendt for mange forespørsler. Vent litt og prøv igjen senere.',
};

const DEFAULT_RESSURS_STATUS_FALLBACK_FEILMELDINGER: Partial<Record<RessursStatus, string>> = {
    [RessursStatus.FEILET]: DEFAULT_FALLBACK_FEILMELDING,
    [RessursStatus.FUNKSJONELL_FEIL]: DEFAULT_FALLBACK_FEILMELDING,
    [RessursStatus.IKKE_TILGANG]: 'Du har ikke tilgang til denne ressursen.',
};

export class ApiFeil extends Error {
    private constructor(
        message: string,
        /**
         * HTTP-statuskoden fra responsen. Kan være 2xx (typisk 200) selv om
         * dette er en feil: backend pakker svar i et Ressurs-objekt og kan
         * returnere en feil-status (f.eks. FEILET) med HTTP 200.
         * Bruk `ressursStatus` for å skille på selve feiltypen.
         */
        readonly status?: number,
        readonly ressursStatus?: RessursStatus,
        readonly callId?: string | null
    ) {
        super(message);
        this.name = 'ApiFeil';
    }

    static fraAxiosError<R>(error: AxiosError<Ressurs<R>>): ApiFeil {
        const response = error.response;
        const ressurs = response?.data;
        const feilmelding = ApiFeil.utledFeilmeldingFraAxiosError(error);
        return new ApiFeil(feilmelding, response?.status, ressurs?.status, ressurs?.callId);
    }

    static fraRessurs(ressurs: Ressurs<unknown>, status?: number): ApiFeil {
        const feilmelding = ApiFeil.utledFeilmeldingFraRessurs(ressurs);
        return new ApiFeil(feilmelding, status, ressurs.status, ressurs.callId);
    }

    static fraFeilmelding(feilmelding: string): ApiFeil {
        return new ApiFeil(feilmelding);
    }

    private static utledFeilmeldingFraAxiosError<R>(error: AxiosError<Ressurs<R>>): string {
        const ressurs = error.response?.data;
        const feilmelding =
            ressurs?.frontendFeilmelding?.trim() ||
            ApiFeil.utledFeilmeldingForStatus(error.response?.status) ||
            ApiFeil.utledFeilmeldingForNettverksfeil(error) ||
            DEFAULT_FALLBACK_FEILMELDING;
        return ApiFeil.padCallId(feilmelding, ressurs?.callId);
    }

    private static utledFeilmeldingFraRessurs(ressurs: Ressurs<unknown>): string {
        const feilmelding =
            ressurs.frontendFeilmelding?.trim() ||
            DEFAULT_RESSURS_STATUS_FALLBACK_FEILMELDINGER[ressurs.status] ||
            DEFAULT_FALLBACK_FEILMELDING;
        return ApiFeil.padCallId(feilmelding, ressurs.callId);
    }

    private static utledFeilmeldingForStatus(status?: number): string | undefined {
        if (status === undefined) {
            return undefined;
        }
        return (
            DEFAULT_HTTP_STATUS_FALLBACK_FEILMELDINGER[status] ??
            (status >= 500 ? DEFAULT_FALLBACK_SERVER_FEILMELDING : undefined)
        );
    }

    private static utledFeilmeldingForNettverksfeil(error: AxiosError): string | undefined {
        if (error.code === AxiosError.ECONNABORTED || error.code === AxiosError.ETIMEDOUT) {
            return error.config?.timeoutErrorMessage || DEFAULT_TIME_OUT_MESSAGE;
        }
        if (error.code === AxiosError.ERR_NETWORK) {
            return DEFAULT_FALLBACK_NETTVERK_FEILMELDING;
        }
        return undefined;
    }

    private static padCallId(feilmelding: string, callId?: string | null): string {
        return callId ? `${feilmelding} (CallId: ${callId})`.trim() : feilmelding;
    }
}

export class ApiClient {
    private readonly client: AxiosInstance;

    constructor(baseURL: string = typeof window !== 'undefined' ? window.location.origin : '') {
        this.client = axios.create({ baseURL });
    }

    async request<T, R>(config: AxiosRequestConfig<T>): Promise<R> {
        try {
            const response = await this.client.request<Ressurs<R>>({
                timeout: DEFAULT_TIME_OUT,
                timeoutErrorMessage: DEFAULT_TIME_OUT_MESSAGE,
                ...config,
            });
            return this.pakkUtRessursResponse(response);
        } catch (error) {
            if (error instanceof ApiFeil) {
                throw error;
            }
            if (axios.isAxiosError<Ressurs<R>>(error)) {
                throw ApiFeil.fraAxiosError(error);
            }
            throw ApiFeil.fraFeilmelding(DEFAULT_FALLBACK_FEILMELDING);
        }
    }

    async get<T, R>(config: Omit<AxiosRequestConfig<T>, 'method'>): Promise<R> {
        return this.request({ method: 'GET', ...config });
    }

    async put<T, R>(config: Omit<AxiosRequestConfig<T>, 'method'>): Promise<R> {
        return this.request({ method: 'PUT', ...config });
    }

    async post<T, R>(config: Omit<AxiosRequestConfig<T>, 'method'>): Promise<R> {
        return this.request({ method: 'POST', ...config });
    }

    async delete<T, R>(config: Omit<AxiosRequestConfig<T>, 'method'>): Promise<R> {
        return this.request({ method: 'DELETE', ...config });
    }

    async patch<T, R>(config: Omit<AxiosRequestConfig<T>, 'method'>): Promise<R> {
        return this.request({ method: 'PATCH', ...config });
    }

    addResponseInterceptor({ onFulfilled, onRejected }: Interceptor): number {
        return this.client.interceptors.response.use(onFulfilled, onRejected);
    }

    removeResponseInterceptor(id: number): void {
        this.client.interceptors.response.eject(id);
    }

    private pakkUtRessursResponse<T>(response: AxiosResponse<Ressurs<T>>): T {
        const ressurs = response.data;
        if (!ressurs || typeof ressurs !== 'object' || !('status' in ressurs)) {
            throw ApiFeil.fraFeilmelding('Ugyldig respons fra serveren.');
        }
        switch (ressurs.status) {
            case RessursStatus.SUKSESS:
                return ressurs.data;
            case RessursStatus.FEILET:
            case RessursStatus.FUNKSJONELL_FEIL:
            case RessursStatus.IKKE_TILGANG:
                throw ApiFeil.fraRessurs(ressurs, response.status);
            default:
                throw ApiFeil.fraFeilmelding(`Uhåndtert status: ${(ressurs as Ressurs<T>).status}`);
        }
    }
}

export const apiClient = new ApiClient();
