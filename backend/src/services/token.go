package services

import (
	"errors"
	"time"

	"vehicles_control/environment"
	"vehicles_control/models"

	"github.com/dgrijalva/jwt-go"
)

type Token struct{}

func (tk Token) Authenticate(account models.Account) (string, error) {
	token, err := generate(account)
	if err != nil {
		return "", errors.New("failed to attempt to generate the authentication token")
	}

	return token, nil
}

func (tk Token) IsValid(_token string) (bool, error) {
	token, err := jwt.Parse(_token, func(token *jwt.Token) (interface{}, error) {
		return []byte(environment.Env.JwtSecret), nil
	})

	if _token == "null" {
		return false, errors.New("token not found")
	}

	if !token.Valid {
		if ve, ok := err.(*jwt.ValidationError); ok {
			if ve.Errors&jwt.ValidationErrorMalformed != 0 {
				return false, errors.New("that's not even a token")
			} else if ve.Errors&(jwt.ValidationErrorExpired|jwt.ValidationErrorNotValidYet) != 0 {
				// Token is either expired or not active yet
				return false, errors.New("token is either expired or not active yet")
			} else {
				return false, errors.New("couldn't handle this token")
			}
		} else {
			return false, errors.New("couldn't handle this token")
		}
	}
	return true, nil
}

func generate(account models.Account) (string, error) {
	atClaims := jwt.MapClaims{}
	atClaims["account"] = account
	atClaims["exp"] = time.Now().Add(time.Minute * 600).Unix()

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, atClaims)

	tk, err := token.SignedString([]byte(environment.Env.JwtSecret))
	if err != nil {
		return "", err
	}

	return tk, nil
}

func NewTokenService() Token {
	return Token{}
}
