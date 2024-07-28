import { PrismaClient, TradeType } from '@prisma/client';
import { fa, faker } from '@faker-js/faker';
import * as argon from 'argon2';

const prisma = new PrismaClient();

async function main() {
    try {
        await prisma.$transaction(async (tx) => {

            const users = await Promise.all(Array.from({ length: 5 }).map(async () => {
                const password = await argon.hash(faker.internet.password());
                return tx.user.create({
                    data: {
                        email: faker.internet.email(),
                        password,
                        balance: faker.finance.amount(),
                    },
                });
            }));

            const portifloios = await Promise.all(users.map(async (user) => {
                return tx.portfolio.create({
                    data: {
                        userId: user.id,
                    },
                });
            }));


            const shares = await Promise.all(users.map(async (user) => {
                return tx.share.create({
                    data: {
                        symbol: faker.finance.currencyCode() + faker.number.int({ min: 100, max: 999 }),
                        price: faker.number.float({ min: 10, max: 1000, precision: 0.01 }),
                    },
                });
            }));

            const trades = await Promise.all(Array.from({ length: 10 }).map(async () => {
                const tradeType = faker.helpers.arrayElement(['BUY', 'SELL']) as 'BUY' | 'SELL';
                const share = faker.helpers.arrayElement(shares);
                const quantity = faker.number.int({ min: 1, max: 100 });
                const tradePrice = share.price + (faker.number.float({ min: -5, max: 5, precision: 0.01 }));
                const user = faker.helpers.arrayElement(users);
                const portfolio = portifloios.find((p) => p.userId === user.id);

                return tx.trade.create({
                    data: {
                        userId: user.id,
                        portfolioId: portfolio.id,
                        shareId: share.id,
                        type: tradeType,
                        quantity: quantity,
                        price: tradePrice,
                    },
                });
            }));


        })
    } catch (err) {
        // Handle the rollback...
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });