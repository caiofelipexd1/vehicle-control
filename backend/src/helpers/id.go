package helpers

import (
	"strconv"

	"github.com/google/uuid"
)

type IdValidations struct{}

func (iv IdValidations) ValidateUint64(id string) (uint64, error) {
	parse, err := strconv.ParseUint(id, 10, 64)
	if err != nil {
		return 0, err
	}

	return parse, nil
}

func (iv IdValidations) ValidateUUIDV4(id string) (uuid.UUID, error) {
	v4, err := uuid.Parse(id)
	if err != nil {
		invalidv4, _ := uuid.NewRandom()
		return invalidv4, err
	}

	return v4, nil
}

func NewHelperIdValidation() IdValidations {
	return IdValidations{}
}
