import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";

export const fetchCartData = ()=>{
    return async dispatch=>{
        const fetchData= async()=>{
            const response=await fetch('https://react-redux-c4fba-default-rtdb.firebaseio.com/cart.json');

            if(!response.ok){
                throw new Error('Could not Fetch cart Data');
            }

            const data=await response.json();
            return data;
        }

        try{
           const cartData=await fetchData()
           dispatch(cartActions.replaceCart(cartData))
    }
        catch(error){
            dispatch(uiActions.showNotification({
                status:'Error',
                title:'Error!!',
                message:'fetching Cart Data Failed'
              }))
        }
    }
}
export const sendCartData= (cart)=>{
    return async(dispatch)=>{
        dispatch(uiActions.showNotification({
            status:'pending...',
            title:'Sending Data..',
            message:'Data is being sent'
          }));

          const sendrequest=async ()=>{
            
            const response=await fetch('https://react-redux-c4fba-default-rtdb.firebaseio.com/cart.json',{
            method:'PUT',
            body:JSON.stringify({
                items:cart.items,
                totalQuantity:cart.totalQuantity
            })
            });
      
            if(!response.ok){
              throw new Error('sending cart data FAiled..');
            }
          };

          try{
            await sendrequest()
            dispatch(uiActions.showNotification({
                status:'success...',
                title:'DATA sent',
                message:'Data is sent successfully'
              }))
          }
          catch(error){
            sendCartData().catch((error)=>{
                dispatch(uiActions.showNotification({
                  status:'Error',
                  title:'Error!!',
                  message:'Sending Cart Data Failed'
                }))
              })
          }
          
    };  
};