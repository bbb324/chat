/**
 * Created by junxie on 2016/10/20.
 */
var TodoItems = Vue.extend({
  template: '#todo-items-template',
  props: ['todos'],
  methods: {
    todoCompleted(todo){
      todo.completed = !todo.completed;
    }
  }
});
Vue.component('todo-item', TodoItems);

new Vue({
  el: '#vue-app',
  data: {
    todos: [{id: 1, title: 'go shoopint', completed: false}, {id: 2, title: 'no shopping', completed: true}],
    newTodo: {id: null, title: '', completed: false}
    }
});
