const TODO_DB = 'todo-records';

new Vue({
    el: ".todoapp",
    data () {
        return {
            //the data attributes and their default value as either '', [], null, 'all'
            //these are the non-computed properties
            newTodoRecord: '',
            todos: [],
            editedTodo: null,
            visibility: 'all'
        }
    },
    created() {
      this.todos = JSON.parse(localStorage.getItem(TODO_DB) || '[]');
    },
    computed: {
      filteredTodos() {
          //which is filter by 'all', 'completed', 'active'
          //condition 1: what to return when visibility is 'all'
          if (this.visibility === 'all') {
              return this.todos;
          }
          //condition 2: what to return when visibility is 'completed'
          else if (this.visibility === 'active') {
              return this.todos.filter(function (todo) {
                  return !todo.completed;
              })
          }
          //condition 3: what to return when visibility is 'active'
          else {
              return this.todos.filter(function (todo) {
                  return todo.completed;
              })
          }
      }
    },
    methods: {
        createTodo() {
            this.todos.push({
                id: this.todos.length,
                title: this.newTodoRecord,
                completed: false
            });
            this.newTodoRecord = '';
            localStorage.setItem(TODO_DB, JSON.stringify(this.todos));
        },
        deleteTodo(todo) {
            this.todos.splice(this.todos.indexOf(todo), 1);
            localStorage.setItem(TODO_DB, JSON.stringify(this.todos));
        },
        editTodo(todo) {
            this.editedTodo = todo;
        },
        doneEdit(todo) {
            if (!this.editedTodo) {
                return
            }
            this.editedTodo = null;

            todo.title = todo.title.trim();
            if (!todo.title) {
                this.deleteTodo(todo);
            }

            localStorage.setItem(TODO_DB, JSON.stringify(this.todos));
        }
    }
});
