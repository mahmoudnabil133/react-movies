import { z } from "zod";

export function createLoginSchema(t) {
  return z.object({
    email: z
      .string()
      .trim()
      .min(1, t("validationEmailRequired"))
      .email(t("validationEmailInvalid")),
    password: z
      .string()
      .min(1, t("validationPasswordRequired"))
      .min(6, t("validationPasswordMin")),
  });
}

export function createSignupSchema(t) {
  return z.object({
    name: z
      .string()
      .trim()
      .min(1, t("validationNameRequired"))
      .min(2, t("validationNameMin")),
    phone: z
      .string()
      .trim()
      .refine(
        (value) => value === "" || /^[+]?[\d\s()-]{7,20}$/.test(value),
        t("validationPhoneInvalid")
      ),
    email: z
      .string()
      .trim()
      .min(1, t("validationEmailRequired"))
      .email(t("validationEmailInvalid")),
    password: z
      .string()
      .min(1, t("validationPasswordRequired"))
      .min(6, t("validationPasswordMin")),
  });
}
