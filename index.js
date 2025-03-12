const axios = require('axios');
const express = require('express');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

// add the stealth plugin
puppeteer.use(StealthPlugin());

(async () => {
    // set up browser environment
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    // navigate to a URL
    await page.goto('http://minecraftcommunitymovie.com', {
        waitUntil: 'networkidle0',
    });

    const html = await page.content();

    console.log(html.split(`<span class="text-secondary-300">`)[1].split(`</span>`)[0]);
    console.log(html.split(`<p>`)[2].split(`</p>`)[0]);
    console.log(html.split(`<span class="text-sm text-secondary-300">`)[1].split(`</span>`)[0])
    
    //repeat 21 times
    for (let i = 0; i < 21; i++) {
        console.log(html.split(`<p class="text-secondary-300 text-center">`)[i + 1].split(`</p>`)[0] + ": " + html.split(`<p class="text-lg font-medium text-secondary-350">`)[i + 1].split(`</p>`)[0]);
    }
    // wait for the challenge to resolve
    await new Promise(function (resolve) {
        setTimeout(resolve, 10000);
    });

    // take page screenshot
    //await page.screenshot({ path: 'screenshot.png' });

    // close the browser instance
    //await browser.close();
})();


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
