FROM hayd/alpine-deno:1.4.6

EXPOSE 8081 
WORKDIR /usr/src/app
USER root

# COPY deps.ts .
# RUN deno cache --unstable deps.ts

ADD . .

RUN deno cache --unstable server.ts
RUN deno install -qAf --unstable https://x.nest.land/denon@2.4.4/denon.ts
ENTRYPOINT ["/usr/local/bin/denon"]
CMD ["run", "-A", "--unstable", "server.ts"]