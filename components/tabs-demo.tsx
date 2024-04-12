import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"
  import LoginCard from "./login-card"
  import RegisterCard from "./register-card"
  
  export function TabsDemo() {
    return (
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Inicio de Sesión</TabsTrigger>
          <TabsTrigger value="password">Registro</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <LoginCard />
        </TabsContent>
        <TabsContent value="password">
          <RegisterCard />
        </TabsContent>
      </Tabs>
    )
  }