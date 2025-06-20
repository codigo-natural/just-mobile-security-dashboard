import { NextResponse } from "next/server";
import { getServiceById } from "@/lib/data-loader";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ serviceId: string }> }
) {
  try {
    const { serviceId } = await params;
    const serviceIdNum = parseInt(serviceId, 10);
    if (isNaN(serviceIdNum)) {
      return NextResponse.json({ message: 'Invalid service ID' }, { status: 400 })
    }
    const service = getServiceById(serviceIdNum);
    if (!service) {
      return NextResponse.json({ message: 'Service not found' }, { status: 400 })
    }
    return NextResponse.json(service);
  } catch (error) {
    console.error(`API Error (service ${params}): `, error);
    return NextResponse.json({ message: 'Error fetching service details' }, { status: 500 })
  }
}