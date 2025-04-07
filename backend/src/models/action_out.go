package models

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type ActionOut struct {
	UuidModel
	ActionId       uuid.UUID     `json:"action_id" validate:"required"`
	Action         *Action       `json:"action,omitempty"`
	CollaboratorId uuid.UUID     `json:"collaborator_id" validate:"required"`
	Collaborator   *Collaborator `json:"collaborator,omitempty"`
	NotAcceptCheck *bool         `json:"not_accept_check" validate:"required"`
	Photo          string        `json:"photo" `
}

func (ao ActionOut) TableName() string {
	return "action_out"
}

func (ao *ActionOut) BeforeCreate(tx *gorm.DB) error {
	uuid, err := uuid.NewRandom()
	if err != nil {
		return err
	}

	ao.Id = uuid
	return nil
}
