package services

import (
	"vehicles_control/helpers"
	"vehicles_control/models"
	"vehicles_control/repositories"
)

type Location struct{}

func (l Location) Index() ([]models.Location, error) {
	return repositories.LocationRepository.FindAll()
}

func (l Location) Show(id string) (models.Location, error) {
	iduint64, err := helpers.HelperIdValidation.ValidateUint64(id)
	if err != nil {
		return models.Location{}, err
	}

	return repositories.LocationRepository.FindById(iduint64)
}

func (l Location) Store(location models.Location) (models.Location, error) {
	err := validate.Struct(location)
	if err != nil {
		return models.Location{}, err
	}

	return repositories.LocationRepository.Store(location)
}

func (l Location) Update(id string, location models.Location) (models.Location, error) {
	iduint64, err := helpers.HelperIdValidation.ValidateUint64(id)
	if err != nil {
		return models.Location{}, err
	}

	err = validate.Struct(location)
	if err != nil {
		return models.Location{}, err
	}

	return repositories.LocationRepository.Update(iduint64, location)
}

func (l Location) Destroy(id string) error {
	iduint64, err := helpers.HelperIdValidation.ValidateUint64(id)
	if err != nil {
		return err
	}

	return repositories.LocationRepository.Destroy(iduint64)
}

func NewLocationService() Location {
	return Location{}
}
