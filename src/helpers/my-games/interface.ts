export interface IEarnings {
  currency: string;
  amount_formatted: string;
  amount: number;
}

export interface IGame {
  cover_url?: string;
  created_at?: string;
  downloads_count?: number;
  id?: number;
  min_price?: number;
  p_android?: boolean;
  p_linux?: boolean;
  p_osx?: boolean;
  p_windows?: boolean;
  published?: boolean;
  published_at?: string;
  purchases_count?: number;
  short_text?: string;
  title?: string;
  type?: string;
  url?: string;
  views_count?: number;
  earnings?: IEarnings[];
}

export interface IMyGamesResponse {
  games: IGame[];
}
