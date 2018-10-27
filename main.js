new Vue({
    //target main class wrapper
    el: ".todoapp",
    //where data gets defined with its attributes
    data () {
        return {
            //a "newTodo" object. The individual "todo" record that gets added to the whole todos
            newTodoRecord: '',
            //a "todos" object which has to be any array later on
            todos: [{
                id: 0,
                title: "Some title",
                completed: 'false'
            }]
        }
    },
    methods: {
        //defining a function that will dynamically add to the array list of the todos object
        addTodo() {
            //in words: access this "todos" data and update the following property
            this.todos.push({
                id: this.todos.length,
                title: this.newTodoRecord,
                completed: false
            });
            //after successfully entering a new record, clear the input
            this.newTodoRecord = ''
        },
        removeTodo(todo) {
            this.todos.splice(this.todos.indexOf(todo), 1)
        }


    }
});
