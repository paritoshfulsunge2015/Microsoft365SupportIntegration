import * as authUtils from "./authUtils";
import { cFetch, ResponseType } from "../../data-access/http";

const callConnectorService = (endpoint, authToken, callback, responseType) => {
  const bearer = `Bearer ${authToken}`;

  const headers = { Authorization: bearer };

  return cFetch({
    url: endpoint,
    method: "GET",
    headers: headers,
    responseType: responseType,
  })
    .then((response) => {
      if (callback && typeof callback === "function") {
        callback(response);
      }
    })
    .catch((error) => console.error(error));
};

export const getm365supportconfig = async (callback) => {
  const currentAcc = authUtils.getAccount();
  if (currentAcc) {
    const response = await authUtils
      .acquireTokenPopupC(authUtils.tokenRequest)
      .catch((error) => {
        console.log(error);
      });
    console.log(
      "authUtils.tokenRequest",
      authUtils.tokenRequest,
      "access token: ",
      response.accessToken
    );
    callConnectorService(
      authUtils.connectorConfig.getconfigEndpoint,
      response.accessToken,
      callback,
      ResponseType.blob
    );
  }
};
