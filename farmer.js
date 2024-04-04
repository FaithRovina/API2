// Store produce and their quantities
let produceInventory = {
  apple: 10,
  banana: 15,
  orange: 20,
  grape: 8,
  strawberry: 12,
  watermelon: 6,
  pineapple: 10,
  kiwi: 14,
  pear: 18,
  peach: 9
};

app.get('/api/produce', async (req, res) => {
    try {
        const { type, quantity } = req.query;
        if (!type || !quantity || isNaN(quantity)) {
            return res.status(400).json({ error: 'Invalid request parameters.' });
        }

        if (!produceInventory.hasOwnProperty(type)) {
            return res.status(404).json({ error: 'Produce type not found.' });
        }

        const remainingAmount = produceInventory[type];
        if (quantity > remainingAmount) {
            return res.json({ message: `Sorry, only ${remainingAmount} ${type}(s) available.` });
        }

        // Remove negative numbers
        if (quantity <= 0) {
            return res.status(400).json({ error: 'Invalid quantity.' });
        }

        produceInventory[type] -= quantity;
        res.json({ message: `${quantity} ${type}(s) purchased successfully.` });
    } catch (error) {
        console.error('Error fetching produce:', error);
        res.status(500).json({ error: 'An error occurred while fetching produce.' });
    }
});

app.get('/api/pay', (req, res) => {
    res.json({ message: 'Your payment was successful' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});