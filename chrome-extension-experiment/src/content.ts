chrome.runtime.onMessage.addListener((m, _s, send) => {
    if (m.type === "PING") {
        console.log('content.ts - got PING')
        send({ title: document.title })
    }
    return true
})
