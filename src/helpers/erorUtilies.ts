export function normalizeError(err: any) {
  if (!err) return { message: 'Unknown error', stack: undefined };

  if (typeof err === 'string') return { message: err, stack: undefined };

  if (err instanceof Error) return { message: err.message, stack: err.stack };

  if (typeof err === 'object') {
    return {
      message: String((err as any).message ?? JSON.stringify(err)),
      stack: (err as any).stack ?? undefined
    };
  }

  return { message: String(err), stack: undefined };
}

