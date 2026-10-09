import { readFileSync } from "node:fs";
import { afterEach, describe, expect, it, vi } from "vitest";
import { site } from "../content/site";
import {
  LEAD_FORM_ENDPOINT,
  LEAD_FORM_NAME,
  formatBrazilMobile,
  submitLead,
  validateLead,
  type LeadInput,
} from "./leadForm";

const validLead: LeadInput = {
  nome: "Ana Lima",
  empresa: "Oficina Norte",
  email: "ana@oficina.com",
  whatsapp: "(27)99999-0000",
  interesse: site.contact.interests[0] ?? "",
  desafio: "Queremos organizar o comercial.",
  botField: "",
};

describe("formulário de contato", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("formata o celular com DDD", () => {
    expect(formatBrazilMobile("27999990000")).toBe("(27)99999-0000");
    expect(formatBrazilMobile("(27) 99999-0000")).toBe("(27)99999-0000");
    expect(formatBrazilMobile("27999990000123")).toBe("(27)99999-0000");
  });

  it("aceita um pedido completo e rejeita campos inválidos", () => {
    expect(validateLead(validLead)).toEqual({});
    expect(validateLead({ ...validLead, nome: "A", email: "ana", whatsapp: "9999" })).toMatchObject({
      nome: expect.any(String),
      email: expect.any(String),
      whatsapp: expect.any(String),
    });
    expect(validateLead({ ...validLead, interesse: "Oferta inventada" }).interesse).toBeTruthy();
  });

  it("mantém o HTML estático com os mesmos campos do envio", () => {
    const html = readFileSync("public/__forms.html", "utf8").replaceAll("&amp;", "&");
    expect(html).toContain(`name="form-name" value="${LEAD_FORM_NAME}"`);
    expect(html).toContain('name="bot-field"');
    for (const field of ["nome", "empresa", "email", "whatsapp", "interesse", "desafio"]) {
      expect(html).toContain(`name="${field}"`);
    }
    for (const interest of site.contact.interests) {
      expect(html).toContain(interest);
    }
  });

  it("envia o pedido para o formulário da Netlify", async () => {
    const fetchMock = vi.fn(async (_url: string, _init?: RequestInit) => new Response("ok", { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    await submitLead(validLead);

    expect(fetchMock).toHaveBeenCalledOnce();
    const [url, init] = fetchMock.mock.calls[0] ?? [];
    expect(url).toBe(LEAD_FORM_ENDPOINT);
    expect(init?.method).toBe("POST");
    expect(String(init?.body)).toContain("nome=Ana+Lima");
    expect(String(init?.body)).toContain(`form-name=${LEAD_FORM_NAME}`);
    expect(String(init?.body)).not.toContain("bot-field=bot");
  });

  it("não envia quando o campo oculto foi preenchido", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    await submitLead({ ...validLead, botField: "spam" });

    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("falha sem expor detalhe quando o envio não completa", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => new Response("no", { status: 500 })));

    await expect(submitLead(validLead)).rejects.toThrow("lead-submit-failed");
  });
});
