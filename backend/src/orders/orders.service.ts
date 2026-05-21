import {
  BadRequestException,
  Injectable,
} from '@nestjs/common'

import { PrismaService }
  from 'src/prisma/prisma.service'

import { CreateOrderDto }
  from './dto/create-order.dto'

@Injectable()

export class OrdersService {

  constructor(
    private prisma: PrismaService
  ) { }

  async createOrder(
    userId: number,
    data: CreateOrderDto
  ) {

    const cart =
      await this.prisma.cart.findUnique({

        where: {
          userId,
        },

        include: {

          items: {

            include: {
              product: true,
            },
          },
        },
      })

    if (
      !cart ||
      cart.items.length === 0
    ) {

      throw new BadRequestException(
        'Cart is empty'
      )
    }

    const totalAmount =
      cart.items.reduce(

        (acc, item) => {

          return acc +

            (
              (
                item.product.discountPrice ||
                item.product.price
              ) * item.quantity
            )

        },

        0
      )

    const order =
      await this.prisma.order.create({

        data: {

          userId,

          totalAmount,

          address: data.address,

          city: data.city,

          postalCode: data.postalCode,

          phoneNumber: data.phoneNumber,

          items: {

            create: cart.items.map((item) => ({

              productId: item.productId,

              quantity: item.quantity,

              price:
                item.product.discountPrice ||
                item.product.price,
            })),
          },
        },

        include: {
          items: true,
        },
      })

    await this.prisma.cartItem.deleteMany({

      where: {
        cartId: cart.id,
      },
    })

    return order
  }

  async getUserOrders(userId: number) {

    return this.prisma.order.findMany({

      where: {
        userId,
      },

      include: {

        items: {

          include: {
            product: {
              include: {
                images: true,
              },
            },
          },
        },
      },

      orderBy: {
        createdAt: 'desc',
      },
    })
  }

  async getAllOrders() {

    return this.prisma.order.findMany({

      include: {

        user: true,

        items: {

          include: {
            product: true,
          },
        },
      },

      orderBy: {
        createdAt: 'desc',
      },
    })
  }
}