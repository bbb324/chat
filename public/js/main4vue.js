/**
 * Created by junxie on 2016/10/20.
 */
var vm = new Vue({
  el: '#vue-app',
  data: {
    todos: [{id: 1, title: 'go shoopint', completed: false}, {id: 2, title: 'no shopping', completed: true}],
    newTodo: {id: null, title: '', completed: false}
  },
  methods: {
    addNewTodo(newTodo) {
      this.todos.push(newTodo);
      this.newTodo = {id: null, title: '', completed: false}
    },
    delTodo(id) {
      this.todos.$remove(id);
    },
    todoCompleted(todo){
      todo.completed = !todo.completed
    }
  },
  computed: {
    todoCount(){
      return this.todos.length;
    }
  }
});