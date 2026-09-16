import type { Metadata } from "next";
import { CartView } from "@/components/CartView";

export const metadata: Metadata = {
  title: "Cart",
};

export default function CartPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Cart</h1>
        <p className="mt-2 text-muted">
          Review items before you continue. Your cart is saved in this browser.
        </p>
      </div>
      <CartView />
    </div>
  );
}
