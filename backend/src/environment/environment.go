package environment

import (
	"log"
	"os"

	"gopkg.in/yaml.v3"
)

var Env = environment{}

type application struct {
	Port int `yaml:"port"`
}

type database struct {
	DSN    string `yaml:"dsn"`
	Driver string `yaml:"driver"`
}

type redisdb struct {
	Addr             string `yaml:"addr"`
	Password         string `yaml:"password"`
	RequestPerMinute int    `yaml:"requests_per_minute"`
}

type environment struct {
	Application application `yaml:"application"`
	Database  database `yaml:"database"`
	Redis     redisdb  `yaml:"redis"`
	JwtSecret string   `yaml:"jwt_secret"`
}

func init() {
	env, err := os.ReadFile("env.yml")
	if err != nil {
		log.Fatal(err)
	}

	err = yaml.Unmarshal(env, &Env)
	if err != nil {
		log.Fatalf("failed to unmarshal %v", err)
	}
}
