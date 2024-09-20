"use client";

import { useEffect, useState } from "react";

export default function Page() {
    const [ingredients, setIngredients] = useState<any[] | null>(null);

    useEffect(() => {
        const getData = async () => {
            const response = await fetch("/api/ingredients");
            const data = await response.json();
            setIngredients(data);
        };
        getData();
    }, []);

    return <pre>{JSON.stringify(ingredients, null, 2)}</pre>;
}
