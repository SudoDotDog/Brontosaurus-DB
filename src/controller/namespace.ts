/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Controller
 * @description Namespace
 */

import { DEFAULT_BRONTOSAURUS_NAMESPACE } from "@brontosaurus/definition";
import { ObjectID } from "bson";
import { parseDomainToNamespace, parseNamespaceToDomain } from "../data/namespace";
import { INamespace, INamespaceConfig } from "../interface/namespace";
import { INamespaceModel, NamespaceModel } from "../model/namespace";

export const getBrontosaurusDefaultNamespace = async (): Promise<INamespaceModel> => {

    const createdDefaultNamespace: INamespaceModel | null = await NamespaceModel.findOne({
        namespace: DEFAULT_BRONTOSAURUS_NAMESPACE.DEFAULT,
    });

    if (createdDefaultNamespace) {
        return createdDefaultNamespace;
    }

    const defaultNamespace: INamespaceModel = new NamespaceModel({
        name: 'Brontosaurus Default',
        domain: parseNamespaceToDomain(DEFAULT_BRONTOSAURUS_NAMESPACE.DEFAULT),
        namespace: DEFAULT_BRONTOSAURUS_NAMESPACE.DEFAULT,
    });

    await defaultNamespace.save();
    return defaultNamespace;
};

export const getBrontosaurusAdminNamespace = async (): Promise<INamespaceModel> => {

    const createdDefaultNamespace: INamespaceModel | null = await NamespaceModel.findOne({
        namespace: DEFAULT_BRONTOSAURUS_NAMESPACE.ADMIN,
    });

    if (createdDefaultNamespace) {
        return createdDefaultNamespace;
    }

    const defaultNamespace: INamespaceModel = new NamespaceModel({
        name: 'Brontosaurus Admin',
        domain: parseNamespaceToDomain(DEFAULT_BRONTOSAURUS_NAMESPACE.ADMIN),
        namespace: DEFAULT_BRONTOSAURUS_NAMESPACE.ADMIN,
    });

    await defaultNamespace.save();
    return defaultNamespace;
};

export const getNamespaceById = async (id: ObjectID): Promise<INamespaceModel | null> => {

    return await NamespaceModel.findOne({
        _id: id,
    });
};

export const getONamespaceByIdLean = async (id: ObjectID): Promise<INamespace | null> => {

    return await NamespaceModel.findOne({
        _id: id,
    }).lean();
};

export const getNamespacesByIds = async (ids: ObjectID[]): Promise<INamespaceModel[]> => {

    return await NamespaceModel.find({
        _id: {
            $in: ids,
        },
    });
};

export const getNamespacesByIdsLean = async (ids: ObjectID[]): Promise<INamespace[]> => {

    return await NamespaceModel.find({
        _id: {
            $in: ids,
        },
    }).lean();
};

export const getNamespaceByNamespace = async (namespace: string): Promise<INamespaceModel | null> => {

    const fixed: string = namespace.toLowerCase();
    return await NamespaceModel.findOne({
        namespace: fixed,
    });
};

export const getNamespaceByNamespaceLean = async (namespace: string): Promise<INamespace | null> => {

    const fixed: string = namespace.toLowerCase();
    return await NamespaceModel.findOne({
        namespace: fixed,
    }).lean();
};

export const getNamespacesByNamespaces = async (namespaces: string[]): Promise<INamespaceModel[]> => {

    const fixes: string[] = namespaces.map((namespace: string) => namespace.toLowerCase());
    return await NamespaceModel.find({
        namespace: {
            $in: fixes,
        },
    });
};

export const getNamespacesByNamespacesLean = async (namespaces: string[]): Promise<INamespace[]> => {

    const fixes: string[] = namespaces.map((namespace: string) => namespace.toLowerCase());
    return await NamespaceModel.find({
        namespace: {
            $in: fixes,
        },
    }).lean();
};

export const getNamespaceByDomain = async (domain: string): Promise<INamespaceModel | null> => {

    const fixed: string = domain.toLowerCase();
    return await NamespaceModel.findOne({
        domain: fixed,
    });
};

export const getNamespaceByDomainLean = async (domain: string): Promise<INamespace | null> => {

    const fixed: string = domain.toLowerCase();
    return await NamespaceModel.findOne({
        domain: fixed,
    }).lean();
};

export const getNamespacesByDomains = async (domains: string[]): Promise<INamespaceModel[]> => {

    const fixes: string[] = domains.map((domain: string) => domain.toLowerCase());
    return await NamespaceModel.find({
        domain: {
            $in: fixes,
        },
    });
};

export const getNamespacesByDomainsLean = async (domains: string[]): Promise<INamespace[]> => {

    const fixes: string[] = domains.map((domain: string) => domain.toLowerCase());
    return await NamespaceModel.find({
        domain: {
            $in: fixes,
        },
    }).lean();
};

