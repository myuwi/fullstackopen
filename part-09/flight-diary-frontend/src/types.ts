export interface Diary {
  id: number;
  date: string;
  weather: string;
  visibility: string;
  comment: string;
}

export type NonSensitiveDiary = Omit<Diary, "comment">;
