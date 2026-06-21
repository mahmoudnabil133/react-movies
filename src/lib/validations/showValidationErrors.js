import { toast } from "../toast";

export function showValidationErrors(issues) {
  const messages = [...new Set(issues.map((issue) => issue.message).filter(Boolean))];

  if (messages.length === 0) return;

  if (messages.length === 1) {
    toast.error(messages[0]);
    return;
  }

  toast.error(messages.join(" • "));
}

export function parseWithSchema(schema, values) {
  return schema.safeParse(values);
}
