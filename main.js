//create a global variable by defining a key for local storage
const TODO_DB = 'todo-records';

new Vue({
    el: ".todoapp",
    data () {
        return {
            newTodoRecord: '',
            todos: [],
            editedTodo: null
        }
    },
    //when a new Vue instance is being instantiated....
    created() {
      this.todos = JSON.parse(localStorage.getItem(TODO_DB) || '[]');
    },
    methods: {
        createTodo() {
            //in words: access this "todos" data and update the following property
            this.todos.push({
                id: this.todos.length,
                title: this.newTodoRecord,
                completed: false
            });
            this.newTodoRecord = '';
            //update the local storage when record added
            localStorage.setItem(TODO_DB, JSON.stringify(this.todos));
        },
        deleteTodo(todo) {
            this.todos.splice(this.todos.indexOf(todo), 1);
            //update local storage when record removed
            localStorage.setItem(TODO_DB, JSON.stringify(this.todos));
        },
        editTodo(todo) {
            this.editedTodo = todo;
        },
        doneEdit(todo) {
            //validation - if todo is empty, do nothing
            if (!this.editedTodo) {
                return
            }
            this.editedTodo = null;

            //validation - if todo's title is empty, remove todo from the list to avoid empty todo
            todo.title = todo.title.trim();
            if (!todo.title) {
                this.deleteTodo(todo);
            }

            localStorage.setItem(TODO_DB, JSON.stringify(this.todos));
        }
    }
});
