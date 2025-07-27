export interface IOtpCreate {
    username: string;
    context: "REGISTER" | "LOGIN" | "CHANGE" | "OTHER";
    medium: "SMS" | "EMAIL";
}

export interface IOtpGet {
    code: string;
    username: string;
    context: "REGISTER" | "LOGIN" | "CHANGE" | "OTHER";
    medium: "SMS" | "EMAIL";
}
