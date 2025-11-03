import client from "./client";
import { Job, CreateJob } from "../schemas/jobSchema";

export const getJobs = (): Promise<Job[]> =>
  client.get("/jobs").then((res) => res.data);

export const getJob = (id: number): Promise<Job> =>
  client.get(`/jobs/${id}`).then((res) => res.data);

export const createJob = (job: CreateJob): Promise<Job> =>
  client.post("/jobs", job).then((res) => res.data);

export const updateJob = (id: number, job: Partial<CreateJob>): Promise<Job> =>
  client.put(`/jobs/${id}`, job).then((res) => res.data);

export const deleteJob = (id: number): Promise<void> =>
  client.delete(`/jobs/${id}`).then(() => undefined);
