import {STATISTICS_MOCKS} from "../mocks/statisticMocks";
import {IStatistic} from "../models/IStatistic";
import {IAction} from "../models/IAction";
import ACTION_MOCKS from "../mocks/actionMocks";

// export const loadEvents = (): ISynoraEvent[] => {
//     return EVENT_MOCKS;
// }

export const loadStatistics = (): IStatistic[] => {
    return STATISTICS_MOCKS;
}


export const loadActions = (): IAction[] => {
    return ACTION_MOCKS;
}