package services

import (
	"regexp"

	"vehicles_control/helpers"
	"vehicles_control/models"
	"vehicles_control/repositories"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

type Vehicle struct{}

func (v Vehicle) Index() ([]models.Vehicle, error) {
	return repositories.VehicleRepository.FindAll()
}

func (v Vehicle) Show(id string) (models.Vehicle, error) {
	uuidVehicleId, err := uuid.Parse(id)
	if err != nil {
		return models.Vehicle{}, err
	}

	return repositories.VehicleRepository.FindById(uuidVehicleId)
}

func (v Vehicle) Store(vehicle models.Vehicle) (models.Vehicle, int, error) {
	err := validate.Struct(vehicle)
	if err != nil {
		return models.Vehicle{}, fiber.StatusBadRequest, err
	}

	regularLicensePlate := regexp.MustCompile(`[^a-zA-Z0-9 ]+`).ReplaceAllString(vehicle.LicensePlate, "")
	vehicle.LicensePlate = regularLicensePlate

	vh, err := repositories.VehicleRepository.Store(vehicle)
	if err != nil {
		return models.Vehicle{}, fiber.StatusBadRequest, err
	}

	return vh, fiber.StatusCreated, nil
}

func (v Vehicle) Update(id string, vehicle models.Vehicle) (models.Vehicle, error) {
	uuidV4, err := uuid.Parse(id)
	if err != nil {
		return models.Vehicle{}, err
	}

	regularLicensePlate := regexp.MustCompile(`[^a-zA-Z0-9 ]+`).ReplaceAllString(vehicle.LicensePlate, "")
	vehicle.LicensePlate = regularLicensePlate

	err = validate.Struct(vehicle)
	if err != nil {
		return models.Vehicle{}, err
	}

	return repositories.VehicleRepository.Update(uuidV4, vehicle)
}

func (v Vehicle) Destroy(id string) error {
	iduint64, err := helpers.HelperIdValidation.ValidateUint64(id)
	if err != nil {
		return err
	}

	return repositories.VehicleRepository.Destroy(iduint64)
}

func NewVehicleService() Vehicle {
	return Vehicle{}
}
