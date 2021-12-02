const DEFAULT_STATUS = 'disabled';

function onInstallActions() {
  chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ autoReplyStatus: DEFAULT_STATUS });
    chrome.storage.sync.set({ pushToTalkStatus: DEFAULT_STATUS });
  });
}


onInstallActions();
