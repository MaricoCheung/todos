// pages/index/index.js
Page({
    // 页面的数据模型（输入框和任务清单）绑定
    data: {
        todoInput: '',
        todos: [
            { name: 'Learning How Todo', finished: false },
            { name: 'Learning How Todo', finished: true }
        ],
        todoLeft: 1,
        allFinished: false, // 标识符

        showLangSheet: false,
        langSelect: [
            { text: '中文', type: 'warn', value: 1 },
            { text: '언어', value: 2 },
            { text: 'English', value: 3 },
            { text: 'ランゲージ', value: 4 }
        ],
        langText: { text: 'Language' },

        showThemeSheet: false,
        themeSelect: [
            { text: '白光主题', type: 'warn', value: 1 },
            { text: '深色主题', value: 2 },
        ],
        themeText: { text: '白光主题' },
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
        2、调用splice方法返回数组[注意剩余显示、涉及到完成状态]
        3、重新渲染页面数据
        */
        const todos = this.data.todos
        const todoDelete = todos.splice(e.currentTarget.dataset.index, 1)[0]
        const todoLeft = this.data.todoLeft + (todoDelete.finished ? 0 : -1)
        this.setData({ todos: todos, todoLeft: todoLeft })
    },
    toggleAllHandle () {
        /*1、
        遍历元素的属性变更
        显示剩余要么为0要么为数组长度
        */
       this.data.allFinished = !this.data.allFinished
       const todos = this.data.todos
       const that = this
       todos.forEach(item => {
           item.finished = that.data.allFinished
       });
       const todoLeft = this.data.allFinished ? 0 : this.data.todos.length
       this.setData({ todos: this.data.todos, todoLeft: todoLeft })
    },
    clearAllHandle () {
        /*
        用filter方法过滤
        返回未完成的任务
        */
        const todos = this.data.todos.filter(item => {
            return !item.finished
        })
        this.setData({ todos: todos })
    },

    // 底部固定菜单栏抽屉
    langSelectHandle: function () {
        this.setData({
            showLangSheet: true
        })
    },
    langSelectClose: function () {
        this.setData({
            showLangSheet: false
        })
    },
    langSelect(e) {
        let lang = this.data.langSelect[e.detail.index];
        this.setData({
            langText: lang
        })
        this.langSelectClose()
    },

    themeSelectHandle: function () {
        this.setData({
            showThemeSheet: true
        })
    },
    themeSelectClose: function () {
        this.setData({
            showThemeSheet: false
        })
    },
    themeSelect(e) {
        let theme = this.data.themeSelect[e.detail.index];
        this.setData({
            themeText: theme
        })
        this.themeSelectClose()
    },
})