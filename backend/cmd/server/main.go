package main

import (
	"log"

	"fridge-chef-backend/internal/config"
	"fridge-chef-backend/internal/handler"
	"fridge-chef-backend/internal/repository"
	"fridge-chef-backend/internal/usecase"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	// Load configuration
	cfg, err := config.Load()
	if err != nil {
		log.Fatalf("Failed to load config: %v", err)
	}

	if cfg.GeminiAPIKey == "" {
		log.Fatal("GEMINI_API_KEY environment variable is required")
	}

	// Initialize dependencies (Dependency Injection)
	aiRepo := repository.NewGeminiRepository(cfg.GeminiAPIKey)
	analysisUsecase := usecase.NewAnalysisUsecase(aiRepo)
	analysisHandler := handler.NewAnalysisHandler(analysisUsecase)

	// Create Fiber app
	app := fiber.New(fiber.Config{
		AppName:      "Fridge Chef API",
		BodyLimit:    50 * 1024 * 1024, // 50MB for image uploads
		ErrorHandler: customErrorHandler,
	})

	// Enable CORS
	app.Use(cors.New())

	// Setup routes
	handler.SetupRoutes(app, analysisHandler)

	// Start server
	log.Printf("🍳 Fridge Chef API starting on port %s", cfg.Port)
	if err := app.Listen(":" + cfg.Port); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}

func customErrorHandler(c *fiber.Ctx, err error) error {
	return c.Status(fiber.StatusInternalServerError).JSON(handler.AnalyzeResponse{
		Success: false,
		Error:   err.Error(),
	})
}
