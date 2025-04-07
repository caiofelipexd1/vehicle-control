package services

import (
	"errors"

	"vehicles_control/models"
	"vehicles_control/repositories"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

type ActionOut struct{}

func (ao ActionOut) FindAll() ([]models.ActionOut, *fiber.Error, error) {
	actionsOut, err := repositories.ActionOutRepository.FindAll()
	if err != nil {
		return []models.ActionOut{}, fiber.ErrInternalServerError, err
	}

	return actionsOut, nil, nil
}

func (ao ActionOut) FindBydId(id string) (models.ActionOut, *fiber.Error, error) {
	uuid, err := uuid.Parse(id)
	if err != nil {
		return models.ActionOut{}, fiber.ErrBadRequest, err
	}

	actionOut, err := repositories.ActionOutRepository.FindById(uuid)
	if err != nil {
		return models.ActionOut{}, fiber.ErrInternalServerError, err
	}

	return actionOut, nil, nil
}

func (ao ActionOut) Store(actionOut models.ActionOut) (models.ActionOut, *fiber.Error, error) {
	err := validate.Struct(actionOut)
	if err != nil {
		return models.ActionOut{}, fiber.ErrBadRequest, err
	}

	// Recupera o último registro do veículo para atualizar o registro de saída.
	action, err := repositories.ActionRepository.FindSimpleById(actionOut.ActionId)
	if err != nil {
		return models.ActionOut{}, fiber.ErrBadRequest, err
	}

	if !*actionOut.NotAcceptCheck && actionOut.Photo == "" {
		return models.ActionOut{}, fiber.ErrBadRequest, errors.New(`field photo is required`)
	}

	newActionOut, err := repositories.ActionOutRepository.Create(actionOut)
	if err != nil {
		return models.ActionOut{}, fiber.ErrInternalServerError, err
	}

	// Atualiza o status HasActionOut para true.
	action.HasActionOut = true
	_, err = repositories.ActionRepository.Update(action.Id, action)
	if err != nil {
		return models.ActionOut{}, fiber.ErrBadRequest, errors.New("falha ao atualizar o status da entrada do veículo")
	}

	return newActionOut, nil, nil
}

func (ao ActionOut) Update(id string, actionOut models.ActionOut) (models.ActionOut, *fiber.Error, error) {
	uuid, err := uuid.Parse(id)
	if err != nil {
		return models.ActionOut{}, fiber.ErrBadRequest, err
	}

	err = validate.Struct(actionOut)
	if err != nil {
		return models.ActionOut{}, fiber.ErrBadRequest, err
	}

	actionOut.Id = uuid

	updatedActionOut, err := repositories.ActionOutRepository.Update(actionOut)
	if err != nil {
		return models.ActionOut{}, fiber.ErrInternalServerError, err
	}

	return updatedActionOut, nil, nil
}

func (ao ActionOut) Destroy(id string) (*fiber.Error, error) {
	uuid, err := uuid.Parse(id)
	if err != nil {
		return fiber.ErrBadRequest, err
	}

	err = repositories.ActionRepository.Destroy(uuid)
	if err != nil {
		return fiber.ErrInternalServerError, err
	}

	return nil, nil
}

func NewActionOutService() ActionOut {
	return ActionOut{}
}
