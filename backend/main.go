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

	// 注册各种路由
	r.GET("/tasks", handler.GetTaskList)
	r.POST("/tasks", handler.AddTask)

	// 启动服务
	err := r.Run("localhost:8080")
	if err != nil {
		return
	}
}
