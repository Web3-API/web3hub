import axios from "axios";

const GITHUB_API_DOMAIN = "https://api.github.com";

interface OrganizationsDTO {
  login: string;
  description: string;
  id: string;
  avatar_url: string;
  repos_url: string;
}

export interface OrganizationData {
  name: string;
  id: string;
  description: string;
  avatar: string;
  repos: string;
}

const sanitizeOrganizationData = (
  orgs: OrganizationsDTO[]
): OrganizationData[] => {
  const sanitizedOrganizations: OrganizationData[] = orgs.map((org) => ({
    name: org.login,
    description: org.description,
    id: org.id,
    avatar: org.avatar_url,
    repos: org.repos_url,
  }));
  return sanitizedOrganizations;
};

export const fetchOrganizations = async (token: string) => {
  try {
    const options = {
      headers: {
        Authorization: `token ${token}`,
      },
    };
    const response = await axios.get(GITHUB_API_DOMAIN + "/user/orgs", options);

    if ("error" in response.data) {
      console.error(response.data.error);
      return null;
    }
    return sanitizeOrganizationData(response.data);
  } catch (e) {
    console.error("Error on organizations fetch -> ", e.message);
    throw new Error(e.message);
  }
};
