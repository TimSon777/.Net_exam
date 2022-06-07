import {Employment} from "../enums/Employment";

export interface Personality {
    firstName: string;
    secondName: string;
    patronymic: string;
    age: number;
    employment: Employment;
}
