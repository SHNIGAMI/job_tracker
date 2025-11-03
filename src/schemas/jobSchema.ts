import { z } from "zod";

export const jobSchema = z.object({
  id: z.number(),
  title: z.string().min(1, "Title is required"),
  company: z.string().min(1, "Company is required"),
  status: z.enum(["applied", "interview", "offer", "rejected", "saved"]),
  location: z.string().min(1, "Location is required"),
  salary: z.number().min(0, "Salary must be positive"),
  notes: z.string(),
  createdAt: z.string(),
});

export type Job = z.infer<typeof jobSchema>;

export const createJobSchema = jobSchema.omit({ id: true, createdAt: true });

export type CreateJob = z.infer<typeof createJobSchema>;
