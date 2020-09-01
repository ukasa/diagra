import React from "react"

import { Stack } from "@fluentui/react/lib/Stack"
import { Text } from "@fluentui/react/lib/Text"

import Box from "./Box"

export interface Task {
  id: number
  title: string
  skip?: number
}

export interface Props {
  // id: number
  title: string
  data: Task[]
}

export default (props: Props) => {
  return (
    <div
      // key={props.id}
      className="wfc-container"
      style={{ flex: 1, display: "flex", flexDirection: "column" }}
    >
      <Stack
        className="wfc-header"
        horizontalAlign="center"
        verticalAlign="center"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 200,
          minWidth: 500,
          background: "lightslategray",
        }}
      >
        <Text variant="large">{props.title}</Text>
      </Stack>
      
      {(props.data || []).map((v, i) => (
        <React.Fragment key={`wfc-task-idx-${i}`}>
          {Boolean(v.skip) && Array(v.skip).fill(1).map((w, j) => (
            <Box key={`${i}--${j}`} ghost />
          ))}
          <Box
            key={i}
            title={v.title}
            className={`wfc-task`}
            id={v.id}
          />
        </React.Fragment>
      ))}
    </div>
  )
}