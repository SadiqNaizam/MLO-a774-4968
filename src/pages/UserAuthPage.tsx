import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import NavigationMenu from '@/components/layout/NavigationMenu';
import Footer from '@/components/layout/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { LogIn, UserPlus, AlertTriangle } from 'lucide-react';

// Define Zod schemas for validation
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});
type LoginFormData = z.infer<typeof loginSchema>;

const registerSchema = z.object({
  username: z.string().min(3, { message: "Username must be at least 3 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"], // path of error
});
type RegisterFormData = z.infer<typeof registerSchema>;

const UserAuthPage: React.FC = () => {
  console.log('UserAuthPage loaded');
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("login");
  const [authMessage, setAuthMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "user@example.com", password: "password123" }, // Default credentials
  });

  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { username: "", email: "", password: "", confirmPassword: "" },
  });

  const onLoginSubmit: SubmitHandler<LoginFormData> = async (data) => {
    console.log("Login data:", data);
    // Simulate API call
    setAuthMessage(null); 
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (data.email === "user@example.com" && data.password === "password123") {
      setAuthMessage({ type: 'success', text: 'Login successful! Redirecting...' });
      setTimeout(() => navigate('/'), 1500); // Redirect to homepage
    } else {
      setAuthMessage({ type: 'error', text: 'Invalid email or password.' });
      loginForm.reset({ email: data.email, password: "" }); // Keep email, clear password
    }
  };

  const onRegisterSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    console.log("Register data:", data);
    setAuthMessage(null);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setAuthMessage({ type: 'success', text: 'Registration successful! Please login.' });
    setActiveTab("login"); // Switch to login tab
    registerForm.reset();
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavigationMenu />
      <main className="flex-grow flex items-center justify-center py-12 px-4 bg-muted/30">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">
              {activeTab === "login" ? "Welcome Back!" : "Create an Account"}
            </CardTitle>
            <CardDescription>
              {activeTab === "login" ? "Login to access your account." : "Join GameImpact to save preferences and more."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              
              {authMessage && (
                <Alert variant={authMessage.type === 'error' ? 'destructive' : 'default'} className="mt-4">
                  {authMessage.type === 'error' && <AlertTriangle className="h-4 w-4" />}
                  <AlertTitle>{authMessage.type === 'success' ? 'Success' : 'Error'}</AlertTitle>
                  <AlertDescription>{authMessage.text}</AlertDescription>
                </Alert>
              )}

              <TabsContent value="login">
                <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-6 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input id="login-email" type="email" placeholder="you@example.com" {...loginForm.register("email")} />
                    {loginForm.formState.errors.email && <p className="text-sm text-destructive">{loginForm.formState.errors.email.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <Input id="login-password" type="password" placeholder="••••••••" {...loginForm.register("password")} />
                    {loginForm.formState.errors.password && <p className="text-sm text-destructive">{loginForm.formState.errors.password.message}</p>}
                  </div>
                  <Button type="submit" className="w-full" disabled={loginForm.formState.isSubmitting}>
                    <LogIn className="mr-2 h-4 w-4" /> {loginForm.formState.isSubmitting ? 'Logging in...' : 'Login'}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="register">
                <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-6 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-username">Username</Label>
                    <Input id="register-username" placeholder="yourusername" {...registerForm.register("username")} />
                     {registerForm.formState.errors.username && <p className="text-sm text-destructive">{registerForm.formState.errors.username.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <Input id="register-email" type="email" placeholder="you@example.com" {...registerForm.register("email")} />
                     {registerForm.formState.errors.email && <p className="text-sm text-destructive">{registerForm.formState.errors.email.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Password</Label>
                    <Input id="register-password" type="password" placeholder="••••••••" {...registerForm.register("password")} />
                     {registerForm.formState.errors.password && <p className="text-sm text-destructive">{registerForm.formState.errors.password.message}</p>}
                  </div>
                   <div className="space-y-2">
                    <Label htmlFor="register-confirm-password">Confirm Password</Label>
                    <Input id="register-confirm-password" type="password" placeholder="••••••••" {...registerForm.register("confirmPassword")} />
                     {registerForm.formState.errors.confirmPassword && <p className="text-sm text-destructive">{registerForm.formState.errors.confirmPassword.message}</p>}
                  </div>
                  <Button type="submit" className="w-full" disabled={registerForm.formState.isSubmitting}>
                    <UserPlus className="mr-2 h-4 w-4" /> {registerForm.formState.isSubmitting ? 'Registering...' : 'Register'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Site content is accessible without an account. <Link to="/" className="underline hover:text-primary">Return to Home</Link>
            </p>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default UserAuthPage;