"use client";

import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signupSchema } from "@/schema";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { axiosInstance } from "@/lib/axios";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

const initialValue = {
  name: "",
  email: "",
  password: "",
};

export const SignUp = () => {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: initialValue,
  });

  const onSubmit = async (values: z.infer<typeof signupSchema>) => {
    try {
      const res = await axiosInstance.post("/signup", values);

      if (res.status === 200) {
        form.reset();
        toast({ description: "Sign up successful!" });
        router.push("/signin");
      } else {
        toast({ description: res?.data?.error, variant: "destructive" });
      }
    } catch (error) {
      if (error instanceof Error) {
        toast({
          description: "An unexpected error occurred.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <main className="flex justify-center items-center h-screen">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Sign up</CardTitle>
          <CardDescription>Please enter your necessary! </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Full Name" {...field} />
                    </FormControl>
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
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="mt-4 w-full">
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <CardDescription>
            You have already an account!
            <Link className="text-blue-600 pl-3 underline" href="/signin">
              Sing in
            </Link>
          </CardDescription>
        </CardFooter>
      </Card>
    </main>
  );
};
