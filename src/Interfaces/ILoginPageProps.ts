import { IUserLoginModel } from "./IUserLoginModel";

/**
 * prop for login page
 */
export interface ILoginPageProps {
  login(data: IUserLoginModel): void;
}
