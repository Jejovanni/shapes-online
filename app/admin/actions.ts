"use server";
import { createClient } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function updateOrderStatus(orderId: string, newStatus: string) {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Get current admin session for logging
    const { data: { user } } = await supabase.auth.getUser();
    const adminEmail = user?.email || 'System';

    // 1. Update the Order
    const { data: order, error: orderError } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId)
        .select().single();

    if (orderError) throw new Error(orderError.message);

    let emailStatus = 'NOT_SENT';

    // 2. Send Email if Verified
    if (newStatus === 'verified' && order) {
        try {
            await resend.emails.send({
                from: 'Shapes <orders@yourdomain.com>',
                to: [order.email],
                subject: 'Payment Verified!',
                html: `<p>Hi ${order.customer_name}, your payment is verified!</p>`
            });
            emailStatus = 'SUCCESS';
        } catch (err) {
            emailStatus = 'FAILED';
            console.error(err);
        }
    }

    // 3. LOG THE ACTIVITY
    await supabase.from('activity_logs').insert({
        admin_email: adminEmail,
        action_type: 'VERIFY_PAYMENT',
        order_id: orderId,
        details: `Verified ₦${order.total_amount} for ${order.email}. Email: ${emailStatus}`,
        status: emailStatus === 'FAILED' ? 'ERROR' : 'SUCCESS'
    });

    revalidatePath('/admin/orders');
}