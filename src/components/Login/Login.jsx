import { Link, useNavigate } from "react-router";
import { useFormik } from "formik";
import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useAuth, useI18n } from "../../hooks/useStores";
import { toast } from "../../lib/toast";
import { createLoginSchema } from "../../lib/validations/authSchemas";
import { parseWithSchema, showValidationErrors } from "../../lib/validations/showValidationErrors";
import AuthLayout from "../auth/AuthLayout";

const inputClassName =
  "h-11 bg-muted/50 border-border focus-visible:ring-blue-500/30 transition-all duration-200 focus-visible:scale-[1.01]";

export function Login({ className, ...props }) {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { t } = useI18n();
  const loginSchema = useMemo(() => createLoginSchema(t), [t]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values, { setSubmitting }) => {
      const result = parseWithSchema(loginSchema, values);

      if (!result.success) {
        showValidationErrors(result.error.issues);
        setSubmitting(false);
        return;
      }

      try {
        await login(result.data.email, result.data.password);
        toast.success(t("welcomeBack"));
        navigate("/");
      } catch (err) {
        toast.error(err.message || t("loginFailed"));
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <AuthLayout
      className={className}
      title={t("welcomeBack")}
      subtitle={t("loginSubtitle")}
      footer={
        <>
          {t("dontHaveAccount")}{" "}
          <Link
            to="/signup"
            className="text-blue-400 font-medium hover:text-blue-300 transition-colors underline-offset-4 hover:underline"
          >
            {t("signup")}
          </Link>
        </>
      }
      {...props}
    >
      <form className="space-y-4" onSubmit={formik.handleSubmit} noValidate>
        <FieldGroup className="gap-4">
          <Field className="auth-field gap-1.5">
            <FieldLabel htmlFor="email" className="text-foreground text-sm font-medium">
              {t("email")}
            </FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="you@example.com"
              autoComplete="email"
              className={inputClassName}
            />
          </Field>

          <Field className="auth-field gap-1.5">
            <div className="flex items-center justify-between w-full">
              <FieldLabel htmlFor="password" className="text-foreground text-sm font-medium">
                {t("password")}
              </FieldLabel>
              <span className="text-xs text-blue-400/80 hover:text-blue-400 cursor-pointer transition-colors">
                {t("forgotPassword")}
              </span>
            </div>
            <Input
              id="password"
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              autoComplete="current-password"
              className={inputClassName}
            />
          </Field>

          <Field className="auth-field pt-1">
            <Button
              type="submit"
              disabled={formik.isSubmitting}
              className={cn("auth-submit w-full h-11 rounded-xl text-sm font-semibold")}
            >
              {formik.isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="auth-spinner" />
                  {t("loggingIn")}
                </span>
              ) : (
                t("login")
              )}
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </AuthLayout>
  );
}
