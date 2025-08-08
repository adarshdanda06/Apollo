import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import { type User } from "@supabase/supabase-js";

export const getUser = async (): Promise<User | null> => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    return user;
}

export const signOut = async (): Promise<void> => {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    if (error) {
        console.log(error);
    }
    redirect('/');
}