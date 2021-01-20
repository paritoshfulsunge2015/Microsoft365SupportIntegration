import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  Persona,
  PersonaSize,
  // PersonaPresence,
} from "office-ui-fabric-react/lib/Persona";
import * as authUtils from "../auth/authUtils";
import { updateUserAccountAction } from "../../redux/actions/actions";
import { isEmptyOrNullOrUndefined } from "../common/utils";

const personaStyles = {
  root: {
    marginTop: "4px",
  },
};

// const personaUrl = require("../../assets/avatar_test_male.png");
class HeaderC extends React.PureComponent {
  componentDidMount() {
    this.props.dispatch(updateUserAccountAction(authUtils.getAccount()));
  }

  render = () => {
    const account = authUtils.getAccount();
    let persona;
    if (account) {
      persona = {
        // imageUrl: "../src/assets/avatar_test_male.png",
        imageUrl: !isEmptyOrNullOrUndefined(this.props.userAccount.photoUrl)
          ? this.props.userAccount.photoUrl
          : "../src/assets/avatar_test_male.png",
        imageInitials: authUtils.getAccountInitials(this.props.userAccount),
        text: authUtils.getUserFullName(this.props.userAccount),
        secondaryText: authUtils.getUserName(this.props.userAccount),
        tertiaryText: "",
        optionalText: "",
      };
    }

    return (
      <div className="header">
        <div className="headerText">Microsoft 365 Support Integration </div>
        <Persona
          {...persona}
          // presence={PersonaPresence.busy}
          imageAlt={authUtils.getUserName(this.props.userAccount)}
          styles={personaStyles}
          size={PersonaSize.size72}
        />
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    userAccount: state.userAccount,
  };
};

export const Header = connect(mapStateToProps)(HeaderC);

HeaderC.propTypes = {
  userAccount: PropTypes.any,
  dispatch: PropTypes.any,
};
