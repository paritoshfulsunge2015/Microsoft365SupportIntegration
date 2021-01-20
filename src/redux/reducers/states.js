export const adminConsentInitialState = {
  // labenvironment tenant id
  // TenantId: "32cd7244-2cc5-434f-abe7-bb8288de00c2",
  // 365ninjas tenant id
  TenantId: "44471794-7fa1-4138-927c-836baffba2ea",
  // connect app created in 365 ninjas
  // M365ConnectorApiClientId: "8315dd38-92a7-464f-a23d-68d4c3125a8d",
  // app if of the support central sample hosting app
  M365ConnectorApiClientId: "653d3eee-ff31-4ede-9816-c669eb07b4be",
  ConsentRedirectUri:
    "http://localhost:3000/adminconsent?consentCompleted=true",
  ConsentCompleted: false,
  // labenvironment snow client app id
  // ServiceNowAppClientId: "5890b095-3848-4b8b-8ea3-eaace47e9169",
  // 365 ninjas ServiceNowO365Assistant app id
  ServiceNowAppClientId: "a7259092-058b-41fd-a2c2-7c0f2c200899",
};

export const useraccountInitialState = {
  environment: "",
  homeAccountId: "",
  name: "",
  tenantId: "",
  username: "",
  photoUrl: "",
};

export const SignInStatus = {
  NotStarted: 0,
  InProgress: 1,
  Completed: 2,
  Failed: 3,
};

export const appState = {
  signinStatus: SignInStatus.NotStarted,
  signOutStatus: SignInStatus.NotStarted,
};

export const appInitialState = {
  app: appState,
  consent: adminConsentInitialState,
  userAccount: useraccountInitialState,
};
