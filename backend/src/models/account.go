package models

import (
	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type Account struct {
	UuidModel
	Name            string         `json:"name" validate:"min=4,max=50" gorm:"unique"`
	Username        string         `json:"username" validate:"min=4,max=50" gorm:"unique"`
	Password        string         `json:"password"`
	AccountStatusId uint64         `json:"account_status_id" validate:"required"`
	AccountStatus   *AccountStatus `json:"account_status,omitempty"`
	AccountTypeId   uint64         `json:"account_type_id" validate:"required"`
	AccountType     *AccountType   `json:"account_type,omitempty"`
	LocationId      uint64         `json:"location_id" validate:"required"`
	Location        *Location      `json:"location,omitempty"`
}

func (a Account) TableName() string {
	return "account"
}

func (a *Account) BeforeCreate(tx *gorm.DB) error {
	if a.Id != uuid.Nil {
		return nil
	}

	v4, err := uuid.NewRandom()
	if err != nil {
		return err
	}

	a.Id = v4

	pass, err := bcrypt.GenerateFromPassword([]byte(a.Password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}

	a.Password = string(pass)
	return nil
}
