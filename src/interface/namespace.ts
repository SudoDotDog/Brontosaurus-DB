/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Interface
 * @description Namespace
 */


export type NamespaceActions = {

    CREATE: undefined;
};

export const validateNamespaceAction = (action: keyof NamespaceActions): boolean => {

    const keys: Array<keyof NamespaceActions> = [
        "CREATE",
    ];
    return keys.includes(action);
};

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
