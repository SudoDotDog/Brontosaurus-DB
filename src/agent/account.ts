/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Agent
 * @description Account
 */

import { ObjectID } from "bson";
import { getAccountById } from "../controller/account";
import { IAccountModel } from "../model/import";

export class AccountCacheAgent {

    public static create() {

        return new AccountCacheAgent();
    }

    private readonly _accountMap: Map<string, IAccountModel>;

    private constructor() {

        this._accountMap = new Map<string, IAccountModel>();
    }

    public async getAccount(id: ObjectID | string): Promise<IAccountModel | null> {

        const stringId: string = typeof id === 'string' ? id : id.toHexString();

        if (this._accountMap.has(stringId)) {
            return this._accountMap.get(stringId) as IAccountModel;
        }

        const account: IAccountModel | null = await getAccountById(id);

        if (account) {
            this._accountMap.set(stringId, account);
            return account;
        }

        return null;
    }
}
