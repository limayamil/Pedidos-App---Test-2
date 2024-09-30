import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { items } = req.body;

      if (!items || !Array.isArray(items)) {
        return res.status(400).json({ error: 'Invalid items data' });
      }

      const { data, error } = await supabase
        .from('orders')
        .insert({ items: items });

      if (error) {
        console.error('Supabase error:', error);
        return res.status(500).json({ error: 'Error creating order in database' });
      }

      return res.status(200).json({ message: 'Orden creada con éxito', data });
    } catch (err) {
      console.error('Unexpected error:', err);
      return res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }

  return res.status(405).json({ error: 'Método no permitido' });
}