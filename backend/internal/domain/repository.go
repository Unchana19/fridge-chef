package domain

import "context"

// AIRepository defines the interface for AI-powered image analysis
type AIRepository interface {
	AnalyzeImage(ctx context.Context, imageBase64 string) (*AnalysisResult, error)
}
