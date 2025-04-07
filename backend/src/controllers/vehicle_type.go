package controllers

import (
	"vehicles_control/models"
	"vehicles_control/services"

	"github.com/gofiber/fiber/v2"
)

type VehicleType struct{}

func (vt VehicleType) Index(c *fiber.Ctx) error {
	vehiclesType, err := services.VehicleTypeService.Index()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{"data": vehiclesType})
}

func (vt VehicleType) Show(c *fiber.Ctx) error {
	id := c.Params("id")

	vehicleType, err := services.VehicleTypeService.Show(id)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{"data": vehicleType})
}

func (vt VehicleType) Store(c *fiber.Ctx) error {
	var data models.VehicleType
	c.BodyParser(&data)

	new, err := services.VehicleTypeService.Store(data)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{"data": new})
}

func (vt VehicleType) Update(c *fiber.Ctx) error {
	id := c.Params("id")

	var data models.VehicleType
	c.BodyParser(&data)

	updated, err := services.VehicleTypeService.Update(id, data)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{"data": updated})
}

func (vt VehicleType) Destroy(c *fiber.Ctx) error {
	id := c.Params("id")

	err := services.VehicleTypeService.Destroy(id)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	return c.SendStatus(fiber.StatusNoContent)
}

func NewVehicleTypeController() VehicleType {
	return VehicleType{}
}
