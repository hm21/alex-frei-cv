import { SkillItem } from 'src/app/features/resume/interfaces/resume.interface';
import { Knowledge } from 'src/app/features/resume/types/resume.types';

export const FRONTEND_SKILLS: SkillItem[] = [
  {
    name: `Angular`,
    skillLevel: 100,
  },
  {
    name: `Flutter`,
    skillLevel: 100,
  },
  {
    name: `Typescript / Javascript`,
    skillLevel: 95,
  },
  {
    name: `HTML / CSS`,
    skillLevel: 95,
  },
  {
    name: `Ionic`,
    skillLevel: 85,
  },
];

export const BACKEND_SKILLS: SkillItem[] = [
  {
    name: `Firebase`,
    skillLevel: 100,
  },
  {
    name: `Supabase`,
    skillLevel: 85,
  },
  {
    name: `Google Cloud`,
    skillLevel: 80,
  },
  {
    name: `.NET`,
    skillLevel: 30,
  },
  {
    name: `Azure`,
    skillLevel: 20,
  },
];

export const KNOWLEDGE: ReadonlyArray<Knowledge> = [
  { name: 'RxJS', type: 'Reactive Programming', icon: 'rxjs' },
  { name: 'Angular-Material', type: 'UI Component', icon: 'angular' },
  { name: 'Flutter-Provider', type: 'State Management', icon: 'flutter' },
  { name: 'MongoDB', type: 'NoSQL Database', icon: 'mongodb' },
  { name: 'PostgreSQL', type: 'Relational Database', icon: 'postgresql' },
  { name: 'Typesense', type: 'Search Engine', icon: 'typesense' },
  { name: 'Algolia', type: 'Search Engine', icon: 'algolia' },
  { name: 'Figma', type: 'Design Tool', icon: 'figma' },
  { name: 'Node.js', type: 'Runtime Environment', icon: 'nodejs' },
  { name: 'Nativescript', type: 'Mobile App Framework', icon: 'nativescript' },
  { name: 'Stripe-API', type: 'Payment API', icon: 'stripe' },
  { name: 'OpenAI-API', type: 'AI Service API', icon: 'openai' },
  { name: 'Lucidchart', type: 'Diagramming Tool', icon: 'lucidchart' },
  { name: 'Sendgrid', type: 'Email Delivery Service', icon: 'sendgrid' },
  { name: 'Xcode', type: 'IDE', icon: 'xcode' },
  { name: 'VS-Code', type: 'IDE', icon: 'vs-code' },
  { name: 'Android-Studio', type: 'IDE', icon: 'android-studio' },
  { name: 'iOS Release', type: 'Mobile Deployment', icon: 'app-store' },
  { name: 'Android Release', type: 'Mobile Deployment', icon: 'play-store' },
  {
    name: 'AppGallery Release',
    type: 'Mobile Deployment',
    icon: 'app-gallery',
  },
  // { name: 'RxDart', type: 'Reactive Programming', icon: 'rxjs' },
  // { name: 'Java', type: 'Language', icon: 'java' },
  // { name: 'Github-Actions', type: 'CI/CD Tool', icon: 'github' },
  // { name: 'Unity', type: 'Game Engine', icon: 'unity' },
  // { name: 'libGDX', type: 'Game Library', icon: 'libgdx' },
];
