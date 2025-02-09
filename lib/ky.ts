import ky from "ky";
import useAuthStore from "@/store/auth/auth";
import { isTokenExpired } from "./token-helper";
// import { BASE_URL as BASE_TEST_URL } from "@env";

// Define your ky instance
const http = ky.create({
  prefixUrl: process.env.EXPO_PUBLIC_API_BASEURL,
  timeout: 10000,
  retry: 3,

  hooks: {
    beforeRequest: [
      async (request) => {
        const { accessToken, refreshTokenFlow, setStatus } =
          useAuthStore.getState();

        // Check if the access token exists and is expired
        if (accessToken && isTokenExpired(accessToken)) {
          try {
            await refreshTokenFlow();
          } catch {
            setStatus("unauthenticated");
          }
        }

        // Attach the refreshed or existing access token to the request
        const updatedAccessToken = useAuthStore.getState().accessToken;
        if (updatedAccessToken) {
          request.headers.set("Authorization", `Bearer ${updatedAccessToken}`);
        }
      },
    ],
    afterResponse: [
      async (request, options, response) => {
        if (response.status === 401) {
          const { resetStore } = useAuthStore.getState();
          resetStore();
        }
      },
    ],
  },
});

export default http;
