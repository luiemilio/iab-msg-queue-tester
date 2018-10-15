//event listeners.
document.addEventListener('DOMContentLoaded', () => {
    if (typeof fin != 'undefined') {
        fin.desktop.main(onMain);
    }
});

//once the DOM has loaded and the OpenFin API is ready
function onMain() {
    //get a reference to the current Application.
    const app = fin.desktop.Application.getCurrent();

    const msgCounter = document.querySelector('#message-counter');
    const msgsSkipped = document.querySelector('#messages-skipped');
    const resetBtn = document.querySelector('#reset');
    const blockingContext = document.querySelector('#blocking-context');

    //let some JS run so the context gets blocked every half a second
    setInterval(() => {
        blockingContext.innerHTML = Math.random();
        let currentTime = Date.now();
        while (Date.now() < currentTime + 500) {
            ;
        }
    }, 500);

    resetBtn.addEventListener('click', () => {
        msgsSkipped.innerText = 0;
        msgCounter.innerText = 0;
        currentCount = 0;
        skippedMsgs = 0;
    });

    let currentCount = 0;
    let skippedMsgs = 0;
    msgCounter.innerText = currentCount;
    msgsSkipped.innerText = skippedMsgs;

    fin.desktop.InterApplicationBus.subscribe('*', 'counter', (msg) => {
        if (msg === (currentCount + 1)) {
            msgCounter.innerText = msg;
            currentCount++;
        } else {
            console.log(msg);
            msgsSkipped.innerText = ++skippedMsgs;
        }
    });

}
