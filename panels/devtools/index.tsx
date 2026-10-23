import { Panel } from "@player-devtools/client-react"
import type {
  ExtensionSupportedEvents,
  MessengerOptions
} from "@player-devtools/types"
import React, { Suspense } from "react"
import { createRoot } from "react-dom/client"
import browser from "webextension-polyfill"

const port = browser.runtime.connect()

const communicationLayer: Pick<
  MessengerOptions<ExtensionSupportedEvents>,
  "sendMessage" | "addListener" | "removeListener"
> = {
  sendMessage: async (message) =>
    port.postMessage({
      tabId: browser.devtools.inspectedWindow.tabId,
      body: message
    }),
  addListener: (callback) => {
    port.onMessage.addListener(({ body }) => callback(body))
  },
  removeListener: (callback) => {
    port.onMessage.removeListener(callback)
  }
}

createRoot(document.getElementById("root")!).render(
  <Suspense fallback={null}>
    <Panel communicationLayer={communicationLayer} />
  </Suspense>
)
