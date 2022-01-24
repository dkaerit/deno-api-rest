import { decode, create, Header, Payload, getNumericDate } from "../../_dependencies/djwt.ts";

export class JwtHelper {


  



  public static getToken(headers: Headers) {
    const authorization = headers.get("Authorization"); // Obtener el objeto de autorización de jwt
    if (!authorization) return null;

    const [method, token] = authorization? authorization.split(" "): [null,null];
    if (method !== "Bearer") return null; // Bearer es un token como "asdfkjshfkj4hkfj34./sdfhjksdhfjk.34r"
    if (!token)              return null; 

    return token;
  }


  




  public static getPayloadFromToken(headers: Headers) {
    try {
      const token = this.getToken(headers);
      if(!token) return null;
  
      const { payload } = decode(token as string);
      if(!payload) return null;
      
      return payload;
    } catch {
      return null;
    }
  }






  public static makeEssentials(user: string, hours: number) {
    const header = { alg: "HS512", typ: "JWT" } as Header;
    const payload = { user, exp: getNumericDate(60*60*hours) } as Payload; // horas (hours)
    const secret = Deno.env.get("TOKEN_SECRET") as string // Obtener el secreto en "env"
    return {header, payload, secret}
  }




  

  public static async generateToken(user: string, hours: number): Promise<Record<string,unknown>> {
    const {header, payload, secret} = this.makeEssentials(user, hours)
    return { token: await create(header, payload, secret) }
  }

}