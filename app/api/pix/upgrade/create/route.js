import { NextResponse } from 'next/server';
import { createServerClient, createAdminClient } from '@/lib/supabase';
import { UPGRADES } from '@/lib/upgradesData';

const SIGILOPAY_API = 'https://app.sigilopay.com.br/api/v1';

export async function POST(req) {
  try {
    // 1. Verifica usuário autenticado
    const supabase = await createServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    const { upgradeId, nome, cpf, telefone } = await req.json();

    const upgrade = UPGRADES.find(u => u.id === upgradeId);
    if (!upgrade) {
      return NextResponse.json({ error: 'Upgrade inválido' }, { status: 400 });
    }
    if (!nome || !cpf || !telefone) {
      return NextResponse.json({ error: 'Nome, CPF e telefone são obrigatórios' }, { status: 400 });
    }

    // 2. Busca email do perfil
    const admin = createAdminClient();
    const { data: profile } = await admin
      .from('profiles')
      .select('email')
      .eq('user_id', user.id)
      .single();
    const email = profile?.email || user.email;

    // 3. Verifica se já tem o upgrade
    const { data: jaTemAcesso } = await admin
      .from('user_upgrades')
      .select('id')
      .eq('user_id', user.id)
      .eq('upgrade_id', upgradeId)
      .maybeSingle();
    if (jaTemAcesso) {
      return NextResponse.json({ error: 'Você já possui este upgrade' }, { status: 400 });
    }

    // 4. Gera cobrança PIX na SigiloPay
    const identifier = `upg_${upgradeId}_${user.id.slice(0, 8)}_${Date.now()}`;
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://app-da-selva.vercel.app';

    const pixResponse = await fetch(`${SIGILOPAY_API}/gateway/pix/receive`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'x-public-key': process.env.SIGILOPAY_PUBLIC_KEY,
        'x-secret-key': process.env.SIGILOPAY_SECRET_KEY,
      },
      body: JSON.stringify({
        identifier,
        amount: upgrade.preco,
        client: {
          name: nome,
          email,
          phone: telefone.replace(/\D/g, ''),
          document: cpf.replace(/\D/g, ''),
        },
        callbackUrl: `${appUrl}/api/pix/upgrade/webhook`,
      }),
    });

    const pixData = await pixResponse.json();
    if (!pixResponse.ok) {
      const msg = pixData.message || pixData.errorDescription || 'Erro ao gerar PIX';
      return NextResponse.json({ error: msg }, { status: 400 });
    }

    const transactionId = pixData.transactionId;

    // 5. Salva compra pendente no Supabase
    await admin.from('pending_upgrade_purchases').upsert({
      transaction_id: transactionId,
      user_id: user.id,
      upgrade_id: upgradeId,
      amount: upgrade.preco,
      nome,
      email,
    }, { onConflict: 'transaction_id', ignoreDuplicates: true });

    // 6. Extrai QR code
    const pixNode = pixData.pix || pixData.order?.pix || {};
    const pixPayload =
      pixNode.code || pixNode.payload || pixNode.emv || pixNode.qrCode || pixNode.qrcode || null;

    if (!pixPayload) {
      return NextResponse.json({ error: 'Sem código PIX na resposta' }, { status: 500 });
    }

    let qrCodeSrc = pixNode.base64 || pixNode.image || pixNode.imageUrl || null;
    if (qrCodeSrc && !qrCodeSrc.startsWith('data:') && !qrCodeSrc.startsWith('http')) {
      qrCodeSrc = `data:image/png;base64,${qrCodeSrc}`;
    }
    if (!qrCodeSrc) {
      qrCodeSrc = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(pixPayload)}`;
    }

    return NextResponse.json({ transactionId, pixPayload, qrCodeSrc });

  } catch (err) {
    console.error('[upgrade/create]', err);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
