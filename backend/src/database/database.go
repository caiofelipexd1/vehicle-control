package database

import (
	"log"

	"vehicles_control/environment"
	"vehicles_control/models"

	"github.com/go-redis/redis"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var (
	AppDB   *gorm.DB
	RClient *redis.Client
)

func init() {
	mariadb()
	redisdb()
}

func redisdb() {
	client := redis.NewClient(&redis.Options{
		Addr: environment.Env.Redis.Addr,
		DB:   0,
	})

	_, err := client.Ping().Result()
	if err != nil {
		panic(err)
	}

	RClient = client
	log.Println("database connection successfully opened with redis")
}

func mariadb() {
	if AppDB != nil {
		return
	}

	switch environment.Env.Database.Driver {
	case "mysql":
		db, err := gorm.Open(mysql.Open(environment.Env.Database.DSN), &gorm.Config{
			Logger: logger.Default.LogMode(logger.Silent),
		})
		if err != nil {
			panic("fail to connect on database.")
		}

		AppDB = db
		log.Println("database connection successfully opened with mariadb")
	default:
		panic("driver not found.")
	}

	AppDB.AutoMigrate(
		&models.AccountStatus{},
		&models.AccountType{},
		&models.Location{},
		&models.Collaborator{},
		&models.VehicleType{},
		&models.Vehicle{},
		&models.Account{},
		&models.Action{},
		&models.ActionOut{},
	)
	log.Println("database migrations successfully executed")
}
