/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Agent
 * @description Application
 */

import { ObjectID } from "bson";
import { getApplicationById } from "../controller/application";
import { IApplicationModel } from "../model/application";

export class ApplicationCacheAgent {

    public static create(): ApplicationCacheAgent {

        return new ApplicationCacheAgent();
    }

    private readonly _applicationMap: Map<string, IApplicationModel>;

    private constructor() {

        this._applicationMap = new Map<string, IApplicationModel>();
    }

    public async getApplication(id: ObjectID | string): Promise<IApplicationModel | null> {

        const stringId: string = typeof id === 'string' ? id : id.toHexString();

        if (this._applicationMap.has(stringId)) {
            return this._applicationMap.get(stringId) as IApplicationModel;
        }

        const application: IApplicationModel | null = await getApplicationById(id);

        if (application) {
            this._applicationMap.set(stringId, application);
            return application;
        }

        return null;
    }
}
