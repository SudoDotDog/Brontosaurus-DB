/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Controller
 * @description Match
 */

import { IAccountModel } from "../model/account";
import { INamespaceModel } from "../model/namespace";
import { getAccountByUsernameAndNamespace } from "./account";
import { getNamespaceByNamespace } from "./namespace";

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

export const getAccountNamespaceMatchByUsernameAndNamespace = async (username: string, namespace: string): Promise<AccountNamespaceMatch> => {

    const namespaceInstance: INamespaceModel | null = await getNamespaceByNamespace(namespace);
    if (!namespaceInstance) {
        return {
            succeed: false,
            reason: MATCH_FAILS_REASON.NAMESPACE_NOT_FOUND,
        };
    }

    const account: IAccountModel | null = await getAccountByUsernameAndNamespace(username, namespaceInstance._id);

    if (!account) {
        return {
            succeed: false,
            reason: MATCH_FAILS_REASON.ACCOUNT_NOT_FOUND,
        };
    }

    return {
        succeed: true,
        account,
        namespace: namespaceInstance,
    };
};
