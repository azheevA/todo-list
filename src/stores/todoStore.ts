import {defineStore} from "pinia";
import {ref} from "vue";


interface ITodo {
    id: number;
    text: string;
    completed: boolean;
}

export const useTodoStore = defineStore('todoStore', () => {
    const todos = ref<ITodo[]>(JSON.parse(localStorage.getItem('todos') || '[]'));
    const addTodo = (text: string) => {
        todos.value.push({
            id: Date.now(),
            text,
            completed: false
        });
        saveToLocalStorage();
    }
    const removeTodo = (id: number) => {
        todos.value = todos.value.filter(todo => todo.id !== id);
        saveToLocalStorage();
    };

    const toggleTodo = (id: number) => {
        const todo = todos.value.find(todo => todo.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            saveToLocalStorage();
        }
    };

    const editTodo = (id: number, newText: string) => {
        const todo = todos.value.find(todo => todo.id === id);
        if (todo) {
            todo.text = newText;
            saveToLocalStorage();
        }
    }
    const saveToLocalStorage = () => {
        localStorage.setItem('todos', JSON.stringify(todos.value));
    };
    return {
        todos,
        addTodo,
        removeTodo,
        toggleTodo,
        editTodo
    };
})