package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type IdModel struct {
	Id        uint64         `json:"id" gorm:"primarykey"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `json:"deleted_at"`
}

type UuidModel struct {
	Id        uuid.UUID      `json:"id" gorm:"primarykey;type:varchar(36)"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `json:"deleted_at"`
}
