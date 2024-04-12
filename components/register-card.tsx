"use client";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { Label } from "@/components/ui/label";
  import { Input } from "@/components/ui/input";
  import { Button } from "@/components/ui/button";
  import { useToast } from "./ui/use-toast";
  import { ToastAction } from "./ui/toast";
  import { GoogleIcon } from "./icons";
  import React, { SyntheticEvent, useState } from "react";
  import {useRouter} from "next/navigation";

  const RegisterCard = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const { toast } = useToast();

    const submit = async (e: SyntheticEvent) => {
    
      e.preventDefault();
      const register = await fetch('http://127.0.0.1:8000/api/auth/register', {
        method: "POST",
        headers: {'Content-Type':  'application/json'},
        body: JSON.stringify({
          name, email, password
        })
      });

      if(!register.ok){
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        })
      }
      else{
        const session = await register.json();
        const token = session.token;
        sessionStorage.setItem('token', token)
        toast({
          className: "bg-green-600 text-white",
          title: "Register Sucessfull!",
        })
        await router.push('/dashboard')
      }

    }
  
    return (
      <Card>
        <form onSubmit={submit}>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Registro</CardTitle>
            <CardDescription>
              Crea una cuenta y descubre nuestros servicios!
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
              <div className="grid gap-2">
              <Label htmlFor="name">Nombre y Apellido</Label>
              <Input id="name" type="name" placeholder="Ingresa tu nombre y apellido" onChange={e => setName(e.target.value)} required/>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Ingresa tu correo" onChange={e => setEmail(e.target.value)} required/>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="Ingresa tu contraseña" onChange={e => setPassword(e.target.value)} required/>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Crea tu cuenta</Button>
          </CardFooter>
        </form>
        <CardFooter>
          <Button className="w-full" variant="outline">
              <GoogleIcon className="mr-2 h-4 w-4" />
              Registrate con Google
            </Button>
        </CardFooter>
      </Card>
    );
  };

  export default RegisterCard;