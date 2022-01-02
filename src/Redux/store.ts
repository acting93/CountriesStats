import { createStore,combineReducers } from "redux"
import mainReducer from "./reducer";

const rootReducer = combineReducers({
    mainReducer: mainReducer
});
 
export type StateType = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer);


export default store;