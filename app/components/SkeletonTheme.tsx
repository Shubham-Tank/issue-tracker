import React, { ReactNode } from 'react'
import { SkeletonTheme as ReactSkeletonTheme, SkeletonThemeProps } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const SkeletonTheme = ({ children, ...themeProps }: SkeletonThemeProps) => {
  return (
    <ReactSkeletonTheme
      {...themeProps}
      baseColor="#d8f4f609"
      highlightColor="#1e293b">
      {children}
    </ReactSkeletonTheme>
  )
}

export default SkeletonTheme