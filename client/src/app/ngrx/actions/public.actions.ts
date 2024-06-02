import { createAction, props } from "@ngrx/store";
import { Post } from "../../types/public";

export const all_public_post=createAction("all_public_post",props<{jobs:Post[]}>());