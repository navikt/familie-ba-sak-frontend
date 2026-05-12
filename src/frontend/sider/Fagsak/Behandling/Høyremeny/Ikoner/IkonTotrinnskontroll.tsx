import type { IIkonProps } from './Ikon';
import Ikon from './Ikon';

const IkonTotrinnskontroll = ({ width = 32, height = 32 }: IIkonProps) => {
    return (
        <Ikon width={width} height={height} viewBox={32}>
            <title id={'totrinnskontroll'}>Totrinnskontroll</title>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M21.3335 6.66667C21.3335 10.3486 18.3487 13.3333 14.6668 13.3333C10.9849 13.3333 8.00016 10.3486 8.00016 6.66667C8.00016 2.98477 10.9849 0 14.6668 0C18.3487 0 21.3335 2.98477 21.3335 6.66667ZM5.3335 24C5.3335 18.8453 9.51217 14.6667 14.6668 14.6667C16.5277 14.6667 18.2613 15.2112 19.7171 16.1497L11.6146 24H5.3335Z"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M25.7044 16.3806C25.1837 15.8731 24.3395 15.8731 23.8188 16.3806L20.5189 19.5963C19.9982 20.1038 19.9982 20.9265 20.5189 21.4339L22.4046 23.2715L15.3335 30.1624L17.2191 32L24.2902 25.1091L26.4115 27.1763C26.9322 27.6838 27.7764 27.6838 28.2971 27.1763L31.5969 23.9606C32.1176 23.4532 32.1176 22.6304 31.5969 22.123L25.7044 16.3806Z"
            />
        </Ikon>
    );
};

export default IkonTotrinnskontroll;
