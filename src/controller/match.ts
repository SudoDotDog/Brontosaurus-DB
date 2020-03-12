/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Controller
 * @description Match
 */

import { AccountNamespaceMatch, MATCH_FAILS_REASON } from "../data/match";
import { IAccountModel } from "../model/account";
import { INamespaceModel } from "../model/namespace";
import { getAccountByUsernameAndNamespace } from "./account";
import { getNamespaceByDomain, getNamespaceByNamespace } from "./namespace";

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

export const getAccountByUsernameAndNamespaceName = async (username: string, namespace: string): Promise<IAccountModel | null> => {

    const namespaceInstance: INamespaceModel | null = await getNamespaceByNamespace(namespace);
    if (!namespaceInstance) {
        return null;
    }

    const account: IAccountModel | null = await getAccountByUsernameAndNamespace(username, namespaceInstance._id);
    return account;
};

export const getAccountByUsernameAndNamespaceDomain = async (username: string, domain: string): Promise<IAccountModel | null> => {

    const namespaceInstance: INamespaceModel | null = await getNamespaceByDomain(domain);
    if (!namespaceInstance) {
        return null;
    }

    const account: IAccountModel | null = await getAccountByUsernameAndNamespace(username, namespaceInstance._id);
    return account;
};
