import React from "react"
// import { Stack } from "@fluentui/react/lib/Stack"

interface Props {
  x: number
  y: number
}

export default (props: Props) => {
  return (
    <div
      style={{
        position: "absolute",
        width: 14,
        height: 14,
        background: "#f9dcc4",
        borderRadius: "50%",
        left: props.x || 0,
        top: props.y || 0,
      }}
    />
  )
}