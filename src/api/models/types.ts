export interface ApiData {
  id: number;
  name: string;
  subtext: string;
  description: string;
  icon: string;
  locationUri: string;
  pointerUris: string[];
  ownerId?: string;
}
export interface UserData {
  id: number;
  username?: string;
  address?: string;
  accessToken?: string;
  authType?: number;
  githubId?: string;
}
export interface Authentication {
  github?: {
    accessToken?: string;
    [k: string]: unknown;
  };
  [k: string]: unknown;
}