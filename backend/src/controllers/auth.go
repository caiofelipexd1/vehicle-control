package controllers

import (
	"net/http"

	"vehicles_control/models"
	"vehicles_control/services"

	"github.com/gofiber/fiber/v2"
	"golang.org/x/crypto/bcrypt"
)

type Auth struct{}

func (Auth) Authenticate(c *fiber.Ctx) error {
	var credentials models.Credentials

	err := c.BodyParser(&credentials)
	if err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": []string{err.Error()}})
	}

	account, e, err := services.AccountService.FindByUsername(credentials.Username)
	if err != nil {
		return c.Status(e.Code).JSON(fiber.Map{
			"error_message": "unable to authenticate, username or password is incorrect",
			"error":         err,
		})
	}

	err = bcrypt.CompareHashAndPassword([]byte(account.Password), []byte(credentials.Password))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "unable to authenticate, username or password is incorrect"})
	}

	token, err := services.TokenService.Authenticate(account)
	if err != nil {
		return c.Status(http.StatusUnauthorized).JSON(fiber.Map{"error": []string{err.Error()}})
	}

	return c.Status(http.StatusOK).JSON(fiber.Map{"user": account, "token": token})
}

func NewAuthController() Auth {
	return Auth{}
}
