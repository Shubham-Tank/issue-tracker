import { z } from "zod";

export const issueSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255),
  description: z.string().min(1, 'Description is required').max(65535)
});

export const patchIssueSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255).optional(),
  description: z.string().min(1, 'Description is required').max(65535).optional(),
  assignedToUserId: z.string().min(1, 'assignedToUserId is required').max(255).optional().nullable()
});

export const registerUserSchema = z.object({
  name:
    z
      .string()
      .min(1, 'Please Enter Name')
      .min(5, 'Name is too small')
      .max(50, 'Name is too large'),
  email:
    z
      .string()
      .min(1, 'Please Enter Email')
      .email('Please Enter Valid Email'),
  password:
    z
      .string()
      .min(1, 'Please Enter Password')
      .min(5, 'Password is too small')
      .max(100, 'Password can not be more than 100 characters')
})