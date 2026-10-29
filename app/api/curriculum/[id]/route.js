import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Curriculum from '@/models/Curriculum';

export async function GET(request, context) {
  try {
    await dbConnect();
    const { id } = await context.params;
    
    const curriculum = await Curriculum.findById(id).lean();

    if (!curriculum) {
      return NextResponse.json({ success: false, error: "Curriculum not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: curriculum });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}