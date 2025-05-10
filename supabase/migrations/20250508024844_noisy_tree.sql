/*
  # Initial Schema Setup

  1. New Tables
    - `categories`
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `description` (text)
      - `slug` (text, unique)
      - `icon` (text)
      - `created_at` (timestamp)
    
    - `tools`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `url` (text)
      - `image_url` (text)
      - `category_id` (uuid, foreign key)
      - `pricing` (jsonb)
      - `rating` (numeric)
      - `featured` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for public read access
*/

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  description text,
  slug text UNIQUE NOT NULL,
  icon text,
  created_at timestamptz DEFAULT now()
);

-- Create tools table
CREATE TABLE IF NOT EXISTS tools (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  url text NOT NULL,
  image_url text,
  category_id uuid REFERENCES categories(id),
  pricing jsonb,
  rating numeric CHECK (rating >= 0 AND rating <= 5),
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE tools ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access on categories" ON categories
  FOR SELECT TO public USING (true);

CREATE POLICY "Allow public read access on tools" ON tools
  FOR SELECT TO public USING (true);

-- Create sample categories
INSERT INTO categories (name, description, slug, icon) VALUES
  ('Text Generation', 'AI tools for generating and manipulating text content', 'text-generation', 'MessageSquare'),
  ('Image Generation', 'Create and edit images using AI', 'image-generation', 'Image'),
  ('Code Assistance', 'AI-powered coding tools and assistants', 'code-assistance', 'Code2'),
  ('Data Analysis', 'Tools for analyzing and visualizing data', 'data-analysis', 'BarChart'),
  ('Automation', 'Automate workflows and tasks with AI', 'automation', 'Zap'),
  ('Research', 'AI tools for research and information gathering', 'research', 'Search');

-- Create sample tools
INSERT INTO tools (name, description, url, image_url, category_id, pricing, rating, featured) 
SELECT 
  'ChatGPT',
  'Advanced language model for natural conversations and text generation',
  'https://chat.openai.com',
  'https://images.pexels.com/photos/7567529/pexels-photo-7567529.jpeg',
  c.id,
  '{"plan": "Free / Premium", "price": 20}'::jsonb,
  4.8,
  true
FROM categories c
WHERE c.slug = 'text-generation';

INSERT INTO tools (name, description, url, image_url, category_id, pricing, rating, featured)
SELECT 
  'DALL-E',
  'Create stunning images from textual descriptions',
  'https://labs.openai.com',
  'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg',
  c.id,
  '{"plan": "Credits-based", "price": 15}'::jsonb,
  4.7,
  true
FROM categories c
WHERE c.slug = 'image-generation';