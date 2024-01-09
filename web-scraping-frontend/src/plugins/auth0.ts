import { createAuth0 } from '@auth0/auth0-vue'

const auth0 = createAuth0({
  domain: import.meta.env.VITE_AUTH0_DOMAIN,
  clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
  authorizationParams: {
    redirect_uri: import.meta.env.VITE_AUTH0_CALLBACK_URL,
    audience: import.meta.env.VITE_AUTH0_AUDIENCE
  }
})
export default auth0
