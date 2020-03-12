/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Data
 * @description Namespace
 */

import { verifyNamespace } from "@brontosaurus/core";

export const parseDomainToNamespace = (domain: string): string => {

    const splited: string[] = domain.split('.');
    return splited.reverse().join('.');
};

export const parseNamespaceToDomain = (domain: string): string => {

    const splited: string[] = domain.split('.');
    return splited.reverse().join('.');
};

export const validateNamespace = (namespace: string): boolean => {

    return verifyNamespace(namespace);
};

export const validateDomain = (domain: string): boolean => {

    const namespace: string = parseDomainToNamespace(domain);
    return verifyNamespace(namespace);
};
