import { NextResponse } from 'next/server';
import { createServerClient, createAdminClient } from '@/lib/supabase';

export async function GET() {
  try {
    const supabase = await createServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ upgrades: [] });

    const admin = createAdminClient();
    const { data } = await admin
      .from('user_upgrades')
      .select('upgrade_id, comprado_em')
      .eq('user_id', user.id);

    return NextResponse.json({ upgrades: data ?? [] });
  } catch {
    return NextResponse.json({ upgrades: [] });
  }
}
