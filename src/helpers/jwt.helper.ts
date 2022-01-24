import { create, Header, Payload, getNumericDate, verify } from "../../_dependencies/djwt.ts";

export class JwtHelper {
  private static jwtHeader = { alg: "HS512", typ: "JWT" } as Header;
  private static secret    = Deno.env.get("TOKEN_SECRET") as string;



  /**
   * @brief Generación del token concedido por jwt
   * @param user nombre del usuario que se usará como semilla
   * @param hours tiempo de expiración del token en horas
   * @return object { token }
   */

  public static async generateToken(user: string, hours: number): Promise<Record<string,unknown>> {
    const payload: Payload = { 
      user, 
      iss: "djwt",
      iat: Date.now(),
      exp: getNumericDate(60*60*hours)
    };
    return { token: await create(this.jwtHeader, payload, this.secret) }
  }
  


  /**
   * @brief Se verifica { token, secret, jwt_header } y se devuelve el jwt_payload
   * @param token Bearer Token esperado
   * @return Promise<Payload | Error> Payload del tipo { user, exp }
   */

  public static async extractPayload(token: string): Promise<Payload | Error> {
    try {
      // const { payload } = decode(token as string);
      return await verify(token, this.secret, this.jwtHeader.alg);
    } catch(err) { 
      console.error(err);
      throw new Error("access_token is invalid or expired.") 
    }
  }



  







}