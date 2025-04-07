package repositories

import (
	"vehicles_control/models"

	"gorm.io/gorm"
)

type AccountStatus struct {
	db *gorm.DB
}

func (as AccountStatus) FindAll() ([]models.AccountStatus, error) {
	var accountsStatus []models.AccountStatus
	return accountsStatus, as.db.Find(&accountsStatus).Error
}

func (as AccountStatus) FindById(id uint64) (models.AccountStatus, error) {
	var accountStatus models.AccountStatus
	return accountStatus, as.db.First(&accountStatus, id).Error
}

func (as AccountStatus) Store(accountStatus models.AccountStatus) (models.AccountStatus, error) {
	return accountStatus, as.db.Create(&accountStatus).Error
}

func (as AccountStatus) Update(id uint64, accountStatus models.AccountStatus) (models.AccountStatus, error) {
	update := as.db.Model(&models.AccountStatus{}).Where("id = ?", id).Updates(&accountStatus)
	return accountStatus, update.Error
}

func (as AccountStatus) Destroy(id uint64) error {
	return as.db.Delete(&models.AccountStatus{}, id).Error
}

func NewAccountStatusRepository(db *gorm.DB) AccountStatus {
	return AccountStatus{db: db}
}
