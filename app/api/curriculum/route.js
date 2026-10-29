import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Curriculum from '@/models/Curriculum';

export async function GET() {
  try {
    await dbConnect();
    const curriculums = await Curriculum.find({}).lean();
    return NextResponse.json({ success: true, data: curriculums });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}