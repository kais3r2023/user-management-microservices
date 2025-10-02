#!/bin/bash

# Nombre del contenedor de Kafka
KAFKA_CONTAINER="kafka"
BOOTSTRAP_SERVER="localhost:9092"

# Lista de tópicos a crear
TOPICS=(
  "users"
  "create_user.reply"
  "find_all_users.reply"
  "find_user_by_id.reply"
  "update_user.reply"
  "delete_user.reply"
)

echo "🔎 Creando tópicos en Kafka..."

for topic in "${TOPICS[@]}"
do
  echo "➡️ Creando tópico: $topic"
  docker exec -it $KAFKA_CONTAINER kafka-topics --create \
    --if-not-exists \
    --topic $topic \
    --bootstrap-server $BOOTSTRAP_SERVER \
    --partitions 1 \
    --replication-factor 1
done

echo "✅ Todos los tópicos fueron creados o ya existían."
echo ""
echo "📋 Lista de tópicos actuales:"

docker exec -it $KAFKA_CONTAINER kafka-topics --list --bootstrap-server $BOOTSTRAP_SERVER
