import axios from "axios";
import { User } from "../../models/User";

export const ghCallback = async (accessToken: string) => {
  try {
    const { data: ghData } = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `token ${accessToken}`,
        Accept: "application/json",
      },
    });

    const githubId = ghData.id.toString();
    const username = ghData.username || ghData.url.split("/").slice(-1)[0];

    const user = await User.findOrCreateByGithub({
      username,
      githubId,
    });

    return {
      accessToken,
      username,
      githubId: ghData.id,
      id: user.id,
    };
  } catch (e) {
    throw new Error(e);
  }
};

