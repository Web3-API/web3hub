import axios from "axios";

export const ghCallback = async (accessToken: string) => {
  try {
    await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `token ${accessToken}`,
        Accept: "application/json",
      },
    });
  } catch (e) {
    throw new Error(e);
  }
};

