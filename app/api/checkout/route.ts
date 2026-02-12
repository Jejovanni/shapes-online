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
        
        const guestInfo = {
            // Updated to match the 'name' attribute in your page.tsx
            fullName: formData.get('full_name') as string, 
            email: formData.get('email') as string,
            phone: formData.get('phone') as string,
            address: formData.get('address') as string,
            total: formData.get('total') as string,
            method: formData.get('paymentMethod') as string,
            items: formData.get('items_summary') as string,
        };

        const file = formData.get('screenshot') as File | null;
        let publicUrl = '';

        // 1. Handle Screenshot Upload
        if (file && file.size > 0 && guestInfo.method === 'app') {
            const fileName = `${Date.now()}-${file.name.replace(/\s/g, '_')}`;
            const { data: uploadData, error: uploadError } = await supabase.storage
                .from('payment-receipts') 
                .upload(fileName, file);

            if (uploadError) throw uploadError;

            const { data: urlData } = supabase.storage
                .from('payment-receipts')
                .getPublicUrl(fileName);

            publicUrl = urlData.publicUrl;
        }

        // 2. Insert into Supabase (This triggers your Customer LTV function!)
        const { data: order, error: dbError } = await supabase
            .from('orders')
            .insert([{
                customer_name: guestInfo.fullName,
                email: guestInfo.email,
                phone: guestInfo.phone,
                address: guestInfo.address,
                total_amount: parseFloat(guestInfo.total),
                payment_method: guestInfo.method,
                items_summary: guestInfo.items,
                screenshot_url: publicUrl,
                status: 'pending'
            }])
            .select();

        if (dbError) throw dbError;

        // 3. Send Admin Notification
        await resend.emails.send({
            from: 'Shapes Orders <onboarding@resend.dev>',
            to: 'jamaineekong@gmail.com', // Fixed the gmaiil typo
            subject: `New Order: ₦${parseFloat(guestInfo.total).toLocaleString()} - ${guestInfo.fullName}`,
            html: `
                <div style="font-family: sans-serif; line-height: 1.5;">
                    <h2>New Order Received!</h2>
                    <p><strong>Customer:</strong> ${guestInfo.fullName}</p>
                    <p><strong>Email:</strong> ${guestInfo.email}</p>
                    <p><strong>Items:</strong> ${guestInfo.items}</p>
                    <p><strong>Total:</strong> ₦${parseFloat(guestInfo.total).toLocaleString()}</p>
                    <p><strong>Payment Method:</strong> ${guestInfo.method}</p>
                    ${publicUrl ? `<p><strong>Proof of Payment:</strong> <a href="${publicUrl}">View Screenshot</a></p>` : ''}
                    <hr />
                    <p><strong>Shipping Address:</strong><br />${guestInfo.address}</p>
                </div>
            `
        });

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("Route Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}