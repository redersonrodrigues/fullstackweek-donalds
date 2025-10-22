import { db } from "@/lib/prisma";

import { isValidCpf, removeCpfPunctuation } from "../menu/helpers/cpf";
import CpfForm from "./components/cpf-form";
import OrderList from "./components/order-list";

interface OrdersPageProps {
  searchParams: Promise<{ cpf: string; orderId?: string }>;
}

const OrdersPage = async ({ searchParams }: OrdersPageProps) => {
  const { cpf, orderId } = await searchParams;
  if (!cpf) {
    return <CpfForm />;
  }
  if (!isValidCpf(cpf)) {
    return <CpfForm />;
  }

  // Update order status if coming from successful payment
  if (orderId) {
    try {
      await db.order.update({
        where: { id: Number(orderId) },
        data: { status: "PAYMENT_CONFIRMED" },
      });
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  }
  const orders = await db.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      customerCpf: removeCpfPunctuation(cpf),
    },
    include: {
      restaurant: {
        select: {
          name: true,
          avatarImageUrl: true,
        },
      },
      orderProducts: {
        include: {
          product: true,
        },
      },
    },
  });
  return <OrderList orders={orders} />;
};

export default OrdersPage;
