/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Model
 * @description Account
 */

import { Basics } from "@brontosaurus/definition";
import { _Random } from "@sudoo/bark/random";
import { ObjectID } from "bson";
import { Document, model, Model, Schema } from "mongoose";
import { IAccount, INFOS_SPLITTER } from "../interface/account";
import { generateURL } from "../util/2fa";
import { garblePassword } from "../util/auth";
import { generateKey, verifyCode } from "../util/verify";

const AccountSchema: Schema = new Schema({

    active: {
        type: Boolean,
        required: true,
        default: true,
    },
    attemptLeft: {
        type: Number,
        required: true,
        default: 5,
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
    username: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: false,
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
}, {
        timestamps: {
            createdAt: true,
            updatedAt: true,
        },
    });

export interface IAccountModel extends IAccount, Document {

    readonly resetAttempt: () => IAccountModel;
    readonly generateAndSetTwoFA: () => string;
    readonly verifyTwoFA: (code: string) => boolean;
    readonly getInfoRecords: () => Record<string, Basics>;
    readonly getBeaconRecords: () => Record<string, Basics>;
    readonly pushHistory: (history: string) => IAccountModel;
    readonly addGroup: (id: ObjectID) => IAccountModel;
    readonly removeGroup: (id: ObjectID) => IAccountModel;
    readonly setPassword: (password: string) => IAccountModel;
    readonly verifyPassword: (password: string) => boolean;
}

AccountSchema.methods.resetAttempt = function (this: IAccountModel): IAccountModel {

    this.attemptLeft = 5;

    return this;
};

AccountSchema.methods.generateAndSetTwoFA = function (this: IAccountModel): string {

    const key: string = generateKey();
    const url: string = generateURL('Brontosaurus Authorization', this.username, key);

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

AccountSchema.methods.pushHistory = function (this: IAccountModel, history: string): IAccountModel {

    this.history = [...this.history, history];

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

AccountSchema.methods.setPassword = function (this: IAccountModel, password: string): IAccountModel {

    const saltedPassword: string = garblePassword(password, this.salt);
    this.password = saltedPassword;
    this.mint = _Random.unique();

    return this;
};

AccountSchema.methods.verifyPassword = function (this: IAccountModel, password: string): boolean {

    const saltedPassword: string = garblePassword(password, this.salt);

    return this.password === saltedPassword;
};

export const AccountModel: Model<IAccountModel> = model<IAccountModel>('Account', AccountSchema);
