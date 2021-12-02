const pushToTalkKey = 'pushToTalkStatus';
const autoReplyKey = 'autoReplyStatus';
let pushToTalkActive = undefined;
let autoReplyActive = undefined;

async function syncAllFromStorage() {
  let storageRes = await chrome.storage.sync.get([pushToTalkKey]);
  pushToTalkActive = storageRes.pushToTalkStatus;
  storageRes = await chrome.storage.sync.get([autoReplyKey]);
  autoReplyActive = storageRes.autoReplyStatus;
}

syncAllFromStorage();

chrome.storage.onChanged.addListener((changes) => {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    if (key == pushToTalkKey)
      pushToTalkActive = newValue;
    if (key == autoReplyKey)
      autoReplyActive = newValue;
  }
});