export const createUnsavedNamespaceByDomain = (
    domain: string,
): INamespaceModel => {

    const namespace: string = parseDomainToNamespace(domain);
    const fixedDomain: string = domain.toLowerCase();
    const fixedNamespace: string = namespace.toLowerCase();

    const config: INamespaceConfig = {
        domain: fixedDomain,
        namespace: fixedNamespace,
    };

    return new NamespaceModel(config);
};

export const createUnsavedNamespaceByNamespace = (
    namespace: string,
): INamespaceModel => {

    const domain: string = parseNamespaceToDomain(namespace);
    const fixedDomain: string = domain.toLowerCase();
    const fixedNamespace: string = namespace.toLowerCase();

    const config: INamespaceConfig = {
        domain: fixedDomain,
        namespace: fixedNamespace,
    };

    return new NamespaceModel(config);
};

export const isNamespaceDuplicatedByDomain = async (domain: string): Promise<boolean> => {
    const namespace: INamespaceModel | null = await getNamespaceByDomain(domain);
    return Boolean(namespace);
};

export const isNamespaceDuplicatedByNamespace = async (namespace: string): Promise<boolean> => {
    const namespaceInstance: INamespaceModel | null = await getNamespaceByNamespace(namespace);
    return Boolean(namespaceInstance);
};

export const isNamespaceDuplicatedById = async (id: ObjectID): Promise<boolean> => {
    const namespace: INamespaceModel | null = await getNamespaceById(id);
    return Boolean(namespace);
};

export const getSelectedActiveNamespacePages = async (limit: number, keyword?: string): Promise<number> => {

    if (keyword) {
        return await getActiveNamespacePagesByKeyword(limit, keyword);
    }
    return await getTotalActiveNamespacePages(limit);
};

export const getSelectedNamespacePages = async (limit: number, keyword?: string): Promise<number> => {

    if (keyword) {
        return await getNamespacePagesByKeyword(limit, keyword);
    }
    return await getTotalNamespacePages(limit);
};

export const getAllNamespaces = async (): Promise<INamespaceModel[]> => NamespaceModel.find({});
export const getAllNamespacesLean = async (): Promise<INamespace[]> => NamespaceModel.find({}).lean();

export const getTotalNamespacePages = async (limit: number): Promise<number> =>
    (await NamespaceModel.estimatedDocumentCount({})) / limit;

export const getTotalActiveNamespacePages = async (limit: number): Promise<number> =>
    (await NamespaceModel.countDocuments({
        active: true,
    })) / limit;

export const getActiveNamespacePagesByKeyword = async (limit: number, keyword: string): Promise<number> => {

    const fixed: string = keyword.toLowerCase();
    const regexp: RegExp = new RegExp(fixed, 'i');
    return (await NamespaceModel.countDocuments({
        namespace: {
            $regex: regexp,
        },
        active: true,
    })) / limit;
};

export const getNamespacePagesByKeyword = async (limit: number, keyword: string): Promise<number> => {

    const fixed: string = keyword.toLowerCase();
    const regexp: RegExp = new RegExp(fixed, 'i');
    return (await NamespaceModel.countDocuments({
        namespace: {
            $regex: regexp,
        },
    })) / limit;
};

export const getSelectedActiveNamespacesByPage = async (limit: number, page: number, keyword?: string): Promise<INamespaceModel[]> => {

    if (keyword) {
        return await getActiveNamespacesByPage(keyword, limit, page);
    }
    return await getAllActiveNamespacesByPage(limit, page);
};

export const getSelectedActiveNamespacesByPageLean = async (limit: number, page: number, keyword?: string): Promise<INamespace[]> => {

    if (keyword) {
        return await getActiveNamespacesByPageLean(keyword, limit, page);
    }
    return await getAllActiveNamespacesByPageLean(limit, page);
};

export const getSelectedNamespacesByPage = async (limit: number, page: number, keyword?: string): Promise<INamespaceModel[]> => {

    if (keyword) {
        return await getNamespacesByPage(keyword, limit, page);
    }
    return await getAllNamespacesByPage(limit, page);
};

export const getSelectedNamespacesByPageLean = async (limit: number, page: number, keyword?: string): Promise<INamespace[]> => {

    if (keyword) {
        return await getNamespacesByPageLean(keyword, limit, page);
    }
    return await getAllNamespacesByPageLean(limit, page);
};

export const getActiveNamespacesByPage = async (keyword: string, limit: number, page: number): Promise<INamespaceModel[]> => {

    if (page < 0) {
        return [];
    }

    const fixed: string = keyword.toLowerCase();
    const regexp: RegExp = new RegExp(fixed, 'i');
    const namespaces: INamespaceModel[] = await NamespaceModel.find({
        namespace: {
            $regex: regexp,
        },
        active: true,
    }).skip(page * limit).limit(limit).sort({ _id: -1 });
    return namespaces;
};

