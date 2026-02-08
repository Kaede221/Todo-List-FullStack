package handler

import (
	"backend/internal/database"
	"backend/internal/model"
	"log"
	"strconv"

	"github.com/gin-gonic/gin"
)

/*
GetTaskList 获取任务列表
*/
func GetTaskList(c *gin.Context) {
	var tasks []model.Task
	database.DB.Order("id").Find(&tasks)
	model.Ok(c, tasks, "success")
}

/*
AddTask 增加新的任务
*/
func AddTask(c *gin.Context) {
	title, ok := c.GetPostForm("title")
	if !ok {
		model.Error(c, "请填写title参数")
		return
	}

	// 写入数据库
	err := database.DB.Create(&model.Task{
		Title: title,
	}).Error

	if err != nil {
		log.Println(err)
	}

	model.OkWithMsg(c, "success")
}

/*
DeleteTask 删除任务条目
*/
func DeleteTask(c *gin.Context) {
	taskId := c.Query("id")
	if len(taskId) == 0 {
		model.Error(c, "请填写任务Id")
		return
	}

	num, err := strconv.Atoi(taskId)
	if err != nil {
		model.Error(c, "ID为整数")
		return
	}

	// 根据ID删除数据
	database.DB.Delete(&model.Task{ID: num})
	model.OkWithMsg(c, "success")
}

func EditTask(c *gin.Context) {
	taskId := c.Query("id")
	if len(taskId) == 0 {
		model.Error(c, "请填写任务Id")
		return
	}

	num, err := strconv.Atoi(taskId)
	if err != nil {
		model.Error(c, "ID为整数")
		return
	}

	// 从请求体获取数据
	title := c.PostForm("title")
	if len(title) == 0 {
		model.Error(c, "Title为空")
		return
	}

	doneStr := c.PostForm("done")
	done, err := strconv.ParseBool(doneStr)
	if err != nil {
		done = false
	}

	log.Println("新的Done为: ", done)

	// 找到并且修改数据
	database.DB.Model(&model.Task{ID: num}).Updates(map[string]any{
		"done":  done,
		"title": title,
	})

	model.OkWithMsg(c, "success")
}
