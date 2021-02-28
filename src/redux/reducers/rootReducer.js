import { combineReducers } from "redux";
import { academicPeriodReducer } from "./academicPeriodReducer";
import { addressReducer } from "./addressReducer";
import { authReducer } from "./authReducer";
import { cityReducer } from "./cityReducer";
import { collegeReducer } from "./collegeReducer";
import { courseReducer } from "./courseReducer";
import { personReducer } from "./personReducer";
import { personTypeReducer } from "./personTypeReducer";
import { phoneOperatorReducer } from "./phoneOperatorReducer";
import { subjectReducer } from "./subjectReducer";
import { taskReducer } from "./taskReducer";
import { teacherReducer } from "./teacherReducer";
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
    user: userReducer,
    college: collegeReducer,
    course: courseReducer,
    academicPeriod: academicPeriodReducer,
    subject: subjectReducer,
    teacher: teacherReducer,
    task: taskReducer

    // TODO: studentReducer,
    // etc.
});