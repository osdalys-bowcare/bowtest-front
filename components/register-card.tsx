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
    name: z.string().min(1, "El nombre y apellido es requerido"),
    email: z.string().min(1, "El correo es requerido!").email("Correo inválido!"),
    password: z
      .string()
      .min(1, "La contraseña es requerida!")
      .min(8, "La contraseña debe contener al menos 8 caracteres!"),
  });

  const RegisterCard = () => {
    const router = useRouter();
    const { toast } = useToast();
    const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      defaultValues: {
        name: "",
        email: "",
        password: "",
      },
    });

    const onSubmit = async (values: z.infer<typeof FormSchema>) => {
      try {
        const registerData = await fetch('http://127.0.0.1:8000/api/auth/register', {
          method: "POST",
          headers: {'Content-Type':  'application/json'},
          body: JSON.stringify(values)
        });

        if(!registerData.ok){
          toast({
            variant: "destructive",
            title: "Error!",
            description: "Ha ocurrido un error. Revise todos los campos",
            action: <ToastAction altText="Cerrar">Cerrar</ToastAction>,
          })
        }
        else{
          const session = await registerData.json();
          const token = session.token;
          sessionStorage.setItem('token', token)
          toast({
            className: "bg-green-600 text-white",
            title: "Registro Exitoso!",
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
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Registro</CardTitle>
            <CardDescription>
              Crea una cuenta y descubre nuestros servicios!
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
              <div className="grid gap-2">
              <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre y Apellido</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              />
            </div>
            <div className="grid gap-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ej: john@correo.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              />
            </div>
            <div className="grid gap-2">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ingrese su contraseña"
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
          <CardFooter>
            <Button className="w-full">Crea tu cuenta</Button>
          </CardFooter>
        </form>
        </Form>
        <CardFooter>
          <Button className="w-full" variant="outline">
              <GoogleIcon className="mr-2 h-4 w-4" />
              Registrate con Google
            </Button>
        </CardFooter>
      </Card>
    );
}

  export default RegisterCard;