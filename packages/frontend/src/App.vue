<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { client } from './client';
import { useForm, useField } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { insertUserSchema } from 'shared';

// Infer the User type from the client response
type User = Awaited<ReturnType<typeof client.getUsers>>[number];

const users = ref<User[]>([]);
const loading = ref(false);
const error = ref('');

// Setup vee-validate with the schema from shared
const { handleSubmit, resetForm, errors } = useForm({
  validationSchema: toTypedSchema(insertUserSchema),
});

const { value: name } = useField<string>('name');
const { value: email } = useField<string>('email');

async function loadUsers() {
  try {
    error.value = '';
    users.value = await client.getUsers();
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to load users';
    console.error('Error loading users:', err);
  }
}

const onSubmit = handleSubmit(async (values) => {
  try {
    loading.value = true;
    error.value = '';
    
    await client.createUser(values);

    // Clear form
    resetForm();

    // Reload users
    await loadUsers();
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to create user';
    console.error('Error creating user:', err);
  } finally {
    loading.value = false;
  }
});

onMounted(() => {
  loadUsers();
});
</script>

<template>
  <div class="app">
    <header>
      <h1>Drizzle + ORPC + Vue 3 Prototype</h1>
      <p>Full-stack type-safe application with end-to-end type inference</p>
    </header>

    <main>
      <section class="create-user">
        <h2>Create User</h2>
        <form @submit="onSubmit">
          <div class="form-group">
            <label for="name">Name:</label>
            <input
              id="name"
              v-model="name"
              type="text"
              placeholder="Enter name"
              :class="{ 'input-error': errors.name }"
            />
            <span v-if="errors.name" class="field-error">{{ errors.name }}</span>
          </div>
          
          <div class="form-group">
            <label for="email">Email:</label>
            <input
              id="email"
              v-model="email"
              type="email"
              placeholder="Enter email"
              :class="{ 'input-error': errors.email }"
            />
            <span v-if="errors.email" class="field-error">{{ errors.email }}</span>
          </div>

          <button type="submit" :disabled="loading">
            {{ loading ? 'Creating...' : 'Create User' }}
          </button>
        </form>

        <div v-if="error" class="error">{{ error }}</div>
      </section>

      <section class="users-list">
        <h2>Users</h2>
        <button @click="loadUsers" class="refresh-btn">Refresh</button>
        
        <div v-if="users.length === 0" class="empty">
          No users yet. Create one above!
        </div>

        <ul v-else>
          <li v-for="user in users" :key="user.id" class="user-item">
            <div class="user-info">
              <strong>{{ user.name }}</strong>
              <span class="email">{{ user.email }}</span>
            </div>
            <div class="user-meta">
              <span>ID: {{ user.id }}</span>
              <span>Created: {{ new Date(user.createdAt).toLocaleString() }}</span>
            </div>
          </li>
        </ul>
      </section>
    </main>
  </div>
</template>

<style scoped>
.app {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

header {
  text-align: center;
  margin-bottom: 3rem;
}

h1 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

header p {
  color: #7f8c8d;
}

main {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

section {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h2 {
  margin-top: 0;
  color: #2c3e50;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #2c3e50;
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  box-sizing: border-box;
}

input:focus {
  outline: none;
  border-color: #3498db;
}

input.input-error {
  border-color: #e74c3c;
}

.field-error {
  display: block;
  color: #e74c3c;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

button {
  background: #3498db;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}

button:hover:not(:disabled) {
  background: #2980b9;
}

button:disabled {
  background: #95a5a6;
  cursor: not-allowed;
}

.refresh-btn {
  margin-bottom: 1rem;
  background: #27ae60;
}

.refresh-btn:hover {
  background: #229954;
}

.error {
  margin-top: 1rem;
  padding: 0.75rem;
  background: #e74c3c;
  color: white;
  border-radius: 4px;
}

.empty {
  color: #7f8c8d;
  text-align: center;
  padding: 2rem;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.user-item {
  background: white;
  padding: 1rem;
  margin-bottom: 0.75rem;
  border-radius: 4px;
  border: 1px solid #ddd;
}

.user-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 0.5rem;
}

.user-info strong {
  color: #2c3e50;
  font-size: 1.1rem;
}

.email {
  color: #7f8c8d;
}

.user-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.875rem;
  color: #95a5a6;
}
</style>
