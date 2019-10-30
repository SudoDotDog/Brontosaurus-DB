/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Data
 * @description Group
 */

import { INTERNAL_USER_GROUP } from "../interface/group";
import { IGroupModel } from "../model/group";

export const isGroupModelInternalUserGroup = (group: IGroupModel): boolean => {

    return group.name === INTERNAL_USER_GROUP.GROUP_MODIFY
        || group.name === INTERNAL_USER_GROUP.ORGANIZATION_CONTROL
        || group.name === INTERNAL_USER_GROUP.SELF_CONTROL
        || group.name === INTERNAL_USER_GROUP.SUPER_ADMIN;
};

export const isInternalUserGroup = (groupName: string): boolean => {

    return groupName === INTERNAL_USER_GROUP.GROUP_MODIFY
        || groupName === INTERNAL_USER_GROUP.ORGANIZATION_CONTROL
        || groupName === INTERNAL_USER_GROUP.SELF_CONTROL
        || groupName === INTERNAL_USER_GROUP.SUPER_ADMIN;
};
