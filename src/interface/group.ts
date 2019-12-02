/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Interface
 * @description Group
 */

import { ObjectID } from "bson";
import { History } from "./common";

export type GroupActions = {

    CREATE: undefined;
};

export const validateGroupAction = (action: keyof GroupActions): boolean => {

    const keys: Array<keyof GroupActions> = [
        "CREATE",
    ];
    return keys.includes(action);
};

export enum INTERNAL_USER_GROUP {

    SUPER_ADMIN = 'BRONTOSAURUS_SUPER_ADMIN',
    SELF_CONTROL = 'BRONTOSAURUS_SELF_CONTROL',
    ORGANIZATION_CONTROL = 'BRONTOSAURUS_ORGANIZATION_CONTROL',
    GROUP_MODIFY = 'BRONTOSAURUS_GROUP_MODIFY',
}

export interface IGroupConfig {

    readonly anchor: string;
    readonly name: string;

    description?: string;
}

export interface IGroup extends IGroupConfig {

    decorators: ObjectID[];

    active: boolean;
    history: History[];

    readonly createdAt: Date;
    readonly updatedAt: Date;
}