export const getActiveNamespacesByPageLean = async (keyword: string, limit: number, page: number): Promise<INamespace[]> => {

    if (page < 0) {
        return [];
    }

    const fixed: string = keyword.toLowerCase();
    const regexp: RegExp = new RegExp(fixed, 'i');
    const namespaces: INamespace[] = await NamespaceModel.find({
        namespace: {
            $regex: regexp,
        },
        active: true,
    }).skip(page * limit).limit(limit).sort({ _id: -1 }).lean();
    return namespaces;
};

export const getNamespacesByPage = async (keyword: string, limit: number, page: number): Promise<INamespaceModel[]> => {

    if (page < 0) {
        return [];
    }

    const fixed: string = keyword.toLowerCase();
    const regexp: RegExp = new RegExp(fixed, 'i');
    const namespaces: INamespaceModel[] = await NamespaceModel.find({
        namespace: {
            $regex: regexp,
        },
    }).skip(page * limit).limit(limit).sort({ _id: -1 });
    return namespaces;
};

export const getNamespacesByPageLean = async (keyword: string, limit: number, page: number): Promise<INamespace[]> => {

    if (page < 0) {
        return [];
    }

    const fixed: string = keyword.toLowerCase();
    const regexp: RegExp = new RegExp(fixed, 'i');
    const namespaces: INamespace[] = await NamespaceModel.find({
        namespace: {
            $regex: regexp,
        },
    }).skip(page * limit).limit(limit).sort({ _id: -1 }).lean();
    return namespaces;
};

export const getAllActiveNamespacesByPage = async (limit: number, page: number): Promise<INamespaceModel[]> => {

    if (page < 0) {
        return [];
    }

    const namespaces: INamespaceModel[] = await NamespaceModel.find({
        active: true,
    }).skip(page * limit).limit(limit).sort({ _id: -1 });
    return namespaces;
};

export const getAllActiveNamespacesByPageLean = async (limit: number, page: number): Promise<INamespace[]> => {

    if (page < 0) {
        return [];
    }

    const namespaces: INamespace[] = await NamespaceModel.find({
        active: true,
    }).skip(page * limit).limit(limit).sort({ _id: -1 }).lean();
    return namespaces;
};

export const getAllNamespacesByPage = async (limit: number, page: number): Promise<INamespaceModel[]> => {

    if (page < 0) {
        return [];
    }

    const namespaces: INamespaceModel[] = await NamespaceModel.find({
    }).skip(page * limit).limit(limit).sort({ _id: -1 });
    return namespaces;
};

export const getAllNamespacesByPageLean = async (limit: number, page: number): Promise<INamespace[]> => {

    if (page < 0) {
        return [];
    }

    const namespaces: INamespace[] = await NamespaceModel.find({
    }).skip(page * limit).limit(limit).sort({ _id: -1 }).lean();
    return namespaces;
};

export const getAllNamespaceNamespace = async (): Promise<string[]> => {

    const namespaces: INamespaceModel[] = await NamespaceModel.find({});
    return namespaces.map((namespace: INamespaceModel) => namespace.namespace);
};

export const getAllActiveNamespaceNamespace = async (): Promise<string[]> => {

    const namespaces: INamespaceModel[] = await NamespaceModel.find({
        active: true,
    });
    return namespaces.map((namespace: INamespaceModel) => namespace.namespace);
};

export const getAllNamespaceDomain = async (): Promise<string[]> => {

    const namespaces: INamespaceModel[] = await NamespaceModel.find({});
    return namespaces.map((namespace: INamespaceModel) => namespace.domain);
};

export const getAllActiveNamespaceDomain = async (): Promise<string[]> => {

    const namespaces: INamespaceModel[] = await NamespaceModel.find({
        active: true,
    });
    return namespaces.map((namespace: INamespaceModel) => namespace.domain);
};

export const getNamespacesIdsByNamespaces = async (namespaces: string[]): Promise<ObjectID[]> => {

    const fixes: string[] = namespaces.map((namespace: string) => namespace.toLowerCase());
    const namespaceInstances: INamespaceModel[] = await NamespaceModel.find({
        namespace: {
            $in: fixes,
        },
    }, {
        _id: 1,
    });
    return namespaceInstances.map((namespaceInstance: INamespaceModel) => namespaceInstance._id);
};

export const getNamespacesIdsByDomains = async (domains: string[]): Promise<ObjectID[]> => {

    const fixes: string[] = domains.map((domain: string) => domain.toLowerCase());
    const namespaceInstances: INamespaceModel[] = await NamespaceModel.find({
        domain: {
            $in: fixes,
        },
    }, {
        _id: 1,
    });
    return namespaceInstances.map((namespaceInstance: INamespaceModel) => namespaceInstance._id);
};

export const getNamespacesByQuery = async (query: Record<string, any>): Promise<INamespaceModel[]> => {

    return await NamespaceModel.find(query);
};

export const getOrganizationsByQueryLean = async (query: Record<string, any>): Promise<INamespace[]> => {

    return await NamespaceModel.find(query).lean();
};
