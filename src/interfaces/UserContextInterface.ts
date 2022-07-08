import User from "./User";

export default interface UserContextInterface {
    user: User;
    setUser: (user: User) => void;
}
