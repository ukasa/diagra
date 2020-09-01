import React from "react"
import { DataSet, Network, Options } from "vis-network/standalone/esm/vis-network"


export default () => {
  // const domNode = React.useRef(null)
  // const network = React.useRef(null)
  
  const nodes = new DataSet([
    { id: 1, label: 'Node 1', x: 10, y: -150 },
    { id: 2, label: 'Node 2', x: 104, y: 5 },
    { id: 3, label: 'Node 3', x: 45, y: 29 },
    { id: 4, label: 'Node 4', x: 140, y: 50 },
    { id: 5, label: 'Node 5', x: 240, y: 10 }
  ])
  
  const edges = new DataSet([
    { from: 1, to: 3 },
    { from: 1, to: 2 },
    { from: 2, to: 4 },
    { from: 2, to: 5 }
  ])
  
  const data = {
    nodes,
    edges
  }

  const options: Options = {
    nodes: {
      fixed: true,
      shape: "box",
      widthConstraint: {
        minimum: 100,
        maximum: 100,
      },
      // heightConstraint: {
      //   minimum: 200,
      //   maximum: 200,
      // },
    },
    edges: {
      arrows: {
        to: {
          enabled: true,
        }
      }
    },
  }
  
  React.useEffect(
    () => {
      const el = document.getElementById("my-network-container")
      if (el !== null) {
        const hello = new Network(el, data, options)
      }
      // if (Boolean(network.current) && Boolean(domNode.current)) {
      //   const hello = new Network(domNode.current, data, options)
      // }

      // console.log(network.current)
      // console.log(domNode.current)
    },
    [data, options]
  )

  return (
    <div
      // ref={domNode}
      id="my-network-container"
      style={{
        height: "100vh",
      }}
    />
  )
}