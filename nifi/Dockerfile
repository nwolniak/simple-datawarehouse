FROM apache/nifi:2.0.0-M2

ENV NIFI_WEB_HTTP_HOST=0.0.0.0
ENV NIFI_WEB_HTTP_PORT=8080

COPY ./drivers /opt/nifi/nifi-current/drivers
COPY ./scripts/common.sh /opt/nifi/scripts/common.sh
COPY ./scripts/start.sh /opt/nifi/scripts/start.sh
