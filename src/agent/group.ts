/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Agent
 * @description Group
 */

import { ObjectID } from "bson";
import { getGroupById } from "../controller/group";
import { IGroupModel } from "../model/group";

export class GroupCacheAgent {

    public static create(): GroupCacheAgent {

        return new GroupCacheAgent();
    }

    private readonly _groupMap: Map<string, IGroupModel>;

    private constructor() {

        this._groupMap = new Map<string, IGroupModel>();
    }

    public async getGroup(id: ObjectID | string): Promise<IGroupModel | null> {

        const stringId: string = typeof id === 'string' ? id : id.toHexString();

        if (this._groupMap.has(stringId)) {
            return this._groupMap.get(stringId) as IGroupModel;
        }

        const group: IGroupModel | null = await getGroupById(id);

        if (group) {
            this._groupMap.set(stringId, group);
            return group;
        }

        return null;
    }
}
