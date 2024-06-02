import { createReducer, on } from "@ngrx/store";
import { initialProfileJobs, initialUserState } from "../state/user.state";
import { removeUser, setJobs, setUser } from "../actions/user.actions";

export const authReducer = createReducer(initialUserState,
  

    on(setUser,(state,action)=>{
        return {
            ...state,
            user:action.user
        }

},

    ),

    on(removeUser,(state)=>{
        return {
            ...state,
            user:null
        }

},

    )




);


export const ProfileJobReducer = createReducer(initialProfileJobs,
    
    on(setJobs,(state,action)=>{
    return {

        ...state,
        jobs :action.jobs
    }
}),
on(removeUser,(state)=>{
    return {

        ...state,
        jobs :[]
    }
}),



);