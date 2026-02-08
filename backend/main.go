package main

import (
	"backend/internal/database"
	"backend/internal/handler"

	"github.com/gin-gonic/gin"
)

func main() {
	// 初始化数据库
	database.InitDB()

	// 创建路由引擎
	r := gin.Default()

	// 获取所有任务
	r.GET("/tasks", handler.GetTaskList)
	// 增加新的任务
	r.POST("/tasks", handler.AddTask)
	// 删除任务
	r.DELETE("/tasks", handler.DeleteTask)
	// 更新任务
	r.PUT("/tasks", handler.EditTask)

	// 启动服务
	err := r.Run("localhost:8080")
	if err != nil {
		return
	}
}
