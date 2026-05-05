import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  Sparkles,
  GraduationCap,
  Brain,
  Zap,
  Newspaper,
  Scale,
  ChevronDown,
  Globe,
  MessageSquare,
  Shield,
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { Search } from '../components/Search';
import { ArticleCard } from '../components/ArticleCard';
import { TermCard } from '../components/TermCard';
import { NeuralCanvas } from '../components/NeuralCanvas';
import { MarqueeTicker } from '../components/MarqueeTicker';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { getFeaturedArticles, getFeaturedTerms } from '../lib/content';
import { useInView } from '../hooks/useInView';

const TICKER_TERMS = [
  'Kunsmatige Intelligensie',
  'Masjienleer',
  'Neurale Netwerk',
  'Groot Taalmodel',
  'Prompt',
  'Tokens',
  'Hallusinasie',
  'Outomatisering',
  'Agent',
  'Diep Leer',
  'Datastel',
  'Transformer',
  'Fyn-Afstemming',
  'Konteksvenster',
  'RAG',
  'Open-Source',
  'Inferensie',
  'Bias',
  'Redenering',
  'Veelmodale KI',
];

const categories = [
  {
    slug: 'verstaan',
    icon: Brain,
    title: 'Verstaan KI',
    description: 'Leer die grondbeginsels van kunsmatige intelligensie — geen voorkennis nodig.',
    gradient: 'from-primary-500 to-blue-600',
    lightBg: 'from-primary-50 to-blue-50',
    darkBg: 'dark:from-primary-950/50 dark:to-blue-950/50',
    border: 'border-primary-100 dark:border-primary-900',
    iconBg: 'bg-primary-100 dark:bg-primary-900/50',
    iconColor: 'text-primary-600 dark:text-primary-400',
  },
  {
    slug: 'gebruik',
    icon: Zap,
    title: 'Gebruik KI',
    description: 'Praktiese gidse om KI effektief en veilig in jou daaglikse lewe te gebruik.',
    gradient: 'from-emerald-500 to-teal-600',
    lightBg: 'from-emerald-50 to-teal-50',
    darkBg: 'dark:from-emerald-950/50 dark:to-teal-950/50',
    border: 'border-emerald-100 dark:border-emerald-900',
    iconBg: 'bg-emerald-100 dark:bg-emerald-900/50',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
  },
  {
    slug: 'nuus',
    icon: Newspaper,
    title: 'Nuus & Ontwikkelings',
    description: 'Bly op hoogte van die nuutste KI-ontwikkelings wat Suid-Afrika raak.',
    gradient: 'from-amber-500 to-orange-600',
    lightBg: 'from-amber-50 to-orange-50',
    darkBg: 'dark:from-amber-950/50 dark:to-orange-950/50',
    border: 'border-amber-100 dark:border-amber-900',
    iconBg: 'bg-amber-100 dark:bg-amber-900/50',
    iconColor: 'text-amber-600 dark:text-amber-400',
  },
  {
    slug: 'etiek',
    icon: Scale,
    title: 'Etiek & Geloof',
    description: 'Diepgaande besinning oor KI se impak op ons waardes, identiteit en geloof.',
    gradient: 'from-purple-500 to-violet-600',
    lightBg: 'from-purple-50 to-violet-50',
    darkBg: 'dark:from-purple-950/50 dark:to-violet-950/50',
    border: 'border-purple-100 dark:border-purple-900',
    iconBg: 'bg-purple-100 dark:bg-purple-900/50',
    iconColor: 'text-purple-600 dark:text-purple-400',
  },
];

const features = [
  {
    icon: Globe,
    title: 'Jou taal, jou begrip',
    description:
      "KI is 'n wêreldwye revolusie. Ons glo elke Afrikaanssprekende verdien toegang tot hierdie kennis in hulle moedertaal.",
    color: 'text-primary-600 dark:text-primary-400',
    bg: 'bg-primary-50 dark:bg-primary-900/30',
  },
  {
    icon: MessageSquare,
    title: 'Geen jargon',
    description:
      "Ons verduidelik KI in eenvoudige Afrikaans sonder tegniese rompslomp — presies soos 'n vriend wat KI verstaan.",
    color: 'text-purple-600 dark:text-purple-400',
    bg: 'bg-purple-50 dark:bg-purple-900/30',
  },
  {
    icon: Shield,
    title: 'Betroubaar en veilig',
    description:
      "Ons fokus op veilige, etiese gebruik van KI en help jou om die risiko's te verstaan en te vermy.",
    color: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-50 dark:bg-emerald-900/30',
  },
];

