// Obtener los elementos 
const list = document.getElementById('shoppingList');
const input = document.getElementById('item');
const addButton = document.getElementById('addButton');

// Cargar lista guardada al iniciar la página
document.addEventListener('DOMContentLoaded', () => {
  const savedList = JSON.parse(localStorage.getItem('listaCompra')) || [];
  savedList.forEach(item => crearElemento(item.text, item.comprado));
  input.focus(); // Poner el cursor en el input al iniciar
});

// Función para guardar en localStorage
function guardarLista() {
  const items = Array.from(list.querySelectorAll('li')).map(li => {
    const span = li.querySelector('span');
    return {
      text: span.textContent,
      comprado: span.classList.contains('tachado')
    };
  });
  localStorage.setItem('listaCompra', JSON.stringify(items));
}

// Función para crear un nuevo elemento de la lista
function crearElemento(itemText, comprado = false) {
  const li = document.createElement('li');
  const span = document.createElement('span');
  const deleteBtn = document.createElement('button');
  const toggleBtn = document.createElement('button');

  // Asignar texto
  span.textContent = itemText;

  // Aplicar estilo tachado si ya estaba marcado
  if (comprado) {
    span.classList.add('tachado');
    toggleBtn.textContent = 'Deshacer';
  } else {
    toggleBtn.textContent = 'Seleccionado';
  }

  deleteBtn.textContent = 'Eliminar';

  // Lógica del botón "Seleccionado" / "Deshacer"
  toggleBtn.addEventListener('click', () => {
    span.classList.toggle('tachado');
    toggleBtn.textContent = span.classList.contains('tachado') ? 'Deshacer' : 'Seleccionado';
    guardarLista(); // Guardar estado al cambiar
  });

  // Lógica del botón "Eliminar"
  deleteBtn.addEventListener('click', () => {
    list.removeChild(li);
    guardarLista(); // Guardar estado al eliminar
  });

  // Añadir elementos al <li> y luego a la lista
  li.appendChild(span);
  li.appendChild(toggleBtn);
  li.appendChild(deleteBtn);
  list.appendChild(li);
}

// Función para agregar un nuevo artículo
function agregarArticulo() {
  const itemText = input.value.trim();
  if (itemText === '') return; // No hacer nada si está vacío

  crearElemento(itemText); // Crear nuevo <li>
  guardarLista();          // Guardar la lista

  input.value = '';        // Limpiar input
  input.focus();           // Enfocar para escribir el siguiente
}

// Eventos: botón "Añadir" y tecla Enter
addButton.addEventListener('click', agregarArticulo);
input.addEventListener('keypress', e => {
  if (e.key === 'Enter') agregarArticulo();
});