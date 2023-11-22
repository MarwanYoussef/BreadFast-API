const express = require('express')
const app = express()
const port = 3000
const axios = require('axios')
const redis = require('redis')

const client = redis.createClient();
const CACHE_EXPIRATION_TIME= 60 * 60;

app.get(`/book/:isbn`, async (req, res) => {
    const { isbn } = req.params;
    const cacheKey = `book:${isbn}`;

    client.get(cacheKey, async (error, cachedData) => {
        if (error)
            console.log("Error retrieving data from cache:", error);

        if (cachedData) {
            const bookName = JSON.parse(cachedData);
            res.json({ bookName });
        } else {
            const apiURL = `https://openlibrary.org/isbn/${isbn}.json`;

            try {
                const response = await axios.get(apiURL);
                const bookData = response.data;
                const bookName = bookData.title;
        
                client.setex(cacheKey, CACHE_EXPIRATION_TIME, JSON.stringify(bookName));
                res.json({ bookName });
            } catch (err) {
                res.status(404).json({
                    error: "Book cannot be found"
                })
            }
        }
    });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})