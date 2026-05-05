import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder", {
  apiVersion: "2024-04-10" as any, // latest stable version allowed by the types
});

export async function POST(req: Request) {
  try {
    const { itemName, itemPrice } = await req.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: itemName || "Réservation Zenturo",
            },
            unit_amount: itemPrice ? itemPrice * 100 : 150000, // Convert to cents, default 1500€
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Stripe Checkout Error:", error);
    return NextResponse.json(
      { error: "Impossible de créer la session de paiement. Avez-vous configuré vos clés API dans .env.local ?" },
      { status: 500 }
    );
  }
}
