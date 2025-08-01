"use client";

import { Card, Button } from "@mui/material";

export function ProductCard({ name, price, link }) {
    return (
        <Card className="p-4 hover:shadow-lg transition space-y-2">
            <h3 className="text-lg font-semibold">{name}</h3>
            <p className="text-sm text-gray-600">{price}</p>
            <Button variant="contained" onClick={() => window.open(link, "_blank")}>
                Buy
            </Button>
        </Card>
    );
}