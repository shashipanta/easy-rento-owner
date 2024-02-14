import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod"
import { post_data } from '@/lib/api/api-generic'
import { API_AUTH_REGISTER } from '@/lib/api/api-routes'

const formSchema = z.object({
  username: z.string({
      required_error: "Username is required",
      invalid_type_error: "Username must be string"
  })
  .min(2, {message: "Username must be atleast 2 characters long"})
  .max(50, {message: "Username must be atmost 50 characters long"}),
  email: z.string().email({message: "Invalid email format"}),
  password: z.string().min(5, {message: "Password must be atleast 5 characters long"}),
  confirmPassword: z.string(),
  userType: z.string().default("OWNER")
}) .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword']
})


const registrationFormSchema = formSchema;


// TODO: ADD THIS TO SEPARATE FILE
interface RegistrationRequest {
    username: string,
    email: string,
    password: string,
    confirmPassword: string
    userType: string
}


// register user
function registerUser(values: RegistrationRequest) {
    console.log("REGISTRATION PROCESS IN START", values);

    const registrationData = post_data(API_AUTH_REGISTER, values);

    console.log("registration data : ", registrationData);
}

type RegistrationFormType = z.infer<typeof registrationFormSchema>

const RegistrationForm: React.FC = () => {
    const form = useForm<RegistrationFormType>({
        resolver: zodResolver(registrationFormSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            userType: "OWNER"
        }
    });
  return (
  <Form {...form}>
      <form onSubmit={form.handleSubmit(registerUser)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="barbosa" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="barbosa@gmail.com" {...field} />
              </FormControl>
              <FormDescription>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="*****" type="password" {...field} />
              </FormControl>
              <FormDescription>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input placeholder="*****" type="password" {...field} />
              </FormControl>
              <FormDescription>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>

    )
}

export default RegistrationForm;
