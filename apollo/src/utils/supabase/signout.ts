'use server'

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { RedirectType } from "next/navigation";

export async function signOutAction() {
    const serverClient = await createClient();
    await serverClient.auth.signOut();
    redirect('/login', RedirectType.replace);
  }