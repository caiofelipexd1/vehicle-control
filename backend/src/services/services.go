package services

import (
	"github.com/go-playground/validator/v10"
)

var (
	validate             = validator.New()
	ActionService        = NewActionService()
	AccountStatusService = NewAccountStatusService()
	AccountTypeService   = NewAccountTypeService()
	AccountService       = NewAccountService()
	CollaboratorService  = NewCollaboratorService()
	LocationService      = NewLocationService()
	VehicleTypeService   = NewVehicleTypeService()
	VehicleService       = NewVehicleService()
	TokenService         = NewTokenService()
	ActionOutService     = NewActionOutService()
)
