/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Interface
 * @description Organization
 */

export interface IOrganizationConfig {

    readonly name: string;
}

export interface IOrganization extends IOrganizationConfig {

    readonly active: boolean;
    readonly createdAt: Date;
    readonly updatedAt: Date;

    readonly history: string[];
}
