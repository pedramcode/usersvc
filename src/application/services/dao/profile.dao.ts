export interface IProfileUpdate {
    bio?: string;
    image?: string;
    birthdate?: Date;
    job?: string;
    country?: string;
    city?: string;
    bioPublic: boolean;
    imagePublic: boolean;
    birthdatePublic: boolean;
    jobPublic: boolean;
    countryPublic: boolean;
    cityPublic: boolean;
}
