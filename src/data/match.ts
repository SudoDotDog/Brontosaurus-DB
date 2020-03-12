/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Data
 * @description Match
 */

import { IAccountModel } from "../model/account";
import { INamespaceModel } from "../model/namespace";

export enum MATCH_FAILS_REASON {

    NAMESPACE_NOT_FOUND = "NAMESPACE_NOT_FOUND",
    ACCOUNT_NOT_FOUND = "ACCOUNT_NOT_FOUND",
}

export type AccountNamespaceMatch = {

    readonly succeed: true;
    readonly account: IAccountModel;
    readonly namespace: INamespaceModel;
} | {

    readonly succeed: false;
    readonly reason: MATCH_FAILS_REASON;
};
