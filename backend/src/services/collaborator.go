package services

import (
	"vehicles_control/helpers"
	"vehicles_control/models"
	"vehicles_control/repositories"

	"github.com/gofiber/fiber/v2"
)

type Collaborator struct{}

func (c Collaborator) Index() ([]models.Collaborator, error) {
	return repositories.CollaboratorRepository.FindAll()
}

func (c Collaborator) Show(id string) (models.Collaborator, error) {
	v4, err := helpers.HelperIdValidation.ValidateUUIDV4(id)
	if err != nil {
		return models.Collaborator{}, err
	}

	return repositories.CollaboratorRepository.FindById(v4)
}

func (c Collaborator) Store(collaborator models.Collaborator) (models.Collaborator, int, error) {
	err := validate.Struct(collaborator)
	if err != nil {
		return models.Collaborator{}, fiber.StatusBadRequest, err
	}

	_, err = repositories.CollaboratorRepository.Store(collaborator)
	if err != nil {
		return models.Collaborator{}, fiber.StatusBadRequest, err
	}

	return collaborator, fiber.StatusCreated, nil
}

func (c Collaborator) Update(id string, collaborator models.Collaborator) (models.Collaborator, error) {
	v4, err := helpers.HelperIdValidation.ValidateUUIDV4(id)
	if err != nil {
		return models.Collaborator{}, err
	}

	err = validate.Struct(collaborator)
	if err != nil {
		return models.Collaborator{}, err
	}

	return repositories.CollaboratorRepository.Update(v4, collaborator)
}

func (c Collaborator) Destroy(id string) error {
	v4, err := helpers.HelperIdValidation.ValidateUUIDV4(id)
	if err != nil {
		return err
	}

	return repositories.CollaboratorRepository.Destroy(v4)
}

func NewCollaboratorService() Collaborator {
	return Collaborator{}
}
