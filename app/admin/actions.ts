"use server";
import { createClient } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';

export async function updateOrderStatus(orderId: string, newStatus: string) {
    // 1. Secret key is ONLY accessed here when the function is called on the server
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);

    if (error) throw new Error(error.message);

    revalidatePath('/admin/orders');
}