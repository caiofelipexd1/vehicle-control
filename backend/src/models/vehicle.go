package models

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Vehicle struct {
	UuidModel
	Name          string       `json:"name" validate:"min=4,max=50" gorm:"unique"`
	Codename      string       `json:"codename" validate:"min=4,max=50" gorm:"unique"`
	LicensePlate  string       `json:"license_plate" validate:"min=4,max=50" gorm:"unique"`
	VehicleTypeId uint64       `json:"vehicle_type_id" validate:"required"`
	VehicleType   *VehicleType `json:"vehicle_type,omitempty"`
	Active        *bool        `json:"active" gorm:"default:true"`
	Description   string       `json:"description"`
}

func (v Vehicle) TableName() string {
	return "vehicle"
}

func (v *Vehicle) BeforeCreate(tx *gorm.DB) error {
	uuidv4, err := uuid.NewRandom()
	if err != nil {
		return err
	}
	v.Id = uuidv4
	return nil
}
