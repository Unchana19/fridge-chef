package repository

import (
	"context"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"strings"

	"fridge-chef-backend/internal/domain"

	"github.com/google/generative-ai-go/genai"
	"google.golang.org/api/option"
)

type geminiRepository struct {
	apiKey string
}

// NewGeminiRepository creates a new Gemini AI repository
func NewGeminiRepository(apiKey string) domain.AIRepository {
	return &geminiRepository{apiKey: apiKey}
}

func (r *geminiRepository) AnalyzeImage(ctx context.Context, imageBase64 string) (*domain.AnalysisResult, error) {
	client, err := genai.NewClient(ctx, option.WithAPIKey(r.apiKey))
	if err != nil {
		return nil, fmt.Errorf("failed to create Gemini client: %w", err)
	}
	defer client.Close()

	model := client.GenerativeModel("gemini-2.0-flash")
	model.SetTemperature(0.4)
	model.ResponseMIMEType = "application/json"

	// Parse base64 image
	imageData, mimeType, err := parseBase64Image(imageBase64)
	if err != nil {
		return nil, fmt.Errorf("failed to parse image: %w", err)
	}

	prompt := `Analyze this image of fridge contents and identify all visible food ingredients.
Then suggest 2-3 recipes that can be made with these ingredients.

Respond in this exact JSON format:
{
  "ingredients_detected": ["ingredient1", "ingredient2", ...],
  "recipes": [
    {
      "title": "Recipe Name",
      "description": "Brief description of the dish",
      "ingredients_needed": ["ingredient1", "ingredient2", ...],
      "instructions": ["Step 1", "Step 2", ...],
      "cooking_time": "30 mins",
      "difficulty": "Easy"
    }
  ],
  "shopping_list_suggestions": ["item1", "item2", ...]
}

The shopping_list_suggestions should contain common ingredients that would complement the detected ingredients but are not visible in the image.`

	resp, err := model.GenerateContent(ctx,
		genai.ImageData(mimeType, imageData),
		genai.Text(prompt),
	)
	if err != nil {
		return nil, fmt.Errorf("failed to generate content: %w", err)
	}

	if len(resp.Candidates) == 0 || len(resp.Candidates[0].Content.Parts) == 0 {
		return nil, fmt.Errorf("no response from Gemini")
	}

	// Extract text response
	textPart, ok := resp.Candidates[0].Content.Parts[0].(genai.Text)
	if !ok {
		return nil, fmt.Errorf("unexpected response type from Gemini")
	}

	// Parse JSON response
	var result domain.AnalysisResult
	if err := json.Unmarshal([]byte(textPart), &result); err != nil {
		return nil, fmt.Errorf("failed to parse Gemini response: %w", err)
	}

	return &result, nil
}

func parseBase64Image(dataURL string) ([]byte, string, error) {
	// Handle data URL format: data:image/jpeg;base64,/9j/4AAQ...
	if strings.HasPrefix(dataURL, "data:") {
		parts := strings.SplitN(dataURL, ",", 2)
		if len(parts) != 2 {
			return nil, "", fmt.Errorf("invalid data URL format")
		}

		// Extract MIME type
		metaParts := strings.SplitN(parts[0], ";", 2)
		mimeType := strings.TrimPrefix(metaParts[0], "data:")

		// Decode base64
		data, err := base64.StdEncoding.DecodeString(parts[1])
		if err != nil {
			return nil, "", fmt.Errorf("failed to decode base64: %w", err)
		}

		return data, mimeType, nil
	}

	// Plain base64 without data URL prefix
	data, err := base64.StdEncoding.DecodeString(dataURL)
	if err != nil {
		return nil, "", fmt.Errorf("failed to decode base64: %w", err)
	}

	return data, "image/jpeg", nil
}
