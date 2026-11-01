export type Locale = 'en' | 'fr'
export type Localized<T = string> = Record<Locale, T>

export const profile = {
  name: 'Zakaria Toura',
  email: 'zikotour129@gmail.com',
  github: 'https://github.com/zakariat01',
  githubLabel: 'github.com/zakariat01',
  cv: 'cv/Zakaria-Toura-CV-FR.pdf',
  // Do not render unverified fields. Add LinkedIn only after confirming the exact URL.
  linkedin: null as string | null,
}

export interface Project {
  id: string
  title: Localized
  description: Localized
  contribution?: Localized
  technologies?: string[]
  media?: { type: 'image' | 'video'; src: string; alt: Localized; poster?: string }
  caseStudy?: { summary: Localized; sections: { title: Localized; body: Localized }[] }
  github?: string
  demo?: string
}

// Replace these entries in place. No empty links, fabricated work, or implied results.
export const projects: Project[] = ['01', '02', '03'].map((number) => ({
  id: `project-${number}`,
  title: { en: `Project ${number}`, fr: `Projet ${number}` },
  description: { en: 'Project details coming soon.', fr: 'Les détails du projet arrivent bientôt.' },
}))

export const skillGroups: { title: Localized; technologies: string[] }[] = [
  { title: { en: 'Interfaces', fr: 'Interfaces' }, technologies: ['HTML', 'CSS', 'JavaScript', 'React', 'Angular', 'Tailwind CSS', 'Bootstrap', 'jQuery'] },
  { title: { en: 'Web applications', fr: 'Applications web' }, technologies: ['PHP', 'Laravel', 'Node.js', 'Next.js'] },
  { title: { en: 'Languages & foundations', fr: 'Langages et fondamentaux' }, technologies: ['C', 'Java', 'Python', 'C#'] },
  { title: { en: 'Data', fr: 'Données' }, technologies: ['MySQL', 'PL/SQL'] },
]

export const education: { school: string; programme: Localized; location: Localized; period: string | null }[] = [
  {
    school: 'Institut Supérieur de Génie Informatique',
    programme: { en: 'Computer development', fr: 'Développement en informatique' },
    location: { en: 'Tétouan', fr: 'Tétouan' },
    period: null, // CV: October 2023–present. Current status is NOT confirmed.
  },
  {
    school: 'Faculté Polydisciplinaire de Larache',
    programme: { en: 'Mathematics & computer science', fr: 'Mathématiques et informatique' },
    location: { en: 'Larache', fr: 'Larache' },
    period: '2022–2023',
  },
  {
    school: 'Lycée Ibn Batouta',
    programme: { en: 'Physical sciences', fr: 'Sciences physiques' },
    location: { en: 'Larache', fr: 'Larache' },
    period: '2020–2022',
  },
]

// Editorial checklist, never rendered as public claims.
export const pendingConfirmation = {
  education: 'ISGI is marked 10/2023–present in the supplied CV. Confirm current enrollment/completion and exact qualification before publishing a status or award.',
  linkedin: 'The supplied LinkedIn address is incomplete. Confirm the exact profile URL.',
  projects: 'Replace three intentional placeholders when descriptions, contributions, media, repositories and demo links are available.',
}

