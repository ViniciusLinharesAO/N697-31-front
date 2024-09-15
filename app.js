// URL base da API
const USERS_API_URL = 'https://n69731back-5539dnq2.b4a.run/users';
const CARS_API_URL = 'https://n69731back-5539dnq2.b4a.run/cars';

// Elementos do DOM
const userForm = document.getElementById('user-form');
const userList = document.getElementById('user-list');
const userIdInput = document.getElementById('user-id');
const userNameInput = document.getElementById('user-name');
const userEmailInput = document.getElementById('user-email');
const userSubmitButton = document.getElementById('user-submit-btn');

// Função para buscar e exibir os usuários
async function fetchUsers() {
  try {
    const response = await fetch(USERS_API_URL);
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
  const name = userNameInput.value;
  const email = userEmailInput.value;

  if (id) {
    // Atualiza o usuário existente
    await updateUser(id, name, email);
  } else {
    // Adiciona um novo usuário
    await addUser(name, email);
  }

  userForm.reset();
  userSubmitButton.textContent = 'Adicionar Usuário';
  fetchUsers();
});

// Função para adicionar um usuário
async function addUser(name, email) {
  try {
    await fetch(USERS_API_URL, {
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
  userNameInput.value = name;
  userEmailInput.value = email;
  userSubmitButton.textContent = 'Atualizar Usuário';
}

// Função para atualizar um usuário
async function updateUser(id, name, email) {
  try {
    await fetch(`${USERS_API_URL}/${id}`, {
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
    await fetch(`${USERS_API_URL}/${id}`, {
      method: 'DELETE',
    });
    fetchUsers();
  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
  }
}

// Carrega os usuários ao iniciar a página
fetchUsers();







//Carros?
// Elementos do DOM
const carForm = document.getElementById('car-form');
const carList = document.getElementById('car-list');
const carIdInput = document.getElementById('car-id');
const carMarcaInput = document.getElementById('car-marca');
const carModeloInput = document.getElementById('car-modelo');
const carSubmitButton = document.getElementById('car-submit-btn');

// Função para buscar e exibir os carros
async function fetchCars() {
  try {
    const response = await fetch(CARS_API_URL);
    const cars = await response.json();
    displayCars(cars);
  } catch (error) {
    console.error('Erro ao buscar carros:', error);
  }
}

// Função para exibir os carros na tela
function displayCars(cars) {
  carList.innerHTML = ''; // Limpa a lista antes de exibir
  cars.forEach((car) => {
    const carDiv = document.createElement('div');
    carDiv.className = 'car';
    carDiv.innerHTML = `
      <span>${car.marca} - ${car.modelo}</span>
      <div>
        <button class="edit" onclick="editCar(${car.id}, '${car.marca}', '${car.modelo}')">Editar</button>
        <button class="delete" onclick="deleteCar(${car.id})">Deletar</button>
      </div>
    `;
    carList.appendChild(carDiv);
  });
}

// Função para adicionar ou atualizar um carro
carForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = carIdInput.value;
  const marca = carMarcaInput.value;
  const modelo = carModeloInput.value;

  if (id) {
    // Atualiza o carro existente
    await updateCar(id, marca, modelo);
  } else {
    // Adiciona um novo carro
    await addCar(marca, modelo);
  }

  carForm.reset();
  carSubmitButton.textContent = 'Adicionar Carro';
  fetchCars();
});

// Função para adicionar um carro
async function addCar(marca, modelo) {
  try {
    await fetch(CARS_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ marca, modelo }),
    });
  } catch (error) {
    console.error('Erro ao adicionar carro:', error);
  }
}

// Função para editar um carro
function editCar(id, marca, modelo) {
  carIdInput.value = id;
  carMarcaInput.value = marca;
  carModeloInput.value = modelo;
  carSubmitButton.textContent = 'Atualizar Carro';
}

// Função para atualizar um carro
async function updateCar(id, marca, modelo) {
  try {
    await fetch(`${CARS_API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ marca, modelo }),
    });
  } catch (error) {
    console.error('Erro ao atualizar carro:', error);
  }
}

// Função para deletar um carro
async function deleteCar(id) {
  try {
    await fetch(`${CARS_API_URL}/${id}`, {
      method: 'DELETE',
    });
    fetchCars();
  } catch (error) {
    console.error('Erro ao deletar carro:', error);
  }
}

// Carrega os carros ao iniciar a página
fetchCars();
