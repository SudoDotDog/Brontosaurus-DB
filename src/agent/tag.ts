/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Agent
 * @description Tag
 */

import { ObjectID } from "bson";
import { getTagById } from "../controller/tag";
import { ITagModel } from "../model/tag";

export class TagCacheAgent {

    public static create(): TagCacheAgent {

        return new TagCacheAgent();
    }

    private readonly _tagMap: Map<string, ITagModel>;

    private constructor() {

        this._tagMap = new Map<string, ITagModel>();
    }

    public async getTag(id: ObjectID | string): Promise<ITagModel | null> {

        const stringId: string = typeof id === 'string' ? id : id.toHexString();

        if (this._tagMap.has(stringId)) {
            return this._tagMap.get(stringId) as ITagModel;
        }

        const tag: ITagModel | null = await getTagById(id);

        if (tag) {
            this._tagMap.set(stringId, tag);
            return tag;
        }

        return null;
    }
}
