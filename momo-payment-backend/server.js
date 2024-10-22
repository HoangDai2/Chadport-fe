const { urlencoded } = require('body-parser');
const express = require('express');
const app = express();
const axios = require('axios');
const crypto = require('crypto');
const config = require('./config');
const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
}));
app.use(express.json());
app.use(urlencoded({ extended: true }));

// Endpoint thanh toán
app.post('/payment', async (req, res) => {
    console.log('Received payment data:', req.body);

    const {
        firstName,
        lastName,
        country,
        address1,
        address2,
        phone,
        email,
        amount,
        orderId,
        productName,
        productQuantity,
        productPrice,
        productImage
    } = req.body;

    const extraData = Buffer.from(JSON.stringify({
        firstName,
        lastName,
        country,
        address1,
        address2,
        phone,
        email,
        productName,
        productQuantity,
        productPrice,
        productImage
    })).toString('base64');

    const { accessKey, secretKey, partnerCode, redirectUrl, ipnUrl, requestType } = config;

    const requestId = orderId;
    const rawSignature =
        `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}` +
        `&orderId=${orderId}&orderInfo=Thanh toán MoMo&partnerCode=${partnerCode}` +
        `&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;

    const signature = crypto
        .createHmac('sha256', secretKey)
        .update(rawSignature)
        .digest('hex');

    const requestBody = {
        partnerCode,
        requestId,
        amount,
        orderId,
        orderInfo: "Thanh toán MoMo",
        redirectUrl,
        ipnUrl,
        requestType,
        extraData,
        signature,
    };

    console.log('Request Body gửi đến MoMo:', requestBody);

    const options = {
        method: 'POST',
        url: 'https://test-payment.momo.vn/v2/gateway/api/create',
        headers: { 'Content-Type': 'application/json' },
        data: requestBody,
    };

    try {
        const result = await axios(options);
        console.log('Response từ MoMo:', result.data);

        if (result.data && result.data.payUrl) {
            res.status(200).json(result.data);
        } else {
            res.status(400).json({ message: 'Failed to create MoMo payment', error: result.data });
        }
    } catch (error) {
        console.error('Error creating MoMo payment:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

// Endpoint callback từ MoMo
app.post('/callback', async (req, res) => {
    try {
        console.log('Received callback:', req.body);
        const { orderId, resultCode } = req.body;
        if (resultCode === 0) {
            const existingBill = await axios.get(`http://localhost:3000/bills?orderId=${orderId}`);
            if (existingBill.data.length === 0) {
                await axios.post('http://localhost:5000/create-bill', req.body);
            }
        }

        res.status(204).send();
    } catch (error) {
        console.error('Error in callback:', error);
        res.status(500).json({ message: 'Callback error' });
    }
});

// Kiểm tra trạng thái giao dịch
app.post('/check-status-transaction', async (req, res) => {
    const { orderId } = req.body;
    const secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
    const accessKey = 'F8BBA842ECF85';

    const rawSignature = `accessKey=${accessKey}&orderId=${orderId}&partnerCode=MOMO&requestId=${orderId}`;

    const signature = crypto
        .createHmac('sha256', secretKey)
        .update(rawSignature)
        .digest('hex');

    const requestBody = JSON.stringify({
        partnerCode: 'MOMO',
        requestId: orderId,
        orderId,
        signature,
        lang: 'vi',
    });

    const options = {
        method: 'POST',
        url: 'https://test-payment.momo.vn/v2/gateway/api/query',
        headers: {
            'Content-Type': 'application/json',
        },
        data: requestBody,
    };

    try {
        const result = await axios(options);
        res.status(200).json(result.data);
    } catch (error) {
        console.error('Error checking transaction:', error);
        res.status(500).json({ message: 'Error checking transaction' });
    }
});

// Endpoint tạo hóa đơn
app.post('/create-bill', async (req, res) => {
    try {
        const { orderId } = req.body;
        const existingBill = await axios.get(`http://localhost:3000/bills?orderId=${orderId}`);
        if (existingBill.data.length > 0) {
            return res.status(400).json({ message: 'Bill already exists' });
        }

        const {
            productName,
            productQuantity,
            productPrice,
            amount,
            firstName,
            lastName,
            address1,
            address2,
            country,
            phone,
            email,
            date_create,
            productImage
        } = req.body;

        const newBill = {
            orderId,
            productName,
            productQuantity,
            productPrice,
            amount,
            firstName,
            lastName,
            address1,
            address2,
            country,
            phone,
            email,
            date_create,
            productImage
        };

        const response = await axios.post('http://localhost:3000/bills', newBill);

        res.status(201).json({ message: 'Bill created successfully', bill: response.data });
    } catch (error) {
        console.error('Error creating bill:',
            error);
        res.status(500).json({ message: 'Error creating bill' });
    }
});
app.listen(5000, () => {
    console.log('Server is running at port 5000');
});
