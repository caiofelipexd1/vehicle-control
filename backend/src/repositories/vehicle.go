package repositories

import (
	"vehicles_control/models"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Vehicle struct {
	db *gorm.DB
}

func (v Vehicle) FindAll() ([]models.Vehicle, error) {
	var vehicles []models.Vehicle
	return vehicles, v.db.Preload("VehicleType").Find(&vehicles).Error
}

func (v Vehicle) FindById(id uuid.UUID) (models.Vehicle, error) {
	var vehicle models.Vehicle
	return vehicle, v.db.Preload("VehicleType").First(&vehicle, id).Error
}

func (v Vehicle) Store(vehicle models.Vehicle) (models.Vehicle, error) {
	return vehicle, v.db.Create(&vehicle).Error
}

func (v Vehicle) Update(id uuid.UUID, vehicle models.Vehicle) (models.Vehicle, error) {
	u := v.db.Model(&models.Vehicle{}).Preload("VehicleType").Where("id = ?", id).Updates(&vehicle)
	return vehicle, u.Error
}

func (v Vehicle) Destroy(id uint64) error {
	return v.db.Delete(&models.VehicleType{}, id).Error
}

func NewVehicleRepository(db *gorm.DB) Vehicle {
	return Vehicle{db: db}
}
