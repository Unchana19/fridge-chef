// ============================================
// Shared Types for Fridge Chef
// Used by both Frontend (TypeScript) and Backend (Go)
// ============================================

/**
 * Represents a single recipe suggestion
 */
export interface Recipe {
	title: string;
	description: string;
	ingredients_needed: string[];
	instructions: string[];
	cooking_time: string;
	difficulty: string;
}

/**
 * Result from AI image analysis
 */
export interface AnalysisResult {
	ingredients_detected: string[];
	recipes: Recipe[];
	shopping_list_suggestions: string[];
}

/**
 * Request body for /api/analyze endpoint
 */
export interface AnalyzeRequest {
	image: string; // base64 encoded image
}

/**
 * Response from /api/analyze endpoint
 */
export interface AnalyzeResponse {
	success: boolean;
	data?: AnalysisResult;
	error?: string;
}
