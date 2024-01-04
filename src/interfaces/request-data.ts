export interface IRequestDataForSignUpUser {
    email: string;
    password: string;
    name?: string;
    surname?: string;
    city?: string;
    phone?: string;
    role?: string;
}

export interface IRequestDataUpdateUser {
    name?: string;
    city?: string;
    phone?: string;
    surname?: string;
}

export interface IRequestCreateAsdText {
    title: string;
    description: string;
    price: number;
}

export interface IRequestCreateAsdImages {
    id: number;
    files: FormData;
}
