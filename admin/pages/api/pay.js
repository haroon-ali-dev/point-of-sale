const stripe = require('stripe')(process.env.stripeSK);

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const customer = {
                id: "cus_OCzp6rT2ku8AcY"
            };

            const ephemeralKey = await stripe.ephemeralKeys.create(
                { customer: customer.id },
                { apiVersion: '2022-11-15' }
            );

            const paymentIntent = await stripe.paymentIntents.create({
                amount: +req.body.amount * 100,
                currency: 'gbp',
                customer: customer.id,
                automatic_payment_methods: {
                    enabled: true,
                },
            });

            res.json({
                paymentIntent: paymentIntent.client_secret,
                ephemeralKey: ephemeralKey.secret,
                customer: customer.id,
                publishableKey: 'pk_test_51NQTx9G4clDTLncLfhsu1PSi5hHCGZ7xTnoibyXivJw15kQmBiHUmIeL85Qb6YCyh2V9XlS73PvVt7ocnVyGSu9y00THXgFE3N'
            });
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    } else {
        res.status(500).json({ message: "Method not allowed." });
    }
}