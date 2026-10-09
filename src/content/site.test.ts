import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { rail, site } from "./site";

function publicFile(urlPath: string): string {
  return resolve("public", urlPath.replace(/^\//, ""));
}

describe("conteúdo do site", () => {
  it("mantém as três linhas da hero", () => {
    expect(site.hero.lines).toEqual(["Crescer é fácil.", "Escalar é", "Estratégia"]);
    expect(site.hero.lead).toContain("4SCALE");
  });

  it("expõe os serviços publicados pela 4SCALE", () => {
    expect(site.services.map((service) => `${service.index} ${service.title}`)).toEqual([
      "01 Marketing Digital & Performance",
      "02 Inteligência Artificial & Dados",
      "03 Automação & Processos",
      "04 Software, Apps & E-commerce",
    ]);
    expect(site.services.map((service) => service.items)).toEqual([
      [
        "Mídia Paga (Meta, Google, TikTok, LinkedIn)",
        "Estruturação de Funis de Aquisição",
        "Otimização Contínua de Taxa de Conversão (CRO)",
      ],
      [
        "Modelos Preditivos de Demanda e Churn",
        "Atribuição Avançada de Canais",
        "Enriquecimento de Dados de Clientes",
      ],
      [
        "Integrações n8n, Zapier & Webhooks",
        "Automação de WhatsApp e CRM",
        "Sincronização de Catálogos & Estoque",
      ],
      [
        "LPs de Altíssima Conversão",
        "E-commerces Escaláveis (Shopify, Nuvemshop, Vtex)",
        "Sistemas Web e Dashboards Customizados",
      ],
    ]);
  });

  it("liga cada cliente a um logo único que existe em public", () => {
    const logos = site.clients.map((client) => client.logo);
    expect(new Set(logos).size).toBe(logos.length);
    for (const client of site.clients) {
      expect(client.name.trim().length).toBeGreaterThan(0);
      expect(existsSync(publicFile(client.logo))).toBe(true);
    }
    const withoutSummary = site.clients.filter((client) => client.summary.trim().length === 0);
    expect(withoutSummary.map((client) => client.id)).toEqual(["tributacao-medica"]);
  });

  it("entrega cases e time com mídia local", () => {
    expect(site.cases.map((item) => item.title.replace("\n", " "))).toEqual([
      "Acimaq Equipamentos",
      "Colibri Festas",
      "Nano Smart Vet",
    ]);
    expect(site.team.length).toBeGreaterThan(1);
    for (const item of [...site.cases, ...site.team]) {
      expect(item.image.startsWith("/")).toBe(true);
      expect(existsSync(publicFile(item.image))).toBe(true);
    }
  });

  it("mantém o trilho na ordem das seções", () => {
    expect(rail.map((item) => item.id)).toEqual([
      "about",
      "services",
      "cases",
      "team",
      "clients",
    ]);
  });

  it("usa um e-mail de contato válido", () => {
    expect(site.contact.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    expect(site.contact.cta).toBe("Vamos começar?");
    expect(site.contact.whatsappUrl).toBe(
      "https://api.whatsapp.com/send?phone=5527995826048&text=Ol%C3%A1,%20tenho%20interesse%20em%20saber%20mais%20sobre%20a%204Scale%20e%20seus%20produtos",
    );
    expect(site.contact.interests[0]).toBe("Ecossistema Completo (Marketing + Tecnologia)");
    expect(site.contact.panel.titleAccent).toBe("ganhar mais tração?");
  });

  it("expõe só os dados pedidos no rodapé", () => {
    expect(site.footer.mark).toBe("4SCALE");
    expect(site.footer.location).toBe("Vitória – Espírito Santo");
    expect(site.footer.instagramUrl).toMatch(/^https:\/\/www\.instagram\.com\//);
    expect(site.footer.termsPath).toBe("/termos");
    expect(site.footer.cnpj).toBe("55.327.016/0001-03");
    expect(site.footer.rights).toBe("© 2026 4Scale. Todos os direitos reservados.");
    expect(site.terms.paragraphs.length).toBeGreaterThan(0);
  });

  it("publica o endereço e os canais do painel de contato", () => {
    expect(site.contact.panel.place).toBe("Edifício Madison Office Tower");
    expect(site.contact.panel.address).toBe(
      "R. Darcy Grijó, 50 - Sala 404 - Jardim da Penha, Vitória - ES, 29060-500",
    );
    expect(site.contact.panel.linkedinUrl).toBe(
      "https://www.linkedin.com/company/108258641/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3Bl3YyIqmrRJKCSQWy7ieesQ%3D%3D",
    );
    expect(site.contact.panel.youtubeUrl).toBe("https://www.youtube.com/@4scale");
  });

  it("mantém o time publicado com os cargos atuais", () => {
    expect(site.team.map((member) => `${member.index} ${member.name} — ${member.role}`)).toEqual([
      "01 Carlos — Sócio Fundador e Comercial",
      "02 João — Sócio Fundador e Diretor de Projetos",
      "03 Lucas Calazans — Sócio e Performance",
      "04 Caroline — Social Media",
      "05 Iara — Performance",
      "06 Lucas — UX Design",
      "07 Tarso — Designer",
    ]);
    expect(site.team.some((member) => member.name === "Malu")).toBe(false);
    expect(site.team.some((member) => member.id === "caroline-desenvolvimento")).toBe(false);
  });
});
