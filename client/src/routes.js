import Admin from "./pages/Admin";
import Shop from "./pages/Shop";
import DevicePage from "./pages/DevicePage";
import Basket from "./pages/Basket.jsx";
import Auth from "./pages/Auth";
import { ADMIN_ROUTE, BASKET_ROUTE, DEVICE_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "./utils";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        component: <Admin/>
    },
    {
        path: BASKET_ROUTE,
        component: <Basket/>
    }
];

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        component: <Auth/>
    },
    {
        path: REGISTRATION_ROUTE,
        component: <Auth/>
    },
    {
        path: SHOP_ROUTE,
        component: <Shop/>
    },
    {
        path: DEVICE_ROUTE + '/:id',
        component: <DevicePage/>
    }
];