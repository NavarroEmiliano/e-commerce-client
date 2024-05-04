const oneProductByCategory = products => {
  const categoriesArr = products.map(product => product.category)
  const categoriesSet = [...new Set(categoriesArr)]

  const finalArr = []

  categoriesSet.forEach(element => {
    const productFound = products.find(product => {
      if (product.category === element) return product
      return undefined
    })

    finalArr.push(productFound)
  })

  return finalArr
}

export default oneProductByCategory
