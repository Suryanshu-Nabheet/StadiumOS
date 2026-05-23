import { NextResponse } from "next/server";
import { ApiError, toErrorMessage } from "@/server/lib/errors";

export function jsonOk<T>(data: T, init?: ResponseInit) {
  return NextResponse.json(data, { status: 200, ...init });
}

export function jsonError(error: unknown, fallbackStatus = 500) {
  if (error instanceof ApiError) {
    return NextResponse.json(
      { error: error.message, code: error.code },
      { status: error.status },
    );
  }
  return NextResponse.json(
    { error: toErrorMessage(error) },
    { status: fallbackStatus },
  );
}
