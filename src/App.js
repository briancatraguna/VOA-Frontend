import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthenticationPage from "./pages/Authentication/index";
import { Provider } from "react-redux";
import store from "./redux/store";
import EmployeeHomePage from "./pages/EmployeeHome";
import HomePage from "./pages/Home";
import { ROUTES } from "./utils/enums";
import AttractionsPage from "./pages/Attractions";
import CartPage from "./pages/Cart";
import StoresPage from "./pages/Stores";
import StoreDetailPage from "./pages/StoreDetail";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ShowsPage from "./pages/Shows";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route
              path={ROUTES.launch}
              element={<Navigate to={ROUTES.home} />}
            />
            <Route path={ROUTES.auth} element={<AuthenticationPage />} />
            <Route path={ROUTES.employee} element={<EmployeeHomePage />} />
            <Route path={ROUTES.home} element={<HomePage />} />
            <Route path={ROUTES.attractions} element={<AttractionsPage />} />
            <Route path={ROUTES.stores} element={<StoresPage />} />
            <Route path={ROUTES.shows} element={<ShowsPage />} />
            <Route path={ROUTES.storeDetail} element={<StoreDetailPage />} />
            <Route path={ROUTES.cart} element={<CartPage />} />
          </Routes>
        </BrowserRouter>
      </Provider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </LocalizationProvider>
  );
}

export default App;
