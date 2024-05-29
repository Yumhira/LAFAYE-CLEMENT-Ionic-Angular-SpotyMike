type ERoleUser = 'user' | 'artist';

export interface IUser {
    role: ERoleUser;
    isEmailVerified: boolean;
    email: string;
    name: string;
    id: string;
}

export interface IAccessToken {
    token: string;
    expires: string|Date;
}

export interface IToken {
    access: IAccessToken;
    refresh: IAccessToken;
}