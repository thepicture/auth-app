import User from "./User";

export default interface SignInResponse {
    token: string;
    user: User;
}