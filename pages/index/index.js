// pages/index/index.js
Page({
    // 页面的数据模型（输入框和任务清单）绑定
    data: {
        planInput: 'Anyway',
        todos: [
            { name: 'Learn java', completed: false },
            { name: 'Learn c++', completed: true },
            { name: 'Learn python', completed: false }
        ]
    },
    // 页面的用户交互处理函数（点击添加、单删、全删、剩余显示、清空显示）
    /*（一）1、点击加号
    2、获取value
    3、传递添加到list*/
    addTodos:function() {

    },
    // 生命周期函数--监听页面加载
    onLoad: function (options) {

    },
})