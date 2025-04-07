package controllers

import (
	"vehicles_control/models"
	"vehicles_control/services"

	"github.com/gofiber/fiber/v2"
)

type ActionOut struct{}

func (ao ActionOut) FindAll(c *fiber.Ctx) error {
	actionsOut, e, err := services.ActionOutService.FindAll()
	if err != nil {
		return c.Status(e.Code).JSON(fiber.Map{
			"error":         e.Message,
			"error_message": err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(actionsOut)
}

func (ao ActionOut) FindById(c *fiber.Ctx) error {
	id := c.Params("id")

	actionOut, e, err := services.ActionOutService.FindBydId(id)
	if err != nil {
		return c.Status(e.Code).JSON(fiber.Map{
			"error":         e.Message,
			"error_message": err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(actionOut)
}

func (ao ActionOut) Create(c *fiber.Ctx) error {
	var actionOut models.ActionOut

	err := c.BodyParser(&actionOut)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error":         fiber.ErrInternalServerError.Message,
			"error_message": err.Error(),
		})
	}

	newActionOut, e, err := services.ActionOutService.Store(actionOut)
	if err != nil {
		return c.Status(e.Code).JSON(fiber.Map{
			"error":         e.Message,
			"error_message": err.Error(),
		})
	}

	return c.Status(fiber.StatusCreated).JSON(newActionOut)
}

func (ao ActionOut) Update(c *fiber.Ctx) error {
	var actionOut models.ActionOut

	id := c.Params("id")
	err := c.BodyParser(&actionOut)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error":         fiber.ErrInternalServerError.Message,
			"error_message": err.Error(),
		})
	}

	updatedActionOut, e, err := services.ActionOutService.Update(id, actionOut)
	if err != nil {
		return c.Status(e.Code).JSON(fiber.Map{
			"error":         e.Message,
			"error_message": err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(updatedActionOut)
}

func (ao ActionOut) Destroy(c *fiber.Ctx) error {
	id := c.Params("id")

	e, err := services.ActionOutService.Destroy(id)
	if err != nil {
		return c.Status(e.Code).JSON(fiber.Map{
			"error":         e.Message,
			"error_message": err.Error(),
		})
	}

	return c.SendStatus(e.Code)
}

func NewActionOutController() ActionOut {
	return ActionOut{}
}
