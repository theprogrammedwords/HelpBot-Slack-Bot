const slackBot = require('slackbots')
const axios = require('axios')
const fs = require('fs');

const bot = new slackBot({
    token : 'xoxb-2244715784852-2251598553825-fqvEMqsAX6FbfgluiHN4IKng',
    name : 'helpbot'
})

// start handler

bot.on('start', ()=>{
    const params = {
        icon_emoji: ':cat:'

    }

    bot.postMessageToChannel(
        'random', 
        'Meow, I am here with you for boosting your morale. 🥺', 
        params
        );

    bot.on('error', (err) => 
        console.log(err));

    bot.on('message', (data) => {

        if(data.type != 'message'){
            return;
        }

        handleMessage(data.text);
    })

    function handleMessage(message){
        if(message.includes(' advice')){
            handleAdvices();
        }
        if(message.includes(' affirmation')){
            handleAffirmation();
        }
        if(message.includes(' quotes')){
            handleQuotes();
        }
        if(message.includes(' help')){
            handleHelp();
        }
    }
})

function handleAdvices(){

    axios.get('https://api.adviceslip.com/advice')
    .then(res =>{
        const advice = res.data.slip.advice;

        const params = {
            icon_emoji: ':cat:'
        }
    
        bot.postMessageToChannel(
            'random', 
            `Advice : ${advice} 🥺👉👈`, 
            params
        );    
    })
}
function handleAffirmation(){

    axios.get('https://www.affirmations.dev')
    .then(res =>{
        const affirmation = res.data.affirmation;

        const params = {
            icon_emoji: ':cat:'
        }
    
        bot.postMessageToChannel(
            'random', 
            `Affirmation : ${affirmation} 😇👩🏻‍💻`, 
            params
        );    
    })
}
function handleQuotes(){

    axios.get("https://type.fit/api/quotes")
    .then(res =>{
        const rand = Math.floor(Math.random()*1000);
        const quotes = res.data[rand].text;
        
        const params = {
            icon_emoji: ':cat:'
        }
    
        bot.postMessageToChannel(
            'random', 
            `Quote : ${quotes} 🤔`, 
            params
        );    
    })
}
function handleHelp(){

        const params = {
            icon_emoji: ':cat:'
        }

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
    
        bot.postMessageToChannel(
            'random', 
            `Please use keywords 'advice' or 'quotes' or 'affirmation' to get good vibes. 😺`, 
            params
        );    
}
