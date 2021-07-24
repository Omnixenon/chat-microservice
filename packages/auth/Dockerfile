FROM nikolaik/python-nodejs

WORKDIR /opt/app

COPY ./package.json ./package.json

COPY ./packages/auth/src ./packages/auth/src
COPY ./packages/auth/package.json ./packages/auth/package.json
COPY ./packages/auth/serverless.ts ./packages/auth/serverless.ts
COPY ./packages/auth/tsconfig.json ./packages/auth/tsconfig.json
COPY ./packages/auth/.bin ./packages/auth/.bin

RUN yarn install
RUN yarn workspace auth add argon2

RUN pip install awscli --upgrade --user
ENV PATH="$PATH:/root/.local/bin"

RUN export NODE_OPTIONS=--max_old_space_size=8192

EXPOSE 7000

WORKDIR /opt/app/packages/auth

CMD ["./.bin/init.sh"]
