package models

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Collaborator struct {
	UuidModel
	Name         string `json:"name" validate:"min=4,max=50" gorm:"unique"`
	CPF          string `json:"cpf"`
	RG           string `json:"rg"`
	IsAuthorized *bool  `json:"is_authorized" gorm:"default:true"`
}

func (c Collaborator) TableName() string {
	return "collaborator"
}

func (c *Collaborator) BeforeCreate(tx *gorm.DB) error {
	uuidv4, err := uuid.NewRandom()
	if err != nil {
		return err
	}
	c.Id = uuidv4
	return nil
}
