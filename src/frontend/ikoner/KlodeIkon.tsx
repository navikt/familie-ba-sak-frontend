import React from 'react';

interface IKlodeIkon {
    className?: string;
    heigth?: number;
    width?: number;
}

const KlodeIkon: React.FunctionComponent<IKlodeIkon> = ({ className, heigth = 24, width = 24 }) => {
    return (
        <svg
            aria-labelledby={'klode-ikon'}
            className={className}
            height={heigth}
            width={width}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <title id={'klode-ikon'}>Oppfylt</title>
            <g fill="none" fillRule="nonzero">
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12 0C18.6274 0 24 5.37258 24 12C24 13.7071 23.6436 15.3309 23.001 16.8011L23 17L22.9114 17.0012C21.0151 21.1316 16.8425 24 12 24C7.15747 24 2.9849 21.1316 1.08863 17.0012L1 17L1.00028 16.8041C0.356929 15.3331 0 13.7082 0 12C0 5.37258 5.37258 0 12 0ZM14.5034 17.0011H9.49661C10.1208 20.0161 11.2065 22 12 22C12.7935 22 13.8792 20.0161 14.5034 17.0011ZM7.45354 17.0009L3.33839 17.001C4.57254 19.1339 6.57192 20.7687 8.96108 21.5299C8.31683 20.3451 7.79605 18.7916 7.45354 17.0009ZM20.6616 17.001L16.5465 17.0009C16.2039 18.7916 15.6832 20.3451 15.0387 21.5305C17.4281 20.7687 19.4275 19.1339 20.6616 17.001ZM7.0691 10.0005L2.20003 10C2.06886 10.6462 2 11.3151 2 12C2 13.0455 2.16045 14.0536 2.45808 15.0009L7.15757 15.0004C7.05471 14.0415 7 13.0361 7 12C7 11.3187 7.02365 10.6507 7.0691 10.0005ZM14.923 10.0006H9.07699C9.02716 10.6445 9 11.3129 9 12C9 13.0509 9.06354 14.0581 9.17457 15.0012H14.8254C14.9365 14.0581 15 13.0509 15 12C15 11.3129 14.9728 10.6445 14.923 10.0006ZM21.8 10L16.9309 10.0005C16.9763 10.6507 17 11.3187 17 12C17 13.0361 16.9453 14.0415 16.8424 15.0004L21.5419 15.0009C21.8395 14.0536 22 13.0455 22 12C22 11.3151 21.9311 10.6462 21.8 10ZM8.96134 2.46952L8.78877 2.52675C6.11706 3.43211 3.95216 5.43597 2.83183 8.00059L7.28445 8.00039C7.58872 5.93414 8.12208 4.12761 8.81129 2.75659L8.96134 2.46952ZM12 2C11.1216 2 9.8853 4.43084 9.31313 8.0002H14.6869C14.13 4.52658 12.9442 2.13123 12.0714 2.00522L12 2ZM15.0389 2.47011L15.082 2.55006C15.8229 3.94386 16.3958 5.82867 16.7155 8.00039L21.1682 8.00059C20.0238 5.38106 17.7898 3.34655 15.0389 2.47011Z"
                    fill="#262626"
                />
            </g>
        </svg>
    );
};

export default KlodeIkon;
