
import { z } from "zod";

export const addEntrySchema = z.object({
  project: z.string().trim().min(1, "Project is required"),
  workType: z.string().trim().min(1, "Work type is required"),
  taskDescription: z.string().trim().min(5, "Task description must be at least 5 characters"),
  hours: z
    .string()
    .trim()
    .refine((v) => v !== "", "Hours is required")
    .transform((v) => Number(v))
    .refine((v) => !Number.isNaN(v), "Hours must be a valid number")
    .refine((v) => Number.isInteger(v), "Hours must be an integer")
    .refine((v) => v >= 1, "Hours must be at least 1")
    .refine((v) => v <= 24, "Hours cannot exceed 24"),
});

export type AddEntryFormInput = z.input<typeof addEntrySchema>;   
export type AddEntryFormData  = z.output<typeof addEntrySchema>;  
