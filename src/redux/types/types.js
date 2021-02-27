export const types = {

    // Root
    rootLogout: '[root]: Logout',

    // Authentication
    authChecking: '[auth] Checking login state',
    authCheckingFinished: '[auth] Checking finished',
    authStartLogin: '[auth]: Start login authorization',
    authEndLogin: '[auth]: End login authorization',
    authStartTokenRenew: '[auth] Start token renew',
    aunthEndTokenRenew: '[auth] End token renovation',
    authLogout: '[auth] Logout user',
    authSetRole: '[auth] Set role',

    // Phone Operator
    operatorEndGetting: '[oper] End get operators',
    operatorStartChecking: '[oper] Start checking',
    operatorCheckinkgFinished: '[oper] Checking finished',
    operatorGetError: '[oper] Getting operators error',
    operatorGetOK: '[oper] Getting operators ok',
    operatorClearError: '[oper] Clear error after actions',

    // Person Types
    personTypeStartChecking: '[ptyp] Start checking',
    personTypeCheckingFinished: '[ptyp] Checking finished',
    personTypeGetError: '[ptyp] Getting person types error',
    personTypeGetOK: '[ptyp] Getting person types ok',
    personTypeClearError: '[ptyp] Clear an error after actions',

    // Cities
    cityStartChecking: '[city] Start checking',
    cityCheckingFinished: '[city] Checking finised',
    cityGetError: '[city] Getting cities error',
    cityGetOk: '[city] Getting cities ok',
    cityClearError: '[city] Clear an error after actions',

    // Person
    personStartChecking: '[pers] Start checking',
    personCheckingFinished: '[pers] Checking finished',
    personCreatingError: '[pers] Creating person error',
    personCreatingOK: '[pers] Creating person ok ',
    personClearError: '[pers] Clear an error after acions',
    personGetPersonError: '[pers] Get persons information error',
    personGetPersonOK: '[pers] Get persons information ok',

    // Address
    addressStartChecking: '[addr] Start checking',
    addressCheckingFinished: '[addr] Checking finished',
    addressCreateError: '[addr] Create address errror',
    addressCreateOK: '[addr] Create address ok',
    addressClearError: '[addr] Clean an error after actions',

    // Telephone
    phoneStartChecking: '[phon] Start checking',
    phoneCheckingFinished: '[phon] Checking finished',
    phoneCreateError: '[phon] Create phone errror',
    phoneCreateOK: '[phon] Create phone ok',
    phoneClearError: '[phon] Clean an error after actions',

    // User
    userStartChecking: '[user] Start checking',
    userCheckingFinished: '[user] Checking finished',
    userCreateError: '[user] Create user errror',
    userCreateOK: '[user] Create user ok',
    userClearError: '[user] Clean an error after actions',

    // College
    collegeStartChecking: '[cole] Start checking',
    collegeCheckingFinished: '[cole] Checking finished',
    collegeCreateError: '[cole] Create college error',
    collegeCreateOK: '[cole] Create college ok',
    collegeClearError: '[cole] Clean college error after actions',
    collegeGetCollegeError: '[cole] Get college error',
    collegeGetCollegeOK: '[cole] Get college of user ok',

    // Course
    courseStartChecking: '[cour] Start checking',
    courseCheckingFinished: '[cour] Checking finished',
    courseCreateError: '[cour] Create course error',
    courseCreateOK: '[cour] Craete course ok',
    courseClearError: '[cour] Clear course error after actions',
    courseGetCollegeCourseError: '[cour] Get courses of college error',
    courseGetCollegeCoursesOK: '[cour] Get courses of college ok',
    courseSelectCourse: '[cour] Select a listed course',

    // Academic Period
    aperiodStartChecking: '[aper] Start checking',
    aperiodCheckingFinished: '[aper] Checking finished',
    aperiodCreateError: '[aper] Create academic perdiod error',
    aperiodCreateOK: '[aper] Create academic period ok',
    aperiodCleanError: '[aper] Celan academic period error after actions',

    // Subject
    subjectStartChecking: '[subj] Start checking',
    subjectCheckingFinished: '[subj] Checking finished',
    subjectClearError: '[subj] Clear subject error after actions',
    subjectGetCourseSubjectError: '[subj] Get subjects of course error',
    subjectGetCourseSubjectOK: '[subj] Get subjects of course ok',
    subjectSelectSubject: '[subj] Select a listed subject',
    subjectCreateError: '[subj] Create subject error',
    subjectCreateOK: '[subj] Create subject ok',

    // Task
    taskStartChecking: '[task] Start checking',
    taskCheckingFinished: '[task] Checking finished',
    taskClearError: '[task] Clear task error after actions',
    taskGetSubjectTaskError: '[task] Get tasks of course error',
    taskGetSubjectTaskOK: '[task] Get tasks of subject ok',
    tasktSelectTask: '[task] Select a listed task',
    taskCreateError: '[task] Create task error',
    taskCreateOK: '[task] Create task ok',


    // Teacher
    teacherStartChecking: '[tech] Start checking',
    teacherCheckingFinished: '[tech] Checking finished',
    teacherCleanError: '[tech] Clean teacher error after actions',
    teacherGetCollegeTeacherError: '[tech] Get college teachers error',
    teacherGetCollegeTeacherOK: '[tech] Get college teachers ok',
    teacherSelectTeacher: '[tech] Select a listed teacher',
    teacherGetTeacherPersonError: '[tech] Get teacher by person error',
    teacherGetTeacherPersonOK: '[tech] Get teacher by person ok',
}