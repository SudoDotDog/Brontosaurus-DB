/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Model
 * @description Account
 */

import { Basics } from "@brontosaurus/definition";
import { _Random } from "@sudoo/bark/random";
import { ObjectID } from "bson";
import { Document, model, Model, Schema } from "mongoose";
import { AccountActions, defaultInitialAttemptPoints, IAccount, INFOS_SPLITTER } from "../interface/account";
import { generateURL } from "../util/2fa";
import { garblePassword } from "../util/auth";
import { generateKey, verifyCode } from "../util/verify";
import { SpecialPasswordSchema } from "./common";

const AccountSchema: Schema = new Schema(
    {
        active: {
            type: Boolean,
            required: true,
            default: true,
        },
        anchor: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        displayName: {
            type: String,
            required: false,
        },
        attemptPoints: {
            type: Number,
            required: true,
            default: defaultInitialAttemptPoints,
        },
        limbo: {
            type: Boolean,
            required: true,
            default: false,
        },
        twoFA: {
            type: String,
            required: false,
        },
        decorators: {
            type: [Schema.Types.ObjectId],
            required: true,
            default: [],
        },
        password: {
            type: String,
            required: true,
        },
        temporaryPasswords: {
            type: [SpecialPasswordSchema],
            required: true,
            default: [],
        },
        applicationPasswords: {
            type: [SpecialPasswordSchema],
            required: true,
            default: [],
        },
        phone: {
            type: String,
            required: false,
            index: true,
        },
        email: {
            type: String,
            required: false,
            unique: true,
            index: true,
        },

        infos: {
            type: [String],
            required: true,
            default: [],
        },
        beacons: {
            type: [String],
            required: true,
            default: [],
        },
        organization: {
            type: Schema.Types.ObjectId,
            index: true,
        },
        groups: {
            type: [Schema.Types.ObjectId],
            required: true,
            default: [],
        },
        tags: {
            type: [Schema.Types.ObjectId],
            required: true,
            default: [],
        },

        mint: {
            type: String,
            required: true,
        },
        salt: {
            type: String,
            required: true,
        },

        history: {
            type: [String],
            required: true,
            default: [],
        },
    },
    {
        timestamps: {
            createdAt: true,
            updatedAt: true,
        },
    },
);

export interface IAccountModel extends IAccount, Document {

    resetAttempt(amount?: number): IAccountModel;
    useAttemptPoint(point: number): IAccountModel;
    generateAndSetTwoFA(systemName?: string): string;
    verifyTwoFA(code: string): boolean;
    getInfoRecords(): Record<string, Basics>;
    getBeaconRecords(): Record<string, Basics>;
    addGroup(id: ObjectID): IAccountModel;
    removeGroup(id: ObjectID): IAccountModel;
    setPassword(password: string): IAccountModel;
    setTempPassword(): IAccountModel;
    resetMint(): IAccountModel;
    verifyPassword(password: string): boolean;
    pushHistory<T extends keyof AccountActions>(
        action: T,
        application: ObjectID,
        by: ObjectID,
        content: string,
        extra: AccountActions[T],
    ): IAccountModel;
}

AccountSchema.methods.useAttemptPoint = function (this: IAccountModel, point: number): IAccountModel {

    this.attemptPoints = this.attemptPoints - point;

    return this;
};

AccountSchema.methods.resetAttempt = function (this: IAccountModel, amount: number = defaultInitialAttemptPoints): IAccountModel {

    this.attemptPoints = amount;

    return this;
};

AccountSchema.methods.generateAndSetTwoFA = function (this: IAccountModel, systemName: string = 'Brontosaurus Authorization'): string {

    const key: string = generateKey();
    const url: string = generateURL(systemName, this.username, key);

    this.twoFA = key;

    return url;
};

AccountSchema.methods.verifyTwoFA = function (this: IAccountModel, code: string): boolean {

    const key: string | undefined = this.twoFA;

    if (!key) {
        return false;
    }

    return verifyCode(key, code);
};

AccountSchema.methods.getInfoRecords = function (this: IAccountModel): Record<string, Basics> {

    return this.infos.reduce((previous: Record<string, Basics>, current: string) => {
        const splited: string[] = current.split(INFOS_SPLITTER);
        if (splited.length === 2) {
            return {
                ...previous,
                [splited[0]]: splited[1],
            };
        }
        return previous;
    }, {} as Record<string, Basics>);
};

AccountSchema.methods.getBeaconRecords = function (this: IAccountModel): Record<string, Basics> {

    return this.beacons.reduce((previous: Record<string, Basics>, current: string) => {
        const splited: string[] = current.split(INFOS_SPLITTER);
        if (splited.length === 2) {
            return {
                ...previous,
                [splited[0]]: splited[1],
            };
        }
        return previous;
    }, {} as Record<string, Basics>);
};


AccountSchema.methods.pushHistory = function <T extends keyof AccountActions>(
    this: IAccountModel,
    action: T,
    application: ObjectID,
    by: ObjectID,
    content: string,
    extra: AccountActions[T],
): IAccountModel {

    this.history = [
        ...this.history,
        {
            action,
            application,
            at: new Date(),
            by,
            content,
            extra,
        },
    ];

    return this;
};

AccountSchema.methods.addGroup = function (this: IAccountModel, id: ObjectID): IAccountModel {

    if (this.groups.some((group: ObjectID) => group.equals(id))) {
        return this;
    }

    this.groups = [...this.groups, id];

    return this;
};

AccountSchema.methods.removeGroup = function (this: IAccountModel, id: ObjectID): IAccountModel {

    this.groups = this.groups.reduce((previous: ObjectID[], current: ObjectID) => {

        if (current.equals(id)) {
            return previous;
        }
        return [...previous, current];
    }, [] as ObjectID[]);

    return this;
};

AccountSchema.methods.setTempPassword = function (this: IAccountModel): IAccountModel {

    // tslint:disable-next-line: no-magic-numbers
    const tempPassword: string = _Random.random(6);
    this.setPassword(tempPassword);

    return this;
};

AccountSchema.methods.setPassword = function (this: IAccountModel, password: string): IAccountModel {

    const saltedPassword: string = garblePassword(password, this.salt);
    this.password = saltedPassword;
    this.resetMint();

    return this;
};

AccountSchema.methods.resetMint = function (this: IAccountModel): IAccountModel {

    this.mint = _Random.unique();

    return this;
};

AccountSchema.methods.verifyPassword = function (this: IAccountModel, password: string): boolean {

    const saltedPassword: string = garblePassword(password, this.salt);

    return this.password === saltedPassword;
};

export const AccountModel: Model<IAccountModel> = model<IAccountModel>('Account', AccountSchema);
