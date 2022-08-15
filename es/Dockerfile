# Common build stage
FROM docker.elastic.co/elasticsearch/elasticsearch:7.17.5
RUN bin/elasticsearch-plugin install http://1.14.121.211:8080/elasticsearch-analysis-ik-7.17.5.zip  --batch
# RUN bin/elasticsearch-plugin install https://github.com/medcl/elasticsearch-analysis-ik/releases/download/v7.17.5/elasticsearch-analysis-ik-7.17.5.zip  --batch