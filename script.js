const typingTest=document.querySelector('.typing-text p');
const input=document.querySelector('.wrapper .input-field');
const time=document.querySelector('.time span b');
const mistakes=document.querySelector('.mistake span');
const wpm=document.querySelector('.wpm span');
const cpm=document.querySelector('.cpm span');
const btn=document.querySelector('button');

//set values
let timer;
let maxTime=60;
let timeLeft=maxTime;
let charIndex=0;
let mistake=0;
let isTyping=false;



function loadParagraph(){
    const paragraph=[ " Avoid daydreaming about the years to come.","You are the most important person in your whole life."
        ,"Always be true to who you are, and ignore what other people have to say about you.",
        "Always be true to who you are, and ignore what other people have to say about you."
        ,"Only demonstrate your strength when it’s really required."];

        const randomIndex=Math.floor(Math.random()*paragraph.length);
        typingTest.innerHTML='';
        for(const char of paragraph[randomIndex]){
            typingTest.innerHTML+= `<span>${char}</span>`;
        }
        typingTest.querySelectorAll('span')[0].classList.add('active');
        document.addEventListener('keydown',()=>input.focus());
        typingTest.addEventListener("click",()=>{
            input.focus();
        })
}

loadParagraph();


//handle user input

function initTyping(){
    const char=typingTest.querySelectorAll('span');
    const typedChar=input.value.charAt(charIndex);
    if(charIndex <char.length && timeLeft>0){
     
        if(!isTyping){
           timer=setInterval(initTime,1000);
           isTyping=true;
        }

        if(char[charIndex].innerHTML===typedChar){
            char[charIndex].classList.add('correct');
            // console.log("correct");
        }else{
            mistake++;
            char[charIndex].classList.add('incorrect');
            // console.log("incorrect");
        }
        charIndex++;
        char[charIndex].classList.add('active');
        mistakes.innerHTML=mistake;
        cpm.innerHTML=charIndex-mistake;

    }else{
     clearInterval(timer);
     input.value=" ";
    }
}

//for timer
function initTime(){
    if(timeLeft>0){
        timeLeft--;
        time.innerHTML=timeLeft;
        let wpmval=Math.round(((charIndex-mistake)/5)/(maxTime- timeLeft)*60);
        wpm.innerHTML=wpmval;
    }else{
        clearInterval(timer);
    }
}
input.addEventListener("input",initTyping);
btn.addEventListener("click",reset);
function reset(){
    loadParagraph();
    clearInterval(timer);
    timeLeft=maxTime;
    time.innerHTML=timeLeft;
    charIndex=0;
     mistake=0;
     isTyping=false;
     wpm.innerHTML=0;
     cpm.innerHTML=0;
     mistakes.innerHTML=0;
}
