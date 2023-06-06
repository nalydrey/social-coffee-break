import React from "react"

interface ContentBar {
  children: any
}

export const ContentBar = (props: ContentBar) => {
  const { children } = props

  return <div className=" frame w-full">{children}</div>
}
