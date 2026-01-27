// Re-export types from shared package
export type {
	AnalysisResult,
	AnalyzeRequest,
	AnalyzeResponse,
	Recipe,
} from "@fridge-chef/shared";

// Frontend-specific types can be added here
export interface Ingredient {
	name: string;
}
