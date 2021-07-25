import { decode } from "../deps.ts";

export function getToken(headers: Headers) {
  const authorization = headers.get("Authorization"); // Obtener el objeto de autorización de jwt
  if (!authorization) return null;

  const [method, token] = authorization? authorization.split(" "): [null,null];
  if (method !== "Bearer") return null; // Bearer es un token como "asdfkjshfkj4hkfj34./sdfhjksdhfjk.34r"
  if (!token)              return null; 

  return token;
}

export function getPayloadFromToken(headers: Headers) {
  try {
    const token = getToken(headers);
    if(!token) return null;

    const { payload } = decode(token as string);
    if(!payload) return null;
    
    return payload;
  } catch {
    return null;
  }
}