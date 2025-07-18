import { Alert, Button, Chip, Dialog, DialogContent, DialogTitle, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import requests from "../../api/apiClient";
import Loading from "../../components/Loading";
import { currencyTRY } from "../../utils/formats";

export default function OrdersPage() {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [open, setOpen] = useState(false);

  function handleDialogOpen(order) {

    setSelectedOrder(order);
    setOpen(true);
  }

  function handleDialogClose() {

    setOpen(false);
    setSelectedOrder(null);
  }

  const subTotal = selectedOrder?.orderItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const tax = subTotal * 0.2;
  const total = subTotal + tax;

  useEffect(() => {
    setLoading(true);
    requests.orders.getOrders()
      .then((result) => setOrders(result))
      .catch(error => console.log(error))
      .finally(setLoading(false));
  }, []);

  if (loading) {

    return (
      <Loading />
    )
  };

  if (!orders || orders.length === 0) {

    return (
      <Alert severity="warning">Henüz oluşturulmuş bir siparişiniz yok.</Alert>
    )
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Order Id</TableCell>
              <TableCell>Order Status</TableCell>
              <TableCell>Order Date</TableCell>
              <TableCell>Total</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders?.map(item => {
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>
                  <Chip label={item.orderStatus} color="secondary" variant="outlined" />
                </TableCell>
                <TableCell>
                  {new Date(item.orderDate).toLocaleString()}
                </TableCell>
                <TableCell>
                  {currencyTRY.format(item.total)}
                </TableCell>
                <TableCell>
                  <Button variant="outlined" color="secondary" size="small" onClick={() => handleDialogOpen(item)}>
                    Details
                  </Button>
                </TableCell>
              </TableRow>
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog onClose={handleDialogClose} open={open} fullWidth maxWidth="lg">
        <DialogTitle>Sipariş No: #{selectedOrder?.id}</DialogTitle>
        <IconButton onClick={handleDialogClose} sx={{ position: "absolute", right: 8, top: 8 }}>
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Teslimat Bilgileri
            </Typography>
            <Typography variant="subtitle1">
                {selectedOrder?.firstName} {selectedOrder?.lastName}
            </Typography>
            <Typography variant="subitle1">
              {selectedOrder?.phone}
            </Typography>
            <Typography variant="subtitle1">
                {selectedOrder?.address} {selectedOrder?.city}
            </Typography>
          </Paper>
          <TableContainer component={Paper}>
            <Table>
              <TableHead id="alert-dialog-title">
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell align="right">Fiyat</TableCell>
                  <TableCell align="right">Adet</TableCell>
                  <TableCell align="right">Toplam</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedOrder?.orderItems.map(item => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <img src={`http://localhost:5000/images/${item.image}`} style={{ height: 60 }}/>
                    </TableCell>
                    <TableCell>
                      {item.title}
                    </TableCell>
                    <TableCell align="right">
                      {currencyTRY.format(item.price)}
                    </TableCell>
                    <TableCell align="right">
                      {item.quantity}
                    </TableCell>
                    <TableCell align="right">
                      {currencyTRY.format(item.price * item.quantity)}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={4} align="right">Ara Toplam</TableCell>
                  <TableCell align="right">{currencyTRY.format(subTotal)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={4} align="right">Vergi</TableCell>
                  <TableCell align="right">{currencyTRY.format(tax)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={4} align="right">Toplam</TableCell>
                  <TableCell align="right">{currencyTRY.format(total)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
      </Dialog>
    </>
  )
}