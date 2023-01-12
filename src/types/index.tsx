export type ProfileRow = {
  _id: string;
  firstName: string;
  lastName: string;
  gender: 0 | 1 | null;
  dateOfBirth: string;
  sports: string[];
};

export type UserInfo = ProfileRow & {
  location: string;
  team: string;
  description: string;
};

export type Error = {
  firstName: boolean;
  lastName: boolean;
  gender: boolean;
  dateOfBirth: boolean;
  sports: boolean;
  location: boolean;
  team: boolean;
  description: boolean;
};

export type Field =
  | "firstName"
  | "lastName"
  | "gender"
  | "dateOfBirth"
  | "sports"
  | "location"
  | "team"
  | "description";
