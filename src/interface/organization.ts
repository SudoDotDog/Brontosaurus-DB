/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Interface
 * @description Organization
 */

import { ObjectID } from "bson";

export type OrganizationAddress = {

    readonly first: string;
    readonly second: string;
    readonly zipcode: string;
};

export interface IOrganizationConfig {

    name: string;
    owner: ObjectID;
    logo?: string;
    address?: OrganizationAddress;
}

export interface IOrganization extends IOrganizationConfig {

    active: boolean;
    createdAt: Date;
    updatedAt: Date;

    history: string[];
}
