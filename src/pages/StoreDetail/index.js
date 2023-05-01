import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "../../components/Header";
import { ROUTES } from "../../utils/enums";
import { getStoreMenu } from "../../utils/api";
import "./style.css";
import { Alert, Button, Snackbar } from "@mui/material";
import QuantitySelectorModal from "../../components/QuantitySelector";
import { addStoreOrder } from "../../redux/cartSlice";

const StoreDetailPage = () => {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [searchParams, _] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [storeName, setStoreName] = useState();
  const [storeMenu, setStoreMenu] = useState();
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [isQuantitySelectorOpen, setQuantitySelectorOpen] = useState();
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  useEffect(() => {
    if (!searchParams.get("storeId") || !searchParams.get("storeName")) {
      navigate(ROUTES.stores);
    }
    const storeNameParams = searchParams.get("storeName");
    const storeIdParams = searchParams.get("storeId");
    setStoreName(storeNameParams);
    const fetchStoreMenu = async () => {
      try {
        const storeMenuResponse = await getStoreMenu(
          accessToken,
          storeIdParams
        );
        setStoreMenu(storeMenuResponse.data.storeMenu);
      } catch (error) {
        alert(error.response.data.message);
      }
    };
    fetchStoreMenu();
  }, [accessToken, navigate, searchParams]);

  const handleAddToCart = (quantity) => {
    dispatch(addStoreOrder({
      quantity: quantity,
      item: selectedMenuItem,
      id: selectedMenuItem.menu_item_id
    }));
    setIsSnackbarOpen(true);
  };

  const handleAddToCartButtonClick = (menuItem) => {
    setQuantitySelectorOpen(true);
    setSelectedMenuItem(menuItem);
  };

  return (
    <div>
      <Header />
      <div className="store-detail-container">
        <div className="store-info">
          <h1>{storeName}</h1>
        </div>
        <div className="store-menu-container">
          {storeMenu &&
            storeMenu.map((menuItem) => (
              <div className="store-menu-item" key={menuItem.menu_item_id}>
                <img
                  src={menuItem.menu_img_url}
                  alt={menuItem.menu_item_name}
                />
                <div>
                  <h2>{menuItem.menu_item_name}</h2>
                  <p>{menuItem.item_desc}</p>
                  <p>{menuItem.item_price}</p>
                  <Button onClick={() => handleAddToCartButtonClick(menuItem)}>
                    Add to Cart
                  </Button>
                </div>
              </div>
            ))}
          {selectedMenuItem && (
            <QuantitySelectorModal
              isOpen={isQuantitySelectorOpen}
              itemTitle={selectedMenuItem.menu_item_name}
              pricePerItem={selectedMenuItem.item_price}
              onClose={() => setQuantitySelectorOpen(false)}
              onAddToCart={(quantity) => handleAddToCart(quantity)}
            />
          )}
        </div>
      </div>
      <Snackbar open={isSnackbarOpen} autoHideDuration={3000} onClose={() => setIsSnackbarOpen(false)}>
        <Alert onClose={() => setIsSnackbarOpen(false)} severity="success">
          Item added to cart!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default StoreDetailPage;