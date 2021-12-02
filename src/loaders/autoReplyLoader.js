const classMess = "GDhqjd";
const classNameMess = "YTbUzc";
const classNameContent = "oIy2qc";

let numMsgNormal = 0;
let lastMsg = [];
let numMsg = 0;
let isPause = false;
let interval;

function getLastMessages(numm, seconds) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(() => {
        lastMsg = [...document.getElementsByClassName(classMess)].slice(numm - numMsg);
        lastMsg = lastMsg.map((item) => {
          const name = item.getElementsByClassName(classNameMess)[0].innerText;
          const message = item.getElementsByClassName(classNameContent)[0].innerText;
          const time = parseInt(item.dataset.timestamp);
          return {
            name: name,
            message: message,
            time: new Date(time),
          }
        })
        numMsgNormal = document.getElementsByClassName(classMess).length;
        isPause = false;
        return lastMsg;
      });

    }, seconds * 1000);
  })
}

function initBot(seconds = 10, minRepetitionAmount = 3) {
  interval = setInterval(() => {
    numMsg = document.getElementsByClassName(classMess).length;
    if (numMsg > numMsgNormal && !isPause) {
      isPause = true;
      let numm = numMsgNormal;
      numMsgNormal = numMsg;
      getLastMessages(numm, seconds).then((data) => {
        dispatchMessage(data(), minRepetitionAmount)
      })
    }
  }, 1000);
}

function stopBot() {
  clearInterval(interval);
}

//Manually start the bot
// TODO: Integrate this method with buttons properly
initBot();
