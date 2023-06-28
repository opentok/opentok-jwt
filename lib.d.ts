declare module 'opentok-jwt' {
    export function accountToken (
        apiKey: number,
        secret: string,
        expires?: number,
    ): string;

    export function generateToken (
        apiKey: number,
        secret: string,
        issuerType: string,
        expires: number,
    ): string;

    export function projectToken (
        apiKey: number,
        secret: string,
        expires: number
    ): string;
    
    export function verify (
        token: string,
        secret: string,
    ): Promise<string>;
};
