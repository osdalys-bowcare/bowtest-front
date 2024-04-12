"use client";

import {useEffect, useState} from "react";
import { Button } from "@/components/ui/button";
import {useRouter} from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

export default function DashboardPage() {
    const [message, setMessage] = useState('');
    const [auth, setAuth] = useState(false);
    const router = useRouter();
    const { toast } = useToast();

    const logout = async () => {
        await fetch('http://localhost:8000/api/auth/logout', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
        })
        sessionStorage.removeItem('token');
        setAuth(false);
        toast({
          className: "bg-green-600 text-white",
          title: "Logout Sucessfull!",
        })
        await router.push('/');
    }

    useEffect(() => {
        (
            async () => {
                try {
                    const response = await fetch('http://localhost:8000/api/auth/get-user', {
                        method: 'GET',
                        headers: {
                          Accept: 'application/json',
                          'Content-Type': 'application/json',
                          Authorization: 'Bearer' + sessionStorage.getItem('token')
                        },
                    });

                    const content = await response.json();
                    setMessage(`${content.name}`);
                    setAuth(true);
                } catch (e) {
                    setAuth(false);
                    return router.push('/');
                }
            }
        )();
    });
    
  if (!sessionStorage.getItem('token')) {
    return router.push('/')
  }
  else {
    return (
      <>
        <div className="hidden flex-col md:flex">
          <div className="border-b">
            <div className="flex h-16 items-center px-4">
              <div className="ml-auto flex items-center space-x-4">
                  
              </div>
            </div>
          </div>
          <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">Inicio</h2>
              <div className="flex items-center space-x-2">
                <Button onClick={logout}>Cerrar Sesión</Button>
              </div>
            </div>
            <div className="flex items-center justify-between space-y-2">
              <h4 className="text-3xl tracking-tight">Bienvenido(a) {message}</h4>
            </div>
          </div>
        </div>
      </>
    )
  }

}