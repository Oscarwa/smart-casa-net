export type Event = {
  id?: number;
  name: string;
  spouseOne: string;
  spouseOneType?: string;
  spouseTwo: string;
  spouseTwoType?: string;
  date: Date;
  description?: string;
  location?: string;
};
