import React from "react"

import { Stack } from "@fluentui/react/lib/Stack"
import { Text } from "@fluentui/react/lib/Text"

interface Props {
  id?: number
  title?: string
  ghost?: boolean
  className?: string
}

export default (props: Props) => {
  return (
    <Stack
      data-node-id={props.id}
      horizontalAlign="center"
      verticalAlign="center"
      className={props.className}
      style={{
        marginTop: 50,
        alignSelf: "center",
        width: 300,
        height: 100,
        padding: "0rem 0.9rem",
        border: "solid 5px #61dafb",
        fontSize: "1.2rem",
        userSelect: "none",
        cursor: "default",
        // fontWeight: "bold",
        letterSpacing: "0.07rem",

        visibility: props.ghost ? "hidden" : "visible",
      }}
    >
      <Text style={{ fontWeight: "bold" }}>{props.title}</Text>
    </Stack>
  )
}