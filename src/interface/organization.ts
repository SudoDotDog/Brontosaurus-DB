/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Interface
 * @description Organization
 */

import { ObjectID } from "bson";

export type OrganizationActions = {

    CREATE: undefined;
};

export const validateOrganizationAction = (action: keyof OrganizationActions): boolean => {

    const keys: Array<keyof OrganizationActions> = [
        "CREATE",
    ];
    return keys.includes(action);
};

export type OrganizationDetail = {

    readonly name: string;
    readonly active: boolean;
    readonly owner: string;
};

export interface IOrganizationConfig {

    readonly anchor: string;
    readonly name: string;

    owner: ObjectID;
}

export interface IOrganization extends IOrganizationConfig {

    decorators: ObjectID[];
    tags: ObjectID[];
    limit: number;

    active: boolean;

    readonly createdAt: Date;
    readonly updatedAt: Date;
}
