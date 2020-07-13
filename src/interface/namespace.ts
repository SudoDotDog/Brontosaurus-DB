/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Interface
 * @description Namespace
 */

export interface INamespaceConfig {

    name?: string;
    domain: string;
    namespace: string;
}

export interface INamespace extends INamespaceConfig {

    active: boolean;

    readonly createdAt: Date;
    readonly updatedAt: Date;
}
