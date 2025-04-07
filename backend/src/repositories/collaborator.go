package repositories

import (
	"vehicles_control/models"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Collaborator struct {
	db *gorm.DB
}

func (c Collaborator) FindAll() ([]models.Collaborator, error) {
	var collaborators []models.Collaborator
	return collaborators, c.db.Find(&collaborators).Error
}

func (c Collaborator) FindById(id uuid.UUID) (models.Collaborator, error) {
	var collaborator models.Collaborator
	return collaborator, c.db.First(&collaborator, id).Error
}

func (c Collaborator) Store(collaborator models.Collaborator) (models.Collaborator, error) {
	return collaborator, c.db.Create(&collaborator).Error
}

func (c Collaborator) Update(id uuid.UUID, collaborator models.Collaborator) (models.Collaborator, error) {
	u := c.db.Model(&models.Collaborator{}).Where("id = ?", id).Updates(&collaborator)
	return collaborator, u.Error
}

func (c Collaborator) Destroy(id uuid.UUID) error {
	return c.db.Delete(&models.Collaborator{}, id).Error
}

func NewCollaboratorRepository(db *gorm.DB) Collaborator {
	return Collaborator{db: db}
}
