export default baseConfig;
declare namespace baseConfig {
    namespace resolve {
        let extensions: string[];
        namespace fallback {
            let crypto: boolean;
        }
    }
    let entry: string[];
    let plugins: any[];
    let devtool: string;
    namespace module {
        let rules: ({
            test: RegExp;
            resolve: {
                fullySpecified: boolean;
            };
            use?: undefined;
            exclude?: undefined;
            loader?: undefined;
        } | {
            test: RegExp;
            use: string[];
            resolve?: undefined;
            exclude?: undefined;
            loader?: undefined;
        } | {
            test: RegExp;
            exclude: RegExp;
            loader: string;
            resolve?: undefined;
            use?: undefined;
        })[];
    }
}
