/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Raw
 * @description Application
 */

import { ApplicationModel, IApplicationModel } from "../model/application";

export const getApplicationByRawKey = async (key: string): Promise<IApplicationModel | null> =>
    await ApplicationModel.findOne({
        key,
    });
