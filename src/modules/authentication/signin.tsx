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
import { signinSchema } from "@/schema";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { axiosInstance } from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
// import { Checkbox } from "@/components/ui/checkbox";

const initialValue = {
  email: "",
  password: "",
};

export const SignIn = () => {
  const route = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
    defaultValues: initialValue,
  });

  const onSubmit = async (values: z.infer<typeof signinSchema>) => {
    try {
      const { data, status } = await axiosInstance.post("/signin", values);

      if (status === 200) {
        form.reset();
        toast({ description: "Sign-in successful!" });
        route.push("/");
        console.log(data);
      } else {
        toast({
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive",
        });
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
          <CardTitle>Sign in</CardTitle>
          <CardDescription>Please enter your necessary! </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
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
                      <Input
                        placeholder="Password"
                        {...field}
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 my-4">
                    <FormControl>
                      <Checkbox />
                    </FormControl>
                    <FormLabel>Remember me</FormLabel>
                  </FormItem>
                )}
              /> */}

              <Button type="submit" className="mt-4 w-full">
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <CardDescription>
            You do not have an account!
            <Link className="text-blue-600 pl-3 underline" href="/signup">
              Sing up
            </Link>
          </CardDescription>
        </CardFooter>
      </Card>
    </main>
  );
};
