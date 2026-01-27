import {
	Accordion,
	AccordionItem,
	Card,
	CardBody,
	CardHeader,
	Chip,
	Divider,
} from "@heroui/react";
import { ChefHat, Clock, Flame, ListChecks, Utensils } from "lucide-react";
import type { Recipe } from "@/types";

interface RecipeCardProps {
	recipe: Recipe;
}

export const RecipeCard = ({ recipe }: RecipeCardProps) => {
	return (
		<Card className="w-full border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-content1/90 backdrop-blur-sm overflow-hidden group">
			{/* Gradient accent bar */}
			<div className="h-1.5 bg-gradient-to-r from-primary via-secondary to-warning" />

			<CardHeader className="flex flex-col items-start px-7 pt-7 pb-0">
				<div className="flex items-start justify-between w-full">
					<div className="flex-1">
						<h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
							{recipe.title}
						</h3>
						<p className="text-default-500 mt-3 leading-relaxed">
							{recipe.description}
						</p>
					</div>
					<div className="bg-primary/10 p-3 rounded-xl ml-4 group-hover:bg-primary/20 transition-colors">
						<Utensils size={24} className="text-primary" />
					</div>
				</div>

				<div className="flex flex-wrap gap-3 mt-5">
					<Chip
						startContent={<Clock size={12} />}
						variant="flat"
						size="sm"
						color="warning"
						classNames={{
							base: "bg-warning/10 space-x-2 px-2 py-1",
							content: "font-medium",
						}}
					>
						{recipe.cooking_time || "30 min"}
					</Chip>
					<Chip
						startContent={<Flame size={12} />}
						variant="flat"
						size="sm"
						color="success"
						classNames={{
							base: "bg-success/10 space-x-2 px-2 py-1",
							content: "font-medium",
						}}
					>
						{recipe.difficulty || "Medium"}
					</Chip>
					<Chip
						startContent={<ChefHat size={12} />}
						variant="flat"
						size="sm"
						color="secondary"
						classNames={{
							base: "bg-secondary/10 space-x-2 px-2 py-1",
							content: "font-medium",
						}}
					>
						{recipe.ingredients_needed.length} ingredients
					</Chip>
				</div>
			</CardHeader>

			<CardBody className="px-7 py-6">
				<Divider className="my-2" />

				<Accordion
					variant="light"
					selectionMode="multiple"
					defaultExpandedKeys={["ingredients"]}
				>
					<AccordionItem
						key="ingredients"
						aria-label="Ingredients"
						title={
							<div className="flex items-center gap-2 font-semibold">
								<ChefHat size={16} className="text-secondary" />
								Ingredients
							</div>
						}
						classNames={{
							content: "pt-2",
						}}
					>
						<div className="flex flex-wrap gap-2.5">
							{recipe.ingredients_needed.map((ing) => (
								<Chip
									key={`ing-${ing}`}
									size="sm"
									variant="dot"
									color="primary"
									classNames={{
										base: "bg-primary/5 border-primary/20 px-2 py-1",
									}}
								>
									{ing}
								</Chip>
							))}
						</div>
					</AccordionItem>

					<AccordionItem
						key="instructions"
						aria-label="Instructions"
						title={
							<div className="flex items-center gap-2 font-semibold">
								<ListChecks size={16} className="text-primary" />
								Instructions
							</div>
						}
						classNames={{
							content: "pt-2",
						}}
					>
						<ol className="space-y-4">
							{recipe.instructions.map((step, i) => (
								<li
									key={`step-${i + 1}`}
									className="flex gap-3 items-start group/step"
								>
									<span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/10 text-primary text-sm font-bold flex items-center justify-center group-hover/step:bg-primary group-hover/step:text-white transition-colors">
										{i + 1}
									</span>
									<span className="text-default-600 pt-0.5 leading-relaxed">
										{step}
									</span>
								</li>
							))}
						</ol>
					</AccordionItem>
				</Accordion>
			</CardBody>
		</Card>
	);
};
