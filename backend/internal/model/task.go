package model

import "time"

// Task 任务结构体
type Task struct {
	ID        int    `gorm:"primaryKey"` // 主键ID
	Title     string `json:"title"`      // 任务标题
	Done      bool   `json:"done"`       // 是否完成
	CreatedAt *time.Time
	DeletedAt *time.Time
}
