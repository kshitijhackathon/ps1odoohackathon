import { sql } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull(), // student, company, tpo
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  // Student specific fields
  rollNumber: text("roll_number"),
  branch: text("branch"),
  graduationYear: text("graduation_year"),
  // Company specific fields
  hrContact: text("hr_contact"),
  contactNumber: text("contact_number"),
  // TPO specific fields
  instituteName: text("institute_name"),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
});

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  role: z.enum(["student", "company", "tpo"]),
});

export const studentRegistrationSchema = insertUserSchema.pick({
  email: true,
  password: true,
  name: true,
  role: true,
  rollNumber: true,
  branch: true,
  graduationYear: true,
}).extend({
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export const companyRegistrationSchema = insertUserSchema.pick({
  email: true,
  password: true,
  name: true,
  role: true,
  hrContact: true,
  contactNumber: true,
}).extend({
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export const tpoRegistrationSchema = insertUserSchema.pick({
  email: true,
  password: true,
  name: true,
  role: true,
  instituteName: true,
  contactNumber: true,
}).extend({
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type LoginData = z.infer<typeof loginSchema>;
export type StudentRegistrationData = z.infer<typeof studentRegistrationSchema>;
export type CompanyRegistrationData = z.infer<typeof companyRegistrationSchema>;
export type TpoRegistrationData = z.infer<typeof tpoRegistrationSchema>;
