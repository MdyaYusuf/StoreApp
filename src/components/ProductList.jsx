import { Grid } from "@mui/material";
import ProductCard from "./ProductCard";

export default function ProductList({ products }) {
  
  return (
    <Grid container spacing={2}>
      {products.map((p) =>
        <Grid key={p.id} size={{ xs: 6, md: 4, lg: 3 }}>
          <ProductCard product={p} />
        </Grid>
      )}
    </Grid>
  )
}