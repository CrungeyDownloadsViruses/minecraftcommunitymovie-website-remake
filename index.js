const axios = require('axios');
const express = require('express');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
let phase = "";
let message = "";
let totalusers = "";
let roles = [];

// add the stealth plugin
puppeteer.use(StealthPlugin());


(async () => {
const browser1 = await puppeteer.launch({headless: true});
    const page1 = await browser1.newPage();

    // navigate to a URL
    await page1.goto('http://minecraftcommunitymovie.com', {
        waitUntil: 'networkidle0',
    });

    const html = await page1.content();

    //console.log(html.split(`<span class="text-secondary-300">`)[1].split(`</span>`)[0]);
    phase = html.split(`<span class="text-secondary-300">`)[1].split(`</span>`)[0];
    
    //console.log(html.split(`<p>`)[2].split(`</p>`)[0]);
    message = html.split(`<p>`)[2].split(`</p>`)[0];
    
    //console.log(html.split(`<span class="text-sm text-secondary-300">`)[1].split(`</span>`)[0])
    totalusers = html.split(`<span class="text-sm text-secondary-300">`)[1].split(`</span>`)[0];
    
    //repeat 21 times
    for (let i = 0; i < 21; i++) {
        //console.log(html.split(`<p class="text-secondary-300 text-center">`)[i + 1].split(`</p>`)[0] + ": " + html.split(`<p class="text-lg font-medium text-secondary-350">`)[i + 1].split(`</p>`)[0]);
        roles.push(html.split(`<p class="text-secondary-300 text-center">`)[i + 1].split(`</p>`)[0] + ": " + html.split(`<p class="text-lg font-medium text-secondary-350">`)[i + 1].split(`</p>`)[0]);
    }
    //console.log(roles);
    // wait for the challenge to resolve
    

    // take page screenshot
    //await page.screenshot({ path: 'screenshot.png' });

    // close the browser instance
    await browser1.close();
})();

setInterval(async () => {
    // set up browser environment
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();

    // navigate to a URL
    await page.goto('http://minecraftcommunitymovie.com', {
        waitUntil: 'networkidle0',
    });

    const html = await page.content();

    //console.log(html.split(`<span class="text-secondary-300">`)[1].split(`</span>`)[0]);
    phase = html.split(`<span class="text-secondary-300">`)[1].split(`</span>`)[0];
    phase = phase.replaceAll(" ","&#8193;");
    //console.log(html.split(`<p>`)[2].split(`</p>`)[0]);
    message = html.split(`<p>`)[2].split(`</p>`)[0];
    message = message.replaceAll(" ","&#8193;");
    //console.log(html.split(`<span class="text-sm text-secondary-300">`)[1].split(`</span>`)[0])
    totalusers = html.split(`<span class="text-sm text-secondary-300">`)[1].split(`</span>`)[0];
    
    //repeat 21 times
    for (let i = 0; i < 21; i++) {
        //console.log(html.split(`<p class="text-secondary-300 text-center">`)[i + 1].split(`</p>`)[0] + ": " + html.split(`<p class="text-lg font-medium text-secondary-350">`)[i + 1].split(`</p>`)[0]);
        roles.push(html.split(`<p class="text-secondary-300 text-center">`)[i + 1].split(`</p>`)[0] + ": " + html.split(`<p class="text-lg font-medium text-secondary-350">`)[i + 1].split(`</p>`)[0]);
    }
    console.log(roles);
    // wait for the challenge to resolve
    

    // take page screenshot
    //await page.screenshot({ path: 'screenshot.png' });

    // close the browser instance
    await browser.close();
}, 60000);


//on go to 127.1.1:3090/ display index.html
const app = express();

app.get('/', (req, res) => {
    //get /index.html
    let document = fs.readFileSync('./index.html', 'utf-8');
    document = document.replace('currentstagevariable', phase);
    document = document.replace('messagevariable', message);
    let rolescode = "";
    for(e = 0; e <= roles.length - 1; e++)
    {
        rolescode = rolescode + `<div style="height: 20px;width: 370px;background: #353535;font-family: mojang-regular;margin-right: 30px;padding: 15px;box-shadow: 5px 5px 0px 0px rgba(0,0,0,0.75);color: lime; margin-bottom: 25px; display: inline-block;">` + roles[e] + `</div>`;
    }
    document = document.replace('insertrolesvar', rolescode);
    res.send(document);
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
