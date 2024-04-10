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

export default function LoginCard() {
  const { toast } = useToast();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Login to your account and continue creating great stuff!
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="email">Email</Label>
          <Input id="email"/>
        </div>
        <div className="space-y-1">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" />
        </div>
        <div className="flex items-center space-x-2">
          <Label htmlFor="remember-me">Remember me</Label>
          <Switch id="remember-me" />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button variant="outline">
            <GoogleIcon className="mr-2 h-4 w-4" />
            Login with Google
        </Button>
        <Button
          onClick={() => {
            toast({
              title: "Scheduled: Catch up ",
              description: "Friday, February 10, 2023 at 5:57 PM",
              action: (
                <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
              ),
            });
          }}
        >
          Login
        </Button>
      </CardFooter>
    </Card>
  );
}