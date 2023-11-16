import { useEffect, useState } from "react";
import {
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
import "./shoppingCart.css";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  images: string[];
  description: string;
}
interface User {
  email: string;
  token: string;
  id: string;
}

export default function ShoppingCart() {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[] | null>(null);

  useEffect(() => {
    const userString = localStorage.getItem("user");
    const user: User | null = userString ? JSON.parse(userString) : null;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      user_id: user?.id,
    });
    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow" as RequestRedirect,
    };
    if (!user) {
      return;
    }
    fetch(`http://127.0.0.1:3009/products/getCart`, requestOptions)
      .then(async (res) => {
        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(
            `HTTP error! Status: ${res.status}, Error: ${errorText}`
          );
        }
        return res.json();
      })
      .then((result) => {
        setCartItems(result);
      })
      .catch((error) => console.log("error", error));
  }, []);
  useEffect(() => {
    if (!cartItems) return;
    handlePostDB();
  }, [cartItems]);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };
  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };
  const handleQuantityChange = (itemId: number, newQuantity: number) => {
    setCartItems((prevItems) =>
      (prevItems ?? []).map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };
  const handleDeleteItem = (itemId: number) => {
    setCartItems((prevItems) =>
      (prevItems ?? []).filter((item) => item.id !== itemId)
    );
  };
  const handleClearCart = () => {
    setCartItems([]);
  };
  const total = cartItems?.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handlePostDB = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      user_id: "6551ecae1026f74928c28106",
      products: cartItems,
    });

    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow" as RequestRedirect,
    };

    fetch("http://127.0.0.1:3009/products/editCart", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };
  return (
    <div>
      <Toolbar>
        <IconButton edge="start" color="inherit" onClick={handleDrawerOpen}>
          <Badge badgeContent={cartItems?.length} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
        ></Typography>
      </Toolbar>
      <Drawer anchor="right" open={isDrawerOpen} onClose={handleDrawerClose}>
        <div>
          <List>
            <ListItem>
              <ListItemText primary="SHOPPING CART" />
            </ListItem>
          </List>

          {cartItems && cartItems.length > 0 ? (
            <div>
              <Divider />
              <Divider />
              <List>
                <ListItem>
                  <IconButton
                    edge="end"
                    color="inherit"
                    onClick={handleClearCart}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
              </List>
              <Divider />
            </div>
          ) : (
            <p>empty cart</p>
          )}

          <List>
            {cartItems &&
              cartItems.map((item) => (
                <ListItem key={item.id}>
                  <Card>
                    <div>
                      <IconButton
                        edge="end"
                        color="inherit"
                        onClick={() => {
                          handleDeleteItem(item.id);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                      <div id="imageContainer">
                        <CardMedia
                          component="img"
                          alt={item.name}
                          width="400px"
                          image={item.images[0]}
                        />
                      </div>
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
              PAY
            </Button>
            <List>
              <ListItem>
                <ListItemText primary={`Total: ₪${total}`} />
              </ListItem>
            </List>
          </Toolbar>
        </div>
      </Drawer>
    </div>
  );
}
