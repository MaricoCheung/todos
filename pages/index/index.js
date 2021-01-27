// pages/index/index.js
Page({
    // 页面的数据模型（输入框和任务清单）绑定
    data: {
        todoInput: '',
        todos: [
            { name: 'Learn java', finished: false },
            { name: 'Learn c++', finished: true },
            { name: 'Learn python', finished: false }
        ],
        todoLeft: 2,
    },
    // 页面的用户交互处理函数（注册事件：输入框传值、点击添加、状态切换、剩余显示、单删、全删、清空显示）
    inputChangeHandle (e) {
        this.setData({ todoInput: e.detail.value })
    },
    addTodoHandle () {
        /*1、点击加号[判断若为空值直接退出]
        2、获取value
        3、传递添加到数组list
        4、重新渲染页面数据*/
        if(!this.data.todoInput) return
        const newTodo = this.data.todos
        newTodo.push({
            name: this.data.todoInput,
            conpleted: false
        })
        this.setData({ 
            todos: newTodo, 
            todoInput: '', 
            todoLeft: this.data.todoLeft + 1 })
    },
    toggleTodoHandle (e) {
        /*1、找到点击对应的列表索引
        2、事件绑定，创建自定义属性
        3、取非进行属性变更
        4、重新渲染变化过后的页面数据
        */
        const todo = this.data.todos[e.currentTarget.dataset.index]
        todo.finished = !todo.finished
        const todoLeft = this.data.todoLeft + (todo.finished ? -1 : 1)
        this.setData({ todos: this.data.todos, todoLeft: todoLeft})
    },
    todoDeleteHandle (e) {
        /*1、找到点击对应的小图标
        2、事件绑定，且创建自定义属性索引列表[注意事件冒泡]
        2、调用splice方法[注意剩余显示、涉及到完成状态]
        3、重新渲染页面数据
        */
        const todos = this.data.todos
        const todoDelete = todos.splice(e.currentTarget.dataset.index, 1)[0]
        const todoLeft = this.data.todoLeft + (todoDelete.finished ? 0 : -1)
        this.setData({ todos: todos, todoLeft: todoLeft })
    }
})