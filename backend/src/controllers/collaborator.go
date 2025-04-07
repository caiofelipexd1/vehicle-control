package controllers

import (
	"vehicles_control/models"
	"vehicles_control/services"

	"github.com/gofiber/fiber/v2"
)

type Collaborator struct{}

func (cl Collaborator) Index(c *fiber.Ctx) error {
	collaborators, err := services.CollaboratorService.Index()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"eror": err.Error()})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{"data": collaborators})
}

func (cl Collaborator) Show(c *fiber.Ctx) error {
	id := c.Params("id")

	collaborator, e, err := services.AccountService.Show(id)
	if err != nil {
		return c.Status(e.Code).JSON(fiber.Map{
			"error_message": e.Message,
			"error":         err,
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{"data": collaborator})
}

func (cl Collaborator) Store(c *fiber.Ctx) error {
	var data models.Collaborator
	c.BodyParser(&data)

	new, code, err := services.CollaboratorService.Store(data)
	if err != nil {
		return c.Status(code).JSON(fiber.Map{"error": err})
	}

	return c.Status(code).JSON(fiber.Map{"data": new})
}

func (cl Collaborator) Update(c *fiber.Ctx) error {
	id := c.Params("id")

	var data models.Collaborator
	c.BodyParser(&data)

	updated, err := services.CollaboratorService.Update(id, data)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{"data": updated})
}

func (cl Collaborator) Destroy(c *fiber.Ctx) error {
	id := c.Params("id")

	err := services.CollaboratorService.Destroy(id)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	return c.SendStatus(fiber.StatusNoContent)
}

func NewCollaboratorController() Collaborator {
	return Collaborator{}
}
