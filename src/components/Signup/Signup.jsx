import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useAuth, useI18n } from "../../hooks/useStores";
import { toast } from "../../lib/toast";
import AuthLayout from "../auth/AuthLayout";

export function Signup({ className, ...props }) {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { t } = useI18n();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <AuthLayout
      className={className}
      title={t("createAccount")}
      subtitle={t("signupSubtitle")}
      footer={
        <>
          {t("alreadyHaveAccount")}{" "}
          <Link
            to="/login"
            className="text-blue-400 font-medium hover:text-blue-300 transition-colors underline-offset-4 hover:underline"
          >
            {t("login")}
          </Link>
        </>
      }
      {...props}
    >
      <form
        className="space-y-4"
        onSubmit={async (e) => {
          e.preventDefault();
          setLoading(true);
          setError(null);
          try {
            await register({ name, phone, email, password });
            toast.success(t("signupSuccess"));
            navigate("/");
          } catch (err) {
            setError(err.message || t("signupFailed"));
            toast.error(err.message || t("signupFailed"));
          } finally {
            setLoading(false);
          }
        }}
      >
        <FieldGroup className="gap-3.5">
          <Field className="auth-field gap-1.5">
            <FieldLabel className="text-foreground text-sm font-medium">
              {t("name")}
            </FieldLabel>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              required
              autoComplete="name"
              className="h-11 bg-muted/50 border-border focus-visible:ring-blue-500/30 transition-all duration-200 focus-visible:scale-[1.01]"
            />
          </Field>

          <Field className="auth-field gap-1.5">
            <FieldLabel className="text-foreground text-sm font-medium">
              {t("phone")}
            </FieldLabel>
            <Input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 000 000 0000"
              autoComplete="tel"
              className="h-11 bg-muted/50 border-border focus-visible:ring-blue-500/30 transition-all duration-200 focus-visible:scale-[1.01]"
            />
          </Field>

          <Field className="auth-field gap-1.5">
            <FieldLabel className="text-foreground text-sm font-medium">
              {t("email")}
            </FieldLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              autoComplete="email"
              className="h-11 bg-muted/50 border-border focus-visible:ring-blue-500/30 transition-all duration-200 focus-visible:scale-[1.01]"
            />
          </Field>

          <Field className="auth-field gap-1.5">
            <FieldLabel className="text-foreground text-sm font-medium">
              {t("password")}
            </FieldLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
              className="h-11 bg-muted/50 border-border focus-visible:ring-blue-500/30 transition-all duration-200 focus-visible:scale-[1.01]"
            />
          </Field>

          {error && (
            <div className="auth-field auth-error rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {error}
            </div>
          )}

          <Field className="auth-field pt-1">
            <Button
              type="submit"
              disabled={loading}
              className={cn("auth-submit w-full h-11 rounded-xl text-sm font-semibold")}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="auth-spinner" />
                  {t("signingUp")}
                </span>
              ) : (
                t("signup")
              )}
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </AuthLayout>
  );
}
