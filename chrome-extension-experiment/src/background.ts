chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    (async () => {
        if (message.type === "SEND_TO_BACKEND") {
            const response = await fetch("http://localhost:8080/hello", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(message.body)
            })
            const data = await response.json()
            console.log('Got response from backend:', data)

            sendResponse({ status: response.status, data })
        }
    })()
    return true
})
