import React from "react"

import { useStorage } from "@plasmohq/storage/hook"

import { DEVTOOLS_ACTIVE, FLIPPER_STORAGE_KEY } from "../constants"

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    padding: "10px",
    width: "200px",
    display: "flex",
    flexDirection: "column",
    fontFamily: "Arial, sans-serif"
  },
  inputLabel: {
    marginBottom: "10px"
  },
  input: {
    marginLeft: "5px"
  }
}

const IndexPopup = () => {
  const [devtoolsIsActive, setDevtoolsActive] = useStorage(
    DEVTOOLS_ACTIVE,
    false
  )
  const [flipperIsActive, setFlipperActive] = useStorage(
    FLIPPER_STORAGE_KEY,
    false
  )

  return (
    <div style={styles.wrapper}>
      <h3>Player UI Devtools Extension</h3>
      <label style={styles.inputLabel}>
        <input
          style={styles.input}
          type="checkbox"
          checked={devtoolsIsActive}
          onChange={(e) => setDevtoolsActive(e.target.checked)}
        />
        Enable Devtools
      </label>
      <label style={styles.inputLabel}>
        <input
          style={styles.input}
          type="checkbox"
          checked={flipperIsActive}
          onChange={(e) => setFlipperActive(e.target.checked)}
        />
        Enable Flipper Connection
      </label>
    </div>
  )
}

export default IndexPopup
