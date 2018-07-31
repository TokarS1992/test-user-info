import { Product } from './product';

export interface User {
    id: number;
    username: string;
    secondname: string;
    phone: any;
    email: string;
    password: string;
    token: string;
    remember: boolean;
    timestamp?: Date|number;
    products: Product[];
}