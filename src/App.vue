<template>
  <div class="todo-app">
    <h1>To-Do List</h1>

    <input v-model="newTodo" placeholder="Введите задачу" @keyup.enter="addNewTodo" />

    <ul class="table">
      <div v-for="todo in todoStore.todos" :key="todo.id" class="element">
        <span :class="{ completed: todo.completed }" @click="toggleComplete(todo.id)" class="span">
          {{ todo.text }}
        </span>
        <button @click="openModal(todo)">Редактировать</button>
        <button @click="removeTask(todo.id)">Удалить</button>
      </div>
    </ul>


    <Modal :isOpen="isModalOpen" @close="closeModal">
      <template v-slot:default>
        <h2>Редактирование задачи</h2>
        <input v-model="editText" placeholder="Введите новый текст" />
        <button @click="saveTask">Сохранить</button>
      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useTodoStore } from './stores/todoStore';
import Modal from './components/Modal.vue';

export default defineComponent({
  components: {
    Modal
  },
  setup() {
    const todoStore = useTodoStore();
    const newTodo = ref<string>('');
    const isModalOpen = ref(false);
    const editText = ref<string>('');
    const editTodoId = ref<number | null>(null);


    const addNewTodo = () => {
      if (newTodo.value.trim()) {
        todoStore.addTodo(newTodo.value);
        newTodo.value = '';
      }
    };

    const removeTask = (id: number) => {
      todoStore.removeTodo(id);
    };


    const toggleComplete = (id: number) => {
      todoStore.toggleTodo(id);
    };


    const openModal = (todo: { id: number, text: string }) => {
      isModalOpen.value = true;
      editText.value = todo.text;
      editTodoId.value = todo.id;
    };


    const closeModal = () => {
      isModalOpen.value = false;
      editText.value = '';
      editTodoId.value = null;
    };


    const saveTask = () => {
      if (editTodoId.value !== null && editText.value.trim()) {
        todoStore.editTodo(editTodoId.value, editText.value);
        closeModal();
      }
    };

    return {
      todoStore,
      newTodo,
      addNewTodo,
      removeTask,
      toggleComplete,
      isModalOpen,
      openModal,
      closeModal,
      editText,
      saveTask
    };
  }
});
</script>

<style scoped>
.todo-app {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 1000px;
  margin: 0 auto;
}

.completed {
  text-decoration: line-through;
}

input {
  width: 60%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
}

button {
  margin-left: 10px;
}

.table {
  padding: 0;
  width: 950px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.element {
  padding: 10px 11px;
  border: 1px solid #1a1a1a;
  margin: 11px;
  display: grid;
  grid-template-columns: 4fr 1fr 1fr;
  width: 100%;
  align-items: center;
  box-sizing: border-box;
  border-radius: 8px;
}

.span {
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  height: 100%;
  line-height: 1;
}

</style>
