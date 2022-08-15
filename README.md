技术栈
1. express
2. typescript
3. mongodb
4. elastic search
5. redis
6. logdash
elastic search版本为7.17.5 需安装ik分词器
mapping如下
```
PUT posts
{
  "mappings": {
    "properties": {
      "content": {
        "type": "text",
        "analyzer": "ik_smart"
      },
      "createdAt": {
        "type": "date"
      },
      "mongo_id": {
        "type": "keyword"
      },
      "title": {
        "type": "text",
        "analyzer": "ik_smart"
      },
      "updatedAt": {
        "type": "date"
      }
    }
  }
}

```
logdash 需安装logstash-input-mongodb差距
配置如下
```

input{
 mongodb{
   uri => "mongodb://localhost:27017/blog"
   placeholder_db_dir => "/opt/data"
   placeholder_db_name => "logstash_sqlite.db"
   collection => "posts"
   batch_size => 5000
  }
}
filter{
        mutate {
        rename => { "_id" => "mongo_id" }
        remove_field => ["host"]
        remove_field => ["agent"]
        remove_field => ["ecs"]
        remove_field => ["tags"]
        remove_field => ["fields"]
        remove_field => ["@version"]
        remove_field => ["@timestamp"]
        remove_field => ["input"]
        remove_field => ["log"]
        remove_field => ["logdate"]
        remove_field => ["log_entry"]
        remove_field => ["__v"]

        }
 }
output {
    stdout { codec => rubydebug }
    elasticsearch {
            action => "index"
            hosts => "localhost:9200"
            index => "posts"
            document_id => "%{mongo_id}"
    }
  }
```