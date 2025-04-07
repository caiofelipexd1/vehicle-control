package models

type Location struct {
	IdModel
	Name string `json:"name" validate:"min=4,max=50" gorm:"unique"`
}

func (l Location) TableName() string {
	return "location"
}
