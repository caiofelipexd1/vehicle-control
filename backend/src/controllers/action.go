package controllers

import (
	"vehicles_control/models"
	"vehicles_control/services"

	"github.com/gofiber/fiber/v2"
)

type Action struct{}

func (a Action) Index(c *fiber.Ctx) error {
	q := c.Queries()

	if (q["status"] != "") && (q["status"] == "opened") {
		actions, e, err := services.ActionService.ShowOpened()
		if err != nil {
			return c.Status(e.Code).JSON(fiber.Map{
				"error":         e.Message,
				"error_message": err.Error(),
			})
		} else {
			return c.Status(fiber.StatusOK).JSON(actions)
		}
	} else if (q["status"] != "") && (q["status"] == "withoutOut") {
		actions, e, err := services.ActionService.ShowOnlyNoHaveActionOut()
		if err != nil {
			return c.Status(e.Code).JSON(fiber.Map{
				"error":         e.Message,
				"error_message": err.Error(),
			})
		} else {
			return c.Status(fiber.StatusOK).JSON(actions)
		}
	} else {
		actions, e, err := services.ActionService.Index()
		if err != nil {
			return c.Status(e.Code).JSON(fiber.Map{
				"error":         e.Message,
				"error_message": err.Error(),
			})
		} else {
			return c.Status(fiber.StatusOK).JSON(actions)
		}
	}
}

func (a Action) Show(c *fiber.Ctx) error {
	id := c.Params("id")

	action, e, err := services.ActionService.Show(id)
	if err != nil {
		return c.Status(e.Code).JSON(fiber.Map{
			"error":         e.Message,
			"error_message": err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{"data": action})
}

func (a Action) Store(c *fiber.Ctx) error {
	var data models.Action
	err := c.BodyParser(&data)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error":         fiber.ErrBadRequest.Message,
			"error_message": err.Error(),
		})
	}

	new, e, err := services.ActionService.Store(data)
	if err != nil {
		return c.Status(e.Code).JSON(fiber.Map{
			"error":         e.Message,
			"error_message": err.Error(),
		})
	}

	return c.Status(fiber.StatusCreated).JSON(new)
}

func (a Action) Update(c *fiber.Ctx) error {
	id := c.Params("id")

	var action models.Action
	err := c.BodyParser(&action)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error":         fiber.ErrBadRequest.Message,
			"error_message": err.Error(),
		})
	}

	updated, e, err := services.ActionService.Update(id, action)
	if err != nil {
		return c.Status(e.Code).JSON(fiber.Map{
			"error":         e.Message,
			"error_message": err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(updated)
}

func (a Action) Destroy(c *fiber.Ctx) error {
	id := c.Params("id")

	e, err := services.ActionService.Destroy(id)
	if err != nil {
		return c.Status(e.Code).JSON(fiber.Map{
			"error":         e.Message,
			"error_message": err.Error(),
		})
	}

	return c.SendStatus(fiber.StatusNoContent)
}

func NewActionController() Action {
	return Action{}
}
