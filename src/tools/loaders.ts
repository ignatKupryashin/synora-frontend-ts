import {IAction} from "../models/IAction";
import ACTION_MOCKS from "../mocks/actionMocks";

export const loadActions = (): IAction[] => {
    return ACTION_MOCKS;
}