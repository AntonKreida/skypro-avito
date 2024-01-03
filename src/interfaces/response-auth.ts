export interface IResponseLogin {
    access_token: string;
    refresh_token: string;
    token_type: string;
}

export interface IResponseErrorLogin {
    detail: string;
}
