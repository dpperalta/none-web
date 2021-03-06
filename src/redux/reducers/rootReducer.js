import { combineReducers } from "redux";
import { types } from "../types/types";
import { academicPeriodReducer } from "./academicPeriodReducer";
import { addressReducer } from "./addressReducer";
import { authReducer } from "./authReducer";
import { cityReducer } from "./cityReducer";
import { collegeReducer } from "./collegeReducer";
import { courseReducer } from "./courseReducer";
import { examReducer } from "./examReducer";
import { personReducer } from "./personReducer";
import { personTypeReducer } from "./personTypeReducer";
import { phoneOperatorReducer } from "./phoneOperatorReducer";
import { studentReducer } from "./studentReducer";
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
    task: taskReducer,
    exam: examReducer,
    student: studentReducer

    // TODO: add reducers
});