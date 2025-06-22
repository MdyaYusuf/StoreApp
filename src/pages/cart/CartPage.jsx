import { Button, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { currencyTRY } from "../../utils/formats";
import { Delete } from "@mui/icons-material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useState } from "react";
import requests from "../../api/apiClient";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "./cartSlice";

export default function CartPage() {

  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [status, setStatus] = useState({ loading: false, id: "" });

  const subTotal = cart?.cartItems.reduce((total, item) => total + item.product.price * item.product.quantity, 0);
  const tax = subTotal * 0.2;
  const total = subTotal + tax;

  if (!cart || cart.cartItems.length === 0) {

    return (
      <Typography component="h4">Sepetinizde Ürün Yok</Typography>
    )
  } 
  
  function handleAddItem(productId, id) {

    setStatus({ loading: true, id: id });

    requests.cart.addItem(productId)
      .then((cart) => dispatch(setCart(cart)))
      .catch((error) => console.log(error))
      .finally(() => setStatus({ loading: false, id: "" }));
  }

  function handleRemoveItem(productId, id, quantity = 1) {

    setStatus({ loading: true, id: id });

    requests.cart.deleteItem(productId, quantity)
      .then((cart) => dispatch(setCart(cart)))
      .catch((error) => console.log(error))
      .finally(() => setStatus({ loading: false, id: "" }));
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: 100 }}></TableCell>
            <TableCell>Ürün</TableCell>
            <TableCell sx={{ width: 120 }}>Fiyat</TableCell>
            <TableCell sx={{ width: 170 }}>Adet</TableCell>
            <TableCell sx={{ width: 120 }}>Toplam</TableCell>
            <TableCell sx={{ width: 50 }}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cart.cartItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <img src={`http://localhost:5000/images/${item.product.image}`} style={{ width: "100%" }}/>
              </TableCell>
              <TableCell>{item.product.title}</TableCell>
              <TableCell>{currencyTRY.format(item.product.price)}</TableCell>
              <TableCell>
                <Button onClick={() => handleAddItem(item.product.productId, "add" + item.product.productId)}>
                  {status.loading && status.id === "add" + item.product.productId ? (<CircularProgress size="20px" />) : (<AddCircleOutlineIcon />)}
                </Button>
                  {item.product.quantity}
                <Button onClick={() => handleRemoveItem(item.product.productId, "remove" + item.product.productId)}>
                  {status.loading && status.id === "remove" + item.product.productId ? (<CircularProgress size="20px" />) : (<RemoveCircleOutlineIcon />)}
                </Button>
              </TableCell>
              <TableCell>
                {currencyTRY.format(item.product.price * item.product.quantity)}
              </TableCell>
              <TableCell>
                <Button onClick={() => handleRemoveItem(item.product.productId, "remove_all" + item.product.productId, item.product.quantity)} color="error">
                  {status.loading && status.id === "remove_all" + item.product.productId ? (<CircularProgress size="20px" />) : (<Delete />)}
                </Button>
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell align="right" colSpan={5}>Ara Toplam</TableCell>
            <TableCell align="right" colSpan={5}>{currencyTRY.format(subTotal)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="right" colSpan={5}>Vergi</TableCell>
            <TableCell align="right" colSpan={5}>{currencyTRY.format(tax)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="right" colSpan={5}>Toplam</TableCell>
            <TableCell align="right" colSpan={5}>{currencyTRY.format(total)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}