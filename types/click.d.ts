export interface ClickData {
  date: string;
  clicks: number;
  clickedAt: Date | null;
}

export interface TransformedData {
  date: string;
  clicks: number;
  clickedAt?: Date | null;
}