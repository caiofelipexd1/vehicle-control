package models

type AccountStatus struct {
	IdModel
	Name string `json:"name" validate:"min=4,max=50" gorm:"unique"`
}

func (as AccountStatus) TableName() string {
	return "account_status"
}
