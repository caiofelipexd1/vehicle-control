package routes

import (
	"vehicles_control/controllers"

	"github.com/gofiber/fiber/v2"
)

func SetupRoutes(app *fiber.App) {
	api := app.Group("/api/v1")

	// api.Use(middlewares.RequestMiddleware.RequestValidate)

	api.Post("/auth", controllers.AuthController.Authenticate)
	api.Post("/reset_password/:account_id", controllers.AccountController.UpdatePassword)

	// app.Use(middlewares.TokenMiddlware.Validate)

	account_status := api.Group("/account_status")
	account_status.Get("/", controllers.AccountStatusController.Index)
	account_status.Get("/:id", controllers.AccountStatusController.Show)
	account_status.Post("/", controllers.AccountStatusController.Store)
	account_status.Put("/:id", controllers.AccountStatusController.Update)
	account_status.Delete("/:id", controllers.AccountStatusController.Destroy)

	action_out := api.Group("/action_out")
	action_out.Get("/", controllers.ActionOutController.FindAll)
	action_out.Get("/:id", controllers.ActionOutController.FindById)
	action_out.Post("/", controllers.ActionOutController.Create)
	action_out.Put("/:id", controllers.ActionOutController.Update)
	action_out.Delete("/:id", controllers.ActionController.Destroy)

	account_type := api.Group("/account_types")
	account_type.Get("/", controllers.AccountTypeController.Index)
	account_type.Get("/:id", controllers.AccountTypeController.Show)
	account_type.Post("/", controllers.AccountTypeController.Store)
	account_type.Put("/:id", controllers.AccountTypeController.Update)
	account_type.Delete("/:id", controllers.AccountTypeController.Destroy)

	account := api.Group("/accounts")
	account.Get("/", controllers.AccountController.Index)
	account.Get("/:id", controllers.AccountController.Show)
	account.Post("/", controllers.AccountController.Store)
	account.Put("/:id", controllers.AccountController.Update)
	account.Delete("/:id", controllers.AccountController.Destroy)

	collaborator := api.Group("/collaborators")
	collaborator.Get("/", controllers.CollaboratorController.Index)
	collaborator.Get("/:id", controllers.CollaboratorController.Show)
	collaborator.Post("/", controllers.CollaboratorController.Store)
	collaborator.Put("/:id", controllers.CollaboratorController.Update)
	collaborator.Delete("/:id", controllers.CollaboratorController.Destroy)

	location := api.Group("/locations")
	location.Get("/", controllers.LocationController.Index)
	location.Get("/:id", controllers.LocationController.Show)
	location.Post("/", controllers.LocationController.Store)
	location.Put("/:id", controllers.LocationController.Update)
	location.Delete("/:id", controllers.LocationController.Destroy)

	action := api.Group("/actions")
	action.Get("/", controllers.ActionController.Index)
	action.Get("/:id", controllers.ActionController.Show)
	action.Post("/", controllers.ActionController.Store)
	action.Put("/:id", controllers.ActionController.Update)
	action.Delete("/:id", controllers.ActionController.Destroy)

	vehicle := api.Group("/vehicles")
	vehicle.Get("/", controllers.VehicleController.Index)
	vehicle.Get("/:id", controllers.VehicleController.Show)
	vehicle.Post("/", controllers.VehicleController.Store)
	vehicle.Put("/:id", controllers.VehicleController.Update)
	vehicle.Delete("/:id", controllers.VehicleController.Destroy)

	vehicle_type := api.Group("/vehicle_types")
	vehicle_type.Get("/", controllers.VehicleTypeController.Index)
	vehicle_type.Get("/:id", controllers.VehicleTypeController.Show)
	vehicle_type.Post("/", controllers.VehicleTypeController.Store)
	vehicle_type.Put("/:id", controllers.VehicleTypeController.Update)
	vehicle_type.Delete("/:id", controllers.VehicleTypeController.Destroy)
}
