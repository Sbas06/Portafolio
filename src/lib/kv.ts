import type { Project, ExperienceEntry, About, Contact } from './types';

export const DEFAULT_ABOUT: About = {
  hi: 'Hola, soy <span class="sea">Sebastián</span> — desarrollador de software desde Medellín, Colombia.',
  bio1: 'Fullstack con raíz en mecatrónica: me muevo cómodo entre el hardware, el sistema y la interfaz. Construyo storefronts Shopify, plataformas MERN, experiencias 3D en la web y pipelines de DevOps que entregan sin fricción.',
  bio2: 'Me gusta el código limpio, escalable y bien documentado — y los retos donde la electrónica, la web y la automatización se cruzan. Siempre listo para zarpar hacia el siguiente puerto.',
  years: '08',
  skills: [
    ['REACT', 't-sea'], ['NODE.JS', 't-brass'], ['SHOPIFY', 't-foam'],
    ['DOCKER', 't-led'], ['AZURE', 't-sea'], ['THREE.JS', 't-coral'],
    ['PYTHON', 't-brass'], ['PHP', 't-foam'], ['MECATRÓNICA', 't-sea'],
  ],
};

export const DEFAULT_PROJECTS: Project[] = [
  {
    id: 'shopify', no: '01', order: 1, visible: true,
    year: '2024 — NOW', kicker: 'E-COMMERCE · SHOPIFY',
    title: 'SHOPIFY THEME LAB',
    meta: 'Web Developer @ ROP St DigitALL',
    oneliner: 'Temas Shopify a medida con Liquid limpio y escalable.',
    ph: 'STOREFRONT\nCAPTURE',
    lede: 'Desarrollo de temas Shopify a medida: plantillas Liquid, secciones reutilizables y un código limpio y escalable pensado para que equipos no técnicos editen sin romper nada.',
    highlights: [
      ['LIQUID', 'Arquitectura de secciones modulares y bloques reutilizables.'],
      ['DX', 'Código documentado y escalable para handoff a clientes.'],
      ['UX', 'Storefronts rápidos, accesibles y mobile-first.'],
    ],
    stack: [['SHOPIFY','t-sea'],['LIQUID','t-brass'],['JS / TS','t-sea'],['SASS','t-foam']],
    demoUrl: '', codeUrl: '',
  },
  {
    id: 'mindworld', no: '02', order: 2, visible: true,
    year: 'FEB — NOV 2022', kicker: '3D · THREE.JS',
    title: 'MIND WORLD 3D',
    meta: 'Web 3D Developer @ Mind World',
    oneliner: 'Sistema solar interactivo en WebGL. −25% de carga.',
    ph: 'SOLAR SYSTEM\nWEBGL',
    lede: 'Sistema solar interactivo en Three.js con controles de cámara personalizados, órbitas en tiempo real y optimización de assets para una experiencia fluida en la web.',
    highlights: [
      ['−25%', 'Tiempo de carga reducido optimizando geometrías y texturas.'],
      ['WEBGL', 'Render en tiempo real con controles de cámara custom.'],
      ['60FPS', 'Animación de órbitas estable en desktop y tablet.'],
    ],
    stack: [['THREE.JS','t-coral'],['JS','t-sea'],['HTML5','t-brass'],['CSS3','t-foam']],
    demoUrl: '', codeUrl: '',
  },
  {
    id: 'darwin', no: '03', order: 3, visible: true,
    year: 'ABR — JUL 2024', kicker: 'BLOCKCHAIN · WEB3',
    title: 'DARWIN TRACE',
    meta: 'Fullstack Developer @ Darwin Evolution',
    oneliner: 'Trazabilidad blockchain · MERN + Web3 + microservicios.',
    ph: 'TRACEABILITY\nLEDGER',
    lede: 'Plataforma de trazabilidad sobre blockchain: stack MERN, integración Web3 y una arquitectura de microservicios para registrar y verificar cada eslabón de la cadena.',
    highlights: [
      ['WEB3', 'Registro inmutable y verificación on-chain de eventos.'],
      ['MERN', 'API y dashboard fullstack sobre Mongo, Express, React, Node.'],
      ['µSVC', 'Servicios desacoplados para escalar por dominio.'],
    ],
    stack: [['REACT','t-sea'],['NODE.JS','t-led'],['WEB3.0','t-brass'],['MONGO','t-foam']],
    demoUrl: '', codeUrl: '',
  },
  {
    id: 'cicd', no: '04', order: 4, visible: true,
    year: 'JUL — SEP 2024', kicker: 'DEVOPS · AZURE',
    title: 'CI/CD PIPELINES',
    meta: 'DevOps Developer @ Darwin Evolution',
    oneliner: 'Azure App Service + Docker. −40% tiempo de deploy.',
    ph: 'PIPELINE\nDASHBOARD',
    lede: 'Automatización completa del ciclo de despliegue sobre Azure App Service y Docker: builds reproducibles, entornos contenedizados y entregas continuas sin fricción.',
    highlights: [
      ['−40%', 'Reducción del tiempo de despliegue end-to-end.'],
      ['DOCKER', 'Entornos idénticos de dev a producción.'],
      ['AZURE', 'App Service + pipelines de integración continua.'],
    ],
    stack: [['AZURE','t-sea'],['DOCKER','t-foam'],['CI/CD','t-led'],['GITHUB','t-brass']],
    demoUrl: '', codeUrl: '',
  },
  {
    id: 'triada', no: '05', order: 5, visible: true,
    year: 'JUL — SEP 2022', kicker: 'ACADEMIA · WORDPRESS',
    title: 'TRIADA ACADEMY',
    meta: 'CTO & Lead Dev @ Triada Academy',
    oneliner: 'Admin web, livestream y recursos. +35% velocidad.',
    ph: 'LMS + LIVE\nSTREAM',
    lede: 'Administración web de una academia: integración de livestream, recursos pedagógicos y endurecimiento de seguridad, liderando el roadmap técnico del producto.',
    highlights: [
      ['+35%', 'Mejora de velocidad de carga del sitio.'],
      ['LIVE', 'Integración de streaming y recursos para clases.'],
      ['LEAD', 'Dirección técnica y arquitectura del producto.'],
    ],
    stack: [['WORDPRESS','t-brass'],['PHP','t-sea'],['SEO','t-foam']],
    demoUrl: '', codeUrl: '',
  },
  {
    id: 'next', no: '06', order: 6, visible: true,
    year: 'SOON™', kicker: 'PRÓXIMO PROYECTO',
    title: 'NEXT VOYAGE',
    meta: 'Slot reservado',
    oneliner: 'Bodega reservada para el siguiente puerto.',
    ph: '???\nUNCHARTED',
    lede: 'Bodega reservada para el próximo proyecto. ¿Tienes una idea que zarpar? Esta es la próxima coordenada en el mapa.',
    highlights: [['OPEN', 'Disponible para colaboraciones y nuevos retos.']],
    stack: [['SOON','t-coral']],
    emblemStyle: 'background:linear-gradient(160deg,var(--brass),var(--brass-dark));',
    demoUrl: '', codeUrl: '',
  },
];

