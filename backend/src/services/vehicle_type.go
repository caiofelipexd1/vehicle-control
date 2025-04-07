package services

import (
	"vehicles_control/helpers"
	"vehicles_control/models"
	"vehicles_control/repositories"
)

type VehicleType struct{}

func (vt VehicleType) Index() ([]models.VehicleType, error) {
	return repositories.VehicleTypeRepository.FindAll()
}

func (vt VehicleType) Show(id string) (models.VehicleType, error) {
	iduint64, err := helpers.HelperIdValidation.ValidateUint64(id)
	if err != nil {
		return models.VehicleType{}, err
	}

	return repositories.VehicleTypeRepository.FindById(iduint64)
}

func (vt VehicleType) Store(vehicleType models.VehicleType) (models.VehicleType, error) {
	err := validate.Struct(vehicleType)
	if err != nil {
		return models.VehicleType{}, err
	}

	return repositories.VehicleTypeRepository.Store(vehicleType)
}

func (vt VehicleType) Update(id string, vehicleType models.VehicleType) (models.VehicleType, error) {
	iduint64, err := helpers.HelperIdValidation.ValidateUint64(id)
	if err != nil {
		return models.VehicleType{}, err
	}

	err = validate.Struct(vehicleType)
	if err != nil {
		return models.VehicleType{}, err
	}

	return repositories.VehicleTypeRepository.Update(iduint64, vehicleType)
}

func (vt VehicleType) Destroy(id string) error {
	iduint64, err := helpers.HelperIdValidation.ValidateUint64(id)
	if err != nil {
		return err
	}

	return repositories.VehicleTypeRepository.Destroy(iduint64)
}

func NewVehicleTypeService() VehicleType {
	return VehicleType{}
}
