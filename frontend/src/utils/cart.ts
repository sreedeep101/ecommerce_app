import type { Product } from "../types/product"

export const addToCart = (
  product: Product
) => {

  const existingCart = JSON.parse(
    localStorage.getItem("cart") || "[]"
  )

  const existingItem = existingCart.find(
    (item: any) =>
      item.product.id === product.id
  )

  if (existingItem) {

    existingItem.quantity += 1

  } else {

    existingCart.push({
      product,
      quantity: 1,
    })
  }

  localStorage.setItem(
    "cart",
    JSON.stringify(existingCart)
  )
}

export const getCart = () => {

  return JSON.parse(
    localStorage.getItem("cart") || "[]"
  )
}

export const removeFromCart = (
  productId: number
) => {

  const cart = getCart().filter(
    (item: any) =>
      item.product.id !== productId
  )

  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  )
}