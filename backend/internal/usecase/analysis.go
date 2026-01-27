package usecase

import (
	"context"

	"fridge-chef-backend/internal/domain"
)

// AnalysisUsecase defines the interface for image analysis business logic
type AnalysisUsecase interface {
	AnalyzeImage(ctx context.Context, imageBase64 string) (*domain.AnalysisResult, error)
}

type analysisUsecase struct {
	aiRepo domain.AIRepository
}

// NewAnalysisUsecase creates a new analysis usecase
func NewAnalysisUsecase(aiRepo domain.AIRepository) AnalysisUsecase {
	return &analysisUsecase{aiRepo: aiRepo}
}

func (u *analysisUsecase) AnalyzeImage(ctx context.Context, imageBase64 string) (*domain.AnalysisResult, error) {
	// Use background context to prevent request cancellation from aborting Gemini API call
	return u.aiRepo.AnalyzeImage(context.Background(), imageBase64)
}
