import type { AnalysisResult, AnalyzeResponse } from "@/types";

export const analyzeImage = async (image: string): Promise<AnalysisResult> => {
	const response = await fetch(
		`${import.meta.env.VITE_API_BASE_URL}/api/analyze`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ image }),
		},
	);

	const result: AnalyzeResponse = await response.json();

	if (!result.success || !result.data) {
		throw new Error(result.error || "Failed to analyze image");
	}

	return result.data;
};
