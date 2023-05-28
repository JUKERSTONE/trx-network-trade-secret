export const stripePaymentIntent = async (req: any, res: any) => {
  const stripe = require("stripe")(
    "sk_test_51I6mKCDfXHQFQVOuA3XaPA97HkDujui6poN0rxtlV61N8fwxVOKpqPYKWZy0jNRhx9quwXlKCFU3ta1x6VooVV4M00367GwjOK"
  );

  const amount = req.body.amount;
  const currency = req.body.currency;
  // This example sets up an endpoint using the Express framework.
  // Watch this video to get started: https://youtu.be/rPR2aJ6XnAc.

  // Use an existing Customer ID if this is a returning customer.
  const customer = await stripe.customers.create();
  const ephemeralKey = await stripe.ephemeralKeys.create(
    { customer: customer.id },
    { apiVersion: "2022-11-15" }
  );
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency,
    customer: customer.id,
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.json({
    paymentIntent: paymentIntent.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customer: customer.id,
    publishableKey:
      "pk_test_51I6mKCDfXHQFQVOullPWJg7eYcVE87dBsMUsLNNWUz0h9JxVEGXgNpEwVhlkEwOxZx7c82ga81J6mxm53FWP2G2a00LjjoGjtb",
  });
};
