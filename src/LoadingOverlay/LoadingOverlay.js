import React from "react"
import { Spinner } from "reactstrap"
export default () => {
  return(
    <div id="loading-screen" className="bg-light">
      <Spinner color="success" />
    </div>
  )
}