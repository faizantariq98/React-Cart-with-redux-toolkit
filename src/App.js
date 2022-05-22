import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import {useSelector,useDispatch} from 'react-redux'
import { useEffect,Fragment } from 'react';
import Notification from './components/UI/Notification';
import { sendCartData, fetchCartData} from './components/store/cart-actions';


let isInital=true;
function App() {
  const showCart=useSelector(state=>state.ui.cartIsVisible)
  const cart=useSelector((state)=>state.cart)
  const dispatch= useDispatch()
  const notification=useSelector(state=>state.ui.notification)
  useEffect(()=>{
    dispatch(fetchCartData())
  },[dispatch])
  useEffect(()=>{

    if(isInital){
      isInital=false;
      return; 
    }
    if(cart.changed){
      dispatch(sendCartData(cart));
    }
    
  },
  [cart,dispatch])

  return (
    <Fragment >
      {notification && <Notification 
      status={notification.status}
      title={notification.title}
      message={notification.message}
      /> }
    <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
    </Fragment>
  );
}

export default App;
