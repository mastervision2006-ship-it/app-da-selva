import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase';

// IDs que o premium_total desbloqueia
const TODOS_IDS = ['grupo_exclusivo', 'ia_selva', 'lista_compras', 'nutri_coach', 'vitalicio'];

export async function POST(req) {
  try {
    const data = await req.json();
    const event = data.event ?? null;
    const transaction = data.transaction ?? null;

    if (!transaction || typeof transaction !== 'object') {
      return NextResponse.json({ ok: false, error: 'no transaction' });
    }

    const isPaid =
      ['TRANSACTION_PAID', 'TRANSACTION_COMPLETED'].includes(event) ||
      transaction.status === 'COMPLETED';

    if (!isPaid) {
      return NextResponse.json({ ok: true, saved: false, reason: 'not paid yet' });
    }

    const tid = (transaction.id ?? '').replace(/[^a-zA-Z0-9_\-]/g, '');
    if (!tid) return NextResponse.json({ ok: false, error: 'no tid' });

    const admin = createAdminClient();

    // Busca compra pendente
    const { data: pending } = await admin
      .from('pending_upgrade_purchases')
      .select('user_id, upgrade_id')
      .eq('transaction_id', tid)
      .maybeSingle();

    if (!pending?.user_id) {
      return NextResponse.json({ ok: true, saved: false, reason: 'no pending purchase' });
    }

    // Salva upgrade confirmado
    await admin.from('user_upgrades').upsert({
      user_id: pending.user_id,
      upgrade_id: pending.upgrade_id,
      transaction_id: tid,
    }, { onConflict: 'transaction_id', ignoreDuplicates: true });

    // premium_total desbloqueia todos os outros
    if (pending.upgrade_id === 'premium_total') {
      for (const id of TODOS_IDS) {
        await admin.from('user_upgrades').upsert({
          user_id: pending.user_id,
          upgrade_id: id,
          transaction_id: `${tid}_${id}`,
        }, { onConflict: 'transaction_id', ignoreDuplicates: true });
      }
    }

    return NextResponse.json({ ok: true, upgradeId: pending.upgrade_id });

  } catch (err) {
    console.error('[upgrade/webhook]', err);
    return NextResponse.json({ ok: false, error: 'internal error' });
  }
}
