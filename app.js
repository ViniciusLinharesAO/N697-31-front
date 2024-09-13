// URL base da API
const API_URL = 'https://n69731back-5539dnq2.b4a.run/users';

// Elementos do DOM
const userForm = document.getElementById('user-form');
const userList = document.getElementById('user-list');
const userIdInput = document.getElementById('user-id');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const submitButton = document.getElementById('submit-btn');

// Função para buscar e exibir os usuários
async function fetchUsers() {
  try {
    const response = await fetch(API_URL);
    const users = await response.json();
    displayUsers(users);
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
  }
}

// Função para exibir os usuários na tela
function displayUsers(users) {
  userList.innerHTML = ''; // Limpa a lista antes de exibir
  users.forEach((user) => {
    const userDiv = document.createElement('div');
    userDiv.className = 'user';
    userDiv.innerHTML = `
      <span>${user.name} - ${user.email}</span>
      <div>
        <button class="edit" onclick="editUser(${user.id}, '${user.name}', '${user.email}')">Editar</button>
        <button class="delete" onclick="deleteUser(${user.id})">Deletar</button>
      </div>
    `;
    userList.appendChild(userDiv);
  });
}

// Função para adicionar ou atualizar um usuário
userForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = userIdInput.value;
  const name = nameInput.value;
  const email = emailInput.value;

  if (id) {
    // Atualiza o usuário existente
    await updateUser(id, name, email);
  } else {
    // Adiciona um novo usuário
    await addUser(name, email);
  }

  userForm.reset();
  submitButton.textContent = 'Adicionar Usuário';
  fetchUsers();
});

// Função para adicionar um usuário
async function addUser(name, email) {
  try {
    await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email }),
    });
  } catch (error) {
    console.error('Erro ao adicionar usuário:', error);
  }
}

// Função para editar um usuário
function editUser(id, name, email) {
  userIdInput.value = id;
  nameInput.value = name;
  emailInput.value = email;
  submitButton.textContent = 'Atualizar Usuário';
}

// Função para atualizar um usuário
async function updateUser(id, name, email) {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email }),
    });
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
  }
}

// Função para deletar um usuário
async function deleteUser(id) {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    fetchUsers();
  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
  }
}

// Carrega os usuários ao iniciar a página
fetchUsers();
