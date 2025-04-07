package controllers

import (
	"vehicles_control/models"
	"vehicles_control/services"

	"github.com/gofiber/fiber/v2"
)

type Location struct{}

func (l Location) Index(c *fiber.Ctx) error {
	locations, err := services.LocationService.Index()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{"data": locations})
}

func (l Location) Show(c *fiber.Ctx) error {
	id := c.Params("id")

	location, err := services.LocationService.Show(id)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{"data": location})
}

func (l Location) Store(c *fiber.Ctx) error {
	var data models.Location
	c.BodyParser(&data)

	new, err := services.LocationService.Store(data)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{"data": new})
}

func (l Location) Update(c *fiber.Ctx) error {
	id := c.Params("id")

	var data models.Location
	c.BodyParser(&data)

	updated, err := services.LocationService.Update(id, data)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{"data": updated})
}

func (l Location) Destroy(c *fiber.Ctx) error {
	id := c.Params("id")

	err := services.LocationService.Destroy(id)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	return c.SendStatus(fiber.StatusNoContent)
}

func NewLocationController() Location {
	return Location{}
}
