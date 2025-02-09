import http from "@/lib/ky";
import { AuthToken } from "@/types/authStore";

export class AuthService {
  static async refreshToken(
    refreshToken: string
  ): Promise<{ accessToken: AuthToken }> {
    console.log(refreshToken);
    try {
      const result = await http.post("auth/refresh-token", {
        json: { refreshToken },
      });

      const response: {
        accessToken: AuthToken;
      } = await result.json();
      // console.log("newwtoken", response.accessToken); // for debugging
      return response;
    } catch (error) {
      throw new Error("Token refresh failed");
    }
  }
}
