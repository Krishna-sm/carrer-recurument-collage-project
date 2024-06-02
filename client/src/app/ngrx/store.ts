import { ProfileJobReducer, authReducer } from "./reducers/auth.reducer";
import { PublicReducer } from "./reducers/public.reducer";

export const store = {
    user:authReducer,
    jobs:ProfileJobReducer,
    public:PublicReducer
}