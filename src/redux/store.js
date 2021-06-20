import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import empSignupReducer from "./reducers/empSignupReducer";
import jobReducer from "./reducers/jobReducer";

const rootReducer = combineReducers({
    jobs: jobReducer,
    empSignup: empSignupReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))