FROM hayd/alpine-deno:1.10.2

EXPOSE 8081 
WORKDIR /srv/www
USER root

# COPY deps.ts .
# RUN deno cache --unstable deps.ts

ADD . .

RUN deno cache --unstable mod.ts
CMD ["run", "-A", "--unstable", "mod.ts"]