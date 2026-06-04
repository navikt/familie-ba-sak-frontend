import axios, { type AxiosError, type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios';

const DEFAULT_TIME_OUT = 30_000;
const DEFAULT_TIME_OUT_MESSAGE =
    'Nettverkskallet tok for lang tid. Prøv igjen senere eller kontakt brukerstøtte hvis problemet vedvarer.';

type OnFulfilled = <T>(
    response: AxiosResponse<Ressurs<T>>
) => AxiosResponse<Ressurs<T>> | Promise<AxiosResponse<Ressurs<T>>>;

type OnRejected = (error: AxiosError) => unknown;

interface Interceptor {
    onFulfilled?: OnFulfilled;
    onRejected?: OnRejected;
}

enum RessursStatus {
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

export class ApiClient {
    private readonly client: AxiosInstance;

    constructor(baseURL: string = window.location.origin) {
        this.client = axios.create({ baseURL });
    }

    private async request<T, R>(config: AxiosRequestConfig<T>): Promise<R> {
        const response = await this.client.request<T, AxiosResponse<Ressurs<R>>>({
            timeout: DEFAULT_TIME_OUT,
            timeoutErrorMessage: DEFAULT_TIME_OUT_MESSAGE,
            ...config,
        });
        return this.resolveToPromise(response.data);
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

    private resolveToPromise<T>(ressurs: Ressurs<T>): Promise<T> {
        switch (ressurs.status) {
            case RessursStatus.SUKSESS:
                return Promise.resolve(ressurs.data);
            case RessursStatus.FEILET:
            case RessursStatus.FUNKSJONELL_FEIL:
            case RessursStatus.IKKE_TILGANG:
                const frontendFeilmeldingMedEllerUtenCallId = ressurs.callId
                    ? `${ressurs.frontendFeilmelding} (CallId: ${ressurs.callId})`
                    : ressurs.frontendFeilmelding;
                return Promise.reject(frontendFeilmeldingMedEllerUtenCallId);
        }
    }
}

export const apiClient = new ApiClient();
