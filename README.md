# Lunolab - Strona Internetowa

Strona internetowa firmy Lunolab zajmującej się automatyzacjami procesów w AI.

## Technologie

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Supabase (baza danych)
- Framer Motion (animacje)

## Instalacja

1. Zainstaluj zależności:
```bash
npm install
```

2. Skonfiguruj Supabase:
   - Utwórz plik `.env.local` na podstawie `.env.local.example`
   - Wypełnij `NEXT_PUBLIC_SUPABASE_URL` i `NEXT_PUBLIC_SUPABASE_ANON_KEY`

3. Utwórz tabelę `projects` w Supabase:
   - Otwórz SQL Editor w Supabase Dashboard
   - Uruchom skrypt z pliku `supabase-setup.sql` (lub skopiuj kod SQL poniżej):
```sql
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  client_name TEXT NOT NULL,
  category TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
```

4. Uruchom serwer deweloperski:
```bash
npm run dev
```

Otwórz [http://localhost:3000](http://localhost:3000) w przeglądarce.

## Struktura projektu

- `/app` - Strony Next.js
- `/components` - Komponenty React
- `/lib` - Narzędzia i konfiguracja (Supabase)

## Sekcje strony

1. **Hero** - Główne hasło i statystyki
2. **Usługi** - Lista usług firmy
3. **Case Studies** - Karuzela z projektami
4. **Video** - Sekcja z filmem o firmie
5. **Stopka** - Informacje kontaktowe

## Podstrona projektów

Podstrona `/projekty` zawiera pełną listę wszystkich projektów z bazy danych.
