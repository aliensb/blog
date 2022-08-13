import { Client } from '@elastic/elasticsearch';
import fs from 'fs';

/**
 * ----------------------------------------------------------------------------------------------------------------------
-> Elasticsearch security features have been automatically configured!
-> Authentication is enabled and cluster connections are encrypted.

->  Password for the elastic user (reset with `bin/elasticsearch-reset-password -u elastic`):
  u1DPTYys-PQF3*as6iHS

->  HTTP CA certificate SHA-256 fingerprint:
  74dee097fcb3621201c5bf60897c2e9fda16b944f0126d2e802bb7b90fd382a6

->  Configure Kibana to use this cluster:
* Run Kibana and click the configuration link in the terminal when Kibana starts.
* Copy the following enrollment token and paste it into Kibana in your browser (valid for the next 30 minutes):
  eyJ2ZXIiOiI4LjMuMyIsImFkciI6WyIxNzIuMTguMC4yOjkyMDAiXSwiZmdyIjoiNzRkZWUwOTdmY2IzNjIxMjAxYzViZjYwODk3YzJlOWZkYTE2Yjk0NGYwMTI2ZDJlODAyYmI3YjkwZmQzODJhNiIsImtleSI6IkFRZ2JrWUlCVlhfRXRPbE1jeDBjOmtydE9FaGtTVE42LWV4eTBnY2lqOFEifQ==

-> Configure other nodes to join this cluster:
* Copy the following enrollment token and start new Elasticsearch nodes with `bin/elasticsearch --enrollment-token <token>` (valid for the next 30 minutes):
  eyJ2ZXIiOiI4LjMuMyIsImFkciI6WyIxNzIuMTguMC4yOjkyMDAiXSwiZmdyIjoiNzRkZWUwOTdmY2IzNjIxMjAxYzViZjYwODk3YzJlOWZkYTE2Yjk0NGYwMTI2ZDJlODAyYmI3YjkwZmQzODJhNiIsImtleSI6IkF3Z2JrWUlCVlhfRXRPbE1jeDBvOnRndnM3THVVU1pDNHREMmFZUmpsdUEifQ==

  If you're running in Docker, copy the enrollment token and run:
  `docker run -e "ENROLLMENT_TOKEN=<token>" docker.elastic.co/elasticsearch/elasticsearch:8.3.3`
------------------------------------------------------------------------------------------------------------------
 */

export const esConnection = {
  node: 'http://localhost:9200',
};

export const INDEX_NAME = 'blogs';
