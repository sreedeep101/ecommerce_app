import { Injectable } from '@nestjs/common'

import { PrismaService } from 'src/prisma/prisma.service'

import { CreateProductDto } from './dto/create-product.dto'

@Injectable()

export class ProductsService {

  constructor(
    private prisma: PrismaService
  ) { }

  async getAllProducts() {

    return this.prisma.product.findMany({

      include: {
        images: true,
        category: true,
      },
    })
  }

  async getProductById(id: number) {

    return this.prisma.product.findUnique({

      where: {
        id,
      },

      include: {
        images: true,
        category: true,
      },
    })
  }

  async createProduct(data: CreateProductDto) {

    return this.prisma.product.create({

      data: {

        name: data.name,

        description: data.description,

        price: data.price,

        discountPrice: data.discountPrice,

        stock: data.stock,

        sku: data.sku,

        brand: data.brand,

        weight: data.weight,

        isOrganic: data.isOrganic,

        isVegan: data.isVegan,

        isGlutenFree: data.isGlutenFree,

        categoryId: data.categoryId,

        images: {

          create: data.images.map((url) => ({
            url,
          })),
        },
      },

      include: {
        images: true,
        category: true,
      },
    })
  }
  
  async deleteProduct(id: number) {

    await this.prisma.productImage.deleteMany({

      where: {
        productId: id,
      },
    })

    await this.prisma.product.delete({

      where: {
        id,
      },
    })

    return {
      message: 'Product deleted',
    }
  }
}