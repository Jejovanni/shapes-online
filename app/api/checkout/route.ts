import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        
        // Match the 'name' attributes from your checkout/page.tsx
        const guestInfo = {
            fullName: formData.get('firstName') as string, // Fixed from 'full_name'
            email: formData.get('email') as string,
            phone: formData.get('phone') as string,
            address: formData.get('address') as string,
            total: formData.get('total') as string,
            items: formData.get('items_summary') as string,
        };

        const file = formData.get('screenshot') as File | null;
        let publicUrl = '';

        // 1. Handle Screenshot Upload (Required for Manual flow)
        if (file && file.size > 0) {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
            
            const { data: uploadData, error: uploadError } = await supabase.storage
                .from('payment-receipts') 
                .upload(fileName, file);

            if (uploadError) throw uploadError;

            const { data: urlData } = supabase.storage
                .from('payment-receipts')
                .getPublicUrl(fileName);

            publicUrl = urlData.publicUrl;
        }

        // 2. Insert into Supabase
        const { data: order, error: dbError } = await supabase
            .from('orders')
            .insert([{
                customer_name: guestInfo.fullName,
                email: guestInfo.email,
                phone: guestInfo.phone,
                address: guestInfo.address,
                total_amount: parseFloat(guestInfo.total),
                payment_method: 'manual_transfer', // Explicitly manual now
                items_summary: guestInfo.items,
                screenshot_url: publicUrl,
                status: 'pending'
            }])
            .select()
            .single();

        if (dbError) throw dbError;

        // 3. Send Admin Notification Email
        await resend.emails.send({
            from: 'Shapes Orders <onboarding@resend.dev>', // Update this once Resend domain is verified
            to: 'jamaineekong@gmail.com',
            subject: `🔔 New Order: ₦${parseFloat(guestInfo.total).toLocaleString()} - ${guestInfo.fullName}`,
            html: `
                <div style="font-family: sans-serif; line-height: 1.6; color: #111; max-width: 600px;">
                    <h2 style="color: #db2777;">New Order Received!</h2>
                    <p>A new manual transfer order requires verification.</p>
                    
                    <div style="background: #f9fafb; padding: 20px; border-radius: 12px; margin: 20px 0;">
                        <p><strong>Customer:</strong> ${guestInfo.fullName}</p>
                        <p><strong>Total:</strong> ₦${parseFloat(guestInfo.total).toLocaleString()}</p>
                        <p><strong>Items:</strong> ${guestInfo.items}</p>
                    </div>

                    <p><strong>Proof of Payment:</strong><br />
                    ${publicUrl 
                        ? `<a href="${publicUrl}" style="display: inline-block; padding: 10px 20px; background: #db2777; color: #fff; text-decoration: none; border-radius: 8px; margin-top: 10px;">View Screenshot</a>` 
                        : '<span style="color: red;">No screenshot uploaded!</span>'}
                    </p>
                    
                    <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
                    <p style="font-size: 12px; color: #666;">View this order in your <a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin/orders">Admin Dashboard</a> to verify.</p>
                </div>
            `
        });

        return NextResponse.json({ success: true, orderId: order.id });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'An unknown error occurred';
        console.error("Route Error:", message);
        return NextResponse.json({ error: message }, { status: 500 });
    }
}