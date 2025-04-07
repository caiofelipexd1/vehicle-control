package controllers

import (
	"vehicles_control/models"
	"vehicles_control/services"

	"github.com/gofiber/fiber/v2"
)

type Vehicle struct{}

func (v Vehicle) Index(c *fiber.Ctx) error {
	vehicles, err := services.VehicleService.Index()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{"data": vehicles})
}

func (v Vehicle) Show(c *fiber.Ctx) error {
	id := c.Params("id")

	vehicle, err := services.VehicleService.Show(id)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{"data": vehicle})
}

func (v Vehicle) Store(c *fiber.Ctx) error {
	var data models.Vehicle
	c.BodyParser(&data)

	newVehicle, code, err := services.VehicleService.Store(data)
	if err != nil {
		return c.Status(code).JSON(fiber.Map{"error": err})
	}

	return c.Status(code).JSON(fiber.Map{"data": newVehicle})
}

func (v Vehicle) Update(c *fiber.Ctx) error {
	id := c.Params("id")

	var data models.Vehicle
	c.BodyParser(&data)

	updated, err := services.VehicleService.Update(id, data)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{"data": updated})
}

func (v Vehicle) Destroy(c *fiber.Ctx) error {
	id := c.Params("id")

	err := services.VehicleService.Destroy(id)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	return c.SendStatus(fiber.StatusNoContent)
}

func NewVehicleController() Vehicle {
	return Vehicle{}
}
