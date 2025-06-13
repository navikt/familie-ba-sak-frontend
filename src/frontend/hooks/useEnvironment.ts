export enum Env {
    PRODUCTION = 'production',
    PREPROD = 'preprod',
    LOKALT_MOT_PREPROD = 'lokalt-mot-preprod',
    LOCAL = 'local',
}

export function useEnvironment() {
    function isEnvironment(env: Env) {
        return process.env.NODE_ENV === env;
    }

    return { environment: process.env.NODE_ENV, isEnvironment };
}
