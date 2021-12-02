let minRepetition = 3;

function dispatchMessage(userDataList, minRepetition) {
  if (!isValid(userDataList)) return;
  this.minRepetition = minRepetition;
  const msgList = userDataList.map(x => x.message);
  const normalizedMsgList = clearMsgs(msgList);
  const commonMsg = getCommonMsg(normalizedMsgList);
  if (commonMsg !== undefined)
    sendMsg(commonMsg);
  else
    console.error("Not enough!");
}

function isValid(userMsgList) {
  if (autoReplyActive == undefined || autoReplyActive === 'disabled')
    return false;
  if (userMsgList.length < minRepetition)
    return false;
  if (!isValidDate(userMsgList[userMsgList.length - 1]))
    return false;
  const userNames = userMsgList.map(x => x.name);
  return !userNames.includes("Tú");
}

function isValidDate(lastUser) {
  const localTime = new Date();
  const lastTime = lastUser.time;
  const difftimeSeconds = (localTime - lastTime) / 1000;
  return difftimeSeconds < 120;
}

function sendMsg(finalMsg) {
  const textArea = document.getElementsByTagName('textarea')[0];
  textArea.value = finalMsg;
  pressEnterInElement(textArea);
}

function clearMsgs(msgList) {
  return msgList.map(x => {
    return normalizeMsg(x);
  });
}

function normalizeMsg(message) {
  message = message.replace(/ +(?= )/g, '')
    .trim()
    .toLowerCase()
    .replace('ñ', '\001');
  message = message.normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace('\001', 'ñ');
  return message;
}

function getCommonMsg(msgList) {
  let mostCommon = new Map();
  msgList.forEach(x => {

    if (mostCommon.has(x)) {
      const lastAmount = mostCommon.get(x);
      mostCommon.set(x, lastAmount + 1)
    } else
      mostCommon.set(x, 1);

  })
  const commonMsg = [...mostCommon.entries()].reduce((a, e) => e[1] > a[1] ? e : a);
  if (commonMsg[1] < minRepetition) return undefined;
  else return commonMsg[0];
}

function pressEnterInElement(element) {
  var ev = new KeyboardEvent('keydown', {
    altKey: false,
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
    which: 13
  });
  element.dispatchEvent(ev);
}

