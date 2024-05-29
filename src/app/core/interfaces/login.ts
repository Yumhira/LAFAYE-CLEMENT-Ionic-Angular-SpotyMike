import { IToken, IUser } from "./user";

export interface ILoginRequestError {
  code?: number;
  error: boolean;
  message: string;
}

export interface ILoginRequestSuccess {
  code?: number;
  error: boolean;
  user: IUser;
  token: IToken;
}
  