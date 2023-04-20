import { UserAgentApplication } from 'msal';

const clientId = 'c0a3815...';
const tenantId = 'f8cdef31...';
const redirectUri = window.location.origin;

const config = {
  auth: {
    clientId,
    authority: `https://login.microsoftonline.com/${ tenantId }`,
    redirectUri,
    postLogoutRedirectUri: redirectUri
  }
};

const tokenConfig = {
  scopes: [ 'User.Read' ]
};

export const auth = new UserAgentApplication(config);

auth.handleRedirectCallback((error) => {
  if (error) {
    console.error(error);
  }
});

export const getToken = () => auth.acquireTokenSilent(tokenConfig)
  .catch(() => auth.acquireTokenRedirect(tokenConfig))
  .then(({ idToken }) => idToken.rawIdToken);
