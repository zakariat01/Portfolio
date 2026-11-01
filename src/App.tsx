import { useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent, type PropsWithChildren } from 'react'
import { MotionConfig, motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import { ArrowDown, ArrowDownRight, ArrowUp, ArrowUpRight, EnvelopeSimple, GithubLogo, MapPin, Plus, Square } from '@phosphor-icons/react'
import { copy, education, profile, projects, skillGroups, type Locale, type Project } from './content'

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`
const sectionIds = ['intro', 'work', 'about', 'contact'] as const
type SectionId = typeof sectionIds[number]

function initialLocale(): Locale {
  const requested = new URLSearchParams(window.location.search).get('lang')
  if (requested === 'en' || requested === 'fr') return requested
  try {
    return localStorage.getItem('zt-language') === 'fr' ? 'fr' : 'en'
  } catch { return 'en' }
}

function Reveal({ children, className = '' }: PropsWithChildren<{ className?: string }>) {
  const reduce = useReducedMotion()
  return <motion.div className={className} initial={reduce ? false : { y: 18 }} whileInView={{ y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>
}

function SectionLabel({ number, children }: PropsWithChildren<{ number: string }>) {
  return <p className="section-label"><span>{number}</span><span aria-hidden="true">/</span>{children}</p>
}

function MonogramExperiment({ locale }: { locale: Locale }) {
  const t = copy[locale].experiment
  const reduce = useReducedMotion()
  const [zoomed, setZoomed] = useState(false)
  const [keyboardOffset, setKeyboardOffset] = useState({ x: 0, y: 0 })
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const rotateX = useSpring(pointerY, { stiffness: 110, damping: 22 })
  const rotateY = useSpring(pointerX, { stiffness: 110, damping: 22 })
  function reset() {
    pointerX.set(0)
    pointerY.set(0)
    setZoomed(false)
    setKeyboardOffset({ x: 0, y: 0 })
  }
  function keyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === 'Escape') { reset(); return }
    const directions: Record<string, [number, number]> = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] }
    const direction = directions[event.key]
    if (!direction) return
    event.preventDefault()
    setZoomed(true)
    setKeyboardOffset((previous) => ({ x: Math.max(-24, Math.min(24, previous.x + direction[0] * 8)), y: Math.max(-24, Math.min(24, previous.y + direction[1] * 8)) }))
  }
  return <figure className="monogram-experiment">
    <motion.button
      type="button"
      className={`monogram-control ${zoomed ? 'is-zoomed' : ''}`}
      aria-label={t.control}
      aria-pressed={zoomed}
      aria-describedby="experiment-help"
      onClick={() => { setZoomed(!zoomed); setKeyboardOffset({ x: 0, y: 0 }) }}
      onKeyDown={keyDown}
      onPointerMove={(event) => {
        if (reduce || event.pointerType === 'touch') return
        const rect = event.currentTarget.getBoundingClientRect()
        pointerX.set(((event.clientX - rect.left) / rect.width - 0.5) * 7)
        pointerY.set(((event.clientY - rect.top) / rect.height - 0.5) * -7)
      }}
      onPointerLeave={() => { pointerX.set(0); pointerY.set(0) }}
    >
      <motion.img
        src={asset('images/monogram-study.webp')}
        alt={t.alt}
        width="1044" height="982"
        fetchPriority="high"
        style={{ rotateX: reduce ? 0 : rotateX, rotateY: reduce ? 0 : rotateY }}
        animate={{ scale: zoomed ? 1.16 : 1, x: keyboardOffset.x, y: keyboardOffset.y }}
        transition={{ duration: reduce ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
      />
      <span className="experiment-view mono" aria-live="polite">{zoomed ? t.zoomed : t.normal}<ArrowUpRight aria-hidden="true" size={14} /></span>
    </motion.button>
    <figcaption>
      <span className="mono experiment-label">{t.label}</span>
      <span className="mono experiment-caption">{t.caption}</span>
      <span className="experiment-hint">{t.hint}</span>
    </figcaption>
    <span id="experiment-help" className="sr-only">{t.help}</span>
  </figure>
}

function ProjectEntry({ project, index, locale }: { project: Project; index: number; locale: Locale }) {
  const t = copy[locale].work
  return <Reveal className={`project-entry ${index === 0 ? 'featured-project' : ''}`}>
    <article aria-labelledby={`${project.id}-title`}>
      <div className={`project-media ${project.media ? 'has-media' : ''}`}>
        {project.media?.type === 'image' ? <img src={asset(project.media.src)} alt={project.media.alt[locale]} width="1200" height="750" loading="lazy" decoding="async" /> : project.media?.type === 'video' ?
          <video controls preload="metadata" poster={project.media.poster ? asset(project.media.poster) : undefined} aria-label={project.media.alt[locale]}><source src={asset(project.media.src)} />{t.video}</video> : <>
            <Plus aria-hidden="true" className="media-registration media-registration-start" size={25} weight="thin" />
            <Square aria-hidden="true" className="media-accent" size={15} weight="fill" />
            <span className="mono media-label">{t.media}</span>
            <Plus aria-hidden="true" className="media-registration media-registration-end" size={25} weight="thin" />
          </>}
      </div>
      <div className="project-copy">
        <h3 id={`${project.id}-title`}>{project.title[locale]}</h3>
        <p>{project.description[locale]}</p>
        {project.contribution && <p className="project-contribution"><strong>{t.contribution}</strong> {project.contribution[locale]}</p>}
        {!!project.technologies?.length && <ul className="project-technologies">{project.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul>}
        {project.caseStudy && <details className="project-case-study"><summary>{t.caseStudy}</summary><p>{project.caseStudy.summary[locale]}</p>{project.caseStudy.sections.map((section) => <div key={section.title.en}><h4>{section.title[locale]}</h4><p>{section.body[locale]}</p></div>)}</details>}
        {(project.github || project.demo) && <div className="project-links">{project.github && <a href={project.github}>{t.github}<GithubLogo size={18} aria-hidden="true" /></a>}{project.demo && <a href={project.demo}>{t.demo}<ArrowUpRight size={18} aria-hidden="true" /></a>}</div>}
      </div>
    </article>
  </Reveal>
}

export default function App() {
  const [locale, setLocale] = useState<Locale>(initialLocale)
  const [active, setActive] = useState<SectionId>('intro')
  const pendingPosition = useRef<{ id: SectionId; top: number } | null>(null)
  const reduce = useReducedMotion()
  const t = copy[locale]

  function changeLanguage(next: Locale) {
    if (next === locale) return
    const section = sectionIds.map((id) => document.getElementById(id)!).reverse().find((element) => element.getBoundingClientRect().top <= 160) || document.getElementById('intro')!
    pendingPosition.current = { id: section.id as SectionId, top: section.getBoundingClientRect().top }
    try { localStorage.setItem('zt-language', next) } catch { /* Preference remains in memory if storage is unavailable. */ }
    const url = new URL(window.location.href)
    url.searchParams.set('lang', next)
    window.history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`)
    setLocale(next)
  }

  useLayoutEffect(() => {
    if (!pendingPosition.current) return
    const { id, top } = pendingPosition.current
    const element = document.getElementById(id)
    if (element) window.scrollBy({ top: element.getBoundingClientRect().top - top, behavior: 'instant' })
    pendingPosition.current = null
  }, [locale])

  useEffect(() => {
    document.documentElement.lang = locale
    document.title = t.meta.title
    const setMeta = (selector: string, value: string) => document.querySelector(selector)?.setAttribute('content', value)
    setMeta('meta[name="description"]', t.meta.description)
    setMeta('meta[property="og:title"]', t.meta.title)
    setMeta('meta[property="og:description"]', t.meta.social)
    setMeta('meta[property="og:locale"]', locale === 'fr' ? 'fr_FR' : 'en_US')
    setMeta('meta[name="twitter:title"]', t.meta.title)
    setMeta('meta[name="twitter:description"]', t.meta.social)
  }, [locale, t.meta])

  useEffect(() => {
    let scheduled = false
    function updateActive() {
      scheduled = false
      const section = sectionIds.filter((id) => (document.getElementById(id)?.getBoundingClientRect().top ?? Infinity) < window.innerHeight * 0.4).at(-1)
      setActive(section || 'intro')
    }
    function onScroll() { if (!scheduled) { scheduled = true; requestAnimationFrame(updateActive) } }
    window.addEventListener('scroll', onScroll, { passive: true })
    updateActive()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const entrance = (delay: number) => ({ initial: reduce ? false as const : { y: 20 }, animate: { y: 0 }, transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const } })

  return <MotionConfig reducedMotion="user">
    <a href="#main" className="skip-link">{t.skip}</a>
    <header className="site-header page-width flex items-center justify-between">
      <a className="brand" href="#intro" aria-label={t.home}><img src={asset('images/zt-wordmark.webp')} alt="" width="480" height="304" /></a>
      <nav aria-label={locale === 'en' ? 'Main navigation' : 'Navigation principale'}>
        {(['work', 'about', 'contact'] as const).map((id) => <a key={id} href={`#${id}`} className={active === id ? 'is-current' : ''} aria-current={active === id ? 'location' : undefined}>{t.nav[id]}</a>)}
      </nav>
      <div className="language-switch" role="group" aria-label={t.language}>
        <button type="button" lang="en" aria-label="English" aria-pressed={locale === 'en'} onClick={() => changeLanguage('en')}>EN</button>
        <span aria-hidden="true">/</span>
        <button type="button" lang="fr" aria-label="Français" aria-pressed={locale === 'fr'} onClick={() => changeLanguage('fr')}>FR</button>
      </div>
    </header>
    <main id="main" className="page-width" tabIndex={-1}>
      <section id="intro" className="hero" aria-labelledby="name">
        <motion.h1 id="name" className="name" {...entrance(0)}>Zakaria Toura</motion.h1>
        <div className="hero-columns grid">
          <motion.div className="hero-copy" {...entrance(0.1)}>
            <SectionLabel number="01">{t.introduction}</SectionLabel>
            <h2 className="hero-statement"><span>{t.hero.first}</span><span>{t.hero.second} <em>{t.hero.accent}</em></span></h2>
            <p className="hero-description">{t.hero.description}</p>
            <p className="location"><MapPin size={21} weight="regular" aria-hidden="true" />{t.hero.location}</p>
            <div className="hero-actions flex flex-wrap items-center">
              <a href="#work" className="primary-link">{t.hero.work}<ArrowDownRight size={21} aria-hidden="true" /></a>
              <a href={asset(profile.cv)} download="Zakaria-Toura-CV-FR.pdf" className="text-link cv-link">{t.hero.cv}<ArrowDown size={19} aria-hidden="true" /></a>
            </div>
          </motion.div>
          <motion.div className="hero-art" {...entrance(0.2)}><MonogramExperiment locale={locale} /></motion.div>
        </div>
      </section>

      <section id="work" className="work section" aria-labelledby="work-heading">
        <Reveal>
          <div className="section-topline flex items-center justify-between"><SectionLabel number="02">{t.work.label}</SectionLabel><span className="mono section-status">{t.work.status}</span></div>
          <h2 id="work-heading" className="section-heading">{t.work.heading}</h2>
        </Reveal>
        <div className="projects-grid grid">{projects.map((project, index) => <ProjectEntry key={project.id} project={project} index={index} locale={locale} />)}</div>
      </section>

      <section id="about" className="about section" aria-labelledby="about-heading">
        <Reveal>
          <SectionLabel number="03">{t.about.label}</SectionLabel>
          <div className="about-intro grid">
            <h2 id="about-heading" className="section-heading">{t.about.heading.split('\n').map((line) => <span key={line}>{line}</span>)}</h2>
            <div className="about-prose"><p>{t.about.intro}</p><p>{t.about.body}</p></div>
          </div>
        </Reveal>
        <div className="foundations-grid grid">
          <Reveal className="skills">
            <h3>{t.about.skills}</h3><p className="skills-intro">{t.about.skillsIntro}</p>
            <dl>{skillGroups.map((group) => <div className="skill-row" key={group.title.en}><dt>{group.title[locale]}</dt><dd>{group.technologies.join(' · ')}</dd></div>)}</dl>
          </Reveal>
          <Reveal className="education">
            <h3>{t.about.education}</h3>
            <ul>{education.map((item) => <li key={item.school}><h4>{item.school}</h4><p>{item.programme[locale]}</p><span className="mono">{item.location[locale]}{item.period ? ` · ${item.period}` : ''}</span></li>)}</ul>
            <div className="spoken-languages"><h3>{t.about.languages}</h3><p>{t.about.languageList.join(' · ')}</p></div>
          </Reveal>
        </div>
      </section>

      <section id="contact" className="contact section" aria-labelledby="contact-heading">
        <Reveal>
          <SectionLabel number="04">{t.contact.label}</SectionLabel>
          <div className="contact-columns grid">
            <h2 id="contact-heading" className="section-heading">{t.contact.heading.split('\n').map((line) => <span key={line}>{line}</span>)}</h2>
            <div className="contact-copy"><p>{t.contact.text}</p>
              <div className="contact-links flex flex-wrap">
                <a className="text-link" href={`mailto:${profile.email}`} aria-label={t.contact.email}><EnvelopeSimple size={23} weight="regular" aria-hidden="true" /><span>{profile.email}</span><ArrowUpRight size={17} aria-hidden="true" /></a>
                <a className="text-link" href={profile.github} aria-label={t.contact.github}><GithubLogo size={23} weight="regular" aria-hidden="true" /><span>{profile.githubLabel}</span><ArrowUpRight size={17} aria-hidden="true" /></a>
                {profile.linkedin && <a className="text-link" href={profile.linkedin}>LinkedIn<ArrowUpRight size={17} aria-hidden="true" /></a>}
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
    <footer className="site-footer page-width flex items-center justify-between"><p className="mono">© {new Date().getFullYear()} Zakaria Toura</p><p className="footer-note">{t.footer.note}</p><a href="#intro" className="text-link">{t.footer.top}<ArrowUp size={17} aria-hidden="true" /></a></footer>
  </MotionConfig>
}
