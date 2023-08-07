FROM node:latest

RUN git clone https://github.com/aks1809/dpd-zero.git

WORKDIR /dpd-zero
RUN npm install >/dev/null 2>&1