package handler

import (
	"backend/internal/database"
	"backend/internal/model"
	"log"

	"github.com/gin-gonic/gin"
)

/*
GetTaskList 获取任务列表
*/
func GetTaskList(c *gin.Context) {
	var tasks []model.Task
	database.DB.Find(&tasks)
	model.Ok(c, tasks, "success")
}

func AddTask(c *gin.Context) {
	title, ok := c.GetPostForm("title")
	if !ok {
		model.Error(c, "请填写title参数")
	}

	// 写入数据库
	err := database.DB.Create(&model.Task{
		Title: title,
	}).Error

	if err != nil {
		log.Println(err)
	}

	model.Ok(c, []int{}, "success")
}
