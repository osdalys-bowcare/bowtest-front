"use client";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "./ui/use-toast";
import { ToastAction } from "./ui/toast";
import { GoogleIcon } from "./icons";
import React, { SyntheticEvent, useState } from "react";
import {useRouter} from "next/navigation";


const FormSchema = z.object({
  email: z.string().min(1, "El correo es requerido!").email("Correo inválido!"),
  password: z
    .string()
    .min(1, "La contraseña es requerida!")
    .min(8, "La contraseña debe contener al menos 8 caracteres!"),
});

const LoginCard = () => {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    try {
      const loginData = await fetch("http://127.0.0.1:8000/api/auth/login", {
        method: "POST",
        credentials: 'include',
        headers: {'Content-Type':  'application/json'},
        body: JSON.stringify(values)
      });

      if (!loginData.ok) {
        toast({
          variant: "destructive",
          title: "Error!",
          description: "El correo y/o la contraseña son inválidos",
          action: <ToastAction altText="Cerrar">Cerrar</ToastAction>,
        })
      }else{
        const session = await loginData.json();
        const token = session.token;
        sessionStorage.setItem('token', token)
        toast({
          className: "bg-green-600 text-white",
          title: "Inicio de sesión exitoso!",
        })
        await router.push('/dashboard')
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Ocurrio un error! Intente más tarde",
      });
    }
  };

  return (
      <Card>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>Inicio de Sesión</CardTitle>
            <CardDescription>
             Accede a tu cuenta y disfruta de nuestros servicios!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo</FormLabel>
                  <FormControl>
                    <Input placeholder="mail@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              />
            </div>
            <div className="space-y-1">
              <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button className="w-full">Iniciar Sesión</Button>
          </CardFooter>
        </form>
        </Form>
        <CardFooter className="flex justify-end">
          <Button className="w-full" variant="outline">
              <GoogleIcon className="mr-2 h-4 w-4" />
              Iniciar Sesión con Google
          </Button>
        </CardFooter>
      </Card>
  );
}

export default LoginCard;