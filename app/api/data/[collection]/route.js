import { NextResponse } from 'next/server';
import clientPromise from '../../../../lib/mongodb';

const DB_NAME = 'studyalbania';
const ALLOWED = new Set(['universities', 'faqs', 'placements', 'enquiries', 'students', 'contact']);

export async function GET(request, { params }) {
  const { collection } = await params;
  if (!ALLOWED.has(collection)) return NextResponse.json(null, { status: 404 });

  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const doc = await db.collection('siteData').findOne({ _id: collection });
    return NextResponse.json(doc?.data ?? null);
  } catch {
    return NextResponse.json(null, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  const { collection } = await params;
  if (!ALLOWED.has(collection)) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  try {
    const data = await request.json();
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    await db.collection('siteData').replaceOne(
      { _id: collection },
      { _id: collection, data },
      { upsert: true }
    );
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
