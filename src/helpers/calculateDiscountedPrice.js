const calculateDiscountedPrice = (price, discount) => {
  return price * (1 - Math.ceil(discount) / 100)
}

export default calculateDiscountedPrice
