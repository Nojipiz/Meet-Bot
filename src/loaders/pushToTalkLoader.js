let vKeyActive = true;



document.onkeypress = (e) => {
  if (!isValidEnv()) return;
  if (vKeyActive && e.code === 'KeyV') {
    vKeyActive = false;
    pushToTalk();
  }
}

document.onkeyup = (e) => {
  if (!vKeyActive && e.code === 'KeyV') {
    vKeyActive = true;
    pushToTalk();
  }
}

function isValidEnv() {
  if (pushToTalkActive == undefined || pushToTalkActive === 'disabled') return false;
  let focusElement = document.activeElement;
  return focusElement.type !== 'textarea';
}

function pushToTalk() {
  let ev = new KeyboardEvent('keydown', {
    altKey: false,
    bubbles: true,
    cancelBubble: false,
    cancelable: true,
    charCode: 100,
    code: "KeyD",
    composed: false,
    ctrlKey: true,
    currentTarget: null,
    defaultPrevented: true,
    detail: 0,
    eventPhase: 0,
    isComposing: false,
    isTrusted: true,
    key: "d",
    keyCode: 100,
    location: 100,
    metaKey: false,
    repeat: false,
    returnValue: false,
    shiftKey: false,
    type: "keydown",
    which: 100
  });
  document.getElementsByClassName("p2hjYe TPpRNe")[0].dispatchEvent(ev);
}
