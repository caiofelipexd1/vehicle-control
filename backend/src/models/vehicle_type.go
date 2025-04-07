package models

type VehicleType struct {
	IdModel
	Name string `json:"name" validate:"min=4,max=50" gorm:"unique"`
}

func (vt VehicleType) TableName() string {
	return "vehicle_type"
}
