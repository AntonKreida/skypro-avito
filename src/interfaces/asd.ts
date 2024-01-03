import { IUser } from "./user";


export interface IAsd {
    title: string;
    description: string;
    price: number;
    id: number;
    images:  {
        id: number;
        ad_id: number;
        url: string;
      }[]
    user_id: number;
    created_on: string;
    user: IUser;
}
