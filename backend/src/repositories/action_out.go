package repositories

import (
	"vehicles_control/models"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type ActionOut struct {
	db *gorm.DB
}

func (ao ActionOut) FindAll() ([]models.ActionOut, error) {
	var actions_out []models.ActionOut
	return actions_out, ao.db.Preload("Action").Preload("Collaborator").Find(&actions_out).Error
}

func (ao ActionOut) FindByActionId(id uuid.UUID) (models.ActionOut, error) {
	var action_out models.ActionOut
	return action_out, ao.db.Preload("Action").Preload("Collaborator").Where("action_id = ?", id).First(&action_out).Error
}

func (ao ActionOut) FindById(id uuid.UUID) (models.ActionOut, error) {
	var action_out models.ActionOut
	return action_out, ao.db.Preload("Action").Preload("Collaborator").First(&action_out, id).Error
}

func (ao ActionOut) Create(actionOut models.ActionOut) (models.ActionOut, error) {
	return actionOut, ao.db.Create(&actionOut).Error
}

func (ao ActionOut) Update(actionOut models.ActionOut) (models.ActionOut, error) {
	u := ao.db.Model(&models.ActionOut{}).Preload("Action").Preload("Collaborator").Where("id = ?", actionOut.Id).Updates(&actionOut)
	return actionOut, u.Error
}

func (ao ActionOut) Destroy(id uuid.UUID) error {
	return ao.db.Delete(models.ActionOut{}, id).Error
}

func NewActionOutRepository(db *gorm.DB) ActionOut {
	return ActionOut{db: db}
}
