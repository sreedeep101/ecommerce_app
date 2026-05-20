export class CreateProductDto {

  name: string

  description: string

  price: number

  discountPrice?: number

  stock: number

  sku: string

  brand?: string

  weight?: string

  isOrganic?: boolean

  isVegan?: boolean

  isGlutenFree?: boolean

  categoryId: number

  images: string[]
}