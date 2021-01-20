import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { PrimaryButton, ProgressIndicator } from "office-ui-fabric-react";

import * as authUtils from "../auth/authUtils";
import { loadProfile, loadMessages, loadPicture } from "../auth/graph";
import {
  startSigninProcessAction,
  signInCompleteAction,
  updateUserAccountAction,
  updatePhotoUrlAction,
} from "../../redux/actions/actions";
import { SignInStatus } from "../../redux/reducers/states";
import { isEmptyOrNullOrUndefined } from "../common/utils";
import { buttonStyles, progressIndicatorStyle } from "../../styles";

class GetConciergeConfigC extends React.Component {
  componentDidMount() {
    const account = authUtils.getAccount();
    if (!account) {
      this.props.dispatch(startSigninProcessAction());
      authUtils
        .signIn()
        .then((response) => {
          this.props.dispatch(updateUserAccountAction(response));
        })
        .catch((error) => {
          this.props.dispatch(signInCompleteAction(SignInStatus.Failed));
        });
    } else {
      this.props.dispatch(updateUserAccountAction(account));
    }
  }

  render = () => {
    return (
      <div>
        {this.props.app.signinStatus === SignInStatus.InProgress && (
          <ProgressIndicator
            label="Signing In"
            description="Please wait for signin to complete in the popup window"
            styles={progressIndicatorStyle}
          />
        )}
        {!isEmptyOrNullOrUndefined(this.props.userAccount.homeAccountId) && (
          <PrimaryButton
            text="Load"
            styles={buttonStyles}
            onClick={this._onLoadClick}
          />
        )}
        {this.props.app.signinStatus === SignInStatus.Failed &&
          !this.props.userAccount.homeAccountId && (
            <div>
              <h4>Signin failed. Please try again later</h4>
            </div>
          )}
      </div>
    );
  };

  _onLoadClick = () => {
    loadPicture(this._handleProfileResponse);
  };

  _handleProfileResponse = (response) => {
    const objectURL = URL.createObjectURL(response);
    this.props.dispatch(updatePhotoUrlAction(objectURL));
  };
}

const mapStateToProps = (state) => {
  return {
    app: state.app,
    userAccount: state.userAccount,
  };
};

export const GetConciergeConfig = connect(mapStateToProps)(GetConciergeConfigC);

GetConciergeConfigC.propTypes = {
  app: PropTypes.any,
  userAccount: PropTypes.any,
  dispatch: PropTypes.any,
};
