package controllers

import (
	"vehicles_control/models"
	"vehicles_control/services"

	"github.com/gofiber/fiber/v2"
)

type AccountStatus struct{}

func (as AccountStatus) Index(c *fiber.Ctx) error {
	accsStatus, err := services.AccountStatusService.Index()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": []string{err.Error()}})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{"data": accsStatus})
}

func (as AccountStatus) Show(c *fiber.Ctx) error {
	id := c.Params("id")
	accountStatus, err := services.AccountStatusService.Show(id)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{"data": accountStatus})
}

func (as AccountStatus) Store(c *fiber.Ctx) error {
	var accountStatus models.AccountStatus
	c.BodyParser(&accountStatus)

	new, err := services.AccountStatusService.Store(accountStatus)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{"data": new})
}

func (as AccountStatus) Update(c *fiber.Ctx) error {
	id := c.Params("id")

	var accountStatus models.AccountStatus
	c.BodyParser(&accountStatus)

	updated, err := services.AccountStatusService.Update(id, accountStatus)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{"data": updated})
}

func (as AccountStatus) Destroy(c *fiber.Ctx) error {
	id := c.Params("id")

	err := services.AccountStatusService.Destory(id)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	return c.SendStatus(fiber.StatusNoContent)
}

func NewAccountStatusController() AccountStatus {
	return AccountStatus{}
}
