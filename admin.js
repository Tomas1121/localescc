import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://fxrhivdufmuhnfhmowyb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ4cmhpdmR1Zm11aG5maG1vd3liIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgwNzQ1ODgsImV4cCI6MjA1MzY1MDU4OH0.Kvy-kidtad80tESVv-t6xw4v24hvqwOZ8D5h6pW7V9k';
const supabase = createClient(supabaseUrl, supabaseKey);

// Agregar datos
document.getElementById('add-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const nombre_local = document.getElementById('nombre_local').value;
  const zona = document.getElementById('zona').value;
  const categoria = document.getElementById('categoria').value;

  const { error } = await supabase.from('datos').insert([{ nombre_local, zona, categoria }]);
  if (error) {
    console.error('Error al agregar datos:', error);
    return;
  }

  alert('Datos agregados correctamente');
  fetchItems();
});

// Mostrar y administrar datos
const fetchItems = async () => {
  const { data, error } = await supabase.from('datos').select('*');
  if (error) {
    console.error('Error al obtener datos:', error);
    return;
  }

  const container = document.getElementById('admin-container');
  container.innerHTML = '';
  data.forEach(item => {
    const div = document.createElement('div');
    div.innerHTML = `
      <strong>${item.nombre_local}</strong> (Zona: ${item.zona}, Categoría: ${item.categoria})
      <button onclick="deleteItem(${item.identificación})">Borrar</button>
    `;
    container.appendChild(div);
  });
};

const deleteItem = async (id) => {
  const { error } = await supabase.from('datos').delete().eq('identificación', id);
  if (error) {
    console.error('Error al borrar:', error);
    return;
  }

  alert('Elemento borrado');
  fetchItems();
};

fetchItems();
