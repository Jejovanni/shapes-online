// No 'use client' here!
import { createClient } from '@supabase/supabase-js'

export const getAdminClient = () => {
    // This extra check prevents the key from ever leaking to the browser
    if (typeof window !== 'undefined') {
        throw new Error("This client can only be used on the server!");
    }

    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY! // This is the secret one!
    )
}