'use client'

import {
  Building2,
  Lightbulb,
  ScreenShare,
  Trophy,
  User,
  User2,
  LucideIcon,
  Brain,
  Zap,
  Settings,
  Code,
  BarChart3,
  Users,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Define the feature item type
type FeatureItem = {
  icon: LucideIcon;
  title: string;
  description: string;
  position?: 'left' | 'right';
  cornerStyle?: string;
};

// Create feature data arrays for left and right columns - dostosowane do AI/automatyzacji
const leftFeatures: FeatureItem[] = [
  {
    icon: Brain,
    title: 'Audyt',
    description:
      'Określamy potrzeby firmy i definiujemy ścieżkę wdrożenia AI. Analizujemy obecne procesy i identyfikujemy możliwości automatyzacji.',
    position: 'left',
    cornerStyle: 'sm:translate-x-4 sm:rounded-br-[2px]',
  },
  {
    icon: Code,
    title: 'Rozwój Produktu',
    description:
      'Produkty tworzone są na podstawie indywidualnych potrzeb firmy. Implementujemy rozwiązania AI dostosowane do Twojego biznesu.',
    position: 'left',
    cornerStyle: 'sm:-translate-x-4 sm:rounded-br-[2px]',
  },
  {
    icon: Zap,
    title: 'Automatyzacja Procesów',
    description:
      'Tworzymy inteligentne systemy automatyzujące powtarzalne zadania. Zwiększamy efektywność i redukujemy koszty operacyjne.',
    position: 'left',
    cornerStyle: 'sm:translate-x-4 sm:rounded-tr-[2px]',
  },
];

const rightFeatures: FeatureItem[] = [
  {
    icon: BarChart3,
    title: 'Zarządzanie Projektem',
    description:
      'Kontrola kosztów i śledzenie zwrotu z inwestycji. Regularne raporty postępów i transparentna komunikacja.',
    position: 'right',
    cornerStyle: 'sm:-translate-x-4 sm:rounded-bl-[2px]',
  },
  {
    icon: Settings,
    title: 'Integracje Systemowe',
    description:
      'Łączymy różne systemy tworząc spójne środowisko pracy. Integrujemy AI z istniejącymi narzędziami biznesowymi.',
    position: 'right',
    cornerStyle: 'sm:translate-x-4 sm:rounded-bl-[2px]',
  },
  {
    icon: Users,
    title: 'Szkolenia',
    description:
      'Pracownicy przechodzą program adaptacyjny. Zapewniamy kompleksowe szkolenia z obsługi nowych rozwiązań AI.',
    position: 'right',
    cornerStyle: 'sm:-translate-x-4 sm:rounded-tl-[2px]',
  },
];

// Feature card component
const FeatureCard = ({ feature }: { feature: FeatureItem }) => {
  const Icon = feature.icon;

  return (
    <div>
      <div
        className={cn(
          'relative rounded-2xl px-4 pt-4 pb-4 text-sm',
          'bg-[#111211] border border-white/10',
          feature.cornerStyle,
        )}
      >
        <div className="text-[#27F579] mb-3 text-[2rem]">
          <Icon />
        </div>
        <h2 className="text-white mb-2.5 text-2xl font-bold">{feature.title}</h2>
        <p className="text-gray-400 text-base text-pretty leading-relaxed">
          {feature.description}
        </p>
        {/* Decorative elements */}
        <span className="from-[#27F579]/0 via-[#27F579] to-[#27F579]/0 absolute -bottom-px left-1/2 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r opacity-60"></span>
        <span className="absolute inset-0 bg-[radial-gradient(30%_5%_at_50%_100%,rgba(39,245,121,0.15)_0%,transparent_100%)] opacity-60"></span>
      </div>
    </div>
  );
};

export default function Feature3() {
  return (
    <section className="pt-8 pb-8" id="features">
      <div className="mx-6 max-w-[1120px] pt-2 pb-16 max-[300px]:mx-4 min-[1150px]:mx-auto">
        <div className="flex flex-col-reverse gap-6 md:grid md:grid-cols-3">
          {/* Left column */}
          <div className="flex flex-col gap-6">
            {leftFeatures.map((feature, index) => (
              <FeatureCard key={`left-feature-${index}`} feature={feature} />
            ))}
          </div>

          {/* Center column */}
          <div className="order-[1] mb-6 self-center sm:order-[0] md:mb-0">
            <h2 className="text-white mb-2 text-center text-2xl sm:mb-2.5 md:text-[2rem] font-bold">
              Nasze <span className="bg-gradient-to-r from-[#27F579] via-[#20c46a] to-[#1a7a4a] bg-clip-text text-transparent">Rozwiązania</span>
            </h2>
            <p className="text-gray-400 mx-auto max-w-[18rem] text-center text-pretty">
              Kompleksowe usługi AI stworzone z myślą o nowoczesnych przedsiębiorstwach. Od audytu po pełne wdrożenie.
            </p>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-6">
            {rightFeatures.map((feature, index) => (
              <FeatureCard key={`right-feature-${index}`} feature={feature} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

