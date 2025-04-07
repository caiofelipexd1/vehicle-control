package models

type ActionType struct {
	IdModel
	Name string `json:"name"`
}

func (at ActionType) TableName() string {
	return "action_type"
}
