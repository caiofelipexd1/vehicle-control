package repositories

import (
	"vehicles_control/models"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Account struct {
	db *gorm.DB
}

func (a Account) FindAll() ([]models.Account, error) {
	var accounts []models.Account
	return accounts, a.db.Preload("AccountStatus").Preload("AccountType").Preload("Location").Find(&accounts).Error
}

func (a Account) FindByUsername(username string) (models.Account, error) {
	var collaborador models.Account
	return collaborador, a.db.Preload("AccountStatus").Preload("AccountType").Preload("Location").Where("username = ?", username).First(&collaborador).Error
}

func (a Account) FindById(id uuid.UUID) (models.Account, error) {
	var account models.Account
	return account, a.db.Preload("AccountStatus").Preload("AccountType").Preload("Location").First(&account, id).Error
}

func (a Account) Store(account models.Account) (models.Account, error) {
	return account, a.db.Create(&account).Error
}

func (a Account) Update(id uuid.UUID, account models.Account) (models.Account, error) {
	u := a.db.Model(&models.Account{}).Preload("AccountStatus").Preload("AccountType").Preload("Location").Where("id = ?", id).Updates(&account)
	return account, u.Error
}

func (a Account) Destroy(id uuid.UUID) error {
	return a.db.Delete(&models.Account{}, id).Error
}

func NewAccountRepository(db *gorm.DB) Account {
	return Account{db: db}
}
