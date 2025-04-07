package controllers

import (
	"vehicles_control/models"
	"vehicles_control/services"

	"github.com/gofiber/fiber/v2"
)

type AccountType struct{}

func (at AccountType) Index(c *fiber.Ctx) error {
	acctypes, err := services.AccountTypeService.Index()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{"data": acctypes})
}

func (at AccountType) Show(c *fiber.Ctx) error {
	id := c.Params("id")

	acctype, err := services.AccountTypeService.Show(id)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{"data": acctype})
}

func (at AccountType) Store(c *fiber.Ctx) error {
	var data models.AccountType
	c.BodyParser(&data)

	new, err := services.AccountTypeService.Store(data)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{"data": new})
}

func (at AccountType) Update(c *fiber.Ctx) error {
	id := c.Params("id")

	var data models.AccountType
	c.BodyParser(&data)

	updated, err := services.AccountTypeService.Update(id, data)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{"data": updated})
}

func (at AccountType) Destroy(c *fiber.Ctx) error {
	id := c.Params("id")

	err := services.AccountTypeService.Destroy(id)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	return c.SendStatus(fiber.StatusNoContent)
}

func NewAccountTypeController() AccountType {
	return AccountType{}
}
