import { useEffect, useState, useContext } from "react";
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
  TextField,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import Box from "@mui/material/Box";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";
import "./shoppingCart.css";
import { ShopingCartContext } from "../Context/ShopingCartContext";
import { AuthContext } from "../Context/AuthContext";
import Checkout from "./PayPal/PayPal";
import { BadgeProps } from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { URL } from "../config";
export interface CartItem {
  id: number;
  name: string;
  price: number;
  title: string;
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

  const CartContext = useContext(ShopingCartContext);
  const cartItems = CartContext?.shopingCart;
  const setCartItems = CartContext?.setShopingCart;

  const authContext = useContext(AuthContext);
  const isAuthenticated = authContext?.isAuthenticated;
  if (!setCartItems) {
    return;
  }

  useEffect(() => {
    const userString = localStorage.getItem("user");
    const user: User | null = userString ? JSON.parse(userString) : null;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    if (user && user.token) {      
      myHeaders.append("Authorization", user.token)
    }
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
    localStorage.removeItem("cart");
    fetch(`${URL}/products/getCart`, requestOptions)
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
    if (cartItems) {
      if (isAuthenticated) {
        handlePostDB();
      } else {
        localStorage.setItem("cart", JSON.stringify(cartItems));
      }
    }
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
    handlePostDB();
  };
  const handleClearCart = () => {
    setCartItems(() => []);
  };
  const total = cartItems?.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handlePostDB = () => {
    const userString = localStorage.getItem("user");
    const user: User | null = userString ? JSON.parse(userString) : null;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    if (user && user.token) {
      myHeaders.append("Authorization", user.token)
    }
    const raw = JSON.stringify({
      products: cartItems,
      user_id: user?.id,
    });
    if (!user) {
      return;
    }
    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow" as RequestRedirect,
    };
    fetch(`${URL}/products/editCart`, requestOptions)
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
        console.log(result);
      })
      .catch((error) => console.log("error", error));
  };

  const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: 0,
      top: 0,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }));
  console.log(cartItems);
  return (
    <div>
      <IconButton edge="start" color="inherit" onClick={handleDrawerOpen}>
        <StyledBadge badgeContent={cartItems?.length} color="primary">
          <ShoppingCartIcon />
        </StyledBadge>
      </IconButton>
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
                      <Toolbar>
                        <Box sx={{ width: 250, margin: 2 }}>
                          <CardMedia
                            component="img"
                            alt={item.name}
                            image={item.images[0]}
                          />
                        </Box>
                        <CardContent style={{ flex: 1 }}>
                          <ListItemText primary={item.title} />
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ width:200 }}
                          >
                            {item.description}
                          </Typography>
                          <ListItemText
                            secondary={`₪${item.price} x ${item.quantity}`}
                          />
                          <br />
                          <TextField
                            type="number"
                            value={item.quantity}
                            onChange={(e) =>
                              handleQuantityChange(item.id, +e.target.value)
                            }
                            inputProps={{ min: 1 }}
                            style={{ width: 50, marginRight: 2 }}
                          />
                          <IconButton
                            size="small"
                            onClick={() =>
                              handleQuantityChange(item.id, item.quantity + 1)
                            }
                          >
                            <AddIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() =>
                              handleQuantityChange(item.id, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                          >
                            <RemoveIcon fontSize="small" />
                          </IconButton>
                        </CardContent>
                      </Toolbar>
                    </div>
                  </Card>
                </ListItem>
              ))}
          </List>
          <Divider />
          <Toolbar sx={{ zIndex: "tooltip" }}>
            <List>
              <ListItem>
                <div>
                  <ListItemText primary={`Total: ₪${total}`} />
                  <Checkout amount={total ? total : 0} />
                </div>
              </ListItem>
            </List>
          </Toolbar>
        </div>
      </Drawer>
    </div>
  );
}
