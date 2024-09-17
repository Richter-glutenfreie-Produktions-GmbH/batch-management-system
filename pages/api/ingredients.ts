import { db } from "@/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const ingredients = await db.query.ingredients.findMany({
            with: {
                recipeHasIngredients: true,
            },
        });
        console.log(ingredients);
        res.status(200).json(ingredients);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch ingredients" });
    }
}
