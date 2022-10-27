let addButton = document.getElementById("addButton");
let sendButton = document.getElementById("sendButton");
let messageBox = document.getElementById("Message");
let numberBox = document.getElementById("Number");
let table = document.getElementById("Table");

let objects = [];

addButton.onclick = function(){
    let message = messageBox.value;
    let number = numberBox.value;
    let row = table.insertRow(-1);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    cell1.innerHTML = number;
    cell2.innerHTML = message;

    objects.push({number: number,message:message});
};


sendButton.onclick = async function(){
    let newWindow = await chrome.windows.create({url: "https://web.whatsapp.com/"});
    let tabID = newWindow.tabs[0].id;
    console.log(tabID);
    
    for(const element of objects){
        await send(tabID,element.number,element.message);
        console.log("Sent");
    }

};


function send(tabID,number,message){
    console.log("number: " + number + ", message: " + message);

    let URL = `https://web.whatsapp.com/send/?phone=${number}&text=${message}&source&data&app_absent`;

    chrome.scripting.executeScript({target: {tabId: tabID},func:redirect,args:[URL]},()=>{});

    setTimeout(() => {
        chrome.scripting.executeScript({target: {tabId: tabID},func: pressButton},()=>{});
    }, 2000);
    

    return new Promise(resolve => setTimeout(resolve, 20000));

}


function redirect(url){
    console.log("Redirecting");
    window.location.replace(url);
}

function pressButton(){
    console.log("copium");
    setTimeout(() => {
        let button = document.getElementsByClassName("tvf2evcx oq44ahr5 lb5m6g5c svlsagor p2rjqpw5 epia9gcq")[0];
        if(button != undefined){
            button.click();
        }else{
            alert("Error could not send");
        }
        
        console.log("copium2");
    }, 10000);
    
}