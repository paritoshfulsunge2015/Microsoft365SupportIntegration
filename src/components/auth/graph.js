import * as authUtils from "./authUtils";
import { cFetch, ResponseType } from "../../data-access/http";

const callMSGraph = (endpoint, authToken, callback, responseType) => {
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

export const loadProfile = async (callback) => {
  const currentAcc = authUtils.getAccount();
  if (currentAcc) {
    const response = await authUtils.acquireTokenPopupC().catch((error) => {
      console.log(error);
    });
    callMSGraph(
      authUtils.graphConfig.graphMeEndpoint,
      response.accessToken,
      callback
    );
  }
};

export const loadMessages = async (callback) => {
  const currentAcc = authUtils.getAccount();
  if (currentAcc) {
    const response = await authUtils.acquireTokenPopupC().catch((error) => {
      console.log(error);
    });
    callMSGraph(
      authUtils.graphConfig.graphMailEndpoint,
      response.accessToken,
      callback
    );
  }
};

export const loadPicture = async (callback) => {
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
    callMSGraph(
      authUtils.graphConfig.graphPhotoEndPoint,
      response.accessToken,
      callback,
      ResponseType.blob
    );
  }
};
