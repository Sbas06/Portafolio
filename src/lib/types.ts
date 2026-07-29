export interface Project {
  id: string;
  no: string;
  year: string;
  kicker: string;
  title: string;
  meta: string;
  oneliner: string;
  ph: string;
  lede: string;
  highlights: [string, string][];
  stack: [string, string][];
  demoUrl?: string;
  codeUrl?: string;
  order: number;
  visible: boolean;
  emblemStyle?: string;
}

export interface About {
  hi: string;
  bio1: string;
  bio2: string;
  years: string;
  skills: [string, string][];
}

export interface ExperienceEntry {
  id: string;
  lvl: string;
  role: string;
  subrole: string;
  company: string;
  dates: string;
  status: 'active' | 'done' | 'archive';
  order: number;
}

export interface Contact {
  bigCall: string;
  githubUrl: string;
  githubLabel: string;
  linkedinUrl: string;
  linkedinLabel: string;
  email: string;
  phone: string;
  footerLeft: string;
  footerRight: string;
}
