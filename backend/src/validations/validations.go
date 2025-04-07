package validations

import (
	"fmt"
	"strings"

	"github.com/go-playground/validator/v10"
	"github.com/go-sql-driver/mysql"
)

type Validations struct{}

func (v Validations) GetErrors(err error) []string {
	var errors []string
	for _, err := range err.(validator.ValidationErrors) {
		switch err.Tag() {
		case "required":
			errors = append(errors, default_format(err.Field()))
			continue
		case "min":
			errors = append(errors, condition_format(err.Field(), "mínimo", err.Param()))
			continue
		case "max":
			errors = append(errors, condition_format(err.Field(), "máximo", err.Param()))
			continue
		}
	}
	return errors
}

func (v Validations) GetMySQLErrorCode(err error) uint16 {
	if driverErr, ok := err.(*mysql.MySQLError); ok {
		return driverErr.Number
	}
	return 0
}

func default_format(field string) string {
	return fmt.Sprintf("`%s` não pode ser nulo", strings.ToLower(field))
}

func condition_format(field, condition, value string) string {
	return fmt.Sprintf("`%s` deve ter valor %s (%s)", strings.ToLower(field), condition, value)
}

func NewValidationErrors() Validations {
	return Validations{}
}
