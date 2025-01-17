FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build
# build 폴더에 정적파일 생성 후 파일을 nginx를 통해 제공함

FROM nginx:alpine
# alpine 이미지를 사용하여 정적 파일을 제공하기위한 웹서버로 설정
COPY --from=0 /app/build /usr/share/nginx/html
# --from=0 - 첫번째단계(0번째) 를 참조한다는뜻 현재 맨위는 FROM node:18이므로
# node:18 단계에서 react를 빌드하고 npm run build 명령을통해 /app/build 폴더에 정적 파일들이 생성
# /app/build - 복사할 파일 , 폴더의 출처 경로
# /usr/share/nginx/html이 목적 경로(Nginx의 기본 정적 파일 제공 위치) 

EXPOSE 3000
# docker-compose 파일에 포트번호 적어놨으면 생략가능함