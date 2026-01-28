import { addToast } from "@heroui/react";
import { create } from "zustand";
import { analyzeImage as mockAnalyzeService } from "@/services/aiService";
import type { AnalysisResult } from "@/types";

interface AppState {
	image: string | null;
	isAnalyzing: boolean;
	result: AnalysisResult | null;
	error: string | null;
	setImage: (image: string | null) => void;
	analyzeImage: (image: string) => Promise<void>;
	reset: () => void;
}

export const useAppStore = create<AppState>((set) => ({
	image: null,
	isAnalyzing: false,
	result: null,
	error: null,
	setImage: (image) => set({ image, error: null }),
	analyzeImage: async (image) => {
		set({ isAnalyzing: true, error: null });
		try {
			const result = await mockAnalyzeService(image);
			set({ result, isAnalyzing: false });
			addToast({
				title: "🎉 Analysis Complete!",
				description: `Found ${result.ingredients_detected.length} ingredients and ${result.recipes.length} delicious recipes`,
				color: "success",
				timeout: 3000,
				size: "md",
				shouldShowTimeoutProgress: true,
				classNames: {
					base: "bg-green-500 z-[9999]",
					title: "text-white",
					description: "text-white",
					icon: "text-white",
					closeButton: "text-white",
					closeIcon: "text-white",
				},
			});
		} catch (error) {
			console.error(error);
			const errorMessage =
				error instanceof Error
					? error.message
					: "Failed to analyze image. Please try again.";
			set({
				error: errorMessage,
				isAnalyzing: false,
			});
			addToast({
				title: "❌ Analysis Failed",
				description: errorMessage,
				color: "danger",
				timeout: 3000,
				shouldShowTimeoutProgress: true,
				size: "md",
				classNames: {
					base: "bg-red-500 z-[9999]",
					title: "text-white",
					description: "text-white",
					icon: "text-white",
					closeButton: "text-white",
					closeIcon: "text-white",
				},
			});
		}
	},
	reset: () =>
		set({ image: null, isAnalyzing: false, result: null, error: null }),
}));
