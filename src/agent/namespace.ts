/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Agent
 * @description Namespace
 */

import { ObjectID } from "bson";
import { getNamespaceById } from "../controller/namespace";
import { INamespaceModel } from "../model/namespace";

export class NamespaceCacheAgent {

    public static create(): NamespaceCacheAgent {

        return new NamespaceCacheAgent();
    }

    private readonly _namespaceMap: Map<string, INamespaceModel>;

    private constructor() {

        this._namespaceMap = new Map<string, INamespaceModel>();
    }

    public async getNamespace(id: ObjectID | string): Promise<INamespaceModel | null> {

        const stringId: string = typeof id === 'string' ? id : id.toHexString();

        if (this._namespaceMap.has(stringId)) {
            return this._namespaceMap.get(stringId) as INamespaceModel;
        }

        const namespace: INamespaceModel | null = await getNamespaceById(id);

        if (namespace) {
            this._namespaceMap.set(stringId, namespace);
            return namespace;
        }

        return null;
    }
}
