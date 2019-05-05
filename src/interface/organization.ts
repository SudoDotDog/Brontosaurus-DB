/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Interface
 * @description Organization
 */

export interface IOrganizationConfig {

    name: string;
}

export interface IOrganization extends IOrganizationConfig {

    active: boolean;
    createdAt: Date;
    updatedAt: Date;

    history: string[];
}
