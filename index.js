const chatInput = document.querySelector(".chat-input textarea");
const sendchatbtn = document.querySelector(".chat-input i");
const chatbox = document.querySelector(".chatbox");
let userMesg;
const API_KEY ="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";
const createChatLi = (msg, className) =>{
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatcontent = className==="outgoing" ?`<p>${msg}</p>`:`<i class="fa-solid fa-robot"></i><p>${msg}</p>`
    chatLi.innerHTML = chatcontent;
    return chatLi;
}

const generateResponse =(incomingChatLi)=>{

    const API_url = "https://api.openai.com/v1/chat/completions";
    const msgElement = incomingChatLi.querySelector("p");
    const requestOptions = {
        method: "POST",
        headers: {
            "content-type":"application/json",
            "Authorization":`Bearer${API_KEY}`
        },
        body: JSON.stringify({
            model:"gpt-3.5-turbo",
            message:[{role:"user",content:userMesg}]
        })

    }
    fetch(API_url,requestOptions).then(res =>res.json()).then(data =>{
        msgElement.textContent= data.choices[0].message.content;
        // console.log(data)
    }).catch((error)=>{
        msgElement.textContent= "OOps! Something went wrong. Please try again.";
    }).finally(()=>chatbox.scrollTo(0, chatbox.scrollHeight))
}
const handleChat = () =>{
    userMesg = chatInput.value.trim();
    if(!userMesg) return;

    createChatLi(userMesg , "outgoing");
    chatbox.appendChild(createChatLi(userMesg, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight)

    setTimeout(() =>{
        const incomingChatLi = createChatLi("Thinking.....", "incoming")
        chatbox.appendChild(incomingChatLi);
        generateResponse(incomingChatLi);
    },600);
}
sendchatbtn.addEventListener("click", handleChat);
