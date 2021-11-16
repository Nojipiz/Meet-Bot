let numMessNormal = 0;
const classMess = "GDhqjd";
const classNameMess = "YTbUzc";
const classNameContent = "oIy2qc";
let lastMess = [];
let numMess = 0;
let isPause = false;
let interval;

function getLastMessages(numm) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(() => {
                lastMess = [...document.getElementsByClassName(classMess)].slice(numm - numMess);
                lastMess = lastMess.map((item) => {
                    const name = item.getElementsByClassName(classNameMess)[0].innerText;
                    const message = item.getElementsByClassName(classNameContent)[0].innerText;
                    return {
                        name: name,
                        message: message
                    }
                })
                numMessNormal = document.getElementsByClassName(classMess).length;
                isPause = false;
                return lastMess;
            });
        }, 10000);
    })
}

function initBot() {
    interval = setInterval(() => {
        numMess = document.getElementsByClassName(classMess).length;
        if (numMess > numMessNormal && !isPause) {
            isPause = true;
            let numm = numMessNormal;
            numMessNormal = numMess;
            getLastMessages(numm).then((data) => {
                dispatchMessage(data())
            })
        }
    }, 1000);
}

function stopBot() {
    clearInterval(interval);
}
