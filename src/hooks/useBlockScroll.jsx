import { useEffect } from 'react'

const useBlockScroll = (blockScroll) => {
  useEffect(() => {
    const disableScroll = () => {
      document.body.style.overflowY = 'hidden'
    }

    const enableScroll = () => {
      document.body.style.overflowY = ''
    }

    if (blockScroll) {
      disableScroll()
    } else {
      enableScroll()
    }

    return () => {
      enableScroll()
    }
  }, [blockScroll])
}

export default useBlockScroll
