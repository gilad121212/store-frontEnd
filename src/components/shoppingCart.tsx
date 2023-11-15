import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  TextField,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  description: string;
}

export default function ShoppingCart() {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[] | null>(null);
  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      user_id: "6551ecae1026f74928c28106"
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`http://127.0.0.1:3000/products/getCart`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setCartItems(result)})
      .catch((error) => console.log("error", error));
  }, []);
  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleQuantityChange = (itemId: number, newQuantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleDeleteItem = (itemId: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // const total = cartItems.reduce(
  //   (acc, item) => acc + item.price * item.quantity,
  //   0
  // );

  return (
    <div>
      <Toolbar>
        <IconButton edge="start" color="inherit" onClick={handleDrawerOpen}>
          <Badge badgeContent={cartItems?.length} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          SHOPPING CART
        </Typography>
      </Toolbar>

      <Drawer anchor="right" open={isDrawerOpen} onClose={handleDrawerClose}>
        <div>
          <List>
            <ListItem>
              <ListItemText primary="עגלת קניות" />
            </ListItem>
          </List>
          <Divider />
          <Divider />
          <List>
            <ListItem>
              <IconButton edge="end" color="inherit" onClick={handleClearCart}>
                <DeleteIcon />
              </IconButton>
              <ListItemText />
            </ListItem>
          </List>
          <Divider />
          <List>
            {cartItems?.map((item) => (
              <ListItem key={item.id}>
                <Card>
                  <div>
                    <IconButton
                      edge="end"
                      color="inherit"
                      onClick={() => handleDeleteItem(item.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <CardMedia
                      component="img"
                      alt={item.name}
                      width="400"
                      image={item.image}
                    />
                    <CardContent style={{ flex: 1 }}>
                      <ListItemText
                        primary={item.name}
                        secondary={`₪${item.price} x ${item.quantity}`}
                      />
                      <Typography variant="body2" color="text.secondary">
                        {item.description}
                      </Typography>
                      <TextField
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(item.id, +e.target.value)
                        }
                        inputProps={{ min: 1 }}
                      />
                    </CardContent>
                  </div>
                </Card>
              </ListItem>
            ))}
          </List>
          <Divider />
          <Toolbar sx={{ zIndex: "tooltip" }}>
            <Button variant="contained" color="primary">
              pay
            </Button>
            <List>
              <ListItem>
                <ListItemText primary={`סכום כולל: ₪${"total"}`} />
              </ListItem>
            </List>
          </Toolbar>
          {/* <BottomNavigationAction>yyyyyyyyyyy</BottomNavigationAction> */}
        </div>
      </Drawer>
    </div>
  );
}
