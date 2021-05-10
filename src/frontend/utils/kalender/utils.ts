export const mod = (n: number, m: number) => ((n % m) + m) % m;

export const capString = (n: number, s: number) => s.toString().padStart(n, '0').slice(0, n);
