import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const tid = (searchParams.get('tid') ?? '').replace(/[^a-zA-Z0-9_\-]/g, '');

  if (!tid) return NextResponse.json({ paid: false });

  const admin = createAdminClient();
  const { data } = await admin
    .from('user_upgrades')
    .select('upgrade_id')
    .eq('transaction_id', tid)
    .maybeSingle();

  return NextResponse.json({ paid: !!data, upgradeId: data?.upgrade_id ?? null });
}
