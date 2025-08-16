import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";

export const signOut = async (): Promise<void> => {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    if (error) {
        console.log(error);
    }
    // redirect('/');
}