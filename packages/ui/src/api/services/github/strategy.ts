import axios from "axios";

export const ghCallback = async (accessToken: string) => {
  try {
    const { data } = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `token ${accessToken}`,
        Accept: "application/json",
      },
    });

    return data;
  } catch (e) {
    throw new Error(e);
  }
};

