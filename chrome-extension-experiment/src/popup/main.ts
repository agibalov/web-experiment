document.getElementById("btn")!.addEventListener("click", async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    if (!tab?.id) {
        return
    }

    const response = await chrome.tabs.sendMessage(tab.id, { type: "PING" });
    console.log(`response=${response.title}`);

    (document.getElementById("out") as HTMLPreElement).textContent = JSON.stringify(response, null, 2)
})

document.getElementById("btnSendPostToBackend")!.addEventListener("click", async () => {
    const response = await chrome.runtime.sendMessage({ type: "SEND_TO_BACKEND", body: { "iAm": "a teapot"} })
    console.log('Response from background.ts', response)
})
