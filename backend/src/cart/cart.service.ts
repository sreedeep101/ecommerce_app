import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddToCartDto } from './dto/add-to-cart.dto';

@Injectable()
export class CartService {
    constructor(
        private prisma: PrismaService
    ) { }

    async getUserCart(userId: number) {
        let cart = await this.prisma.cart.findUnique({

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
        })

        if (!cart) {
            cart = await this.prisma.cart.create({
                data: {
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


            })
        }

        return cart
    }

    async addToCart(
        userId: number,
        data: AddToCartDto
    ) {

        let cart = await this.prisma.cart.findUnique({

            where: {
                userId,
            },
        })

        if (!cart) {

            cart = await this.prisma.cart.create({

                data: {
                    userId,
                },
            })
        }

        const existingItem =
            await this.prisma.cartItem.findFirst({

                where: {

                    cartId: cart.id,

                    productId: data.productId,
                },
            })

        if (existingItem) {

            await this.prisma.cartItem.update({

                where: {
                    id: existingItem.id,
                },

                data: {
                    quantity:
                        existingItem.quantity +
                        data.quantity,
                },
            })

        } else {

            await this.prisma.cartItem.create({

                data: {

                    cartId: cart.id,

                    productId: data.productId,

                    quantity: data.quantity,
                },
            })
        }

        return this.getUserCart(userId)
    }

    async removeCartItem(
        itemId: number
    ) {

        await this.prisma.cartItem.delete({

            where: {
                id: itemId,
            },
        })

        return {
            message: 'Item removed!',
        }
    }
}
