package repositories

import (
	"vehicles_control/models"

	"gorm.io/gorm"
)

type Location struct {
	db *gorm.DB
}

func (l Location) FindAll() ([]models.Location, error) {
	var locations []models.Location
	return locations, l.db.Find(&locations).Error
}

func (l Location) FindById(id uint64) (models.Location, error) {
	var location models.Location
	return location, l.db.First(&location, id).Error
}

func (l Location) Store(location models.Location) (models.Location, error) {
	return location, l.db.Create(&location).Error
}

func (l Location) Update(id uint64, location models.Location) (models.Location, error) {
	u := l.db.Model(&models.Location{}).Where("id = ?", id).Updates(&location)
	return location, u.Error
}

func (l Location) Destroy(id uint64) error {
	return l.db.Delete(&models.Location{}, id).Error
}

func NewLocationRepository(db *gorm.DB) Location {
	return Location{db: db}
}
