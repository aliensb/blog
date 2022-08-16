# Common build stage
FROM logstash:7.17.5
RUN bin/logstash-plugin install logstash-input-mongodb
USER root
RUN apt-get install netbase -y