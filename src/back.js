let minRepetitionAmount = 3

function dispatchMessage(userMsgList){
  if(!isValid(userMsgList)) return;
  const messageList = userMsgList.map(x => x.message); 
  const normalizedList = clearMsgs(messageList);
  const commonMsg = getCommonMsg(normalizedList);
  if(commonMsg !== undefined){
    sendMsg(commonMsg);
  }
  else
    console.error("Not enough!");
}


function isValid(userMsgList){
  if(userMsgList.length < minRepetitionAmount) 
    return false;
  const userNames = userMsgList.map(x => x.name);
  if(userNames.includes("Tú")) 
    return false;
  return true;
}

function sendMsg(finalMsg){
  let textArea = document.getElementsByTagName('textarea')[0];
  textArea.value = finalMsg;
  pressEnterInElement(textArea);
}

function pressEnterInElement(element) {
  var ev = new KeyboardEvent('keydown', {altKey:false,
      bubbles: true,
      cancelBubble: false, 
      cancelable: true,
      charCode: 0,
      code: "Enter",
      composed: true,
      ctrlKey: false,
      currentTarget: null,
      defaultPrevented: true,
      detail: 0,
      eventPhase: 0,
      isComposing: false,
      isTrusted: true,
      key: "Enter",
      keyCode: 13,
      location: 0,
      metaKey: false,
      repeat: false,
      returnValue: false,
      shiftKey: false,
      type: "keydown",
      which: 13});
  element.dispatchEvent(ev);
}

function clearMsgs(msgList){
   return msgList.map(x => {
    x = x.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    x = x.replace(/ +(?= )/g,'');
    x = x.trim()
    return x;
  });
}

function getCommonMsg(msgList){
  let mostCommon = new Map();
  msgList.forEach(x => {

    if(mostCommon.has(x)){
      const lastAmount = mostCommon.get(x);
      mostCommon.set(x, lastAmount+1)
    }else
      mostCommon.set(x, 1);
    
  })
  const commonMsg = [...mostCommon.entries()].reduce((a, e ) => e[1] > a[1] ? e : a);
  if(commonMsg[1] < minRepetitionAmount) return undefined;
  else return commonMsg[0];
}

let commonList = '[{"name":"Tú","message":"asdf"},{"name":"DAVID ORLANDO RODRÍGUEZ VARGAS","message":"ASD"},{"name":"DAVID ORLANDO RODRÍGUEZ VARGAS","message":"SAD"},{"name":"Tú","message":"a"},{"name":"DAVID ORLANDO RODRÍGUEZ VARGAS","message":"ASD"},{"name":"Tú","message":"asd"},{"name":"DAVID ORLANDO RODRÍGUEZ VARGAS","message":"ASD"},{"name":"Tú","message":"asd"},{"name":"DAVID ORLANDO RODRÍGUEZ VARGAS","message":"SADSA"},{"name":"Tú","message":"asdf"}]';

let testList = JSON.parse(commonList);

dispatchMessage(testList);
