export interface IGamePurchase {
  donation?: boolean;
  id?: number;
  email?: string;
  created_at?: string;
  source?: string;
  currency?: string;
  price?: string;
  sale_rate?: number;
  game_id?: number;
}

export interface IGamePurchasesResponse {
  purchases?: IGamePurchase[];
}
