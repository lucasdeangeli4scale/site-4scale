import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { site } from "../content/site";
import {
  LEAD_FORM_ENDPOINT,
  LEAD_FORM_NAME,
  LeadValidationError,
  formatBrazilMobile,
  submitLead,
  validateLead,
  type LeadErrors,
  type LeadInput,
} from "../forms/leadForm";

const emptyLead: LeadInput = {
  nome: "",
  empresa: "",
  email: "",
  whatsapp: "",
  interesse: site.contact.interests[0] ?? "",
  desafio: "",
  botField: "",
};

export function LeadForm() {
  const baseId = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLParagraphElement>(null);
  const focusError = useRef(false);
  const [values, setValues] = useState<LeadInput>(emptyLead);
  const [errors, setErrors] = useState<LeadErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  useEffect(() => {
    if (!focusError.current) {
      return;
    }
    focusError.current = false;
    formRef.current?.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
  }, [errors]);

  useEffect(() => {
    if (status === "success") {
      successRef.current?.focus();
    }
  }, [status]);

  const update = (field: keyof LeadInput, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    if (field !== "botField") {
      setErrors((current) => {
        if (!current[field]) {
          return current;
        }
        const next = { ...current };
        delete next[field];
        return next;
      });
    }
    setStatus((current) => (current === "error" ? "idle" : current));
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "submitting") {
      return;
    }

    const nextErrors = validateLead(values);
    if (Object.keys(nextErrors).length > 0) {
      focusError.current = true;
      setErrors(nextErrors);
      setStatus("idle");
      return;
    }

    setErrors({});
    setStatus("submitting");
    try {
      await submitLead(values);
      setStatus("success");
    } catch (error) {
      if (error instanceof LeadValidationError) {
        focusError.current = true;
        setErrors(error.errors);
        setStatus("idle");
        return;
      }
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <p ref={successRef} className="lead-success" tabIndex={-1} role="status">
        Recebemos o seu pedido. A 4SCALE retorna em breve.
      </p>
    );
  }

  return (
    <form
      ref={formRef}
      className="lead-form"
      name={LEAD_FORM_NAME}
      method="POST"
      action={LEAD_FORM_ENDPOINT}
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      noValidate
      onSubmit={onSubmit}
    >
      <input type="hidden" name="form-name" value={LEAD_FORM_NAME} />
      <p className="lead-honeypot" aria-hidden="true">
        <label>
          Não preencha este campo
          <input
            name="bot-field"
            tabIndex={-1}
            autoComplete="off"
            value={values.botField}
            onChange={(event) => {
              update("botField", event.target.value);
            }}
          />
        </label>
      </p>
      <div className="lead-grid">
        <Field
          id={`${baseId}-nome`}
          name="nome"
          label="Seu Nome"
          required
          autoComplete="name"
          maxLength={80}
          placeholder="Como podemos te chamar?"
          value={values.nome}
          error={errors.nome}
          onChange={(value) => {
            update("nome", value);
          }}
        />
        <Field
          id={`${baseId}-empresa`}
          name="empresa"
          label="Sua Empresa"
          required
          autoComplete="organization"
          maxLength={120}
          placeholder="Nome da empresa"
          value={values.empresa}
          error={errors.empresa}
          onChange={(value) => {
            update("empresa", value);
          }}
        />
        <Field
          id={`${baseId}-email`}
          name="email"
          type="email"
          label="E-mail Corporativo"
          required
          autoComplete="email"
          inputMode="email"
          maxLength={254}
          placeholder="voce@empresa.com.br"
          value={values.email}
          error={errors.email}
          onChange={(value) => {
            update("email", value);
          }}
        />
        <Field
          id={`${baseId}-whatsapp`}
          name="whatsapp"
          type="tel"
          label="WhatsApp com DDD"
          required
          autoComplete="tel"
          inputMode="tel"
          maxLength={14}
          placeholder="(00)00000-0000"
          value={values.whatsapp}
          error={errors.whatsapp}
          onChange={(value) => {
            update("whatsapp", formatBrazilMobile(value));
          }}
        />
      </div>
      <label className="lead-field" htmlFor={`${baseId}-interesse`}>
        Área de Interesse
        <span className="lead-select-wrap">
          <select
            id={`${baseId}-interesse`}
            name="interesse"
            value={values.interesse}
            aria-invalid={errors.interesse ? true : undefined}
            aria-describedby={errors.interesse ? `${baseId}-interesse-error` : undefined}
            onChange={(event) => {
              update("interesse", event.target.value);
            }}
          >
            {site.contact.interests.map((interest) => (
              <option key={interest} value={interest}>
                {interest}
              </option>
            ))}
          </select>
        </span>
        {errors.interesse ? (
          <span id={`${baseId}-interesse-error`} className="lead-error">
            {errors.interesse}
          </span>
        ) : null}
      </label>
      <label className="lead-field" htmlFor={`${baseId}-desafio`}>
        Conte brevemente sobre o seu momento / desafio atual
        <textarea
          id={`${baseId}-desafio`}
          name="desafio"
          rows={4}
          maxLength={2000}
          placeholder="Ex: Queremos escalar nosso e-commerce de 200k para 1 milhão/mês e automatizar processos..."
          value={values.desafio}
          aria-invalid={errors.desafio ? true : undefined}
          aria-describedby={errors.desafio ? `${baseId}-desafio-error` : undefined}
          onChange={(event) => {
            update("desafio", event.target.value);
          }}
        />
        {errors.desafio ? (
          <span id={`${baseId}-desafio-error`} className="lead-error">
            {errors.desafio}
          </span>
        ) : null}
      </label>
      {status === "error" ? (
        <p className="lead-error" role="alert">
          Não foi possível enviar agora. Tente de novo ou fale pelo WhatsApp.
        </p>
      ) : null}
      <button className="lead-submit" type="submit" disabled={status === "submitting"} aria-busy={status === "submitting"}>
        {status === "submitting" ? "Enviando…" : "Quero Escalar Agora"}
      </button>
    </form>
  );
}

type FieldProps = {
  id: string;
  name: string;
  label: string;
  value: string;
  placeholder: string;
  error?: string;
  required?: boolean;
  type?: "text" | "email" | "tel";
  autoComplete?: string;
  inputMode?: "email" | "tel" | "text";
  maxLength: number;
  onChange: (value: string) => void;
};

function Field({
  id,
  name,
  label,
  value,
  placeholder,
  error,
  required = false,
  type = "text",
  autoComplete,
  inputMode = "text",
  maxLength,
  onChange,
}: FieldProps) {
  const errorId = `${id}-error`;

  return (
    <label className="lead-field" htmlFor={id}>
      <span>
        {label}
        {required ? (
          <abbr className="lead-required" title="obrigatório">
            *
          </abbr>
        ) : null}
      </span>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        inputMode={inputMode}
        maxLength={maxLength}
        placeholder={placeholder}
        value={value}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        onChange={(event) => {
          onChange(event.target.value);
        }}
      />
      {error ? (
        <span id={errorId} className="lead-error">
          {error}
        </span>
      ) : null}
    </label>
  );
}
