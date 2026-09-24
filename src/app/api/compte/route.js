import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { disableAccount } from "@/lib/account";
import { auth } from "@/lib/auth";

export async function DELETE() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session)
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  await disableAccount(session.user.id);
  return NextResponse.json({ ok: true });
}
