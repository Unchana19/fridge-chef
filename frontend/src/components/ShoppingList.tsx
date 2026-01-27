import { Card, CardBody, Checkbox } from "@heroui/react";
import { ShoppingCart, Sparkles } from "lucide-react";

interface ShoppingListProps {
	items: string[];
}

export const ShoppingList = ({ items }: ShoppingListProps) => {
	if (!items || items.length === 0) return null;

	return (
		<Card className="w-full bg-gradient-to-br from-warning-50/80 to-warning-100/50 dark:from-warning-900/20 dark:to-warning-800/10 border border-warning-200/50 dark:border-warning-500/20 shadow-lg backdrop-blur-sm">
			<CardBody className="p-5">
				<div className="flex items-center gap-3 mb-4">
					<div className="bg-warning/20 p-2 rounded-xl">
						<ShoppingCart
							size={18}
							className="text-warning-600 dark:text-warning-400"
						/>
					</div>
					<div>
						<h4 className="font-bold text-warning-700 dark:text-warning-300">
							Shopping Suggestions
						</h4>
						<p className="text-xs text-warning-600/70 dark:text-warning-400/70">
							Add these to make more recipes
						</p>
					</div>
					<Sparkles
						size={14}
						className="ml-auto text-warning-500 animate-pulse"
					/>
				</div>
				<div className="flex flex-col gap-2">
					{items.map((item) => (
						<Checkbox
							key={`shop-${item}`}
							color="warning"
							radius="full"
							classNames={{
								base: "max-w-full hover:bg-warning/10 rounded-lg px-2 py-1 -mx-2 transition-colors",
								label:
									"text-warning-800 dark:text-warning-200 font-medium text-sm",
							}}
						>
							{item}
						</Checkbox>
					))}
				</div>
			</CardBody>
		</Card>
	);
};
