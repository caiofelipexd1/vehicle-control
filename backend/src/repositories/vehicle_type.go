package repositories

import (
	"vehicles_control/models"

	"gorm.io/gorm"
)

type VehicleType struct {
	db *gorm.DB
}

func (vt VehicleType) FindAll() ([]models.VehicleType, error) {
	var vehicleTypes []models.VehicleType
	return vehicleTypes, vt.db.Find(&vehicleTypes).Error
}

func (vt VehicleType) FindById(id uint64) (models.VehicleType, error) {
	var vehicleType models.VehicleType
	return vehicleType, vt.db.First(&vehicleType, id).Error
}

func (vt VehicleType) Store(vehicleType models.VehicleType) (models.VehicleType, error) {
	return vehicleType, vt.db.Create(&vehicleType).Error
}

func (vt VehicleType) Update(id uint64, vehicleType models.VehicleType) (models.VehicleType, error) {
	u := vt.db.Model(&models.VehicleType{}).Where("id = ?", id).Updates(&vehicleType)
	return vehicleType, u.Error
}

func (vt VehicleType) Destroy(id uint64) error {
	return vt.db.Delete(&models.VehicleType{}, id).Error
}

func NewVehicleTypeRepository(db *gorm.DB) VehicleType {
	return VehicleType{db: db}
}
