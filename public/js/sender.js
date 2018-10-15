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

    const receiver = new fin.desktop.Application({
        name: 'receiver',
        uuid: 'receiver',
        url: 'http://localhost:5555/receiver.html',
        autoShow: true
    }, () => {
        receiver.run();
    }, console.error);

    const msgAmt = document.querySelector('#messages');
    const sendMessagesBtn = document.querySelector('#send-messages');
    const recursiveSendMessagesBtn = document.querySelector('#recursive-send-messages');

    function publishMessages() {
        const msgs = msgAmt.value;
        let counter = 1;
        while (counter <= msgs) {
            fin.desktop.InterApplicationBus.publish('counter', counter++);
        }
    }

    function recursivePublishMessages() {
        let counter = 1;
        function sendMsg(counter) {
            const msgs = msgAmt.value;
            fin.desktop.InterApplicationBus.publish('counter', counter++);
            if (counter <= msgs) {
                setTimeout(() => {
                    sendMsg(counter, msgs);
                }, 200);
            }
        }
        sendMsg(counter);
    }

    sendMessagesBtn.addEventListener('click', publishMessages);
    recursiveSendMessagesBtn.addEventListener('click', recursivePublishMessages);
}
