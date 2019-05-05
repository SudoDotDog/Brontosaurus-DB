/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Util
 * @description Token
 */

import { Basics } from "@brontosaurus/definition";
import { _Map } from "@sudoo/bark/map";
import { INFOS_SPLITTER } from "../interface/account";

export const parseInfo = (infoRecord: Record<string, Basics>): string[] => {

    return _Map.keys(infoRecord).map((key: string) => key + INFOS_SPLITTER + infoRecord[key]);
};
