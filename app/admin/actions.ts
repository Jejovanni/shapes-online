"use server";

import { createClient } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';
import { Resend } from 'resend';

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

interface OrderUpdateResult {
    id: string;
    email: string;
    customer_name: string;
    total_amount: number;
    status: string;
    items_summary: string;
}

export async function updateOrderStatus(orderId: string, newStatus: string) {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data: { user } } = await supabase.auth.getUser();
    const adminEmail = user?.email || 'System Admin';

    // 1. Update the Order in Supabase
    const { data: order, error: orderError } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId)
        .select('id, email, customer_name, total_amount, status, items_summary')
        .single() as { data: OrderUpdateResult | null; error: any };

    if (orderError) {
        throw new Error(orderError.message);
    }

    let emailStatus: 'NOT_SENT' | 'SUCCESS' | 'FAILED' = 'NOT_SENT';

    // 2. Send the "Payment Verified" Email
    if (newStatus === 'verified' && order) {
        try {
            // Format the price securely on the server
            const formattedTotal = new Intl.NumberFormat('en-NG', {
                style: 'currency',
                currency: 'NGN',
                minimumFractionDigits: 0,
            }).format(order.total_amount).replace('NGN', '₦');

            await resend.emails.send({
                from: 'Shapes Online <send.orders.shapeslagos.online>', // MUST match your Resend domain
                to: [order.email],
                subject: 'Payment Confirmed! Your Shapes Order is Processing',
                html: `
                    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333; border: 1px solid #eee; border-radius: 12px;">
                        <div style="text-align: center; margin-bottom: 24px;">
                            <h1 style="color: #ec4899; margin: 0;">Payment Verified!</h1>
                            <p style="color: #666; font-size: 14px;">Great news, we received your transfer.</p>
                        </div>
                        
                        <p>Hi <strong>${order.customer_name}</strong>,</p>
                        <p>Your payment of <strong>${formattedTotal}</strong> has been successfully verified by our team. We are now preparing your transformation kit for delivery!</p>
                        
                        <div style="background-color: #fdf2f8; padding: 16px; border-radius: 8px; margin: 24px 0;">
                            <h3 style="color: #be185d; margin-top: 0;">Order Details</h3>
                            <p style="margin: 4px 0; font-size: 14px;"><strong>Items:</strong> ${order.items_summary}</p>
                            <p style="margin: 4px 0; font-size: 14px;"><strong>Total Paid:</strong> ${formattedTotal}</p>
                            <p style="margin: 4px 0; font-size: 14px;"><strong>Status:</strong> Processing for Delivery</p>
                        </div>

                        <p style="font-size: 14px; color: #666; line-height: 1.5;">You will receive another update from us once your order is out for delivery. If you have any questions in the meantime, simply reply to this email.</p>
                        
                        <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
                        <p style="font-size: 12px; color: #999; text-align: center;">© ${new Date().getFullYear()} Shapes Online Ltd. All rights reserved.</p>
                    </div>
                `
            });
            emailStatus = 'SUCCESS';
        } catch (err) {
            console.error("Resend Email Error:", err);
            emailStatus = 'FAILED';
        }
    }

    // 3. Log the Activity
    await supabase.from('activity_logs').insert({
        admin_email: adminEmail,
        action_type: 'VERIFY_ORDER',
        details: `Verified order for ${order?.customer_name}. Email: ${emailStatus}`,
        status: emailStatus === 'FAILED' ? 'FAILURE' : 'SUCCESS'
    });

    // 4. Refresh the Admin Page UI instantly
    revalidatePath('/admin/orders');
    return { success: true };
}