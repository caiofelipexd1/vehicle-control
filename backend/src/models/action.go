package models

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Action struct {
	UuidModel
	AccountId           uuid.UUID     `json:"account_id" validate:"required"`
	Account             *Account      `json:"account,omitempty"`
	CollaboratorId      uuid.UUID     `json:"collaborator_id" validate:"required"`
	Collaborator        *Collaborator `json:"collaborator,omitempty"`
	VehicleId           uuid.UUID     `json:"vehicle_id" validate:"required"`
	Vehicle             *Vehicle      `json:"vehicle,omitempty"`
	LocationId          uint64        `json:"location_id" validate:"required"`
	Location            *Location     `json:"location,omitempty"`
	Milage              uint32        `json:"milage" validate:"required"`
	NotAcceptCheck      *bool         `json:"not_accept_check" validate:"required"`
	Photo               string        `json:"photo"`
	VehicleName         string        `json:"vehicle_name,omitempty"`
	VehicleLicensePlate string        `json:"vehicle_license_plate,omitempty"`
	CollaboratorName    string        `json:"collaborator_name,omitempty"`
	ActionOut           *ActionOut    `json:"action_out,omitempty"`
	HasActionOut        bool          `json:"has_action_out"`
}

func (a Action) TableName() string {
	return "action"
}

func (a *Action) BeforeCreate(tx *gorm.DB) error {
	uuidv4, err := uuid.NewRandom()
	if err != nil {
		return err
	}
	a.Id = uuidv4
	return nil
}
