package repositories

import "vehicles_control/database"

var (
	AccountStatusRepository = NewAccountStatusRepository(database.AppDB)
	AccountTypeRepository   = NewAccountTypeRepository(database.AppDB)
	LocationRepository      = NewLocationRepository(database.AppDB)
	CollaboratorRepository  = NewCollaboratorRepository(database.AppDB)
	VehicleTypeRepository   = NewVehicleTypeRepository(database.AppDB)
	VehicleRepository       = NewVehicleRepository(database.AppDB)
	AccountRepository       = NewAccountRepository(database.AppDB)
	ActionRepository        = NewActionRepository(database.AppDB)
	ActionOutRepository     = NewActionOutRepository(database.AppDB)
)
