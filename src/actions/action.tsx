import { IAction } from "../types/ActionInterface";

export const SUBSCRIBE = "SUBSCRIBE";
export const UNSUBSCRIBE = "SUBSCRIBE";

export const action = ( type: string, payload: any = undefined ): IAction => {
    if( payload ){
        return { type, payload };
    }
    return { type };
};