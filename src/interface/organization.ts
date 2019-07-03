/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Interface
 * @description Organization
 */

import { ObjectID } from "bson";

export type OrganizationDetail = {

    name: string;
    owner: string;
    logo?: string;
};

export interface IOrganizationConfig {

    name: string;
    owner: ObjectID;
    logo?: string;
}

export interface IOrganization extends IOrganizationConfig {

    active: boolean;
    history: string[];

    readonly createdAt: Date;
    readonly updatedAt: Date;
}
