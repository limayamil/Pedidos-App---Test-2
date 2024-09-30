import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { items } = req.body;

    const { data, error } = await supabase
      .from('orders')
      .insert({ items: items });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ message: 'Orden creada con éxito', data });
  }

  return res.status(405).json({ error: 'Método no permitido' });
}