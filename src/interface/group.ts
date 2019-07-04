/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Interface
 * @description Group
 */

import { ObjectID } from "bson";

export enum INTERNAL_USER_GROUP {

    SUPER_ADMIN = 'BRONTOSAURUS_SUPER_ADMIN',
    SELF_CONTROL = 'BRONTOSAURUS_SELF_CONTROL',
    ORGANIZATION_CONTROL = 'BRONTOSAURUS_ORGANIZATION_CONTROL',
    GROUP_MODIFY = 'BRONTOSAURUS_GROUP_MODIFY',
}

export interface IGroupConfig {

    name: string;
    description?: string;
}

export interface IGroup extends IGroupConfig {

    decorators: ObjectID[];

    active: boolean;
    history: string[];

    readonly createdAt: Date;
    readonly updatedAt: Date;
}
