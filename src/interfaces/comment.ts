export interface IComment  {
    id: number;
    text: string;
    created_on: string;
    author: {
        id: number;
        name: string;
        email: string;
        city: string;
        avatar: string;
        sells_from: string;
        phone: string;
    }
}
