import * as msal from "@azure/msal-browser";

import { isNullOrUndefined } from "../common/utils";
import { adminConsentInitialState } from "../../redux/reducers/states";

export const msalConfig = {
  auth: {
    clientId: adminConsentInitialState.ServiceNowAppClientId,
    authority: `https://login.microsoftonline.com/${adminConsentInitialState.TenantId}/`,
  },
  cache: {
    cacheLocation: "localStorage", // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
  system: {
    loggerOptions: {
      loggerCallback: function (level, message, containsPii) {
        if (containsPii) {
          return;
        }
        switch (level) {
          case msal.LogLevel.Error:
            console.error(message);
            return;
          case msal.LogLevel.Info:
            console.info(message);
            return;
          case msal.LogLevel.Verbose:
            console.log(message);
            return;
          case msal.LogLevel.Warning:
            console.warn(message);
            return;
        }
      },
    },
  },
};

export const loginRequest = { scopes: ["User.Read"] };

export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
  graphMailEndpoint: "https://graph.microsoft.com/v1.0/me/messages",
  graphPhotoEndPoint: "https://graph.microsoft.com/v1.0/me/photo/$value",
};

export const connectorConfig = {
  getconfigEndpoint:
    "http://localhost:1624/api/m365support/getm365supportconfig?hostingAppName=M365AdminPortal",
};

export const tokenRequest = {
  scopes: ["api://653d3eee-ff31-4ede-9816-c669eb07b4be/access_as_user"],
  forceRefresh: false,
};

// export const silentRequest = {
//   scopes: ["openid", "profile", "User.Read", "Mail.Read"],
// };

export const silentRequest = {
  scopes: ["User.Read"],
  loginHint: "pafulsunlabenv@labenvironment.com",
};

export const SignInType = {
  loginRedirect: "loginRedirect",
  loginPopup: "loginPopup",
};

const ua = window.navigator.userAgent;
const msie = ua.indexOf("MSIE ");
const msie11 = ua.indexOf("Trident/");
const msedge = ua.indexOf("Edge/");
const msedgechromium = ua.indexOf("Edg/");

export const IsIE = () => {
  return msie > 0 || msie11 > 0;
};

export const IsEdge = () => {
  return msedge > 0 || msedgechromium > 0;
};

export const msalObj = new msal.PublicClientApplication(msalConfig);

export const handleError = (error) => {
  console.error(error);
  throw error;
};

export const getAccount = () => {
  const currAccounts = msalObj.getAllAccounts();
  if (isNullOrUndefined(currAccounts)) {
    return;
  } else if (!!currAccounts && currAccounts.length > 1) {
    // chose account logic here
  } else {
    return currAccounts[0];
  }
};

export const getAccountInitials = (account) => {
  if (account) {
    const name = account.name;
    const splits = name.split(" ");
    const firstName = splits.length > 0 ? splits[0] : "";
    const lastName = splits.length > 1 ? splits[1] : "";
    return `${firstName[0]}${lastName[0]}`;
  }
  return "";
};

export const getUserName = (account) => {
  if (account) {
    return account.username;
  }
  return "";
};

export const getUserFullName = (account) => {
  if (account) {
    return account.name;
  }
  return "";
};

export const handleResponse = (response) => {
  if (response !== null) {
    return response.account;
  } else {
    return getAccount();
  }
};

export const signIn = async () => {
  const singInType = IsIE() ? SignInType.loginRedirect : SignInType.loginPopup;
  switch (singInType) {
    case SignInType.loginPopup:
      return await msalObj
        .loginPopup(loginRequest)
        .then(handleResponse)
        .catch(handleError);
    case SignInType.loginRedirect:
      return await msalObj
        .loginRedirect(loginRequest)
        .then(handleResponse)
        .catch(handleError);
  }
};

export const signInWithSSO = async () => {
  const singInType = IsIE() ? SignInType.loginRedirect : SignInType.loginPopup;
  switch (singInType) {
    case SignInType.loginPopup:
      return await msalObj
        .loginPopup(silentRequest)
        .then(handleResponse)
        .catch(handleError);
    case SignInType.loginRedirect:
      return await msalObj
        .loginRedirect(silentRequest)
        .then(handleResponse)
        .catch(handleError);
  }
};

export const signOut = () => {
  const account = getAccount();
  if (account) {
    const logOutRequest = {
      account: account,
    };

    return msalObj.logout(logOutRequest);
  }
};

const executeAcquireTokenPopup = async (account, request) => {
  const currRequest = request ? request : loginRequest;
  currRequest.account = account;
  return await msalObj.acquireTokenSilent(currRequest).catch(async (error) => {
    console.log("silent token acquisition fails.");
    if (error instanceof msal.InteractionRequiredAuthError) {
      console.log("acquiring token using popup");
      return await msal.acquireTokenPopup(currRequest).catch((ex) => {
        handleError(ex);
      });
    } else {
      handleError(error);
    }
  });
};

export const acquireTokenPopupC = async (request) => {
  let account = getAccount();
  if (account) {
    return await executeAcquireTokenPopup(account, request);
  } else {
    account = await signIn().then((response) => response);
    return await executeAcquireTokenPopup(account, request);
  }
};

const executeAcquireTokenRedirect = async (account, request) => {
  const currRequest = request ? request : loginRequest;
  currRequest.account = account;
  return await msalObj.acquireTokenSilent(currRequest).catch(async (error) => {
    console.log("silent token acquisition fails.");
    if (error instanceof msal.InteractionRequiredAuthError) {
      console.log("acquiring token using redirect");
      return await msal.acquireTokenRedirect(currRequest).catch((ex) => {
        handleError(ex);
      });
    } else {
      handleError(error);
    }
  });
};

export const acquireTokenRedirectC = async (request) => {
  let account = getAccount();
  if (account) {
    return await executeAcquireTokenRedirect(account, request);
  } else {
    account = await signIn().then((response) => response);
    return await executeAcquireTokenRedirect(account, request);
  }
};
