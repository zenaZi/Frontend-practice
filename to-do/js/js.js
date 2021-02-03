let app6 = new Vue ({
    el: '#name',
    data: {
        message: 'Привет, !'

    } })
 Vue.component('todo-item', { props: ['todo'], template: `<li :class="{'is_completed': strike}" @click="item_done_on_click">{{ todo.text }}<button v-on:click="$emit(\'remove\')">Удалить</button></li>`, data: function() { return{ strike: false, } }, methods: { item_done_on_click() { this.strike = !this.strike; } } })

let app7 = new Vue({ el: '#to-do', data: { new_todo_text: '', List: [ { id: 0, text: 'Овощи' }, { id: 1, text: 'Сыр' }, { id: 2, text: 'Что там еще люди едят?' } ], todo_item_is_completed: [ 'none', 'line-through' ], next_todo_id: 4 }, methods: { addNewTodo: function () { this.List.push({ id: this.next_todo_id++, text: this.new_todo_text }) this.new_todo_text = '' } } })