export const DEFAULT_EXPERIENCE: ExperienceEntry[] = [
  { id: 'e9', order: 1, lvl: 'L9', role: 'SYSTEM ADMINISTRATOR', subrole: 'Mantenimiento HW · Redes LAN/WAN · Soporte L1-L2', company: 'ROP St DigitALL', dates: '2026 — NOW', status: 'active' },
  { id: 'e8', order: 2, lvl: 'L8', role: 'WEB DEVELOPER · SHOPIFY', subrole: 'Temas custom · Liquid · código limpio & escalable', company: 'ROP St DigitALL', dates: '2024 — NOW', status: 'active' },
  { id: 'e7', order: 3, lvl: 'L7', role: 'DEVOPS DEVELOPER', subrole: 'Azure App Service · Docker · CI/CD −40% deploy', company: 'Darwin Evolution', dates: 'JUL — SEP 2024', status: 'done' },
  { id: 'e6', order: 4, lvl: 'L6', role: 'FULLSTACK DEVELOPER', subrole: 'MERN · Blockchain trazabilidad · Web3 · microservicios', company: 'Darwin Evolution', dates: 'ABR — JUL 2024', status: 'done' },
  { id: 'e5', order: 5, lvl: 'L5', role: 'DIRECTOR DE TI', subrole: 'Liderazgo técnico · infraestructura', company: 'Libresco', dates: 'JUL — SEP 2023', status: 'done' },
  { id: 'e4', order: 6, lvl: 'L4', role: 'SOFTWARE DEVELOPER', subrole: 'WordPress · PHP · features y bugfixing en producción', company: 'Grupo Ideasa', dates: '2022 — 2023', status: 'done' },
  { id: 'e3', order: 7, lvl: 'L3', role: 'WEB 3D DEVELOPER', subrole: 'Three.js · sistema solar interactivo · −25% load time', company: 'Mind World', dates: 'FEB — NOV 2022', status: 'done' },
  { id: 'e2', order: 8, lvl: 'L2', role: 'CTO & LEAD DEV', subrole: 'Admin web · livestream · recursos pedagógicos', company: 'Triada Academy', dates: 'JUL — SEP 2022', status: 'done' },
  { id: 'e1', order: 9, lvl: 'L1', role: 'FREELANCE DEVELOPER', subrole: 'Landing pages, automatizaciones, WordPress, JS, Python', company: 'Self-employed', dates: '2021 — 2022', status: 'archive' },
];

