
export interface Address{
    jibunAddr: string,
    roadAddr: string,
    siNm?: string,
    zipNo?: string
    onClick: (jibun : string) =>void | Promise<void>;
}
