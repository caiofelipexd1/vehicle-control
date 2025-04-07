package services

import (
	"vehicles_control/helpers"
	"vehicles_control/models"
	"vehicles_control/repositories"
)

type AccountStatus struct{}

func (as AccountStatus) Index() ([]models.AccountStatus, error) {
	return repositories.AccountStatusRepository.FindAll()
}

func (as AccountStatus) Show(id string) (models.AccountStatus, error) {
	iduint64, err := helpers.HelperIdValidation.ValidateUint64(id)
	if err != nil {
		return models.AccountStatus{}, err
	}

	return repositories.AccountStatusRepository.FindById(iduint64)
}

func (as AccountStatus) Store(accountStatus models.AccountStatus) (models.AccountStatus, error) {
	err := validate.Struct(accountStatus)
	if err != nil {
		return models.AccountStatus{}, err
	}

	return repositories.AccountStatusRepository.Store(accountStatus)
}

func (as AccountStatus) Update(id string, accountStatus models.AccountStatus) (models.AccountStatus, error) {
	iduint64, err := helpers.HelperIdValidation.ValidateUint64(id)
	if err != nil {
		return models.AccountStatus{}, err
	}

	err = validate.Struct(accountStatus)
	if err != nil {
		return models.AccountStatus{}, err
	}

	return repositories.AccountStatusRepository.Update(iduint64, accountStatus)
}

func (as AccountStatus) Destory(id string) error {
	iduint64, err := helpers.HelperIdValidation.ValidateUint64(id)
	if err != nil {
		return err
	}

	return repositories.AccountStatusRepository.Destroy(iduint64)
}

func NewAccountStatusService() AccountStatus {
	return AccountStatus{}
}
