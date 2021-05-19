import { decode } from "../deps.ts";

export function getToken(headers: Headers) {
  const authorization   = headers.get("Authorization");
  const [method, token] = authorization? authorization.split(" "): [null,null];

  if (!authorization)      return null;
  if (method !== "Bearer") return null; // Bearer asdfkjshfkj4hkfj34./sdfhjksdhfjk.34r
  if (!token)              return null;

  return token;
}

export function getPayloadFromToken(headers: Headers) {
  try {
    const token       = getToken(headers);
    const { payload } = decode(token as string);

    if(!token)   return null;
    if(!payload) return null;
    
    return payload;
  } catch {
    return null;
  }
}