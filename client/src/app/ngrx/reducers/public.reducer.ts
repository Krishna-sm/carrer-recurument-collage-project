import { createReducer, on } from "@ngrx/store";
import { initialPublicState } from "../state/public.state";
import { all_public_post } from "../actions/public.actions";

export const PublicReducer = createReducer(initialPublicState,

    on(all_public_post,(state,action)=>{
        return {
            ...state,
            jobs:action.jobs
        }
    })
)