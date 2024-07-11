"use client"

import React from 'react'

const ErrorBoundry = ({error} : {error : Error}) => {
  return (
    <div>{error.message}</div>
  )
}

export default ErrorBoundry