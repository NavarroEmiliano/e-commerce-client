let token = null

export const setToken = async (newToken) => {
  token = `bearer ${newToken}`
}

export const getHeaderConfig = () => ({
  headers: {
    Authorization: token,
  },
})
