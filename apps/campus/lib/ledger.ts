import { db } from "./db";

export async function rewardUser(userId: string, amount: number) {
  const wallet = await db.wallet.update({
    where: { userId },
    data: { balance: { increment: amount } },
  });

  const transaction = await db.transaction.create({
    data: { userId, amount, type: "reward" },
  });

  return { wallet, transaction };
}
