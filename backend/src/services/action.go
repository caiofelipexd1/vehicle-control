package services

import (
	"errors"
	"fmt"

	"vehicles_control/models"
	"vehicles_control/repositories"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Action struct{}

func (a Action) Index() ([]models.Action, *fiber.Error, error) {
	actions, err := repositories.ActionRepository.FindAll()
	if err != nil {
		return []models.Action{}, fiber.ErrInternalServerError, err
	}

	return actions, nil, nil
}

func (a Action) ShowOpened() ([]models.Action, *fiber.Error, error) {
	openedActions, err := repositories.ActionRepository.FindOpened()
	if err != nil {
		return []models.Action{}, fiber.ErrInternalServerError, err
	}

	return openedActions, nil, nil
}

func (a Action) ShowOnlyNoHaveActionOut() ([]models.Action, *fiber.Error, error) {
	actionsWithoutOut, err := repositories.ActionRepository.FindOnlyNoHaveActionOut()
	if err != nil {
		return []models.Action{}, fiber.ErrInternalServerError, err
	}

	return actionsWithoutOut, nil, nil
}

func (a Action) Show(id string) (models.Action, *fiber.Error, error) {
	uuid, err := uuid.Parse(id)
	if err != nil {
		return models.Action{}, fiber.ErrBadRequest, err
	}

	action, err := repositories.ActionRepository.FindById(uuid)
	if err != nil {
		return models.Action{}, fiber.ErrInternalServerError, err
	}

	return action, nil, nil
}

func (a Action) Store(action models.Action) (models.Action, *fiber.Error, error) {
	lastAction, err := repositories.ActionRepository.FindLastActionWithVehicleId(action.VehicleId)
	if err != nil && err != gorm.ErrRecordNotFound {
		return models.Action{}, fiber.ErrBadRequest, err
	}

	if (lastAction != models.Action{}) && !lastAction.HasActionOut {
		return models.Action{}, fiber.ErrBadRequest, errors.New("veículo informado já possui um registro de entrada registrado")
	}

	if action.Milage < lastAction.Milage {
		return models.Action{}, fiber.ErrBadRequest, errors.New("a quilometragem é menor do que a informada anteriormente")
	}

	action.HasActionOut = false

	err = validate.Struct(action)
	if err != nil {
		fmt.Println(err)
		return models.Action{}, fiber.ErrBadRequest, err
	}

	if !*action.NotAcceptCheck && action.Photo == "" {
		return models.Action{}, fiber.ErrBadRequest, errors.New(`field photo is required`)
	}

	newAction, err := repositories.ActionRepository.Store(action)
	if err != nil {
		return models.Action{}, fiber.ErrInternalServerError, err
	}

	return newAction, nil, nil
}

func (a Action) Update(id string, action models.Action) (models.Action, *fiber.Error, error) {
	lastAction, err := repositories.ActionRepository.FindLastActionWithVehicleId(action.VehicleId)
	if err != nil {
		return models.Action{}, fiber.ErrBadRequest, err
	}

	if action.Milage < lastAction.Milage {
		return models.Action{}, fiber.ErrBadRequest, errors.New("a quilometragem é menor do que a informada anteriormente")
	}

	uuid, err := uuid.Parse(id)
	if err != nil {
		return models.Action{}, fiber.ErrBadRequest, err
	}

	err = validate.Struct(action)
	if err != nil {
		return models.Action{}, fiber.ErrBadRequest, err
	}

	updatedAction, err := repositories.ActionRepository.Update(uuid, action)
	if err != nil {
		return models.Action{}, fiber.ErrInternalServerError, err
	}

	return updatedAction, nil, nil
}

func (a Action) Destroy(id string) (*fiber.Error, error) {
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

func NewActionService() Action {
	return Action{}
}
