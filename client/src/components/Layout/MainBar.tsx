import React from "react"

interface MainBar {
  children: any
}

export const MainBar = (props: MainBar) => {
  const { children } = props

  return <div className="frame w-[350px]">{children}</div>
}
