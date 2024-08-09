require('dotenv').config();
const Razorpay = require('razorpay');
const twilio = require('twilio');


const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);


const supportedCurrencies = ['INR', 'USD', 'EUR', 'GBP', 'AUD'];


const generatePaymentLink = async (req, res) => {
    const { amount, currency, phone, description } = req.body;

    if (!supportedCurrencies.includes(currency)) {
        return res.status(400).json({ error: 'Unsupported currency' });
    }

    try {
        
        const response = await razorpay.invoices.create({
            type: 'link',
            amount: amount * 100, 
            currency,
            description,
            customer: {
                contact: phone
            }
        });

        const paymentLink = response.short_url;

    
        await twilioClient.messages.create({
            body: `Your payment link is: ${paymentLink}`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: phone
        });

        res.status(200).json({ paymentLink });
    } catch (error) {
        console.error('Error generating payment link:', error);
        res.status(500).json({ error: 'Failed to generate payment link', details: error.message });
    }
};

module.exports = {
    generatePaymentLink
};
