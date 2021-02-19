import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { cityReducer } from "./cityReducer";
import { personTypeReducer } from "./personTypeReducer";
import { phoneOperatorReducer } from "./phoneOperatorReducer";

export const rootReducer = combineReducers({
    auth: authReducer,
    phoneOperator: phoneOperatorReducer,
    personType: personTypeReducer,
    city: cityReducer,
    // TODO: layoutReducer,
    // TODO: studentReducer,
    // TODO: collegeReducer,
    // etc.
});