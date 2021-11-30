const statusDictionary = {
  enabled: "green",
  disabled: "red"
}

let pushToTalkButton = document.getElementById("pushToTalkButton");
let autoReplyButton = document.getElementById("autoReplyButton");

setStatusListener(pushToTalkButton, "pushToTalkStatus", togglePushToTalk);
setStatusListener(autoReplyButton, "autoReplyStatus", toggleAutoReply)

function setStatusListener(button, status, toggleFunction) {
  button.addEventListener('click', toggleFunction);
  button.status = status;
}

function changeToNextStatus(actualStatus) {
  return (actualStatus === 'enabled') ? 'disabled' : 'enabled'
}

async function togglePushToTalk() {
  pushToTalkStatus = pushToTalkButton.status;
  const storageRes = await chrome.storage.sync.get([pushToTalkStatus]);
  const actualStatus = storageRes.pushToTalkStatus;
  const newStatus = changeToNextStatus(actualStatus);
  await chrome.storage.sync.set({ pushToTalkStatus: newStatus });
  syncAllFromStorage()
}

async function toggleAutoReply() {
  autoReplyStatus = autoReplyButton.status;
  const storageRes = await chrome.storage.sync.get([autoReplyStatus]);
  const actualStatus = storageRes.autoReplyStatus;
  const newStatus = changeToNextStatus(actualStatus);
  await chrome.storage.sync.set({ autoReplyStatus: newStatus });
  syncAllFromStorage()
}

function syncAllFromStorage() {
  chrome.storage.sync.get([pushToTalkButton.status], (res) => {
    const status = res.pushToTalkStatus;
    changeColorStatus(pushToTalkButton, status);
  });
  chrome.storage.sync.get([autoReplyButton.status], (res) => {
    const status = res.autoReplyStatus;
    changeColorStatus(autoReplyButton, status);
  })
}

function changeColorStatus(element, status) {
  const color = statusDictionary[status];
  element.style.backgroundColor = color;
  element.textContent = status;
}

syncAllFromStorage()
