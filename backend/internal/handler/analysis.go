package handler

import (
	"log"

	"fridge-chef-backend/internal/usecase"

	"github.com/gofiber/fiber/v2"
)

type AnalysisHandler struct {
	analysisUsecase usecase.AnalysisUsecase
}

// NewAnalysisHandler creates a new analysis handler
func NewAnalysisHandler(au usecase.AnalysisUsecase) *AnalysisHandler {
	return &AnalysisHandler{analysisUsecase: au}
}

// Analyze handles POST /api/analyze
func (h *AnalysisHandler) Analyze(c *fiber.Ctx) error {
	var req AnalyzeRequest
	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(AnalyzeResponse{
			Success: false,
			Error:   "Invalid request body",
		})
	}

	if req.Image == "" {
		return c.Status(fiber.StatusBadRequest).JSON(AnalyzeResponse{
			Success: false,
			Error:   "Image is required",
		})
	}

	result, err := h.analysisUsecase.AnalyzeImage(c.Context(), req.Image)
	if err != nil {
		log.Printf("❌ Analysis error: %v", err)
		return c.Status(fiber.StatusInternalServerError).JSON(AnalyzeResponse{
			Success: false,
			Error:   "Failed to analyze image: " + err.Error(),
		})
	}

	log.Printf("✅ Analysis successful: found %d ingredients, %d recipes", 
		len(result.IngredientsDetected), len(result.Recipes))
	
	return c.JSON(AnalyzeResponse{
		Success: true,
		Data:    result,
	})
}

