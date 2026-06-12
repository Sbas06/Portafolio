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
