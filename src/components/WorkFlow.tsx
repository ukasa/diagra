import React from "react"

// import { Stack } from "@fluentui/react/lib/Stack"

import WorkFlowColumn, { Props as WFCProps } from "./WorkFlowColumn"
import Joint from "./Joint"
import Line from "./Line"
import { unstable_batchedUpdates } from "react-dom"

const data: WFCProps[] = [
  // {
  //   title: "Student",
  //   data: [
  //     { id: 1, title: "Make a request" },
  //     { id: 101, title: "Do nothing" },
  //   ],
  // },
  // {
  //   title: "Member",
  //   data: [
  //     { id: 2, title: "Accept payment", skip:2 },
  //     { id: 3, title: "Open registration" },
  //     { id: 201, title: "Turn lamp off" },
  //   ],
  // },
  // {
  //   title: "Someone else",
  //   data: [
  //     { id: 4, title: "Do homework" },
  //     { id: 5, title: "Write post" },
  //     { id: 6, title: "Eat lunch" },
  //     { id: 7, title: "Get a grip", skip: 2 },
  //   ],
  // },
]

enum JointStatePosition {
  TOP = 0,
  RIGHT = 1,
  BOTTOM = 2,
  LEFT = 3,
}

interface Relation {
  from: { id: number, position: JointStatePosition }
  to: { id: number, position: JointStatePosition }
}

const relations: Relation[] = [
  // {
  //   from: { id: 1, position: JointStatePosition.RIGHT },
  //   to: { id: 4, position: JointStatePosition.LEFT },
  // },
  // {
  //   from: { id: 7, position: JointStatePosition.TOP },
  //   to: { id: 6, position: JointStatePosition.BOTTOM },
  // },
  // {
  //   from: { id: 1, position: JointStatePosition.RIGHT },
  //   to: { id: 2, position: JointStatePosition.TOP },
  // },
  // {
  //   from: { id: 5, position: JointStatePosition.LEFT },
  //   to: { id: 101, position: JointStatePosition.RIGHT },
  // },
  // {
  //   from: { id: 7, position: JointStatePosition.LEFT },
  //   to: { id: 201, position: JointStatePosition.RIGHT },
  // },
  // {
  //   from: { id: 4, position: JointStatePosition.BOTTOM },
  //   to: { id: 5, position: JointStatePosition.TOP },
  // },
  // {
  //   from: { id: 5, position: JointStatePosition.LEFT },
  //   to: { id: 2, position: JointStatePosition.RIGHT },
  // },
  // {
  //   from: { id: 2, position: JointStatePosition.BOTTOM },
  //   to: { id: 3, position: JointStatePosition.TOP },
  // },
  // {
  //   from: { id: 3, position: JointStatePosition.RIGHT },
  //   to: { id: 6, position: JointStatePosition.LEFT },
  // },
]


/**
 * Pada tahap perenderan awal, akan dilakukan pendataan
 * node yang ada. Dari situ, didapatkan 4 koordinat titik.
 * Keempat titik tersebut merupakan titik garis penghubung
 * antar node (disimbolkan dengan tanda "=").
 * Posisinya terletak di tangah sisi-sisi pada
 * node secara berurutan; mulai dari atas, kanan, bawah dan
 * kiri.
 * 
 *     _________=_________
 *     |                 |
 *     |                 |
 *     =                 =
 *     |                 |
 *     |                 |
 *     _________=_________
 */

// interface JointState {
//   x0: number
//   y0: number
//   x1: number
//   y1: number
// }

interface JointState {
  x: number
  y: number
  nodeId: number
  position: JointStatePosition
}

interface LineState {
  x: number
  y: number
  width: number
  degree: number
}

export default () => {
  const wfRef = React.useRef(null)
  const [joints, setJoints] = React.useState<JointState[]>([])
  const [lines, setLines] = React.useState<LineState[]>([])

  React.useEffect(() => {
    const els = document.querySelectorAll(".wfc-task")
    let dts: JointState[] = []
    for (let i = 0; i < els.length; i++) {
      const { x, y, width, height } = els[i].getBoundingClientRect()
      const nodeId = parseInt(els[i].getAttribute("data-node-id") || "0")

      dts.push({
        nodeId,
        position: JointStatePosition.TOP,
        x: x + width / 2 - 7, y: y - 5 - 70
      })
      dts.push({
        nodeId,
        position: JointStatePosition.RIGHT,
        x: x + width - 9, y: y + height / 2 - 7 - 70
      })
      dts.push({
        nodeId,
        position: JointStatePosition.BOTTOM,
        x: x + width / 2 - 7, y: y + height - 9 - 70
      })
      dts.push({
        nodeId,
        position: JointStatePosition.LEFT,
        x: x - 5, y: y + height / 2 - 7 - 70
      })
    }

    let tmpLines: LineState[] = []
    for (let i = 0; i < relations.length; i++) {
      const relFrom = relations[i].from
      const relTo = relations[i].to
      const from = dts.find(v => v.nodeId === relFrom.id && v.position === relFrom.position)
      const to = dts.find(v => v.nodeId === relTo.id && v.position === relTo.position)


      /**
       * Mencari alas dan tinggi untuk menentukan sisi miring
       * Sisi miring memanfaatkan persamaan sm^2 = a^2 + t^2
       * Untuk sudut perputaran garis, digunakan persamaan
       * sin(SM)/sm = sin(T)/t, dimana sudut pada tiap ruas
       * merupakan sudut yang berada di depan sisi penyebut
       * dengan SM = 90 (sin(90) = 1).
       */
      if (from && to) {
        const a = from.x - to.x
        const t = from.y - to.y
        const sm = Math.sqrt(a ** 2 + t ** 2)
        // Radians need to be converted into degree
        // const deg = Math.abs(Math.asin(t / sm) * 180 / Math.PI)
        const deg = Math.asin(t / sm) * 180 / Math.PI
        // const deg = sm * t
        tmpLines.push({
          x: from.x, y: from.y, width: sm,
          degree: (from.x < to.x) ? -deg : deg + 180,
          // degree: -deg,
        })
      }
    }

    console.log(dts)
    console.log(tmpLines)

    unstable_batchedUpdates(() => {
      setJoints(dts)
      setLines(tmpLines)
    })
  }, [])

  return (
    <div ref={wfRef} style={{ display: "flex", paddingBottom: 40 }}>
      {data.map((v, i) => (
        <WorkFlowColumn
          key={`wfc---${i}`}
          {...v}
        />
      ))}

      {joints.map(({ x, y }, i) => (
        <React.Fragment key={`jnt-${i}`}>
          <Joint x={x} y={y} />
        </React.Fragment>
      ))}

      {lines.map((l, i) => (
        <Line key={`ln-${i}`} {...l} />
      ))}

      <i className="Chevron"></i>

      {/* {JSON.stringify(Math.sin(90*Math.PI/180))} */}
    </div>
  )
}