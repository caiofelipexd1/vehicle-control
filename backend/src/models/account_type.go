package models

type AccountType struct {
	IdModel
	Name string `json:"name" validate:"min=4,max=50" gorm:"unique"`
}

func (at AccountType) TableName() string {
	return "account_type"
}
