/*
 * Duett Software — conteúdo do site (PT-BR original + EN).
 * Todo texto, link e contato vem de https://www.duettsoftware.com/ (home, serviços, sobre, contato).
 * As três versões (jit, duet, blueprint) renderizam a partir daqui.
 * <em> marca o trecho em destaque do título original ("tittle-highlight").
 */
(function () {
  var IMG = '../assets/img/';

  var links = {
    home: '#top',
    whatsapp: 'https://wa.me/555196837891',
    support: 'https://duettsoftware.atlassian.net/servicedesk/customer/user/login?destination=portals',
    careers: 'https://app.pipefy.com/public/form/gbH8E1IG',
    emailSales: 'contato@duettsoftware.com',
    emailSupport: 'suporte@duettsoftware.com',
    phone: '+55 51 35248824',
    phoneHref: 'tel:+555135248824',
    terms: '#',
    privacy: '#',
    social: [
      { name: 'Facebook', href: 'https://www.facebook.com/duettsoftware', icon: IMG + 'about/facebook.svg' },
      { name: 'Instagram', href: 'https://www.instagram.com/duettsoftware/', icon: IMG + 'about/instagram.svg' },
      { name: 'LinkedIn', href: 'https://www.linkedin.com/company/duettsoftware/', icon: IMG + 'about/linkedin.svg' },
      { name: 'Twitter', href: 'https://twitter.com/DuettSoftware', icon: IMG + 'about/twitter.svg' }
    ]
  };

  var media = {
    logo: IMG + 'logo.svg',
    logoDark: IMG + 'logoDark.svg',
    hero: IMG + 'home/home-banner-main.jpg',
    servicesBanner: IMG + 'services/banner.jpg',
    team: IMG + 'contact/img-background.jpg',
    projects: [
      [IMG + 'projects/sequenciamento/01.png', IMG + 'projects/sequenciamento/02.png'],
      [IMG + 'projects/almoxarifado/01.png', IMG + 'projects/almoxarifado/02.png'],
      [IMG + 'projects/etiquetas/01.png', IMG + 'projects/etiquetas/02.png']
    ],
    clients: [
      { name: 'Bosch', src: IMG + 'logos/logo-bosch-color.png' },
      { name: 'TagInfo', src: IMG + 'logos/taginfo.png' },
      { name: 'Mercado Pago', src: IMG + 'logos/mercado-pago.png' },
      { name: 'CEVA Logistics', src: IMG + 'logos/ceva-logistics.png' },
      { name: 'Libracom', src: IMG + 'logos/libracom.png' },
      { name: 'Valeo', src: IMG + 'logos/valeo.png' },
      { name: 'Natura', src: IMG + 'logos/natura.png' },
      { name: 'Grendene', src: IMG + 'logos/grendene.png' }
    ],
    integrations: [
      { name: 'Siemens', src: IMG + 'services/integrations/siemens.svg' },
      { name: 'Swagger', src: IMG + 'services/integrations/swagger.svg' },
      { name: 'OPC UA', src: IMG + 'services/integrations/opc-ua.svg' },
      { name: 'Modbus', src: IMG + 'services/integrations/modbuss.svg' },
      { name: 'Rockwell Automation', src: IMG + 'services/integrations/rockwell.svg' },
      { name: 'Serial RS232 / RS485', src: IMG + 'services/integrations/serial.svg' }
    ],
    tech: ['DotNetCore', 'CSharp', 'Blazor', 'WebAssembly', 'Java', 'Springboot', 'JS', 'React', 'ReactNative', 'Expo', 'VueJS',
      'SQL', 'PostgresSql', 'Docker', 'Kubernetes', 'Azure', 'AWS', 'GoogleCloud', 'Jenkins', 'Github', 'Gitlab'
    ].map(function (n) {
      var names = { DotNetCore: '.NET Core', CSharp: 'C#', JS: 'JavaScript', ReactNative: 'React Native', VueJS: 'Vue.js',
        PostgresSql: 'PostgreSQL', GoogleCloud: 'Google Cloud', Springboot: 'Spring Boot', Github: 'GitHub', Gitlab: 'GitLab', SQL: 'SQL Server' };
      return { name: names[n] || n, src: IMG + 'about/technologies/' + n + '.png' };
    })
  };

  var webList = ['Backend Systems', 'Deployment Automation', 'Cloud Solutions', 'HTTP/REST APIs', 'Cross-Platform Solutions',
    'Service Integration', 'Database design', 'Reporting & Analytics', 'Data Migration', 'Web Applications'];

  var pt = {
    lang: 'pt-BR',
    meta: {
      title: 'Duett Software — Soluções em tecnologia para processos logísticos e industriais',
      description: 'Inovação para a indústria com sistemas SaaS e Cloud Computing. Desenvolvimento web, aplicativos, integração, outsourcing e consultoria.'
    },
    nav: { home: 'Home', services: 'Serviços', about: 'Sobre nós', contact: 'Contato', support: 'Suporte' },
    ui: { lang: 'EN', langLabel: 'Switch to English', scroll: 'Role para começar', menu: 'Menu', close: 'Fechar', top: 'Voltar ao topo',
      station: 'Estação', of: 'de', versions: 'Versões', next: 'Próxima', prev: 'Anterior' },
    hero: {
      lines: ['Soluções em', 'tecnologia para', 'processos logísticos', 'e industriais.'],
      sub: 'Inovação para a indústria com sistemas SaaS e Cloud Computing.'
    },
    services: {
      eyebrow: 'Serviços',
      title: 'O que <em>fazemos?</em>',
      text: 'Desenvolvemos sistemas sob medida para diversos modelos de negócio, alinhamos visão estratégica a uma vasta experiência nos setores logístico e industrial. Auxiliamos a sua jornada na concepção do projeto, da ideia a entrega do resultado.',
      items: [
        { title: 'Desenvolvimento <em>Web</em>', text: 'Sistemas customizados para automatizar processos, assegurando maior produtividade, redução de custos e tempo.', icon: IMG + 'home/img-feature-desenvolvimento.svg' },
        { title: 'Aplicativos Móveis <em>Android e iOS</em>', text: 'Gerencie de forma estratégica qualquer área do seu negócio com aplicações mobile nativas, híbridas e web responsivas.', icon: IMG + 'home/img-feature-mobile.svg' },
        { title: 'Serviços de <em>Integração</em>', text: 'Desenvolvimento de protocolos de comunicação Serial RS232 e RS485, modbus, OPC Server, CLP Rockwell e Siemens.', icon: IMG + 'home/img-feature-api.svg' },
        { title: '<em>Outsourcing</em>', text: 'Ajudamos seu time no desenvolvimento e arquitetura de aplicações com atuação remota de nossos especialistas.', icon: IMG + 'home/img-feature-outsourcing.svg' },
        { title: '<em>Consultoria</em>', text: 'Assessoria na elaboração e estruturação de projetos desenvolvidos no ecossistema Microsoft .Net.', icon: IMG + 'home/img-feature-consult.svg' }
      ],
      banner: 'Sistemas inteligentes de acordo com as necessidades específicas do seu negócio.'
    },
    web: {
      eyebrow: 'Desenvolvimento Web',
      title: 'Desenvolvimento <em>Software</em>',
      text: 'Construímos aplicações estáveis e escaláveis utilizando tecnologias modernas e métodos ágeis. Focamos na qualidade e processo transparente, com sprints de entrega contínua, reduzindo o prazo de entrega do produto final.',
      list: webList
    },
    mobile: {
      eyebrow: 'Desenvolvimento Mobile',
      title: 'Aplicativos <em>Android e iOS</em>',
      text: 'Aplicativos desenvolvidos em tecnologias nativas ou híbridas. Realizamos desde a concepção do design ao desenvolvimento, testes e homologação pelo cliente até a publicação nas lojas de distribuição Google Play e App Store.',
      items: [
        { title: 'Nativo Android e iOS', text: 'Um aplicativo nativo é programado na linguagem do seu respectivo sistema, Android ou iOS. Seu desempenho pode ser mais rápido e confiável, além da possibilidade de acesso offline.' },
        { title: 'Híbrido', text: 'Desenvolvido em linguagens web, o app híbrido apresenta layout e comportamento de um aplicativo nativo. A união entre linguagem web e nativa traz agilidade e economia ao projeto, sem prejudicar a qualidade final.' },
        { title: 'Web Apps', text: 'Web Apps são aplicações otimizadas para dispositivos mobile e oferecem uma boa experiência ao usuário. Podem ser acessadas por coletores de dados, smartphones e tablets, desde que possua um navegador instalado.' }
      ]
    },
    integration: {
      eyebrow: 'Serviço de Integração',
      title: '<em>Integrações?</em> Estamos preparados!',
      text: [
        'A integração de sistemas é um dos principais pilares entre funcionamento correto de processos e a confiabilidade das informações.',
        'Desenvolvemos diversos drivers de comunicação, utilizados desde simples integrações via APIs até complexos sistemas de comunicação, com servidores OPC, ModBus, Protocolos Ethernet IP ou leitura e decodificação de dados enviados por cabo serial RS232/RS485.'
      ]
    },
    outsourcing: {
      eyebrow: 'Outsourcing & Consultoria',
      title: 'Precisando de um <em>Help especializado?</em>',
      text: 'Utilizamos nossa expertise em tecnologia para apoiar o seu time interno no alcance dos melhores resultados. Permitindo que sua empresa concentre mais tempo e energia nas principais competências do negócio.',
      tabs: [
        { tab: 'Outsourcing', title: 'Outsourcing remoto', text: 'Melhore a eficiência e mantenha o ritmo de crescimento da sua empresa, transfira tarefas, operações, trabalhos ou processos para uma força de trabalho externa. Confie na nossa parceria transparente e confiável e tenha apoio para o crescimento do seu negócio.' },
        { tab: 'Consultoria', title: 'Consultoria eficiente', text: 'Oferecemos assessoria especializada para a gestão da tecnologia da informação. Realizamos avaliações baseadas na análise de processos da empresa, a fim de indicar carências, vulnerabilidades e necessidades. Apresentamos novas ideias, oportunidades e tecnologias adequadas aos objetivos do cliente.' }
      ]
    },
    projects: {
      eyebrow: 'Projetos realizados',
      title: 'Alguns de <em>nossos projetos</em>',
      casesTitle: 'Conheça alguns <em>cases de sucesso</em>',
      items: [
        { title: 'Produção Sequenciada', text: 'Sistema desenvolvido para atender no conceito Just in Time (JIT), ‘na hora certa’, em português. Responsável por validar e expedir peças sequenciadas do setor automobilístico.', icon: IMG + 'projects/prod-sequenciada.svg' },
        { title: 'Controle de Almoxarifado', text: 'Ajudamos pequenas e grandes empresas a gerenciar seus estoques, auxiliando na diminuição de custos e desperdício de recursos através do controle de entrada e saída de itens, trazendo clareza sobre o real valor armazenado.', icon: IMG + 'projects/Almox.svg' },
        { title: 'Etiquetagem e Expedição', text: 'Nosso software auxilia as operações com a configuração e impressão de etiquetas customizadas, facilitando a repaletização e rastreabilidade na armazenagem, garantindo uma logística ágil e eficiente.', icon: IMG + 'projects/Abastecimento.svg' }
      ]
    },
    method: {
      eyebrow: 'Nossa metodologia',
      title: 'Processo simples, <em>robusto e eficaz</em>',
      text: 'Seguindo a Metodologia Ágil adotamos um conjunto de práticas pensadas para coordenar o processo de desenvolvimento, através delas flexibilizamos o projeto, reduzimos etapas e entregamos feedbacks de alinhamento constante.',
      steps: [
        { title: 'Levantamento de requisitos', text: 'Captação das necessidades e objetivos do projeto, entendimento das demandas do cliente e quais resultados se espera alcançar com o desenvolvimento da aplicação.' },
        { title: 'Design e Prototipagem', text: 'A partir das informações recebidas no levantamento de requisitos se inicia a criação do design, etapa muito importante para testar ideias geradas, indispensável na minimização de erros e validação do produto final.' },
        { title: 'Desenvolvimento', text: 'Nesta fase planejamos como o sistema funcionará internamente; arquitetura do software, linguagem de programação, banco de dados, etc. Definido isso, parte-se para a codificação, fase onde o projeto começa a ganhar vida.' },
        { title: 'Testes e Validações', text: 'Fase focada na validação do produto desenvolvido, testando as funcionalidades de cada módulo, considerando as especificações feitas no escopo do projeto.' },
        { title: 'Implementação', text: 'Primeiramente realizada em ambiente de testes, fundamental para testar a estabilidade e usabilidade sem afetar outros processos. Em seguida a aplicação é liberada para acesso e disponibilizado treinamento aos usuários.' },
        { title: 'Monitoramento e Suporte', text: 'A fim de oferecer mais segurança, nossas aplicações contam com suporte e monitoramento conforme as necessidades do cliente, garantindo o bom desempenho e estabilidade dos serviços.' }
      ]
    },
    about: {
      eyebrow: 'Sobre nós',
      title: 'Sobre <em>nós</em>',
      founded: 2018,
      text: [
        'Fundada em 2018 a Duett Software oferece soluções em desenvolvimento de software que auxiliam no setor logístico e industrial, otimizando processos através de sistemas de controle de produção como: Abastecimento de Linha, Produção Sequenciada entre outros.',
        'Trabalhamos com o propósito de implementar soluções de forma simples e intuitiva, focando na integração de aplicações com serviços SaaS (Software as a Service), Cloud Computing, Dispositivos IoT e Inteligência Artificial.'
      ],
      bannerTitle: 'Em busca dos <em>melhores resultados</em>',
      bannerText: 'Somos uma equipe jovem, nos entusiasmamos a cada dia com a evolução do nosso trabalho, ficamos felizes em contribuir com o desenvolvimento tecnológico das empresas, ajudando a aprimorar seus processos e obter bons resultados.',
      mission: { title: 'Missão', text: 'Levar excelência a nossos clientes e parceiros através de aplicações SaaS que simplifiquem processos industriais, garantindo melhorias e evolução contínua.' },
      vision: { title: 'Visão', text: 'Estabelecer-se no mercado sendo referência no fornecimento de produtos e aplicações SaaS, contribuindo com o desenvolvimento da Indústria 4.0.' },
      techTitle: 'Tecnologias'
    },
    values: {
      eyebrow: 'Nossos valores',
      title: 'O que nos <em>impulsiona?</em>',
      items: [
        { title: 'Trabalho em equipe', text: 'Estimular a união e a troca de conhecimento permite que a equipe evolua rapidamente. Com entrosamento e boa comunicação somos capazes de superar com facilidade grandes desafios.' },
        { title: 'Planejamento e Estratégia', text: 'Mudanças de escopo são frequentes e parte natural de um projeto. Para atender de forma eficiente essas mudanças é preciso seguir um planejamento ágil e flexível, capaz de adaptar-se ao processo enquanto avança.' },
        { title: 'Qualidade', text: 'Cuidar da qualidade dos nossos serviços significa pensar no futuro do negócio. Devemos estar preparados para fornecer a melhor solução aos nossos clientes, estabelecer relações de confiança mútua que avancem em parcerias duradouras.' },
        { title: 'Satisfação do cliente', text: 'Clientes satisfeitos são o sucesso de uma empresa. Sem eles estamos sujeitos ao fracasso, por isso sempre consideramos ouvi-los, não apenas questões pontuais, mas sim numa totalidade.' },
        { title: 'Inovação contínua', text: 'Quando se trabalha com tecnologia, o aprendizado nunca se ausenta. Instigamos as pessoas a serem curiosas, maleáveis e abertas a novos conhecimentos. Com essa conduta impactamos diretamente na conquista de bons resultados.' }
      ]
    },
    clients: {
      eyebrow: 'Clientes e parceiros',
      title: 'Quem confia no <em>nosso trabalho</em>',
      text: 'Conheça alguns clientes e parceiros que contam com as nossas soluções.'
    },
    help: {
      title: 'Como podemos ajudar?',
      text: 'Nos conte a sua necessidade.',
      whatsapp: 'Conversar no WhatsApp',
      demo: 'Agendar uma demonstração',
      demoSubject: 'Quero agendar uma demonstração'
    },
    contact: {
      title: 'Entre em <em>contato</em>',
      text: 'Tem alguma pergunta ou quer apenas dizer oi? Adoraríamos ouvir você!',
      sales: { title: 'Comercial', text: 'Falar sobre assuntos comerciais, dúvidas ou sugestões.' },
      support: { title: 'Suporte', text: 'Estamos aqui para ajudar.' },
      location: { title: 'Localização', lines: ['David Canabarro, 37 - Sala 304', 'Centro - Novo Hamburgo', 'Rio Grande do Sul - RS'] }
    },
    careers: {
      eyebrow: 'Trabalhe conosco',
      title: 'Quer fazer parte da <em>equipe?</em>',
      text: 'Estamos sempre em busca de profissionais para integrar a nossa equipe, pessoas que enxergam os desafios como motivação para fazer mais e melhor.',
      text2: 'Se você se identifica conosco, cadastre seu currículo.',
      cta: 'Cadastrar Currículo'
    },
    social: {
      eyebrow: 'Duett na mídia',
      title: 'Siga-nos nas <em>redes sociais!</em>',
      text: 'Acompanhe todas as novidades nas nossas redes sociais.'
    },
    footer: {
      sitemap: 'Mapa do site',
      links: 'Links',
      terms: 'Termos e Condições',
      privacy: 'Política de Privacidade',
      where: 'Onde estamos',
      address: ['Edifício Adolfo', 'David Canabarro 37 Sala 304', 'Centro, Novo Hamburgo 93510-020', 'Rio Grande do Sul - RS'],
      copyright: 'Copyright © 2026 Duett Software'
    }
  };

  var en = {
    lang: 'en',
    meta: {
      title: 'Duett Software — Technology solutions for logistics and industrial processes',
      description: 'Innovation for industry with SaaS systems and Cloud Computing. Web development, mobile apps, integration, outsourcing and consulting.'
    },
    nav: { home: 'Home', services: 'Services', about: 'About us', contact: 'Contact', support: 'Support' },
    ui: { lang: 'PT', langLabel: 'Mudar para português', scroll: 'Scroll to begin', menu: 'Menu', close: 'Close', top: 'Back to top',
      station: 'Station', of: 'of', versions: 'Versions', next: 'Next', prev: 'Previous' },
    hero: {
      lines: ['Technology', 'solutions for', 'logistics and', 'industrial processes.'],
      sub: 'Innovation for industry with SaaS systems and Cloud Computing.'
    },
    services: {
      eyebrow: 'Services',
      title: 'What <em>we do</em>',
      text: 'We build tailor-made systems for many business models, pairing strategic vision with deep experience in the logistics and industrial sectors. We support your journey from project conception — from the idea to the delivered result.',
      items: [
        { title: 'Web <em>Development</em>', text: 'Custom systems that automate processes, delivering higher productivity and lower costs and lead times.', icon: pt.services.items[0].icon },
        { title: 'Mobile Apps <em>Android & iOS</em>', text: 'Strategically manage any area of your business with native, hybrid and responsive web mobile applications.', icon: pt.services.items[1].icon },
        { title: 'Integration <em>Services</em>', text: 'Development of communication protocols: Serial RS232 and RS485, Modbus, OPC Server, Rockwell and Siemens PLCs.', icon: pt.services.items[2].icon },
        { title: '<em>Outsourcing</em>', text: 'We help your team develop and architect applications with our specialists working remotely.', icon: pt.services.items[3].icon },
        { title: '<em>Consulting</em>', text: 'Advisory on designing and structuring projects built on the Microsoft .NET ecosystem.', icon: pt.services.items[4].icon }
      ],
      banner: 'Smart systems built around the specific needs of your business.'
    },
    web: {
      eyebrow: 'Web Development',
      title: 'Software <em>Development</em>',
      text: 'We build stable, scalable applications with modern technology and agile methods. We focus on quality and a transparent process, with continuous-delivery sprints that shorten time to the final product.',
      list: webList
    },
    mobile: {
      eyebrow: 'Mobile Development',
      title: 'Apps for <em>Android & iOS</em>',
      text: 'Apps built with native or hybrid technologies. We cover everything from design concept to development, testing and client acceptance, all the way to publishing on Google Play and the App Store.',
      items: [
        { title: 'Native Android & iOS', text: 'A native app is written in the language of its own platform, Android or iOS. It can be faster and more reliable, and it can work offline.' },
        { title: 'Hybrid', text: 'Built with web languages, a hybrid app looks and behaves like a native one. Combining web and native brings speed and savings to the project without compromising final quality.' },
        { title: 'Web Apps', text: 'Web Apps are applications optimised for mobile devices that deliver a great user experience. They run on data collectors, smartphones and tablets — anything with a browser installed.' }
      ]
    },
    integration: {
      eyebrow: 'Integration Services',
      title: '<em>Integrations?</em> We’re ready!',
      text: [
        'Systems integration is one of the main pillars connecting well-run processes with reliable information.',
        'We have built many communication drivers — from simple API integrations to complex communication systems with OPC servers, Modbus, Ethernet/IP protocols, or reading and decoding data sent over RS232/RS485 serial cable.'
      ]
    },
    outsourcing: {
      eyebrow: 'Outsourcing & Consulting',
      title: 'Need <em>specialist help?</em>',
      text: 'We use our technology expertise to support your in-house team in reaching the best results — so your company can focus more time and energy on its core competencies.',
      tabs: [
        { tab: 'Outsourcing', title: 'Remote outsourcing', text: 'Improve efficiency and keep your company growing by moving tasks, operations, work or processes to an external workforce. Count on a transparent, reliable partnership that supports your business growth.' },
        { tab: 'Consulting', title: 'Effective consulting', text: 'We provide specialist advice on IT management. We run assessments based on an analysis of your processes to identify gaps, vulnerabilities and needs — and bring new ideas, opportunities and technologies suited to your goals.' }
      ]
    },
    projects: {
      eyebrow: 'Delivered projects',
      title: 'Some of <em>our projects</em>',
      casesTitle: 'Explore some <em>success stories</em>',
      items: [
        { title: 'Sequenced Production', text: 'A system built around the Just in Time (JIT) concept — ‘na hora certa’ in Portuguese. It validates and ships sequenced parts for the automotive industry.', icon: pt.projects.items[0].icon },
        { title: 'Warehouse Control', text: 'We help small and large companies manage their inventory, cutting costs and waste by tracking items in and out — bringing clarity to the real value in storage.', icon: pt.projects.items[1].icon },
        { title: 'Labelling & Shipping', text: 'Our software supports operations by configuring and printing custom labels, making re-palletising and storage traceability easier for fast, efficient logistics.', icon: pt.projects.items[2].icon }
      ]
    },
    method: {
      eyebrow: 'Our methodology',
      title: 'A simple, <em>robust and effective</em> process',
      text: 'Following Agile, we use a set of practices designed to coordinate development. They keep the project flexible, cut unnecessary steps and give you constant alignment feedback.',
      steps: [
        { title: 'Requirements gathering', text: 'Capturing the project’s needs and goals, understanding the client’s demands and the results the application is expected to deliver.' },
        { title: 'Design & Prototyping', text: 'Using what we learned in requirements, design begins — a key stage for testing ideas, essential to minimising errors and validating the final product.' },
        { title: 'Development', text: 'Here we plan how the system will work internally: software architecture, programming language, database and more. Then coding begins — the phase where the project comes to life.' },
        { title: 'Testing & Validation', text: 'Focused on validating the product, testing each module’s features against the specifications in the project scope.' },
        { title: 'Deployment', text: 'First rolled out in a test environment to check stability and usability without affecting other processes. Then the application is released and users are trained.' },
        { title: 'Monitoring & Support', text: 'For extra peace of mind, our applications come with support and monitoring tailored to each client, ensuring good performance and stable services.' }
      ]
    },
    about: {
      eyebrow: 'About us',
      title: 'About <em>us</em>',
      founded: 2018,
      text: [
        'Founded in 2018, Duett Software builds software for the logistics and industrial sectors, optimising processes with production-control systems such as Line Feeding, Sequenced Production and more.',
        'Our purpose is to deliver simple, intuitive solutions, focused on integrating applications with SaaS (Software as a Service), Cloud Computing, IoT devices and Artificial Intelligence.'
      ],
      bannerTitle: 'In pursuit of <em>the best results</em>',
      bannerText: 'We are a young team, excited every day by how our work evolves. We are glad to contribute to companies’ technological development, helping them improve their processes and achieve great results.',
      mission: { title: 'Mission', text: 'To bring excellence to our clients and partners through SaaS applications that simplify industrial processes, ensuring continuous improvement and evolution.' },
      vision: { title: 'Vision', text: 'To become a market reference for SaaS products and applications, contributing to the development of Industry 4.0.' },
      techTitle: 'Technologies'
    },
    values: {
      eyebrow: 'Our values',
      title: 'What <em>drives us?</em>',
      items: [
        { title: 'Teamwork', text: 'Encouraging unity and knowledge sharing lets the team grow fast. With good rapport and communication, we overcome big challenges with ease.' },
        { title: 'Planning & Strategy', text: 'Scope changes are frequent and a natural part of any project. Handling them well takes agile, flexible planning that adapts as the work moves forward.' },
        { title: 'Quality', text: 'Caring for the quality of our services means thinking about the future of the business. We must be ready to deliver the best solution and build mutual trust that grows into lasting partnerships.' },
        { title: 'Customer satisfaction', text: 'Satisfied clients are a company’s success. Without them we risk failure, so we always listen to them — not just on specific issues, but as a whole.' },
        { title: 'Continuous innovation', text: 'When you work with technology, learning never stops. We encourage people to be curious, adaptable and open to new knowledge — and that directly drives great results.' }
      ]
    },
    clients: {
      eyebrow: 'Clients & partners',
      title: 'Who trusts <em>our work</em>',
      text: 'Meet some of the clients and partners who rely on our solutions.'
    },
    help: {
      title: 'How can we help?',
      text: 'Tell us what you need.',
      whatsapp: 'Chat on WhatsApp',
      demo: 'Book a demo',
      demoSubject: 'I would like to book a demo'
    },
    contact: {
      title: 'Get in <em>touch</em>',
      text: 'Have a question or just want to say hi? We’d love to hear from you!',
      sales: { title: 'Sales', text: 'Talk to us about business, questions or suggestions.' },
      support: { title: 'Support', text: 'We’re here to help.' },
      location: { title: 'Location', lines: [] }
    },
    careers: {
      eyebrow: 'Work with us',
      title: 'Want to join <em>the team?</em>',
      text: 'We are always looking for professionals to join our team — people who see challenges as motivation to do more and better.',
      text2: 'If this sounds like you, send us your résumé.',
      cta: 'Submit résumé'
    },
    social: {
      eyebrow: 'Duett in the media',
      title: 'Follow us on <em>social media!</em>',
      text: 'Keep up with all our news on social media.'
    },
    footer: {
      sitemap: 'Sitemap',
      links: 'Links',
      terms: 'Terms & Conditions',
      privacy: 'Privacy Policy',
      where: 'Where we are',
      address: pt.footer.address,
      copyright: 'Copyright © 2026 Duett Software'
    }
  };
  en.contact.location.lines = pt.contact.location.lines.slice(0, 2).concat(['Rio Grande do Sul, Brazil']);

  function getLang() {
    var q = new URLSearchParams(location.search).get('lang');
    if (q === 'en' || q === 'pt') return q;
    try { var s = localStorage.getItem('duett-lang'); if (s === 'en' || s === 'pt') return s; } catch (e) {}
    return 'pt';
  }

  var lang = getLang();
  var c = lang === 'en' ? en : pt;
  c.links = links;
  c.media = media;
  c.code = lang;

  document.documentElement.lang = c.lang;
  document.title = c.meta.title;
  var md = document.querySelector('meta[name="description"]');
  if (md) md.setAttribute('content', c.meta.description);

  window.DUETT = {
    c: c,
    lang: lang,
    /* Troca o idioma mantendo a posição relativa da rolagem. */
    toggleLang: function () {
      var next = lang === 'en' ? 'pt' : 'en';
      try {
        localStorage.setItem('duett-lang', next);
        var max = document.documentElement.scrollHeight - innerHeight;
        sessionStorage.setItem('duett-scroll', String(max > 0 ? scrollY / max : 0));
      } catch (e) {}
      var u = new URL(location.href);
      u.searchParams.set('lang', next);
      location.href = u.toString();
    },
    /* Ratio de rolagem salvo antes da troca de idioma (0..1) ou null. */
    takeScroll: function () {
      try {
        var v = sessionStorage.getItem('duett-scroll');
        sessionStorage.removeItem('duett-scroll');
        return v === null ? null : parseFloat(v);
      } catch (e) { return null; }
    },
    reducedMotion: matchMedia('(prefers-reduced-motion: reduce)').matches,
    mailto: function (subject) {
      return 'mailto:' + links.emailSales + '?subject=' + encodeURIComponent(subject);
    },
    /* Separa texto em spans de palavra para animações (preserva <em>). */
    words: function (html) {
      var tmp = document.createElement('div');
      tmp.innerHTML = html;
      var out = '';
      tmp.childNodes.forEach(function (n) {
        var isEm = n.nodeType === 1;
        var txt = n.textContent;
        txt.split(/(\s+)/).forEach(function (w) {
          if (!w) return;
          if (/^\s+$/.test(w)) { out += ' '; return; }
          var span = '<span class="w"><span class="wi">' + w.replace(/&/g, '&amp;').replace(/</g, '&lt;') + '</span></span>';
          out += isEm ? '<em>' + span + '</em>' : span;
        });
      });
      return out;
    }
  };
})();
