import { Link, useNavigate } from "react-router";
import { useFormik } from "formik";
import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useAuth, useI18n } from "../../hooks/useStores";
import { toast } from "../../lib/toast";
import { createSignupSchema } from "../../lib/validations/authSchemas";
import { parseWithSchema, showValidationErrors } from "../../lib/validations/showValidationErrors";
import AuthLayout from "../auth/AuthLayout";

const inputClassName =
  "h-11 bg-muted/50 border-border focus-visible:ring-blue-500/30 transition-all duration-200 focus-visible:scale-[1.01]";

export function Signup({ className, ...props }) {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { t } = useI18n();
  const signupSchema = useMemo(() => createSignupSchema(t), [t]);

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
    },
    onSubmit: async (values, { setSubmitting }) => {
      const result = parseWithSchema(signupSchema, values);

      if (!result.success) {
        showValidationErrors(result.error.issues);
        setSubmitting(false);
        return;
      }

      try {
        await register({
          name: result.data.name,
          phone: result.data.phone || undefined,
          email: result.data.email,
          password: result.data.password,
        });
        toast.success(t("signupSuccess"));
        navigate("/");
      } catch (err) {
        toast.error(err.message || t("signupFailed"));
      } finally {
        setSubmitting(false);
      }
    },
  });

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
      <form className="space-y-4" onSubmit={formik.handleSubmit} noValidate>
        <FieldGroup className="gap-3.5">
          <Field className="auth-field gap-1.5">
            <FieldLabel htmlFor="name" className="text-foreground text-sm font-medium">
              {t("name")}
            </FieldLabel>
            <Input
              id="name"
              name="name"
              type="text"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="John Doe"
              autoComplete="name"
              className={inputClassName}
            />
          </Field>

          <Field className="auth-field gap-1.5">
            <FieldLabel htmlFor="phone" className="text-foreground text-sm font-medium">
              {t("phone")}
            </FieldLabel>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="+1 000 000 0000"
              autoComplete="tel"
              className={inputClassName}
            />
          </Field>

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
            <FieldLabel htmlFor="password" className="text-foreground text-sm font-medium">
              {t("password")}
            </FieldLabel>
            <Input
              id="password"
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              autoComplete="new-password"
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
