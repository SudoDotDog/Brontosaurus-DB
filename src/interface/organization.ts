/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Interface
 * @description Organization
 */

import { ObjectID } from "bson";

export type OrganizationDetail = {

    name: string;
    owner: string;
};

export interface IOrganizationConfig {

    name: string;
    owner: ObjectID;
}

export interface IOrganization extends IOrganizationConfig {

    decorators: ObjectID[];

    active: boolean;
    history: string[];

    readonly createdAt: Date;
    readonly updatedAt: Date;
}
