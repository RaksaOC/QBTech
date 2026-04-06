export type Job = {
  id: number;
  name: string;
  description: string;
  department: string;
  timeType: string;
  location: string | null;
  createdAt: string;
  updatedAt: string;
};

export type MessageRow = {
  id: number;
  email: string;
  name: string | null;
  body: string;
  jobId: number | null;
  resumePath: string | null;
  createdAt: string;
};

export type AdminStats = {
  jobs: number;
  messages: number;
  applications: number;
};

export type LoginResponse = {
  token: string;
  admin: { id: number; email: string };
};
