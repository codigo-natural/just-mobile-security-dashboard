import { NextResponse } from "next/server";
import { getServiceById } from "@/lib/data-loader";

export async function GET(
  request: Request,
  { params }: { params: { serviceId: string } }
) {
  try {
    const serviceId = parseInt(params.serviceId);
    const service = getServiceById(serviceId);

    if (!service) {
      return NextResponse.json(
        { message: `Service with ID ${serviceId} not found` },
        { status: 404 }
      );
    }

    return NextResponse.json(service.vulnerabilities || []);
  } catch (error) {
    console.error(`API Error (vulnerabilities for service ${params.serviceId}):`, error);
    return NextResponse.json(
      { message: 'Error fetching vulnerabilities' },
      { status: 500 }
    );
  }
}