export function HomePage() {
  const featuredArticles = getFeaturedArticles(3);
  const featuredTerms = getFeaturedTerms(6);

  const [heroRef, heroVisible] = useInView<HTMLDivElement>({ threshold: 0.1 });
  const [statsRef, statsVisible] = useInView<HTMLDivElement>({ threshold: 0.2 });
  const [featuresRef, featuresVisible] = useInView<HTMLDivElement>({ threshold: 0.15 });
  const [articlesRef, articlesVisible] = useInView<HTMLDivElement>({ threshold: 0.1 });
  const [termsRef, termsVisible] = useInView<HTMLDivElement>({ threshold: 0.1 });
  const [categoriesRef, categoriesVisible] = useInView<HTMLDivElement>({ threshold: 0.1 });
  const [ctaRef, ctaVisible] = useInView<HTMLDivElement>({ threshold: 0.2 });

  return (
    <>
      <SEO canonical="/" />

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
        {/* Neural network canvas */}
        <NeuralCanvas />

        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary-600/20 rounded-full blur-3xl pointer-events-none animate-pulse-slow" style={{ animationDelay: '1.5s' }} />

        <div ref={heroRef} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 w-full">
          <div className="text-center max-w-4xl mx-auto">

            {/* Badge */}
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/20 text-purple-200 text-sm font-medium mb-8 transition-all duration-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <Sparkles className="h-4 w-4 text-purple-400" />
              100% in Afrikaans &middot; Verniet &middot; Vry van Jargon
            </div>

            {/* Main heading */}
            <h1 className={`text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 transition-all duration-700 delay-100 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <span className="text-white block">Die tuiste van</span>
              <span className="gradient-text block mt-2 pb-2">
                Kunsmatige Intelligensie
              </span>
              <span className="text-white/90 block text-4xl sm:text-5xl font-bold mt-1">
                in Afrikaans
              </span>
            </h1>

            {/* Subtext */}
            <p className={`text-lg sm:text-xl text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed transition-all duration-700 delay-200 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              Verstaan KI sonder die jargon. Leer hoe om dit veilig en effektief te gebruik.
              Verken die etiese vrae wat dit bring — alles in jou moedertaal.
            </p>

            {/* Search */}
            <div className={`max-w-xl mx-auto mb-10 transition-all duration-700 delay-300 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <Search dark />
            </div>

            {/* CTA Buttons */}
            <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-500 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <Link
                to="/begin-hier"
                className="glow-btn w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-primary-600 text-white font-bold text-base hover:from-purple-500 hover:to-primary-500 flex items-center justify-center gap-2 shadow-glow-purple"
              >
                <GraduationCap className="h-5 w-5" />
                Begin hier
              </Link>
              <Link
                to="/artikels/wat-is-kunsmatige-intelligensie"
                className="glow-btn-blue w-full sm:w-auto px-8 py-4 rounded-xl glass border border-white/20 text-white font-semibold hover:bg-white/15 flex items-center justify-center gap-2 transition-all"
              >
                <Sparkles className="h-5 w-5 text-purple-300" />
                Wat is KI?
              </Link>
              <Link
                to="/woordeboek"
                className="w-full sm:w-auto px-8 py-4 rounded-xl glass border border-white/20 text-white font-semibold hover:bg-white/15 flex items-center justify-center gap-2 transition-all"
              >
                <BookOpen className="h-5 w-5 text-primary-300" />
                Woordeboek
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/40 animate-bounce-slow">
          <ChevronDown className="h-6 w-6" />
        </div>
      </section>

      {/* ── MARQUEE TICKER ────────────────────────────────────── */}
      <MarqueeTicker
        items={TICKER_TERMS}
        className="py-4 bg-gradient-to-r from-purple-700 via-primary-700 to-purple-700"
      />

      {/* ── STATS ─────────────────────────────────────────────── */}
      <section className="py-16 bg-slate-900 dark:bg-surface-950">
        <div ref={statsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            <AnimatedCounter target={10} suffix="+" label="Artikels" />
            <AnimatedCounter target={22} label="KI Begrippe" />
            <AnimatedCounter target={100} suffix="%" label="Afrikaans" />
            <AnimatedCounter target={4} label="Kategorieë" />
          </div>
        </div>
      </section>

      {/* ── WHY AFRIKAANS ─────────────────────────────────────── */}
      <section className="py-20 bg-white dark:bg-surface-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={featuresRef}
            className={`text-center mb-12 transition-all duration-700 ${featuresVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-surface-900 dark:text-white mb-4">
              Hoekom <span className="gradient-text-blue">KI in Afrikaans</span>?
            </h2>
            <p className="text-surface-600 dark:text-surface-400 max-w-2xl mx-auto text-lg">
              Ons glo dat toegang tot kennis oor KI nie afhanklik moet wees van watter taal jy praat nie.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature, i) => (
              <div
                key={feature.title}
                className={`p-8 rounded-2xl border border-surface-100 dark:border-surface-800 hover:shadow-card-hover dark:hover:shadow-glow-purple transition-all duration-500 group ${featuresVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <div className={`w-14 h-14 rounded-xl ${feature.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`h-7 w-7 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-surface-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-surface-600 dark:text-surface-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LATEST ARTICLES ───────────────────────────────────── */}
      <section className="py-20 bg-surface-50 dark:bg-surface-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={articlesRef}
            className={`flex items-center justify-between mb-10 transition-all duration-700 ${articlesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-surface-900 dark:text-white">
                Nuutste <span className="gradient-text-blue">Artikels</span>
              </h2>
              <p className="text-surface-500 dark:text-surface-400 mt-1">
                Verken ons nuutste inhoud oor kunsmatige intelligensie
              </p>
            </div>
            <Link
              to="/artikels"
              className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl border border-surface-200 dark:border-surface-700 text-surface-600 dark:text-surface-300 hover:border-purple-300 dark:hover:border-purple-700 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-all"
            >
              Sien alles
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredArticles.map((article, i) => (
              <div
                key={article.slug}
                className={`transition-all duration-600 ${articlesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <ArticleCard article={article} />
              </div>
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link
              to="/artikels"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors"
            >
              Sien alle artikels
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── SECOND MARQUEE ────────────────────────────────────── */}
      <MarqueeTicker
        items={[...TICKER_TERMS].reverse()}
        speed="slow"
        className="py-3 bg-surface-900 dark:bg-surface-950 border-y border-surface-800"
      />

      {/* ── POPULAR TERMS ─────────────────────────────────────── */}
      <section className="py-20 bg-white dark:bg-surface-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={termsRef}
            className={`flex items-center justify-between mb-10 transition-all duration-700 ${termsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-surface-900 dark:text-white">
                KI <span className="gradient-text-blue">Woordeboek</span>
              </h2>
              <p className="text-surface-500 dark:text-surface-400 mt-1">
                Verstaan die woordeskat van kunsmatige intelligensie
              </p>
            </div>
            <Link
              to="/woordeboek"
              className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl border border-surface-200 dark:border-surface-700 text-surface-600 dark:text-surface-300 hover:border-purple-300 dark:hover:border-purple-700 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-all"
            >
              Volle woordeboek
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredTerms.map((term, i) => (
              <div
                key={term.slug}
                className={`transition-all duration-500 ${termsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <TermCard term={term} compact />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ────────────────────────────────────────── */}
      <section className="py-20 bg-surface-50 dark:bg-surface-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={categoriesRef}
            className={`text-center mb-12 transition-all duration-700 ${categoriesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-surface-900 dark:text-white mb-4">
              Verken <span className="gradient-text-blue">Ons Onderwerpe</span>
            </h2>
            <p className="text-surface-600 dark:text-surface-400 max-w-xl mx-auto">
              Van die grondbeginsels tot etiese vrae — ons het dit alles gedek.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((cat, i) => (
              <Link
                key={cat.slug}
                to={`/kategorie/${cat.slug}`}
                className={`group relative p-6 rounded-2xl bg-gradient-to-br ${cat.lightBg} ${cat.darkBg} border ${cat.border} hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 ${categoriesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {/* Gradient accent line at top */}
                <div className={`absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl bg-gradient-to-r ${cat.gradient} opacity-0 group-hover:opacity-100 transition-opacity`} />

                <div className={`w-12 h-12 rounded-xl ${cat.iconBg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <cat.icon className={`h-6 w-6 ${cat.iconColor}`} />
                </div>

                <h3 className="font-bold text-lg text-surface-900 dark:text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-primary-600 transition-all">
                  {cat.title}
                </h3>
                <p className="text-surface-600 dark:text-surface-400 text-sm leading-relaxed">
                  {cat.description}
                </p>

                <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-surface-500 dark:text-surface-500 group-hover:text-primary-600 dark:group-hover:text-purple-400 transition-colors">
                  Verken
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ────────────────────────────────────────── */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-purple-700 via-primary-700 to-purple-800">
        {/* Decorative circles */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-white/5 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)] pointer-events-none" />

        <div
          ref={ctaRef}
          className={`relative max-w-4xl mx-auto px-4 text-center transition-all duration-700 ${ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 text-balance">
            Gereed om te begin?
          </h2>
          <p className="text-xl text-white/75 mb-10 max-w-2xl mx-auto">
            Geen tegniese agtergrond nodig nie. Begin vandag om kunsmatige intelligensie
            te verstaan in jou eie taal.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/begin-hier"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl bg-white text-purple-700 font-bold text-lg hover:bg-purple-50 hover:shadow-2xl transition-all hover:-translate-y-0.5"
            >
              <GraduationCap className="h-6 w-6" />
              Begin jou reis
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/woordeboek"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-5 rounded-2xl border-2 border-white/30 text-white font-semibold text-lg hover:bg-white/10 hover:border-white/50 transition-all hover:-translate-y-0.5"
            >
              <BookOpen className="h-5 w-5" />
              Verken die woordeboek
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
