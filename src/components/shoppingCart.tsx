import React, { useState } from "react";
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
import BottomNavigationAction from '@mui/material/BottomNavigationAction';


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
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "מוצר 1",
      price: 20,
      quantity: 1,
      image: "https://placekitten.com/100/100",
      description: "זהו מוצר נהדר שלנו!",
    },
    {
      id: 2,
      name: "מוצר 2",
      price: 30,
      quantity: 2,
      image: "https://placekitten.com/120/120",
      description: "מוצר מדהים במחיר משתלם!",
    },
    {
      id: 3,
      name: "מוצר 3",
      price: 15,
      quantity: 3,
      image: "https://placekitten.com/80/80",
      description: "המוצר הזול ביותר באתר!",
    },
    {
      id: 4,
      name: "מוצר 4",
      price: 25,
      quantity: 1,
      image: "https://placekitten.com/110/110",
      description: "עיצוב מהמם ומותג אמין!",
    },
    {
      id: 5,
      name: "מוצר 5",
      price: 40,
      quantity: 2,
      image: "https://placekitten.com/90/90",
      description: "המוצר היוקרתי ביותר בחנות!",
    },
    {
      id: 6,
      name: "מוצר 6",
      price: 18,
      quantity: 2,
      image: "https://placekitten.com/95/95",
      description: "מוצר עם תכונות מתקדמות!",
    },
    {
      id: 7,
      name: "מוצר 7",
      price: 35,
      quantity: 1,
      image: "https://placekitten.com/105/105",
      description: "עיצוב מיוחד ומותג יוקרתי!",
    },
    {
      id: 8,
      name: "מוצר 8",
      price: 22,
      quantity: 3,
      image: "https://placekitten.com/85/85",
      description: "מוצר פופולרי במיוחד!",
    },
    {
      id: 9,
      name: "מוצר 9",
      price: 28,
      quantity: 1,
      image: "https://placekitten.com/115/115",
      description: "מוצר בינוני במחיר נוח!",
    },
    {
      id: 10,
      name: "מוצר 10",
      price: 45,
      quantity: 2,
      image: "https://placekitten.com/75/75",
      description: "המוצר המתקדם ביותר בקטגוריה!",
    },
    {
      id: 11,
      name: "מוצר 11",
      price: 15,
      quantity: 2,
      image: "https://placekitten.com/125/125",
      description: "מוצר במחיר זול ואיכותי!",
    },
    {
      id: 12,
      name: "מוצר 12",
      price: 32,
      quantity: 1,
      image: "https://placekitten.com/80/80",
      description: "עיצוב ייחודי ומגוון צבעים!",
    },
    {
      id: 13,
      name: "מוצר 13",
      price: 25,
      quantity: 3,
      image: "https://placekitten.com/110/110",
      description: "מוצר פופולרי עם המון ביקורות חיוביות!",
    },
    {
      id: 14,
      name: "מוצר 14",
      price: 40,
      quantity: 1,
      image: "https://placekitten.com/100/100",
      description: "המוצר המפואר ביותר בחנות!",
    },
    {
      id: 15,
      name: "מוצר 15",
      price: 20,
      quantity: 2,
      image: "https://placekitten.com/90/90",
      description: "מוצר במחיר אטרקטיבי ואיכותי!",
    },
  ]);

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

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div>
      <Toolbar>
        <IconButton edge="start" color="inherit" onClick={handleDrawerOpen}>
          <Badge badgeContent={cartItems.length} color="secondary">
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
            {cartItems.map((item) => (
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
          <Toolbar sx={{ zIndex: 'tooltip' }}>
            <Button variant="contained" color="primary">
              pay
            </Button>
            <List>
              <ListItem>
                <ListItemText primary={`סכום כולל: ₪${total}`} />
              </ListItem>
            </List>
          </Toolbar>
          {/* <BottomNavigationAction>yyyyyyyyyyy</BottomNavigationAction> */}
        </div>
      </Drawer>
    </div>
  );
}
