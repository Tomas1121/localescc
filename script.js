import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://fxrhivdufmuhnfhmowyb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ4cmhpdmR1Zm11aG5maG1vd3liIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgwNzQ1ODgsImV4cCI6MjA1MzY1MDU4OH0.Kvy-kidtad80tESVv-t6xw4v24hvqwOZ8D5h6pW7V9k';
const supabase = createClient(supabaseUrl, supabaseKey);

const fetchItems = async () => {
  const { data, error } = await supabase.from('datos').select('*');
  if (error) {
    console.error('Error al obtener datos:', error);
    return;
  }

  const container = document.getElementById('items-container');
  container.innerHTML = '';
  data.forEach(item => {
    const div = document.createElement('div');
    div.textContent = `Nombre: ${item.nombre_local}, Zona: ${item.zona}, Categoría: ${item.categoria}`;
    container.appendChild(div);
  });
};

fetchItems();
