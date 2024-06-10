import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CategoryIcon from '@mui/icons-material/Category';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
// import ModelTrainingIcon from '@mui/icons-material/ModelTraining';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import SettingsIcon from '@mui/icons-material/Settings';
import RedeemIcon from '@mui/icons-material/Redeem';

interface navListInterface {
    path: string,
    title :string,
    icon: JSX.Element,
}


const navList:navListInterface[] = [
    {
      path:"/home"  ,
      title:"Category",
      icon: <CategoryIcon />,
    },
    {
        path:"/home/brands"  ,
        title:"Brands",
        icon: <LocalOfferIcon />,
    },
    {
        path:"/home/brand-catigory"  ,
        title:"Brand-Category",
        icon: <RedeemIcon />,
    },
  
    {
        path:"/home/products"  ,
        title:"Products",
        icon: <ShoppingCartIcon />,
    },
    {
        path:"/home/sales"  ,
        title:"Sales",
        icon: <MonetizationOnIcon />,
    },
    // {
    //     path:"/home/models"  ,
    //     title:"Models",
    //     icon: <ModelTrainingIcon />,
    // },
    {
        path:"/home/settings"  ,
        title:"Settings",
        icon: <SettingsIcon />,
    },
]

export default navList;