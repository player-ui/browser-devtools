import { Panel } from "@player-tools/devtools-client"
import type { CommunicationLayerMethods } from "@player-tools/devtools-types"
import React from "react"
import { ErrorBoundary } from "react-error-boundary";
import { createRoot } from 'react-dom/client';

import browser from "webextension-polyfill"

const port = browser.runtime.connect()

const communicationLayer: CommunicationLayerMethods = {
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

const container = document.getElementById("root");
const root = createRoot(container);


root.render(
  <ErrorBoundary fallback={"Something went wrong"}>
    <Panel communicationLayer={communicationLayer} />
    </ErrorBoundary>
);