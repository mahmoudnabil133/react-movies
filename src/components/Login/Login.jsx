import "./login.css";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldDescription,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Link } from "react-router"

export function Login({ className, ...props }) {
  return (
    <div
      className={cn(
        "min-h-screen w-full flex items-center justify-center relative overflow-hidden",
        className
      )}
      {...props}
    >
      {/* 🌊 Background */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1500375592092-40eb2168fd21')] bg-cover bg-center" />

      {/* 🌫️ Overlay */}
      {/* backdrop-blur-sm */}
      <div className="absolute inset-0 bg-black/20" />

      {/* 🌊 Animated waves */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-blue-500/30 to-transparent animate-pulse" />

      {/* Card */}
      <Card className="w-[420px] bg-white/10 border-white/20 backdrop-blur-xl shadow-2xl text-white animate-fade-in">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Welcome Back 🌊</CardTitle>
          <CardDescription className="text-white/70">
            Login to continue your journey
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-5">
            <FieldGroup>
              {/* Email */}
              <Field>
                <FieldLabel className="text-white">Email</FieldLabel>
                <Input
                  type="email"
                  placeholder="m@example.com"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-blue-400"
                />
              </Field>

              {/* Password */}
              <Field>
                <div className="flex items-center justify-between">
                  <FieldLabel className="text-white">Password</FieldLabel>
                  <a className="text-xs text-blue-300 hover:underline">
                    Forgot?
                  </a>
                </div>

                <Input
                  type="password"
                  className="bg-white/10 border-white/20 text-white focus-visible:ring-blue-400"
                />
              </Field>

              {/* Buttons */}
              <Field>
                <Button className="w-full bg-blue-500 hover:bg-blue-600 transition-all">
                  Login
                </Button>

                <Button
                  variant="outline"
                  type="button"
                  className="w-full mt-2 border-white/30 text-white hover:bg-white/10"
                >
                  Continue with Google
                </Button>

                <FieldDescription className="text-center text-white/60 mt-3">
                  Don’t have an account?{" "}
                  <Link className="text-blue-300 hover:underline" to="/signup">
                    Sign up
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}