import devtoolsHTML from "url:../panels/devtools/index.html"

chrome.devtools.panels.create(
  "Player UI",
  "icon.png",
  devtoolsHTML.split("/").pop()
)
