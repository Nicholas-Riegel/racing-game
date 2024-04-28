const express = require('express')
const app = express()
const port = 3000

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Define route for the main game page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, ()=>{
    console.log(`App listenning on port ${port}`);
})