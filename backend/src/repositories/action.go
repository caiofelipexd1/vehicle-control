package repositories

import (
	"vehicles_control/models"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Action struct {
	db *gorm.DB
}

func (a Action) FindAll() ([]models.Action, error) {
	var actions []models.Action
	return actions, a.db.Order("created_at desc").Preload("ActionOut").Preload("Account").Preload("Collaborator").Preload("Vehicle").Preload("Location").Find(&actions).Error
}

func (a Action) FindOpened() ([]models.Action, error) {
	var actions []models.Action
	return actions, a.db.Raw(`SELECT a.*, v.name as vehicle_name, c.name as collaborator_name, v.license_plate as vehicle_license_plate FROM action a 
	INNER JOIN vehicle v ON a.vehicle_id = v.id
	INNER JOIN collaborator c ON a.collaborator_id = c.id 
	LEFT JOIN action_out ao ON a.id = ao.action_id WHERE ao.action_id IS NULL`).Scan(&actions).Error
}

func (a Action) FindOnlyNoHaveActionOut() ([]models.Action, error) {
	var actions []models.Action
	return actions, a.db.Model(&models.Action{}).Where("has_action_out = ?", false).Preload("Account").Preload("Collaborator").Preload("Vehicle").Preload("Location").Find(&actions).Error
}

func (a Action) FindById(id uuid.UUID) (models.Action, error) {
	var action models.Action
	return action, a.db.Preload("Account").Preload("Collaborator").Preload("Vehicle").Preload("ActionType").Preload("Location").First(&action, id).Error
}

func (a Action) FindSimpleById(id uuid.UUID) (models.Action, error) {
	var action models.Action
	return action, a.db.First(&action, id).Error
}

func (a Action) FindLastActionWithVehicleId(id uuid.UUID) (models.Action, error) {
	var action models.Action
	return action, a.db.Model(&models.Action{}).Where("vehicle_id = ?", id).Order("created_at desc").First(&action).Error
}

func (a Action) Store(action models.Action) (models.Action, error) {
	return action, a.db.Create(&action).Error
}

func (a Action) Update(id uuid.UUID, action models.Action) (models.Action, error) {
	u := a.db.Model(&models.Action{}).Preload("Account").Preload("Collaborator").Preload("Vehicle").Preload("ActionType").Preload("Location").Where("id = ?", id).Updates(&action)
	return action, u.Error
}

func (a Action) Destroy(id uuid.UUID) error {
	return a.db.Delete(&models.Action{}, id).Error
}

func NewActionRepository(db *gorm.DB) Action {
	return Action{db: db}
}
