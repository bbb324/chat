/**
 * Created by junxie on 2016/10/20.
 */
var vm = new Vue({
  el: '#vue-app',
  data: {
    todos: [{id: 1, title: 'go shoopint'}, {id: 2, title: 'no shopping'}],
    newTodo: {id: null, title: ''}
  },
  methods: {
    addNewTodo(newTodo) {
      this.todos.push(newTodo);
      this.newTodo = {id: null, title: ''}
    },
    delTodo(id) {
      this.todos.$remove(id);
    }
  }
});