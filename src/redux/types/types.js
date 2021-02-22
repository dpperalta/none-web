export const types = {

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
    userCreateError: '[user] Create phone errror',
    userCreateOK: '[user] Create phone ok',
    userClearError: '[user] Clean an error after actions',
}