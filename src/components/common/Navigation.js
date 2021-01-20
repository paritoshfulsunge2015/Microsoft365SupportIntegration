import * as React from "react";
import { withRouter } from "react-router-dom";
import { Nav } from "office-ui-fabric-react/lib/Nav";

const navStyles = {
  root: {
    width: 350,
    marginRight: "10px",
    boxSizing: "border-box",
    border: "1px solid #eee",
    overflowY: "auto",
    height: "calc(100vh - 60px)",
  },
};

const navLinkGroups = [
  {
    links: [
      {
        key: "Home",
        name: "Home",
        url: "/",
      },
      {
        key: "AdminConsent",
        name: "Admin Consent",
        url: "/adminconsent",
      },
      // {
      //   key: "Signin",
      //   name: "Sign in",
      //   url: "/signin",
      // },
      // {
      //   key: "SigninSSO",
      //   name: "Sign in with SSO",
      //   url: "/signinsso",
      // },
      {
        name: "M365 Admin Resource Access",
        expandAriaLabel: "Expand M365 Admin Resource section",
        collapseAriaLabel: "Collapse M365 Admin Resource section",
        // disabled: true,
        links: [
          {
            key: "GetConciergeConfig",
            name: "Get Concierge Config",
            url: "/getconciergeconfig",
            // disabled: true,
          },
          {
            key: "GetAvailableModalities",
            name: "Get Available Modalities",
            url: "/about",
            disabled: true,
          },
          {
            key: "GetSolutions",
            name: "Get Alchemy Solutions",
            url: "/about",
            disabled: true,
          },
        ],
      },
      {
        name: "M365 Admin Resource Access With SSO",
        expandAriaLabel: "Expand M365 Admin Resource section",
        collapseAriaLabel: "Collapse M365 Admin Resource section",
        // disabled: true,
        links: [
          {
            key: "GetConciergeConfigSSO",
            name: "Get Concierge Config",
            url: "/getconciergeconfigwithsso",
            // disabled: true,
          },
          {
            key: "GetAvailableModalitiesSSO",
            name: "Get Available Modalities",
            url: "/about",
            disabled: true,
          },
          {
            key: "GetSolutionsSSO",
            name: "Get Alchemy Solutions",
            url: "/about",
            disabled: true,
          },
        ],
      },
      {
        key: "Signout",
        name: "Sign out",
        url: "/signout",
      },
    ],
  },
];

export const Navigation = withRouter(({ history }) => {
  return (
    <Nav
      onLinkClick={(event, element) => {
        event.preventDefault();
        history.push(element.url);
      }}
      styles={navStyles}
      groups={navLinkGroups}
    />
  );
});
