/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Agent
 * @description Application
 */

import { ObjectID } from "bson";
import { getApplicationById } from "../controller/application";
import { IApplicationModel } from "../model/application";

export class ApplicationCacheAgent {

    public static create() {

        return new ApplicationCacheAgent();
    }

    private readonly _applicationMap: Map<string, IApplicationModel>;

    private constructor() {

        this._applicationMap = new Map<string, IApplicationModel>();
    }

    public async getApplication(id: ObjectID | string): Promise<IApplicationModel | null> {

        const application: IApplicationModel | null = await getApplicationById(id);
        return application;
    }
}
