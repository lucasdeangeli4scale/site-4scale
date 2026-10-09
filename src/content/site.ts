export type Service = {
  id: string;
  index: string;
  title: string;
  items: readonly string[];
};

export type CaseStudy = {
  id: string;
  title: string;
  accent?: string;
  summary: string;
  tags: readonly string[];
  image: string;
  imageAlt: string;
};

export type TeamChapter = {
  id: string;
  index: string;
  name: string;
  role: string;
  image: string;
  imageAlt: string;
  focus?: string;
};

export type Client = {
  id: string;
  name: string;
  logo: string;
  summary: string;
};

export type SiteContent = {
  brand: string;
  hero: {
    lines: readonly string[];
    lead: string;
  };
  about: {
    title: string;
    body: string;
  };
  services: readonly Service[];
  cases: readonly CaseStudy[];
  team: readonly TeamChapter[];
  clients: readonly Client[];
  contact: {
    email: string;
    cta: string;
    whatsappUrl: string;
    panel: {
      title: string;
      titleAccent: string;
      body: string;
      emailLabel: string;
      placeLabel: string;
      place: string;
      addressLabel: string;
      address: string;
      whatsappLabel: string;
      whatsappAction: string;
      linkedinLabel: string;
      linkedinUrl: string;
      youtubeLabel: string;
      youtubeUrl: string;
    };
    interests: readonly string[];
  };
  footer: {
    mark: string;
    location: string;
    instagramLabel: string;
    instagramUrl: string;
    termsLabel: string;
    termsPath: string;
    cnpj: string;
    rights: string;
  };
  terms: {
    title: string;
    paragraphs: readonly string[];
  };
};

export const rail = [
  { id: "about", label: "About" },
  { id: "services", label: "Serviços" },
  { id: "cases", label: "Cases" },
  { id: "team", label: "Time" },
  { id: "clients", label: "Clientes" },
] as const;

