import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, CircularProgress, IconButton, Typography } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { currencyTRY } from "../utils/formats";
import { addItemToCart } from "../pages/cart/cartSlice";

export default function ProductCard({ product }) {

  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.cart);

  return (
    <Card>
      <CardActionArea component={Link} to={"/products/" + product.id}>
        <CardMedia sx={{ height: 160, backgroundSize: "contain" }} image={`http://localhost:5000/images/${product.image}`} />
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2" color="primary.dark">
            {product.title}
          </Typography>
          <Typography variant="body1" color="secondary.dark">
            {currencyTRY.format(product.price)}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ display: "flex", justifyContent: "space-betweeen" }}>
        <IconButton>
          <FavoriteBorderIcon />
        </IconButton>
        <Button onClick={() => dispatch(addItemToCart({ productId: product.id }))}>
          {status === "pendingAddItem" + product.id ? <CircularProgress size="20px" /> : "Sepete Ekle"}
        </Button>
      </CardActions>
    </Card>
  )
}