export async function getProjects(kv: KVNamespace | undefined): Promise<Project[]> {
  if (!kv) return DEFAULT_PROJECTS;
  try {
    const data = await kv.get('projects', 'json') as Project[] | null;
    return data ?? DEFAULT_PROJECTS;
  } catch {
    return DEFAULT_PROJECTS;
  }
}

export async function setProjects(kv: KVNamespace, projects: Project[]): Promise<void> {
  await kv.put('projects', JSON.stringify(projects));
}

export async function getExperience(kv: KVNamespace | undefined): Promise<ExperienceEntry[]> {
  if (!kv) return DEFAULT_EXPERIENCE;
  try {
    const data = await kv.get('experience', 'json') as ExperienceEntry[] | null;
    return data ?? DEFAULT_EXPERIENCE;
  } catch {
    return DEFAULT_EXPERIENCE;
  }
}

export async function setExperience(kv: KVNamespace, experience: ExperienceEntry[]): Promise<void> {
  await kv.put('experience', JSON.stringify(experience));
}

export async function getAbout(kv: KVNamespace | undefined): Promise<About> {
  if (!kv) return DEFAULT_ABOUT;
  try {
    const data = await kv.get('about', 'json') as About | null;
    return data ?? DEFAULT_ABOUT;
  } catch {
    return DEFAULT_ABOUT;
  }
}

export async function setAbout(kv: KVNamespace, about: About): Promise<void> {
  await kv.put('about', JSON.stringify(about));
}

export const DEFAULT_CONTACT: Contact = {
  bigCall: 'Construyamos algo <span class="sea">bueno</span> <span class="brass">juntos</span>.',
  githubUrl: 'https://github.com/Sbas0611',
  githubLabel: 'github.com/Sbas0611',
  linkedinUrl: 'https://www.linkedin.com/in/sebastián-arboleda',
  linkedinLabel: 'in/sebastián-arboleda',
  email: 'dev.arboleda@gmail.com',
  phone: '+57 321 808 8339',
  footerLeft: '© 2026 SBAS.DEV &nbsp;·&nbsp; MADE IN MEDELLÍN',
  footerRight: 'BUILT WITH ⚓ + ⚙ + PIXELS',
};

export async function getContact(kv: KVNamespace | undefined): Promise<Contact> {
  if (!kv) return DEFAULT_CONTACT;
  try {
    const data = await kv.get('contact', 'json') as Contact | null;
    return data ?? DEFAULT_CONTACT;
  } catch {
    return DEFAULT_CONTACT;
  }
}

export async function setContact(kv: KVNamespace, contact: Contact): Promise<void> {
  await kv.put('contact', JSON.stringify(contact));
}
