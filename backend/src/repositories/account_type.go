package repositories

import (
	"vehicles_control/models"

	"gorm.io/gorm"
)

type AccountType struct {
	db *gorm.DB
}

func (at AccountType) FindAll() ([]models.AccountType, error) {
	var accountTypes []models.AccountType
	return accountTypes, at.db.Find(&accountTypes).Error
}

func (at AccountType) FindById(id uint64) (models.AccountType, error) {
	var accountType models.AccountType
	return accountType, at.db.First(&accountType, id).Error
}

func (at AccountType) Store(accountType models.AccountType) (models.AccountType, error) {
	return accountType, at.db.Create(&accountType).Error
}

func (at AccountType) Update(id uint64, accountType models.AccountType) (models.AccountType, error) {
	update := at.db.Model(&models.AccountType{}).Where("id = ?", id).Updates(&accountType)
	return accountType, update.Error
}

func (at AccountType) Destroy(id uint64) error {
	return at.db.Delete(&models.AccountType{}, id).Error
}

func NewAccountTypeRepository(db *gorm.DB) AccountType {
	return AccountType{db: db}
}
