import { NextResponse } from 'next/server';
import clientPromise from '../../../../lib/mongodb';
import { defaultUniversities } from '../../../../lib/universities-data';
import { defaultFaqs } from '../../../../lib/faqs-data';
import { defaultPlacements } from '../../../../lib/placements-data';
import { defaultStudents } from '../../../../lib/students-data';
import { defaultContact } from '../../../../lib/contact-data';

const DB_NAME = 'studyalbania';

export async function POST() {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const col = db.collection('siteData');

    const seeds = [
      { _id: 'universities', data: defaultUniversities },
      { _id: 'faqs',         data: defaultFaqs },
      { _id: 'placements',   data: defaultPlacements },
      { _id: 'students',     data: defaultStudents },
      { _id: 'contact',      data: defaultContact },
      { _id: 'enquiries',    data: [] },
    ];

    for (const seed of seeds) {
      await col.replaceOne({ _id: seed._id }, seed, { upsert: true });
    }

    return NextResponse.json({ ok: true, seeded: seeds.map(s => s._id) });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
