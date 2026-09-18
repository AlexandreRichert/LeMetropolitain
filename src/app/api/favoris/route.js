import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import {
  addFavorite,
  getFavoriteArtworkIds,
  removeFavorite,
} from "@/lib/favoris";

async function requireSession() {
  return auth.api.getSession({ headers: await headers() });
}

export async function GET() {
  const session = await requireSession();
  if (!session)
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const ids = await getFavoriteArtworkIds(session.user.id);
  return NextResponse.json({ ids });
}

export async function POST(request) {
  const session = await requireSession();
  if (!session)
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const { artworkId } = await request.json();
  if (typeof artworkId !== "string" || !artworkId) {
    return NextResponse.json({ error: "invalid_artwork_id" }, { status: 400 });
  }

  await addFavorite(session.user.id, artworkId);
  return NextResponse.json({ ok: true });
}

export async function DELETE(request) {
  const session = await requireSession();
  if (!session)
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const { artworkId } = await request.json();
  if (typeof artworkId !== "string" || !artworkId) {
    return NextResponse.json({ error: "invalid_artwork_id" }, { status: 400 });
  }

  await removeFavorite(session.user.id, artworkId);
  return NextResponse.json({ ok: true });
}
