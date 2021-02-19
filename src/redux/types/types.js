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

}