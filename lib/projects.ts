export type Project = {
  id: number
  client: string
  title: string
  category: string
  shortDescription: string
  logo: string
  metric: string
  metricLabel: string
  description: string
  details: string
  href: string
}

export const projects: Project[] = [
  {
    id: 1,
    client: 'PrimeMedHub',
    title: 'Generowanie grafik marketingowych',
    category: 'Marketing',
    shortDescription:
      'Automatyzacja tworzenia materialow wizualnych do kampanii marketingowych dla PrimeMedHub.',
    logo: '/primemedhub_logo_without_backgroung.png',
    metric: 'Generowanie grafik',
    metricLabel: 'marketingowych',
    description:
      'Case study w przygotowaniu. Skrocony opis zostanie uzupelniony po dostarczeniu finalnej tresci.',
    details:
      'Przygotowalismy rozwiazanie AI wspierajace tworzenie grafik marketingowych dla PrimeMedHub. Pelny opis case study zostanie dodany po akceptacji tresci.',
    href: '/projekty',
  },
]

