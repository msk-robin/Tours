/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe(
  window.STRIPE_PUBLIC_KEY ||
    'pk_test_51UCtFBGNzjzl2JFfRGdauDU2bhwyWW1SyhbFGS65kdTvFQqAMdqkaMOaInkApsAwfeLPRQWjk0vDrB16sAM5YhON00KoHBlsZo'
);

export const bookTour = async tourId => {
  try {
    // 1) Get checkout session from API
    const session = await axios({
      method: 'GET',
      url: `/api/v1/bookings/checkout-session/${tourId}`,
      withCredentials: true
    });
    // console.log(session);

    // 2) Create checkout form + chanre credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    console.log(err);
    const msg =
      err && err.response && err.response.data && err.response.data.message
        ? err.response.data.message
        : err.message;
    showAlert('error', msg);
  }
};