export const site: SiteContent = {
  brand: "4scale",
  hero: {
    lines: ["Crescer é fácil.", "Escalar é", "Estratégia"],
    lead: "A 4SCALE une estratégia, dados e execução para escalar o seu negócio de forma inteligente.",
  },
  about: {
    title: "Operações de marketing inteligentes, com responsabilidade pelo resultado.",
    body: "A 4SCALE constrói operações mais transparentes e trata o negócio do cliente como parte do próprio trabalho. As decisões partem de dados, estratégia e escuta, com alinhamento periódico, até a entrega gerar resultado.",
  },
  services: [
    {
      id: "marketing-digital-performance",
      index: "01",
      title: "Marketing Digital & Performance",
      items: [
        "Mídia Paga (Meta, Google, TikTok, LinkedIn)",
        "Estruturação de Funis de Aquisição",
        "Otimização Contínua de Taxa de Conversão (CRO)",
      ],
    },
    {
      id: "inteligencia-artificial-dados",
      index: "02",
      title: "Inteligência Artificial & Dados",
      items: [
        "Modelos Preditivos de Demanda e Churn",
        "Atribuição Avançada de Canais",
        "Enriquecimento de Dados de Clientes",
      ],
    },
    {
      id: "automacao-processos",
      index: "03",
      title: "Automação & Processos",
      items: [
        "Integrações n8n, Zapier & Webhooks",
        "Automação de WhatsApp e CRM",
        "Sincronização de Catálogos & Estoque",
      ],
    },
    {
      id: "software-apps-ecommerce",
      index: "04",
      title: "Software, Apps & E-commerce",
      items: [
        "LPs de Altíssima Conversão",
        "E-commerces Escaláveis (Shopify, Nuvemshop, Vtex)",
        "Sistemas Web e Dashboards Customizados",
      ],
    },
  ],
  cases: [
    {
      id: "acimaq",
      title: "Acimaq\nEquipamentos",
      accent: "Equipamentos",
      summary:
        "Receita de R$ 7,5 milhões e ROAS de 27,36x no setor industrial, com performance e automação comercial.",
      tags: ["Performance", "Automação", "B2B", "Industrial"],
      image: "/cases/acimaq.jpg",
      imageAlt: "Logo da Acimaq Equipamentos Comerciais",
    },
    {
      id: "colibri-festas",
      title: "Colibri\nFestas",
      accent: "Festas",
      summary:
        "De loja local a máquina de receita digital: R$ 7,7 milhões em campanhas e ROAS de 14,25x.",
      tags: ["Mídia paga", "Campanhas", "Receita", "ROAS"],
      image: "/cases/colibri.webp",
      imageAlt: "Logo da Colibri Festas e Decorações",
    },
    {
      id: "nano-smart-vet",
      title: "Nano Smart\nVet",
      accent: "Vet",
      summary:
        "Autoridade digital do absoluto zero: audiência B2B qualificada antes do lançamento, com social media científico e identidade visual.",
      tags: ["Social Media", "Identidade", "B2B", "Biotecnologia"],
      image: "/cases/nano-smart.png",
      imageAlt: "Logo da Nano Smart Vet",
    },
  ],
  team: [
    {
      id: "carlos",
      index: "01",
      name: "Carlos",
      role: "Sócio Fundador e Comercial",
      image: "/team/carlos.jpg",
      imageAlt: "Carlos, Sócio Fundador e Comercial da 4SCALE",
    },
    {
      id: "joao",
      index: "02",
      name: "João",
      role: "Sócio Fundador e Diretor de Projetos",
      image: "/team/joao.jpg",
      imageAlt: "João, Sócio Fundador e Diretor de Projetos da 4SCALE",
      focus: "center 82%",
    },
    {
      id: "calazans",
      index: "03",
      name: "Lucas Calazans",
      role: "Sócio e Performance",
      image: "/team/calazans.jpg",
      imageAlt: "Lucas Calazans, Sócio e Performance da 4SCALE",
    },
    {
      id: "caroline-social-media",
      index: "04",
      name: "Caroline",
      role: "Social Media",
      image: "/team/caroline-social-media.jpg",
      imageAlt: "Caroline, Social Media da 4SCALE",
    },
    {
      id: "iara",
      index: "05",
      name: "Iara",
      role: "Performance",
      image: "/team/iara.jpg",
      imageAlt: "Iara, Performance da 4SCALE",
    },
    {
      id: "lucas",
      index: "06",
      name: "Lucas",
      role: "UX Design",
      image: "/team/lucas.jpg",
      imageAlt: "Lucas, UX Design da 4SCALE",
    },
    {
      id: "tarso",
      index: "07",
      name: "Tarso",
      role: "Designer",
      image: "/team/tarso.jpg",
      imageAlt: "Tarso, Designer da 4SCALE",
    },
  ],
  clients: [
    {
      id: "nano-smart",
      name: "Nano Smart",
      logo: "/logos/nano-smart.svg",
      summary:
        "Startup brasileira de nanotecnologia e biotecnologia. Desenvolve biossensores, testes rápidos (tecnologia lateral flow) e sistemas de leitura para saúde animal e segurança de alimentos.",
    },
    {
      id: "loga",
      name: "Loga",
      logo: "/logos/loga.svg",
      summary:
        "Empresa de telecomunicações do Espírito Santo que fornece internet banda larga de alta velocidade por meio de fibra óptica.",
    },
    {
      id: "pbenge",
      name: "PBENGE",
      logo: "/logos/logo-v2.svg",
      summary:
        "Empresa brasileira de engenharia de alta performance e tecnologia aplicada à construção, especializada em obras e reformas de alta complexidade para os setores industrial e comercial.",
    },
    {
      id: "tributacao-medica",
      name: "Tributação Médica",
      logo: "/logos/tributacao-medica.svg",
      summary: "",
    },
    {
      id: "dra-karla",
      name: "Dra. Karla Kelevedove",
      logo: "/logos/dra-karla.svg",
      summary: "Médica alergista e imunologista.",
    },
    {
      id: "colibri",
      name: "Colibri",
      logo: "/logos/colibri.svg",
      summary:
        "Rede de lojas física e virtual do Espírito Santo, especializada em artigos para festas, confeitaria, embalagens, decoração e produtos sazonais.",
    },
    {
      id: "irene-baldi",
      name: "Irene Baldi",
      logo: "/logos/irene-baldi.svg",
      summary: "Médica dermatologista.",
    },
    {
      id: "vinsel-vinhos",
      name: "Vinsel Vinhos",
      logo: "/logos/cliente-21.svg",
      summary:
        "Empresa capixaba de vinhos. Focada em democratizar o consumo de vinho no Brasil, a importadora traz um catálogo selecionado de vinícolas tradicionais de várias partes do mundo.",
    },
    {
      id: "instituto-lorena-baldotto",
      name: "Instituto Lorena Baldotto",
      logo: "/logos/cliente-20.svg",
      summary:
        "Clínica médica localizada em Vitória (ES), especializada em saúde da mulher, bem-estar e tratamentos integrativos.",
    },
    {
      id: "cseros-cosmetics",
      name: "Cséros cosmetics",
      logo: "/logos/cliente-19.svg",
      summary:
        "Marca brasileira de cosméticos inovadora, amplamente reconhecida por ter desenvolvido o MYDE, considerado o primeiro desodorante enzimático do mundo.",
    },
    {
      id: "abf-tech",
      name: "ABF TECH",
      logo: "/logos/cliente-18.svg",
      summary:
        "Empresa capixaba de tecnologia, especializada em desenvolvimento de software sob encomenda, consultoria em TI e integração de sistemas.",
    },
    {
      id: "cdl",
      name: "CDL",
      logo: "/logos/cdl.svg",
      summary:
        "Câmara de Dirigentes Lojistas, uma associação civil sem fins lucrativos presente em milhares de municípios brasileiros.",
    },
  ],
  contact: {
    email: "contato@4scale.com",
    cta: "Vamos começar?",
    whatsappUrl:
      "https://api.whatsapp.com/send?phone=5527995826048&text=Ol%C3%A1,%20tenho%20interesse%20em%20saber%20mais%20sobre%20a%204Scale%20e%20seus%20produtos",
    panel: {
      title: "Qual parte da sua operação poderia",
      titleAccent: "ganhar mais tração?",
      body: "Cansado de parceiros que só prometem mais do mesmo e entregam apenas o básico? Agende um bate-papo estratégico com nossos especialistas e descubra como a 4SCALE pode destravar o próximo nível da sua empresa.",
      emailLabel: "E-mail",
      placeLabel: "Localização",
      place: "Edifício Madison Office Tower",
      addressLabel: "Endereço",
      address: "R. Darcy Grijó, 50 - Sala 404 - Jardim da Penha, Vitória - ES, 29060-500",
      whatsappLabel: "WhatsApp Oficial",
      whatsappAction: "Iniciar conversa instantânea",
      linkedinLabel: "LinkedIn",
      linkedinUrl:
        "https://www.linkedin.com/company/108258641/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3Bl3YyIqmrRJKCSQWy7ieesQ%3D%3D",
      youtubeLabel: "YouTube",
      youtubeUrl: "https://www.youtube.com/@4scale",
    },
    interests: [
      "Ecossistema Completo (Marketing + Tecnologia)",
      "Marketing Digital & Performance",
      "Inteligência Artificial & Dados",
      "Automação & Processos",
      "Software, Apps & E-commerce",
    ],
  },
  footer: {
    mark: "4SCALE",
    location: "Vitória – Espírito Santo",
    instagramLabel: "Instagram",
    instagramUrl: "https://www.instagram.com/4scale.mkt/",
    termsLabel: "Termos de Uso",
    termsPath: "/termos",
    cnpj: "55.327.016/0001-03",
    rights: "© 2026 4Scale. Todos os direitos reservados.",
  },
  terms: {
    title: "Termos de Uso",
    paragraphs: [
      "Este site apresenta a 4SCALE, sua forma de trabalho e os projetos publicados. O uso das páginas implica a leitura destes termos.",
      "Textos, marcas, imagens e demais materiais exibidos pertencem à 4SCALE ou a terceiros que autorizaram o uso. Não é permitida a reprodução sem autorização prévia.",
      "As informações são publicadas de boa-fé e podem ser atualizadas. O site é oferecido no estado em que se encontra, sem garantia de disponibilidade contínua.",
      "Dúvidas sobre estes termos podem ser enviadas para contato@4scale.com.",
    ],
  },
};
