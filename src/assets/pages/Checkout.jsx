
import { Form, useForm } from "react-hook-form"
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid2';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
import SimCardRoundedIcon from '@mui/icons-material/SimCardRounded';
import { Button } from '@mui/material';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import {useState } from "react";

import { Card, PaymentContainer, FormGrid } from "./StyleCheckout.js"
import { addOrder } from '../api/OrederServices.js';
import { useSelector } from "react-redux";


export default function Checkout() {
    const [cardNumber, setCardNumber] = useState('');
    const [cvv, setCvv] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [details, setDetails] = useState();
    const products = useSelector((state)=> state.cart.arr)
    const userId = useSelector((state)=>state.user.currentUser?.id)
    const finallPrice = useSelector((state)=>state.cart.sum)
    const token = useSelector((state)=>state.user.token)
    const totalPrice = finallPrice+25



    let { register, handleSubmit, formState:{ errors } } = useForm()

  
    const handleCardNumberChange = (event) => {
      const value = event.target.value.replace(/\D/g, '');
      const formattedValue = value.replace(/(\d{4})(?=\d)/g, '$1 ');
      if (value.length <= 16) {
        setCardNumber(formattedValue);
      }
    };
  
    const handleCvvChange = (event) => {
      const value = event.target.value.replace(/\D/g, '');
      if (value.length <= 3) {
        setCvv(value);
      }
    };
  
    const handleExpirationDateChange = (event) => {
      const value = event.target.value.replace(/\D/g, '');
      const formattedValue = value.replace(/(\d{2})(?=\d{2})/, '$1/');
      if (value.length <= 4) {
        setExpirationDate(formattedValue);
      }
    };
        const saveRegister = async (data) => {

            let date = new Date();
            let targetDate= new Date();
            targetDate.setDate(date.getDate()+7)
            const orderDetails = {
                ...data,
                date,
                targetDate,
                products,
                userId,
                isdispatched: false,
                pricesend: 25,
                finallPrice
                
            };
            console.log("orderDetails: "+ orderDetails)
            try{
                const res = await addOrder(orderDetails, token)
                alert("The order has been placed")
            } catch (err){
                // alert(err)
                // alert(`Error: ${err.message}`);
                alert(`Error: ${err.response?.data?.title || "Unknown Error"}\n\nDetails: ${err.response?.data?.message || err.message}`);

            }
            
            // addOrder(details)
            // .then(res =>{
            //     alert("The order has been placed")
            // }).catch(err => {
            //     alert(err)
            // })
    }
        
  
  return (<>
  <h3>Your products price {finallPrice}</h3>
  <h3>the delivery cost 25</h3>
  <h4>The total price is: {finallPrice+25}</h4>
  <form onSubmit={handleSubmit(saveRegister)} >
    <Grid container spacing={3}>
      <FormGrid size={{ xs: 12 }}>
        <FormLabel htmlFor="address1" >
          Address 
        </FormLabel>
        <OutlinedInput
         id="address"
         {...register("address",{required:{value:true,message:"adress is required"}})}
          name="address"
          type="text"
          placeholder="Street name and number"
          autoComplete="shipping address-line1"
          required
          size="small"
        />
      </FormGrid>
      <FormGrid size={{ xs: 6 }}>
        <FormLabel htmlFor="city" required>
          City
        </FormLabel>
        <OutlinedInput
          id="city"
          {...register("city",{required:{value:true,message:"city is required"}})}
          name="city"
          type="text"
          placeholder="New York"
          autoComplete="City"
          required
          size="small"
        />
      </FormGrid>
   
      <FormGrid size={{ xs: 6 }}>
        <FormLabel htmlFor="zip" required>
          Zip / Postal code
        </FormLabel>
        <OutlinedInput
          id="zip"
          {...register("zip",{required:{value:true,message:"zip is required"}})}
          name="zip"
          type="number"
          placeholder="12345"
          autoComplete="shipping postal-code"
          required
          size="small"
        />
      </FormGrid>
      <FormGrid size={{ xs: 6 }}>
        <FormLabel htmlFor="country" required>
          Country
        </FormLabel>
        <OutlinedInput
          id="country"
          {...register("country",{required:{value:true,message:"adress is required"}})}
          name="country"
          type="text"
          placeholder="United States"
          autoComplete="shipping country"
          required
          size="small"
        />
      </FormGrid>
    </Grid>
   
    <Stack spacing={{ xs: 3, sm: 6 }} useFlexGap>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <PaymentContainer>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="subtitle2">Credit card</Typography>
              <CreditCardRoundedIcon sx={{ color: 'text.secondary' }} />
            </Box>
            <SimCardRoundedIcon
              sx={{
                fontSize: { xs: 48, sm: 56 },
                transform: 'rotate(90deg)',
                color: 'text.secondary',
              }}
            />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                gap: 2,
              }}
            >
              <FormGrid sx={{ flexGrow: 1 }}>
                <FormLabel htmlFor="card-number" required>
                  Card number
                </FormLabel>
                <OutlinedInput
                  id="card-number"
                  autoComplete="card-number"
                  placeholder="0000 0000 0000 0000"
                  required
                  size="small"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                />
              </FormGrid>
              <FormGrid sx={{ maxWidth: '20%' }}>
                <FormLabel htmlFor="cvv" required>
                  CVV
                </FormLabel>
                <OutlinedInput
                  id="cvv"
                  autoComplete="CVV"
                  placeholder="123"
                  required
                  size="small"
                  value={cvv}
                  onChange={handleCvvChange}
                />
              </FormGrid>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormGrid sx={{ flexGrow: 1 }}>
                <FormLabel htmlFor="card-name" required>
                  Name
                </FormLabel>
                <OutlinedInput
                  id="card-name"
                  autoComplete="card-name"
                  placeholder="John Smith"
                  required
                  size="small"
                />
              </FormGrid>
              <FormGrid sx={{ flexGrow: 1 }}>
                <FormLabel htmlFor="card-expiration" required>
                  Expiration date
                </FormLabel>
                <OutlinedInput
                  id="card-expiration"
                  autoComplete="card-expiration"
                  placeholder="MM/YY"
                  required
                  size="small"
                  value={expirationDate}
                  onChange={handleExpirationDateChange}
                />
              </FormGrid>
            </Box>
          </PaymentContainer>
          <FormControlLabel
            control={<Checkbox name="saveCard" />}
            label="Remember credit card details for next time"
          />
        </Box> 
    </Stack>
    <Button
    type="submit"
        variant="contained"
        endIcon={<ChevronRightRoundedIcon />}
        // onClick={handleNext}
        sx={{ width: { xs: '100%', sm: 'fit-content' } }}
        >
          Place Order
        </Button>
        </form>
    </>
  );
}


