package models

type Credentials struct {
	Username string `json:"username" validate:"required,min=4"`
	Password string `json:"password" validate:"required,min=4"`
}
