import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { ProgressIndicator } from "office-ui-fabric-react";

import * as authUtils from "../auth/authUtils";
import {
  startSignoutProcessAction,
  updateUserAccountAction,
} from "../../redux/actions/actions";
import { SignInStatus } from "../../redux/reducers/states";
import { progressIndicatorStyle } from "../../styles";

class SignOutC extends React.Component {
  componentDidMount() {
    const account = authUtils.getAccount();
    if (account) {
      this.props.dispatch(startSignoutProcessAction());
      authUtils.signOut().then(() => {
        this.props.dispatch(updateUserAccountAction(null));
      });
    }
  }
  render = () => {
    return (
      <>
        {this.props.app.signOutStatus === SignInStatus.InProgress && (
          <ProgressIndicator
            label="Signing out"
            description="Please wait for signout to complete"
            styles={progressIndicatorStyle}
          />
        )}
        {this.props.app.signOutStatus !== SignInStatus.InProgress &&
          !this.props.userAccount.homeAccountId && (
            <div>
              <h4>Signed out. Please signin by clicking on resource links</h4>
            </div>
          )}
      </>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    app: state.app,
    userAccount: state.userAccount,
  };
};

export const SignOut = connect(mapStateToProps)(SignOutC);

SignOutC.propTypes = {
  userAccount: PropTypes.any,
  dispatch: PropTypes.any,
};
