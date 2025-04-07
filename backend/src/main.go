package main

import (
	"log"
	"strconv"

	"vehicles_control/environment"
	"vehicles_control/migrations"
	"vehicles_control/routes"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func main() {
	app := fiber.New()

	app.Use(logger.New())
	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
	}))

	routes.SetupRoutes(app)

	log.Fatal(app.Listen(":" + strconv.Itoa(environment.Env.Application.Port)))
}

func init() {
	migrations.Run()
}
