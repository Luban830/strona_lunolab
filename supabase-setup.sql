-- Tabela projects dla strony Lunolab
-- Utwórz tę tabelę w Supabase SQL Editor

CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  client_name TEXT NOT NULL,
  category TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Przykładowe dane testowe (opcjonalnie)
INSERT INTO projects (title, description, client_name, category, image_url) VALUES
  (
    'Automatyzacja procesu analizy danych',
    'Zautomatyzowaliśmy proces analizy danych dla klienta, redukując czas przetwarzania z 8 godzin do 15 minut.',
    'Firma XYZ',
    'Automatyzacja',
    NULL
  ),
  (
    'System zarządzania zadaniami AI',
    'Stworzyliśmy inteligentny system zarządzania zadaniami wykorzystujący uczenie maszynowe do optymalizacji workflow.',
    'Tech Corp',
    'AI/ML',
    NULL
  ),
  (
    'Integracja systemów ERP',
    'Zintegrowaliśmy 5 różnych systemów ERP w jedną spójną platformę, eliminując ręczne wprowadzanie danych.',
    'Manufacturing Ltd',
    'Integracje',
    NULL
  );

-- Ustawienia RLS (Row Level Security) - opcjonalne, w zależności od potrzeb
-- ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Jeśli chcesz, aby tabela była publicznie dostępna do odczytu:
-- CREATE POLICY "Public read access" ON projects FOR SELECT USING (true);

