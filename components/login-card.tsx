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
import { Switch } from "./ui/switch";
import { useToast } from "./ui/use-toast";
import { ToastAction } from "./ui/toast";
import { GoogleIcon } from "./icons";
import React, { SyntheticEvent, useState } from "react";
import {useRouter} from "next/navigation";

const LoginCard = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { toast } = useToast();

  const submit = async (e: SyntheticEvent) => {
    
    e.preventDefault();
    const login = await fetch('http://127.0.0.1:8000/api/auth/login', {
      method: "POST",
      credentials: 'include',
      headers: {'Content-Type':  'application/json'},
      body: JSON.stringify({
        email, password
      })
    });

    if(!login.ok){
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
    }
    else{
      const session = await login.json();
      const token = session.token;
      sessionStorage.setItem('token', token)
      toast({
        className: "bg-green-600 text-white",
        title: "Login Sucessfull!",
      })
      await router.push('/dashboard')
    }
    
  }

  return (
      <Card>
        <form onSubmit={submit}>
          <CardHeader>
            <CardTitle>Inicio de Sesión</CardTitle>
            <CardDescription>
             Accede a tu cuenta y disfruta de nuestros servicios!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="email">Correo</Label>
              <Input id="email" onChange={e => setEmail(e.target.value)} required/>
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Contraseña</Label>
              <Input id="password" type="password" onChange={e => setPassword(e.target.value)} required/>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button className="w-full">Iniciar Sesión</Button>
          </CardFooter>
        </form>
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