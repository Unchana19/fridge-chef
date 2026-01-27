package handler

import "fridge-chef-backend/internal/domain"

// AnalyzeRequest represents the request body for image analysis
type AnalyzeRequest struct {
	Image string `json:"image"` // base64 encoded image
}

// AnalyzeResponse represents the response for image analysis
type AnalyzeResponse struct {
	Success bool                   `json:"success"`
	Data    *domain.AnalysisResult `json:"data,omitempty"`
	Error   string                 `json:"error,omitempty"`
}
