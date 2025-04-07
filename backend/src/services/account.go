package services

import (
	"vehicles_control/models"
	"vehicles_control/repositories"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
)

type Account struct{}

func (a Account) Index() ([]models.Account, *fiber.Error, error) {
	accounts, err := repositories.AccountRepository.FindAll()
	if err != nil {
		return []models.Account{}, fiber.ErrInternalServerError, err
	}

	return accounts, nil, nil
}

func (a Account) FindByUsername(username string) (models.Account, *fiber.Error, error) {
	account, err := repositories.AccountRepository.FindByUsername(username)
	if err != nil {
		return models.Account{}, fiber.ErrInternalServerError, err
	}

	return account, nil, nil
}

func (a Account) Show(id string) (models.Account, *fiber.Error, error) {
	uuid, err := uuid.Parse(id)
	if err != nil {
		return models.Account{}, fiber.ErrBadRequest, err
	}

	account, err := repositories.AccountRepository.FindById(uuid)
	if err != nil {
		return models.Account{}, fiber.ErrInternalServerError, err
	}

	return account, nil, nil
}

func (a Account) Store(account models.Account) (models.Account, *fiber.Error, error) {
	err := validate.Struct(account)
	if err != nil {
		return models.Account{}, fiber.ErrBadRequest, err
	}

	newAccount, err := repositories.AccountRepository.Store(account)
	if err != nil {
		return models.Account{}, fiber.ErrInternalServerError, err
	}

	return newAccount, nil, nil
}

func (a Account) Update(id string, account models.Account) (models.Account, *fiber.Error, error) {
	uuid, err := uuid.Parse(id)
	if err != nil {
		return models.Account{}, fiber.ErrBadRequest, err
	}

	err = validate.Struct(account)
	if err != nil {
		return models.Account{}, fiber.ErrBadRequest, err
	}

	reseted_pass := "12345"
	pass, err := bcrypt.GenerateFromPassword([]byte(reseted_pass), bcrypt.DefaultCost)
	if err != nil {
		return models.Account{}, fiber.ErrInternalServerError, err
	}

	account.Password = string(pass)

	updatedAccount, err := repositories.AccountRepository.Update(uuid, account)
	if err != nil {
		return models.Account{}, fiber.ErrInternalServerError, err
	}

	return updatedAccount, nil, nil
}

func (a Account) UpdatePassword(id, new_password string) (models.Account, *fiber.Error, error) {
	uuid, err := uuid.Parse(id)
	if err != nil {
		return models.Account{}, fiber.ErrBadRequest, err
	}

	account, err := repositories.AccountRepository.FindById(uuid)
	if err != nil {
		return models.Account{}, fiber.ErrInternalServerError, err
	}

	pass, err := bcrypt.GenerateFromPassword([]byte(new_password), bcrypt.DefaultCost)
	if err != nil {
		return models.Account{}, fiber.ErrInternalServerError, err
	}

	account.Password = string(pass)
	account.AccountStatusId = 1

	updated_account, err := repositories.AccountRepository.Update(uuid, account)
	if err != nil {
		return models.Account{}, fiber.ErrInternalServerError, err
	}

	return updated_account, nil, nil
}

func (a Account) Destroy(id string) (*fiber.Error, error) {
	uuid, err := uuid.Parse(id)
	if err != nil {
		return fiber.ErrBadRequest, err
	}

	err = repositories.AccountRepository.Destroy(uuid)
	if err != nil {
		return fiber.ErrInternalServerError, err
	}

	return nil, nil
}

func NewAccountService() Account {
	return Account{}
}
