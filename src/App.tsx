import React from "react"

import FreeScrollBar from "react-free-scrollbar"

import { Stack } from "@fluentui/react/lib/Stack"
import { Text } from "@fluentui/react/lib/Text"

import { getTheme } from "@fluentui/react/lib/Styling"
import Header from "./components/Header"
import WorkFlow from "./components/WorkFlow"

interface Line {
  from: string
  to: string
}

export default () => {
  const theme = getTheme()

  // const [lines, setLines] = React.useState<Line[]>([])

  // React.useEffect(() => {
  //   const drawLines = () => {
  //     for (let i = 0; i < lines.length; i++) {
                
  //     }
  //   }

  //   drawLines()
  // }, [])

  return (
    <Stack
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background: theme.palette.white,
      }}
    >
      <Header />
      <Stack
        style={{
          flex: 1,
          position: "relative",
          // background: theme.palette.black,
          // overflow: "auto",
        }}
      >
        <Stack style={{ width: "100%", height: "100%" }}>
          <FreeScrollBar className="myScrollbar">
            <WorkFlow />
          </FreeScrollBar>
        </Stack>
      </Stack>
    </Stack>
  )
}