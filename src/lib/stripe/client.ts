import { loadStripe, Stripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
  if (!stripePromise) {
    const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    if (!key) {
      throw new Error('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined');
    }
    stripePromise = loadStripe(key);
  }

  return stripePromise;
};
 // process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_LIVE ??
      //   process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ""