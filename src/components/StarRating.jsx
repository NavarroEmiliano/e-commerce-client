/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'

const StarRating = ({ rating }) => {
  const [stars, setStars] = useState([])

  // Función para generar las estrellas según la puntuación
  const generateStars = () => {
    const fullStars = Math.floor(rating) // Número de estrellas completas
    const halfStar = rating - fullStars >= 0.5 // Determinar si hay una media estrella

    const starsArray = []
    for (let i = 0; i < fullStars; i++) {
      starsArray.push(<FaStar key={i} />)
    }
    if (halfStar) {
      starsArray.push(<FaStarHalfAlt key="half" />)
    }
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0) // Número de estrellas vacías
    for (let i = 0; i < emptyStars; i++) {
      starsArray.push(<FaRegStar key={i + fullStars + 1} />)
    }

    setStars(starsArray)
  }

  // Generar las estrellas cuando la puntuación cambie
  useEffect(() => {
    generateStars()
  }, [rating])

  return <div className="flex text-red-600 gap-1">{stars}</div>
}

export default StarRating
