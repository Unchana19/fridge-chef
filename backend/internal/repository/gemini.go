package repository

import (
	"context"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"strings"

	"fridge-chef-backend/internal/domain"

	"google.golang.org/genai"
)

type geminiRepository struct {
	apiKey string
}

// NewGeminiRepository creates a new Gemini AI repository
func NewGeminiRepository(apiKey string) domain.AIRepository {
	return &geminiRepository{apiKey: apiKey}
}

func (r *geminiRepository) AnalyzeImage(ctx context.Context, imageBase64 string) (*domain.AnalysisResult, error) {
	client, err := genai.NewClient(ctx, &genai.ClientConfig{APIKey: r.apiKey})
	if err != nil {
		return nil, fmt.Errorf("failed to create Gemini client: %w", err)
	}

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

	resp, err := client.Models.GenerateContent(ctx, "gemini-3-flash-preview", []*genai.Content{
		{
			Parts: []*genai.Part{
				{Text: prompt},
				{
					InlineData: &genai.Blob{
						Data:     imageData,
						MIMEType: mimeType,
					},
				},
			},
		},
	}, nil)
	if err != nil {
		return nil, fmt.Errorf("failed to generate content: %w", err)
	}

	text := resp.Text()
	if text == "" {
		return nil, fmt.Errorf("empty response from Gemini")
	}

	// Parse JSON response
	var result domain.AnalysisResult
	if err := json.Unmarshal([]byte(text), &result); err != nil {
		// Try to clean up markdown code blocks if present
		cleanedText := strings.TrimPrefix(text, "```json")
		cleanedText = strings.TrimPrefix(cleanedText, "```")
		cleanedText = strings.TrimSuffix(cleanedText, "```")
		if err := json.Unmarshal([]byte(cleanedText), &result); err != nil {
			return nil, fmt.Errorf("failed to parse Gemini response: %w", err)
		}
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
		// Fix double image prefix if present (e.g. image/image/png)
		if strings.HasPrefix(mimeType, "image/image/") {
			mimeType = strings.TrimPrefix(mimeType, "image/")
		}

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
