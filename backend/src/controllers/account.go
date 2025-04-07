package controllers

import (
	"vehicles_control/models"
	"vehicles_control/services"

	"github.com/gofiber/fiber/v2"
)

type Account struct{}

func (a Account) Index(c *fiber.Ctx) error {
	accounts, e, err := services.AccountService.Index()
	if err != nil {
		return c.Status(e.Code).JSON(fiber.Map{
			"error":         e.Message,
			"error_message": err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(accounts)
}

func (a Account) Show(c *fiber.Ctx) error {
	id := c.Params("id")

	account, e, err := services.AccountService.Show(id)
	if err != nil {
		return c.Status(e.Code).JSON(fiber.Map{
			"error":         e.Message,
			"error_message": err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(account)
}

func (a Account) Store(c *fiber.Ctx) error {
	var account models.Account
	err := c.BodyParser(&account)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error":         fiber.ErrInternalServerError.Message,
			"error_message": err.Error(),
		})
	}

	newAccount, e, err := services.AccountService.Store(account)
	if err != nil {
		return c.Status(e.Code).JSON(fiber.Map{
			"error":         e.Message,
			"error_message": err.Error(),
		})
	}

	return c.Status(fiber.StatusCreated).JSON(newAccount)
}

func (a Account) Update(c *fiber.Ctx) error {
	id := c.Params("id")

	var account models.Account
	err := c.BodyParser(&account)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error":         fiber.ErrInternalServerError.Message,
			"error_message": err.Error(),
		})
	}

	updatedAccount, e, err := services.AccountService.Update(id, account)
	if err != nil {
		return c.Status(e.Code).JSON(fiber.Map{
			"error":         e.Message,
			"error_message": err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(updatedAccount)
}

func (a Account) UpdatePassword(c *fiber.Ctx) error {
	id := c.Params("account_id")

	type Pass struct {
		Password string `json:"password"`
	}
	var data Pass

	err := c.BodyParser(&data)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error":         fiber.ErrInternalServerError.Message,
			"error_message": err.Error(),
		})
	}

	account, e, err := services.AccountService.UpdatePassword(id, data.Password)
	if err != nil {
		return c.Status(e.Code).JSON(fiber.Map{
			"error":         e.Message,
			"error_message": err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(account)
}

func (a Account) Destroy(c *fiber.Ctx) error {
	id := c.Params("id")

	e, err := services.AccountService.Destroy(id)
	if err != nil {
		return c.Status(e.Code).JSON(fiber.Map{
			"error":         e.Message,
			"error_message": err.Error(),
		})
	}

	return c.SendStatus(fiber.StatusNoContent)
}

func NewAccountController() Account {
	return Account{}
}
