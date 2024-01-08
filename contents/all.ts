import browser from "webextension-polyfill"

import { Storage } from "@plasmohq/storage"

import { DEVTOOLS_ACTIVE, FLIPPER_STORAGE_KEY } from "../constants"

const storage = new Storage()

storage.get(DEVTOOLS_ACTIVE).then((value) => {
  window.localStorage.setItem(DEVTOOLS_ACTIVE, value)
})

storage.get(FLIPPER_STORAGE_KEY).then((value) => {
  window.localStorage.setItem(FLIPPER_STORAGE_KEY, value)
})

// Listen for changes in the storage
browser.storage.onChanged.addListener((changes, areaName) => {
  console.log("storage changed", changes, areaName)
  if (areaName === "sync" || areaName === "local") {
    if (changes[DEVTOOLS_ACTIVE]) {
      window.localStorage.setItem(
        DEVTOOLS_ACTIVE,
        changes[DEVTOOLS_ACTIVE].newValue
      )
    }
    if (changes[FLIPPER_STORAGE_KEY]) {
      window.localStorage.setItem(
        FLIPPER_STORAGE_KEY,
        changes[FLIPPER_STORAGE_KEY].newValue
      )
    }
  }
})

// proxy messages from the Player plugins to the devtools
window.addEventListener("message", (event) => {
  if (event.source == window && event.data?._messenger_) {
    browser.runtime.sendMessage(event.data).catch((e) => {
      // ignore connection errors
      if (
        e.message ===
        "Could not establish connection. Receiving end does not exist."
      ) {
        return
      }
      console.log("Error sending message to devtools", e)
    })
  }
})

// proxy messages from the devtools to the Player plugins
browser.runtime.onMessage.addListener((message) => {
  try {
    window.postMessage(message, "*")
  } catch (e) {
    console.log("Error sending message to Player", e)
  }
})