export const copy = {
  en: {
    nav: { work: 'Work', about: 'About', contact: 'Contact' },
    home: 'Zakaria Toura — back to top',
    skip: 'Skip to content',
    language: 'Website language',
    introduction: 'Introduction',
    hero: { first: 'Logic,', second: 'made', accent: 'visible.', description: 'Full-stack developer, with a focus on thoughtful interfaces and the foundations behind them.', location: 'Based in Tétouan, Morocco.', work: 'Explore work', cv: 'Download CV (French)' },
    experiment: { label: 'Interface experiment', caption: 'A study in type, space, and response.', hint: 'Move to explore. Press to look closer.', control: 'Zoom into the monogram', reset: 'Reset the monogram', help: 'Press to zoom. Use arrow keys to explore the detail. Escape resets the view.', alt: 'Outlined Z and T letterforms on a fine construction grid, with circles and a cobalt square.', normal: 'Full composition', zoomed: 'Detail view' },
    work: { label: 'Selected work', status: 'Details coming soon', heading: "Room for what’s next.", media: 'Media to come', contribution: 'My contribution', caseStudy: 'Read the case study', github: 'Source on GitHub', demo: 'View live demo', video: 'Your browser does not support this video.' },
    about: { label: 'About & foundations', heading: 'Curious by nature.\nCareful by design.', intro: 'I’m Zakaria, a full-stack developer with a particular interest in the front end. I enjoy understanding how people use an interface, then finding a clear, considered way to build it.', body: 'Curiosity, analytical thinking, and attention to detail shape how I approach a problem. I value collaboration and sharing what I learn — good ideas get better when we work on them together.', skills: 'Technologies I’ve worked with', skillsIntro: 'A toolkit built through learning and projects. Each technology has its place; the problem comes first.', education: 'Education', languages: 'Languages', languageList: ['Arabic', 'French', 'English'] },
    contact: { label: 'Contact', heading: 'Have something\nin mind?', text: 'Feel free to reach out. I’m always open to interesting ideas and conversations.', email: 'Email Zakaria Toura', github: 'Visit Zakaria Toura on GitHub', cv: 'CV in French' },
    footer: { note: 'Thoughtful interfaces. Solid foundations.', top: 'Back to top' },
    meta: { title: 'Zakaria Toura — Full-stack developer', description: 'Zakaria Toura, a full-stack developer in Tétouan, Morocco, with a focus on thoughtful interfaces and solid foundations.', social: 'Thoughtful interfaces. Solid foundations. Meet Zakaria Toura, full-stack developer in Tétouan, Morocco.' },
  },
  fr: {
    nav: { work: 'Projets', about: 'À propos', contact: 'Contact' },
    home: 'Zakaria Toura — retour en haut',
    skip: 'Aller au contenu',
    language: 'Langue du site',
    introduction: 'Présentation',
    hero: { first: 'La logique,', second: 'rendue', accent: 'visible.', description: 'Développeur full-stack, attentif aux interfaces et aux fondations qui les rendent possibles.', location: 'Basé à Tétouan, au Maroc.', work: 'Voir les projets', cv: 'Télécharger le CV (français)' },
    experiment: { label: 'Expérience d’interface', caption: 'Une étude de la typographie, de l’espace et du mouvement.', hint: 'Explorez. Appuyez pour voir les détails.', control: 'Agrandir le monogramme', reset: 'Réinitialiser le monogramme', help: 'Appuyez pour agrandir. Utilisez les flèches pour explorer les détails. Échap réinitialise la vue.', alt: 'Les lettres Z et T dessinées sur une grille de construction fine, avec des cercles et un carré bleu cobalt.', normal: 'Composition entière', zoomed: 'Vue détaillée' },
    work: { label: 'Sélection de projets', status: 'Détails à venir', heading: 'La suite prend forme.', media: 'Visuel à venir', contribution: 'Ma contribution', caseStudy: 'Lire l’étude de cas', github: 'Code sur GitHub', demo: 'Voir la démo', video: 'Votre navigateur ne prend pas en charge cette vidéo.' },
    about: { label: 'À propos et fondamentaux', heading: 'Curieux par nature.\nAttentif par conviction.', intro: 'Je suis Zakaria, développeur full-stack, avec un intérêt particulier pour le front-end. J’aime comprendre comment les personnes utilisent une interface, puis trouver une façon claire et réfléchie de la construire.', body: 'La curiosité, l’esprit d’analyse et le souci du détail guident ma façon de résoudre les problèmes. J’apprécie la collaboration et le partage de connaissances : les bonnes idées se développent ensemble.', skills: 'Les technologies que j’ai utilisées', skillsIntro: 'Des outils explorés au fil des apprentissages et des projets. Chaque technologie a sa place ; le besoin passe avant l’outil.', education: 'Formation', languages: 'Langues', languageList: ['Arabe', 'Français', 'Anglais'] },
    contact: { label: 'Contact', heading: 'Une idée\nen tête ?', text: 'N’hésitez pas à me contacter. Je suis toujours partant pour échanger autour d’idées et de projets intéressants.', email: 'Envoyer un e-mail à Zakaria Toura', github: 'Voir le profil GitHub de Zakaria Toura', cv: 'CV en français' },
    footer: { note: 'Des interfaces soignées. Des bases solides.', top: 'Retour en haut' },
    meta: { title: 'Zakaria Toura — Développeur full-stack', description: 'Zakaria Toura, développeur full-stack à Tétouan, au Maroc. Des interfaces soignées, des bases solides et le souci du détail.', social: 'Des interfaces soignées. Des bases solides. Découvrez Zakaria Toura, développeur full-stack à Tétouan, au Maroc.' },
  },
} as const
