document.getElementById("ping")!.onclick = async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
  if (!tab?.id) return
  const res = await chrome.tabs.sendMessage(tab.id, { type: "PING" })
  document.getElementById("out")!.textContent = JSON.stringify(res, null, 2)
}
