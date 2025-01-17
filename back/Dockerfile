FROM node:18

WORKDIR /app
# 생략가능함 생략하면 기본적으로 / 루트 디렉토리에서 작업
# 왠만하면 생략 ㄴㄴ

COPY package*.json ./
# 생략가능 근대 생략하면 캐시 활용이 어려워 빌드 속도가 느려질 수 있음

RUN npm install
# 위랑같음

COPY . .
# 생략 ㄴㄴ

EXPOSE 3333
# docker 전역파일에 포트번호 적어놨으면 생략가능

CMD ["npm","start"]
# 생략 x