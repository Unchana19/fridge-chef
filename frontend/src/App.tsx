import { Button, Navbar, NavbarBrand, NavbarContent } from "@heroui/react";
import { ChefHat, Moon, Sparkles, Sun, UtensilsCrossed } from "lucide-react";
import { useState } from "react";
import Aurora from "@/components/Aurora";
import { ImageUploader } from "@/components/ImageUploader";
import { RecipeCard } from "@/components/RecipeCard";
import { ShoppingList } from "@/components/ShoppingList";
import { Provider } from "@/Provider";
import { useAppStore } from "@/store/useAppStore";

function App() {
	const { result, reset } = useAppStore();
	const [isDark, setIsDark] = useState(true);

	return (
		<Provider>
			<div
				className={`${isDark ? "dark" : ""} min-h-screen bg-background text-foreground transition-colors duration-500`}
			>
				<div className="min-h-screen w-full bg-gradient-to-br from-background via-background to-primary/5">
					{/* Aurora Background */}
					<div className="fixed inset-0 overflow-hidden pointer-events-none opacity-30">
						<Aurora
							colorStops={["#06b6d4", "#8b5cf6", "#f59e0b"]}
							amplitude={1.2}
							blend={0.6}
							speed={0.5}
						/>
					</div>

					<Navbar
						className="bg-background/60 backdrop-blur-xl border-b border-divider/50 shadow-sm py-2"
						maxWidth="xl"
						height="4rem"
					>
						<NavbarBrand className="gap-3">
							<div className="bg-gradient-to-br from-primary to-secondary p-1 rounded-xl shadow-lg shadow-primary/20">
								<img src="/logo.svg" alt="Logo" className="w-10 h-10" />
							</div>
							<p className="font-bold text-xl tracking-tight">
								Fridge<span className="text-primary">Chef</span>
								<span className="ml-2 text-xs font-normal text-default-400 bg-default-100 px-2 py-0.5 rounded-full">
									AI
								</span>
							</p>
						</NavbarBrand>
						<NavbarContent justify="end">
							{result && (
								<Button
									variant="flat"
									color="danger"
									size="sm"
									onPress={reset}
									startContent={<UtensilsCrossed size={16} />}
								>
									Start Over
								</Button>
							)}
							<Button
								isIconOnly
								variant="light"
								onPress={() => setIsDark(!isDark)}
								className="text-default-500"
							>
								{isDark ? <Sun size={20} /> : <Moon size={20} />}
							</Button>
						</NavbarContent>
					</Navbar>

					<main className="container mx-auto px-6 sm:px-8 lg:px-12 py-16 md:py-10 max-w-7xl relative z-10">
						{/* Hero Section */}
						<div className="text-center mb-10 animate-fade-in">
							<div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-5 py-2 rounded-full text-sm font-medium mb-4">
								<Sparkles size={14} />
								Powered by AI
							</div>
							<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-8 leading-tight">
								<span className="gradient-text">Cook with what</span>
								<br />
								<span className="text-foreground">you have.</span>
							</h1>
							<p className="text-base md:text-lg text-default-500 max-w-2xl mx-auto leading-relaxed">
								Snap a photo of your fridge, and our AI chef will transform your
								ingredients into{" "}
								<span className="text-primary font-medium">
									delicious recipes
								</span>{" "}
								instantly.
							</p>
						</div>

						{/* Main Content Grid */}
						<div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
							{/* Left Sidebar - Image Upload & Ingredients */}
							<div className="lg:col-span-5 xl:col-span-4 space-y-8 lg:sticky lg:top-28">
								<div className="animate-fade-in stagger-1">
									<ImageUploader />
								</div>

								{result && (
									<div className="space-y-6 animate-slide-up">
										{/* Detected Ingredients */}
										<div className="bg-content1/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-divider/50">
											<h4 className="font-semibold flex items-center gap-3 mb-5 text-lg">
												<div className="bg-warning/10 p-1.5 rounded-lg">
													<Sparkles size={16} className="text-warning" />
												</div>
												Found in your fridge
											</h4>
											<div className="flex flex-wrap gap-2.5">
												{result.ingredients_detected.map((item, i) => (
													<span
														key={`ingredient-${item}`}
														className="px-4 py-2 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full text-sm font-medium text-foreground border border-primary/20 animate-fade-in"
														style={{ animationDelay: `${i * 0.05}s` }}
													>
														{item}
													</span>
												))}
											</div>
										</div>

										{/* Shopping List */}
										<ShoppingList items={result.shopping_list_suggestions} />
									</div>
								)}
							</div>

							{/* Right Content - Recipes */}
							<div className="lg:col-span-7 xl:col-span-8">
								{result ? (
									<div className="space-y-8">
										<div className="flex items-center justify-between animate-fade-in mb-2">
											<h2 className="text-2xl font-bold flex items-center gap-3">
												<div className="bg-secondary/10 p-2 rounded-xl">
													<UtensilsCrossed
														size={20}
														className="text-secondary"
													/>
												</div>
												Recipe Ideas
												<span className="text-sm font-normal text-default-400 bg-default-100 px-2 py-0.5 rounded-full">
													{result.recipes.length} found
												</span>
											</h2>
										</div>
										<div className="grid gap-8">
											{result.recipes.map((recipe, index) => (
												<div
													key={`recipe-${recipe.title}`}
													className="animate-slide-up"
													style={{ animationDelay: `${index * 0.15}s` }}
												>
													<RecipeCard recipe={recipe} />
												</div>
											))}
										</div>
									</div>
								) : (
									<div className="flex flex-col items-center justify-center min-h-[500px] bg-content1/50 backdrop-blur-sm rounded-3xl border-2 border-dashed border-default-200/50 animate-fade-in">
										<div className="animate-float">
											<div className="bg-default-100 p-6 rounded-full mb-6">
												<ChefHat size={48} className="text-default-300" />
											</div>
										</div>
										<p className="text-xl text-default-400 font-medium mb-2">
											Ready to cook?
										</p>
										<p className="text-default-300 text-center max-w-xs">
											Upload a photo of your fridge and let our AI suggest
											amazing recipes
										</p>
									</div>
								)}
							</div>
						</div>
					</main>

					{/* Footer */}
					<footer className="relative z-10 border-t border-divider/50 mt-24">
						<div className="container mx-auto px-6 sm:px-8 lg:px-12 py-10 max-w-7xl">
							<div className="flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-default-400">
								<div className="flex items-center gap-2">
									<ChefHat size={16} className="text-primary" />
									<span>FridgeChef AI</span>
								</div>
								<p>Reduce food waste. Cook smarter. Eat better.</p>
							</div>
						</div>
					</footer>
				</div>
			</div>
		</Provider>
	);
}

export default App;
