import { Auth } from "aws-amplify";

export const signIn = async (
  username: string,
  password: string
): Promise<{ token: string; challenge?: "NEW_PASSWORD_REQUIRED" }> => {
  try {
    const user = await Auth.signIn(username, password);

    if (user.challengeName === "NEW_PASSWORD_REQUIRED") {
      return { token: "", challenge: "NEW_PASSWORD_REQUIRED" };
    }

    const token = user.signInUserSession.idToken.jwtToken;

    return { token };
  } catch (err) {
    throw err;
  }
};
