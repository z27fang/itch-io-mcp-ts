export interface IUser {
  display_name?: string;
  gamer?: boolean;
  username?: string;
  id?: number;
  url?: string;
  press_user?: boolean;
  developer?: boolean;
  cover_url?: string;
}

export interface IDownloadKey {
  id?: number;
  created_at?: string;
  downloads?: number;
  key?: string;
  game_id?: number;
  owner?: IUser;
}

export interface IDownloadKeyCheckResponse {
  download_key?: IDownloadKey;
}

export interface IDownloadKeyCheckError {
  errors?: string[];
}
