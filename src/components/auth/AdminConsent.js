import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { PrimaryButton, TextField } from "office-ui-fabric-react";

import { updateAdminConsentState } from "../../redux/actions/actions";
import { buttonStyles, textFieldStyles } from "../../styles";

class AdminConsentC extends React.Component {
  searchParams = new URLSearchParams(window.location.search);

  componentDidMount() {
    const consentState = this.searchParams.has("consentCompleted")
      ? this.searchParams.get("consentCompleted")
      : this.props.consent.ConsentCompleted;

    if (!this.props.consent.ConsentCompleted) {
      this.props.dispatch(updateAdminConsentState(consentState));
    }
  }

  render = () => {
    const consentButtonHref = `https://login.microsoftonline.com/${this.props.consent.TenantId}/v2.0/adminconsent?client_id=${this.props.consent.M365ConnectorApiClientId}&state=${this.props.consent.ConsentRedirectUri}&scope=https://graph.microsoft.com/User.Read.All https://graph.microsoft.com/User.Read https://graph.microsoft.com/openid`;
    return (
      <div>
        {!this.props.consent.ConsentCompleted && (
          <>
            <h2>Admin Consent</h2>
            <p>
              To enable the users on your tenant to access Microsoft 365 Support
              Integration, you need to sign-in as an admin and consent for the
              required permissions. This makes the Microsoft 365 Support
              Connector API security principle availabel in your tenant
              directory.
            </p>
            <TextField
              label={"TenantId:"}
              styles={textFieldStyles}
              defaultValue={this.props.consent.TenantId}
            />
            <TextField
              label={"Microsoft 365 Connector Api ClientId:"}
              styles={textFieldStyles}
              defaultValue={this.props.consent.M365ConnectorApiClientId}
              readOnly={true}
              disabled={true}
            />
            <TextField
              label={"Consent redirect uri:"}
              styles={textFieldStyles}
              defaultValue={this.props.consent.ConsentRedirectUri}
            />
            <PrimaryButton
              text="Admin Consent"
              styles={buttonStyles}
              // href={this.props.consent.ConsentRedirectUri}
              href={consentButtonHref}
              // target={"_blank"}
            />
          </>
        )}
        {this.props.consent.ConsentCompleted && (
          <>
            <div>
              <h2>Consent Accepted.</h2>
            </div>
            <p>
              {
                "Please go to portal.azure.com > App registration > ServiceNowClientApp > Api permissions, to add Microsoft 365 Support Conncetor Api permissions"
              }
            </p>
          </>
        )}
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    consent: state.consent,
  };
};

export const AdminConsent = connect(mapStateToProps)(AdminConsentC);

AdminConsentC.propTypes = {
  consent: PropTypes.any,
  dispatch: PropTypes.any,
};
