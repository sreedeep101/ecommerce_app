export interface Product {
    id: number

    name: string

    description: string

    price: number

    discountPrice?: number

    stock: number

    brand?: string

    weight?: string

    images: {
        id: number
        url: string
    }[]

    category: {
        id: number
        name: string
    }

}