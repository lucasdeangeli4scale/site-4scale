import { site } from "../content/site";

export const LEAD_FORM_NAME = "briefing";
export const LEAD_FORM_ENDPOINT = "/__forms.html";

const NAME_LIMIT = 80;
const COMPANY_LIMIT = 120;
const EMAIL_LIMIT = 254;
const MESSAGE_LIMIT = 2000;
const CONTROL_CHARS = /[\u0000-\u001F\u007F]/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MOBILE_PATTERN = /^[1-9]{2}9\d{8}$/;

export type LeadInput = {
  nome: string;
  empresa: string;
  email: string;
  whatsapp: string;
  interesse: string;
  desafio: string;
  botField: string;
};

export type LeadField = Exclude<keyof LeadInput, "botField">;

export type LeadErrors = Partial<Record<LeadField, string>>;

export class LeadValidationError extends Error {
  readonly errors: LeadErrors;

  constructor(errors: LeadErrors) {
    super("lead-validation-failed");
    this.name = "LeadValidationError";
    this.errors = errors;
  }
}

export function formatBrazilMobile(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 11);
  if (digits.length === 0) {
    return "";
  }
  if (digits.length < 3) {
    return `(${digits}`;
  }
  const ddd = digits.slice(0, 2);
  const rest = digits.slice(2);
  if (rest.length <= 5) {
    return `(${ddd})${rest}`;
  }
  return `(${ddd})${rest.slice(0, 5)}-${rest.slice(5)}`;
}

export function validateLead(input: LeadInput): LeadErrors {
  const errors: LeadErrors = {};
  const nome = input.nome.trim();
  const empresa = input.empresa.trim();
  const email = input.email.trim();
  const whatsapp = input.whatsapp.trim();
  const interesse = input.interesse.trim();
  const desafio = input.desafio.trim();

  if (nome.length < 2 || nome.length > NAME_LIMIT || CONTROL_CHARS.test(nome)) {
    errors.nome = "Informe o seu nome.";
  }
  if (empresa.length < 2 || empresa.length > COMPANY_LIMIT || CONTROL_CHARS.test(empresa)) {
    errors.empresa = "Informe o nome da empresa.";
  }
  if (email.length > EMAIL_LIMIT || !EMAIL_PATTERN.test(email) || CONTROL_CHARS.test(email)) {
    errors.email = "Informe um e-mail válido.";
  }
  if (!MOBILE_PATTERN.test(whatsapp.replace(/\D/g, ""))) {
    errors.whatsapp = "Informe um WhatsApp com DDD.";
  }
  if (interesse.length > 0 && !site.contact.interests.includes(interesse)) {
    errors.interesse = "Escolha uma área de interesse.";
  }
  if (desafio.length > MESSAGE_LIMIT || CONTROL_CHARS.test(desafio)) {
    errors.desafio = "O texto passou do limite de 2000 caracteres.";
  }

  return errors;
}

export async function submitLead(input: LeadInput): Promise<void> {
  if (input.botField.trim() !== "") {
    return;
  }

  const errors = validateLead(input);
  if (Object.keys(errors).length > 0) {
    throw new LeadValidationError(errors);
  }

  const body = new URLSearchParams({
    "form-name": LEAD_FORM_NAME,
    nome: input.nome.trim(),
    empresa: input.empresa.trim(),
    email: input.email.trim(),
    whatsapp: input.whatsapp.trim(),
    interesse: input.interesse.trim(),
    desafio: input.desafio.trim(),
    "bot-field": "",
  });

  let response: Response;
  try {
    response = await fetch(LEAD_FORM_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
      signal: AbortSignal.timeout(15000),
    });
  } catch {
    throw new Error("lead-submit-failed");
  }

  if (!response.ok) {
    throw new Error("lead-submit-failed");
  }
}
