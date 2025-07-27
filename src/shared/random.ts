export function generateOtp(): string {
    let res = "";
    const digits = "0123456789";
    for (let i = 0; i < 6; i++) {
        res += digits[Math.floor(Math.random() * digits.length)];
    }
    return res;
}
