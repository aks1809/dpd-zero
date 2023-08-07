FROM restreamio/gstreamer:2022-12-12T14-46-07Z-prod-dbg

ARG ssh_prv_key
ARG ssh_pub_key

RUN apt-get update -y >/dev/null 2>&1
RUN apt-get install -y git python3-pip curl vim usbrelay >/dev/null 2>&1

# Authorize SSH Host
RUN mkdir -p /root/.ssh && \
    chmod 0700 /root/.ssh && \
    ssh-keyscan github.com > /root/.ssh/known_hosts

# Add the keys and set permissions
RUN echo "$ssh_prv_key" > /root/.ssh/id_rsa && \
    echo "$ssh_pub_key" > /root/.ssh/id_rsa.pub && \
    chmod 600 /root/.ssh/id_rsa && \
    chmod 600 /root/.ssh/id_rsa.pub

RUN curl -sL https://deb.nodesource.com/setup_16.x | bash - >/dev/null 2>&1
RUN apt -y install nodejs >/dev/null 2>&1
RUN npm i -g pm2 yarn >/dev/null 2>&1
RUN pip3 install numpy imagezmq >/dev/null 2>&1

RUN cat ~/.ssh/id_rsa.pub >/dev/null 2>&1

RUN git clone git@github.com:Frinks-ai/cement-offline-backend.git
RUN git clone git@github.com:Frinks-ai/cement-frontend.git

WORKDIR /cement-offline-backend
RUN git checkout adani-test >/dev/null 2>&1
RUN yarn >/dev/null 2>&1

WORKDIR /cement-frontend
RUN git checkout adani-test >/dev/null 2>&1
COPY frontend.env.example /cement-frontend/.env
RUN yarn >/dev/null 2>&1
WORKDIR /cement-offline-backend
RUN chmod +x masterStarter.bash

COPY .env /cement-offline-backend/
WORKDIR /cement-offline-backend
COPY password.json /
CMD [ "./masterStarter.bash" ]
