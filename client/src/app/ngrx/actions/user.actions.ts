import { createAction, props } from "@ngrx/store";
import { Job, User } from "../../types/User";

export const setUser = createAction("setUser",props<{user:User}>() );
export const removeUser = createAction("removeUser" );


export const setJobs = createAction("setJobs",props<{jobs:Job[]}>() );
export const removeJobs = createAction("removeJobs" );
