/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Data
 * @description Namespace
 */

export const parseDomainToNamespace = (domain: string): string => {

    const splited: string[] = domain.split('.');
    return splited.reverse().join('.');
};

export const parseNamespaceToDomain = (domain: string): string => {

    const splited: string[] = domain.split('.');
    return splited.reverse().join('.');
};
