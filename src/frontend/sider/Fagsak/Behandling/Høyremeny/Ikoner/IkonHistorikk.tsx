import type { IIkonProps } from './Ikon';
import Ikon from './Ikon';

const IkonHistorikk = ({ width = 32, height = 32 }: IIkonProps) => {
    return (
        <Ikon width={width} height={height} viewBox={32}>
            <title id={'historikk'}>Historikk</title>
            <path d="M4.42857 16C4.42857 8.82111 10.3776 3 17.7143 3C25.051 3 31 8.82111 31 16C31 23.1789 25.051 29 17.7143 29C14.0386 29 10.7319 27.5411 8.32571 25.1867L10.4219 23.1356C12.2819 24.97 14.8652 26.1111 17.7143 26.1111C23.4271 26.1111 28.0476 21.59 28.0476 16C28.0476 10.41 23.4271 5.88889 17.7143 5.88889C12.0014 5.88889 7.38095 10.41 7.38095 16H11.8095L5.84571 21.8211L5.74238 21.6189L0 16H4.42857ZM16.2381 17.4444V10.2222H18.4524V16.3611L23.619 19.3656L22.5562 21.1133L16.2381 17.4444Z" />
        </Ikon>
    );
};

export default IkonHistorikk;
