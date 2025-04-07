package migrations

import (
	"log"

	"vehicles_control/database"
	"vehicles_control/models"
)

type Migrations struct{}

func Run() {
	accountStatus()
	accountType()
	vehicleType()
	location()
	defaultAccounts()
}

func accountStatus() {
	as := []models.AccountStatus{
		{Name: "Ativa"},
		{Name: "Resetada"},
		{Name: "Bloqueada"},
	}

	q := database.AppDB.Save(&as)
	if q.Error != nil {
		log.Println(q.Error)
		panic("failed to run migration Account Status")
	}
}

func accountType() {
	at := []models.AccountType{
		{Name: "Administrador"},
		{Name: "Colaborador / Terceiros"},
	}

	q := database.AppDB.Save(&at)
	if q.Error != nil {
		log.Println(q.Error)
		panic("failed to run migration Account Type")
	}
}

func vehicleType() {
	vt := []models.VehicleType{
		{Name: "Moto"},
		{Name: "Carro"},
		{Name: "Ônibus"},
		{Name: "Caminhão"},
	}

	q := database.AppDB.Save(&vt)
	if q.Error != nil {
		log.Println(q.Error)
		panic("failed to run migration Vehicle Type")
	}
}

func location() {
	lc := []models.Location{
		{Name: "Brasil"},
	}

	q := database.AppDB.Save(&lc)
	if q.Error != nil {
		log.Println(q.Error)
		panic("failed to run migration Location")
	}
}

func defaultAccounts() {
	acc := []models.Account{
		{Name: "Administrador", Username: "admin", Password: "admin", AccountStatusId: 1, AccountTypeId: 1, LocationId: 1},
		{Name: "Usuário", Username: "user", Password: "user", AccountStatusId: 1, AccountTypeId: 2, LocationId: 1},
	}

	q := database.AppDB.Save(&acc)
	if q.Error != nil {
		log.Println(q.Error)
		panic("failed to run migration for Accounts")
	}
}
