package domain

// Recipe represents a suggested recipe
type Recipe struct {
	Title             string   `json:"title"`
	Description       string   `json:"description"`
	IngredientsNeeded []string `json:"ingredients_needed"`
	Instructions      []string `json:"instructions"`
	CookingTime       string   `json:"cooking_time"`
	Difficulty        string   `json:"difficulty"`
}

// AnalysisResult represents the result of analyzing a fridge image
type AnalysisResult struct {
	IngredientsDetected     []string `json:"ingredients_detected"`
	Recipes                 []Recipe `json:"recipes"`
	ShoppingListSuggestions []string `json:"shopping_list_suggestions"`
}
