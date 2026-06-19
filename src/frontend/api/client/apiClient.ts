import axios, { type AxiosError, type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios';

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
const DEFAULT_FEILMELDING = 'En ukjent feil oppstod';

export class ApiFeil extends Error {
    private constructor(
        message: string,
        /**
         * HTTP-statuskoden fra responsen. Kan være 2xx (typisk 200) selv om
         * dette er en feil: backend pakker svar i et Ressurs-objekt og kan
         * returnere en feil-status (f.eks. IKKE_TILGANG) med HTTP 200.
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
        const ressurs = error.response?.data;
        const feilmelding = ressurs?.frontendFeilmelding?.trim() || error.message || DEFAULT_FEILMELDING;
        return new ApiFeil(
            ApiFeil.padCallId(feilmelding, ressurs?.callId),
            error.response?.status,
            ressurs?.status,
            ressurs?.callId
        );
    }

    static fraRessurs(ressurs: Ressurs<unknown>, status?: number): ApiFeil {
        const feilmelding = ressurs.frontendFeilmelding?.trim() || DEFAULT_FEILMELDING;
        return new ApiFeil(ApiFeil.padCallId(feilmelding, ressurs.callId), status, ressurs.status, ressurs.callId);
    }

    static fraFeilmelding(feilmelding: string): ApiFeil {
        return new ApiFeil(feilmelding);
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
            return this.resolveRessurs(response);
        } catch (error) {
            if (axios.isAxiosError<Ressurs<R>>(error)) {
                return Promise.reject(ApiFeil.fraAxiosError(error));
            }
            return Promise.reject(ApiFeil.fraFeilmelding(error instanceof Error ? error.message : DEFAULT_FEILMELDING));
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

    private resolveRessurs<T>(response: AxiosResponse<Ressurs<T>>): Promise<T> {
        const ressurs = response.data;
        if (!ressurs || typeof ressurs !== 'object' || !('status' in ressurs)) {
            return Promise.reject(ApiFeil.fraFeilmelding('Ugyldig respons fra serveren.'));
        }
        switch (ressurs.status) {
            case RessursStatus.SUKSESS:
                return Promise.resolve(ressurs.data);
            case RessursStatus.FEILET:
            case RessursStatus.FUNKSJONELL_FEIL:
            case RessursStatus.IKKE_TILGANG:
                return Promise.reject(ApiFeil.fraRessurs(ressurs, response.status));
            default:
                return Promise.reject(ApiFeil.fraFeilmelding(`Uhåndtert status: ${(ressurs as Ressurs<T>).status}`));
        }
    }
}

export const apiClient = new ApiClient();
