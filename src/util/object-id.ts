/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Util
 * @description Parse
 */

import { ObjectID } from "bson";

export const parseObjectIDList = (list: Array<string | ObjectID>): ObjectID[] => {

    const result: ObjectID[] = [];
    for (const each of list) {
        if (ObjectID.isValid(each)) {

            if (typeof each === 'string') {
                result.push(new ObjectID(each));
            } else if (typeof each === 'number') {
                result.push(new ObjectID(each));
            } else {
                result.push(each);
            }
        }
    }

    return result;
};

export const validateObjectIDList = (list: Array<string | ObjectID>): boolean => {

    for (const each of list) {
        if (!ObjectID.isValid(each)) {

            return false;
        }
    }

    return true;
};

