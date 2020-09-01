import React from "react"

interface Props {
  x: number
  y: number
  width: number
  degree: number
}

export default (props: Props) => {
  return (
    <div
      className="task-line"
      style={{
        width: props.width,
        height: 14,
        background: "#f9dcc4",
        position: "absolute",
        // borderRadius: 7,
        // top: 0, left: 0,
        left: props.x + 7,
        top: props.y,
        transform: `rotate(${props.degree}deg)`,
        transformOrigin: "center left",
      }}
    >
      <div
        style={{
          width: 0,
          height: 0,
          float: "right",
          marginRight: -8,
          marginTop: -9,
          borderTop: `16px solid transparent`,
          borderBottom: `16px solid transparent`,
          borderLeft: `30px solid #f9dcc4`,
        }}
      />
    </div>
  )
}