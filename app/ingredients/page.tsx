"use client";

import { createClient } from "@/utils/supabase/client";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { useEffect, useState } from "react";

export default function Page() {
    const [ingredients, setIngredients] = useState<any[] | null>(null);
    const supabase = createClient();
    const db = drizzle(postgres(process.env.DATABASE_URL!, { prepare: false }));

    useEffect(() => {
        const getData = async () => {
            const { data } = await supabase.from("ingredients_bt").select();
            setIngredients(data);
        };
        getData();
    }, []);

    return <pre>{JSON.stringify(ingredients, null, 2)}</pre>;
}
