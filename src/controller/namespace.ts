/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Controller
 * @description Namespace
 */

import { BRONTOSAURUS_NAMESPACE } from "@brontosaurus/core";
import { parseNamespaceToDomain } from "../data/namespace";
import { INamespaceModel, NamespaceModel } from "../model/namespace";

export const getBrontosaurusDefaultNamespace = async (): Promise<INamespaceModel> => {

    const createdDefaultNamespace: INamespaceModel | null = await NamespaceModel.findOne({
        namespace: BRONTOSAURUS_NAMESPACE.DEFAULT,
    });

    if (createdDefaultNamespace) {
        return createdDefaultNamespace;
    }

    const defaultNamespace: INamespaceModel = new NamespaceModel({
        domain: parseNamespaceToDomain(BRONTOSAURUS_NAMESPACE.DEFAULT),
        namespace: BRONTOSAURUS_NAMESPACE.DEFAULT,
    });

    await defaultNamespace.save();
    return defaultNamespace;
};

export const getBrontosaurusAdminNamespace = async (): Promise<INamespaceModel> => {

    const createdDefaultNamespace: INamespaceModel | null = await NamespaceModel.findOne({
        namespace: BRONTOSAURUS_NAMESPACE.ADMIN,
    });

    if (createdDefaultNamespace) {
        return createdDefaultNamespace;
    }

    const defaultNamespace: INamespaceModel = new NamespaceModel({
        domain: parseNamespaceToDomain(BRONTOSAURUS_NAMESPACE.ADMIN),
        namespace: BRONTOSAURUS_NAMESPACE.ADMIN,
    });

    await defaultNamespace.save();
    return defaultNamespace;
};
