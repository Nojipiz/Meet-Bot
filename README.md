# 🤖 Meet-Bot

## 📝 Description

Bot that help you to answer in class

## 🛠️ How to use auto reply.

You should run the bot opening the navigator console then copy and paste the `src/services/messageService.js` content, then copy and
paste `src/loaders/autoReplyLoader.js` content and run the bot with the next commands:

````
initBot() -> start the bot with default settings (10s to reply and 3 minimum repetition of the same message)
initBot(time) -> start the bot with the time in seconds to reply.
initBot(time, minRep) -> start the bot with the time in seconds to reply and the minimum repetition of the same message.
````

If you want stop the bot, just run the `stopBot()` function.

## 🛠️ How to install push to talk extension (Google Chrome).

First, you need download or clone this repository.  
Then you should go to the [Chrome extensions page](chrome://extensions) and click on the **Enable Developer mode**
button.  
Then click on the **Load unpacked extension** button and select the `src` folder.  
Then click on the **Select Folder** button.

In this way, you can refresh your page [Meet meeting](https://meet.google.com)  and the extension will be installed.

To unmute the microphone, you should hold pressed the `v` key and then to mute the microphone, you should release
the `v` key.

### 🎙️ How to use push to talk without extension (only for devs).

> PTK: Push to talk

You should run the PTK, opening the navigator console then copy and paste the `src/loaders/pushToTalk.js` content.  
To use the PTK, you should press the `v` key to activate the microphone and the `v` key again to deactivate the
microphone.


