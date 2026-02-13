"use server";
import { createClient } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY! // Use service role to override RLS
);

export async function updateOrderStatus(orderId: string, newStatus: string) {
    const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);

    if (error) throw new Error(error.message);
    
    // This refreshes the page data instantly
    revalidatePath('/admin/orders');
}