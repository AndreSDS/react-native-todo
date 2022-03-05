import React, { forwardRef } from 'react'
import { useStyledSystemPropsResolver } from 'native-base'

export const makeStyledComponent = (Component: any) => {
  return forwardRef(({ debug, ...props }: any, ref: any) => {
    const [style, restProps] = useStyledSystemPropsResolver(props)

    return (
      <Component {...restProps} style={style} ref={ref}>
        {props.children}
      </Component>
    )
  })
}
