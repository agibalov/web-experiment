chrome.action.onClicked.addListener(async (tab) => {
    if (!tab?.id) {
        return
    }

    await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => alert("Hello from background (Vite+TS)!")
    })
})
