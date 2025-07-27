export interface IUserRegister {
    username: string;
    password: string;
    email: string;
    step: "1" | "2";
    otp?: string;
    firstname?: string;
    lastname?: string;
}
