import React from 'react'

const BackgroundEclipse = ({ color, position, reversed }: { color: string, position: string, reversed: boolean }) => {
  return (
    <>
      {
        reversed ? (
          <svg width="1349" height="836" viewBox="0 0 1349 836" fill="none" xmlns="http://www.w3.org/2000/svg" className={`absolute ${position} -z-10`} >
            <circle cx="555.62" cy="555.62" r="558.12" transform={`matrix(0.97237 -0.233445 -0.707107 0.707107 526.765 154.414)`} stroke={color} strokeWidth="5" />
          </svg >
        ) : (
          <svg width="1177" height="826" viewBox="0 0 1177 826" fill="none" xmlns="http://www.w3.org/2000/svg" className={`absolute ${position} -z-10`}>
            <circle cx="502.841" cy="502.841" r="505.341" transform="matrix(-0.656059 -0.75471 0.953717 0.300706 438.786 640.997)" stroke={color} strokeWidth="5" />
          </svg>

        )}
    </>
  )
}

export default BackgroundEclipse