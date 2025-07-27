export interface IOtpCreate {
    username: string;
    context: "REGISTER" | "LOGIN" | "CHANGE" | "OTHER";
    medium: "SMS" | "EMAIL";
}
