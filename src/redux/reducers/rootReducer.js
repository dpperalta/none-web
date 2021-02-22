import { combineReducers } from "redux";
import { addressReducer } from "./addressReducer";
import { authReducer } from "./authReducer";
import { cityReducer } from "./cityReducer";
import { personReducer } from "./personReducer";
import { personTypeReducer } from "./personTypeReducer";
import { phoneOperatorReducer } from "./phoneOperatorReducer";
import { telephoneReducer } from "./telephoneReducer";
import { userReducer } from "./userReducer";

export const rootReducer = combineReducers({
    auth: authReducer,
    phoneOperator: phoneOperatorReducer,
    personType: personTypeReducer,
    city: cityReducer,
    person: personReducer,
    address: addressReducer,
    telephone: telephoneReducer,
    user: userReducer

    // TODO: studentReducer,
    // TODO: collegeReducer,
    // etc.
});