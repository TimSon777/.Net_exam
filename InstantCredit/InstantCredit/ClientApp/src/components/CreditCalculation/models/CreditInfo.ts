import {CreditPurpose} from "../enums/CreditPurpose";
import {Deposit} from "../enums/Deposit";

export interface CreditInfo {
    purpose: CreditPurpose;
    sum: number,
    deposit: Deposit;
}