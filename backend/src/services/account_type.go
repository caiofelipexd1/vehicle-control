package services

import (
	"vehicles_control/helpers"
	"vehicles_control/models"
	"vehicles_control/repositories"
)

type AccountType struct{}

func (at AccountType) Index() ([]models.AccountType, error) {
	return repositories.AccountTypeRepository.FindAll()
}

func (at AccountType) Show(id string) (models.AccountType, error) {
	iduint64, err := helpers.HelperIdValidation.ValidateUint64(id)
	if err != nil {
		return models.AccountType{}, err
	}

	return repositories.AccountTypeRepository.FindById(iduint64)
}

func (at AccountType) Store(accountType models.AccountType) (models.AccountType, error) {
	err := validate.Struct(accountType)
	if err != nil {
		return models.AccountType{}, err
	}

	return repositories.AccountTypeRepository.Store(accountType)
}

func (at AccountType) Update(id string, accountType models.AccountType) (models.AccountType, error) {
	iduint64, err := helpers.HelperIdValidation.ValidateUint64(id)
	if err != nil {
		return models.AccountType{}, err
	}

	err = validate.Struct(accountType)
	if err != nil {
		return models.AccountType{}, err
	}

	return repositories.AccountTypeRepository.Update(iduint64, accountType)
}

func (at AccountType) Destroy(id string) error {
	iduint64, err := helpers.HelperIdValidation.ValidateUint64(id)
	if err != nil {
		return err
	}

	return repositories.AccountTypeRepository.Destroy(iduint64)
}

func NewAccountTypeService() AccountType {
	return AccountType{}
}
