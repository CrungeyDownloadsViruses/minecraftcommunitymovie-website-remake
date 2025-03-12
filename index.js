const axios = require('axios');
const express = require('express');
const fs = require('fs');
const path = require('path');

//on go to 127.1.1:3090/ display index.html
const app = express();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
    console.log('hi');
});

app.get('/mctitle', (req, res) => {
    res.sendFile(path.join(__dirname, 'mctitle.png'));
});

app.get('/mcbg', (req, res) => {
    res.sendFile(path.join(__dirname, 'mcbg.png'));
});
app.get('/dc', (req, res) => {
    res.sendFile(path.join(__dirname, 'dc.png'));
});
app.get('/trailer', (req, res) => {
    res.sendFile(path.join(__dirname, 'trailer.mp4'));
});

app.get('/mojang-regular', (req, res) => {
    res.sendFile(path.join(__dirname, 'mojang-regular.ttf'));
});

app.get('/mojang-bold', (req, res) => {
    res.sendFile(path.join(__dirname, 'mojang-bold.ttf'));
});

app.get('/reddit', (req, res) => {
    res.sendFile(path.join(__dirname, 'reddit.png'));
});

app.listen(3090, () => {
    console.log('Server is running on port 3090');
});
