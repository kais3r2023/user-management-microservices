# Nombre del contenedor de Kafka
$KAFKA_CONTAINER = "kafka"

# Servidor de bootstrap
$BOOTSTRAP_SERVER = "localhost:9092"

# Lista de tópicos
$TOPICS = @(
  "users",
  "create_user.reply",
  "find_all_users.reply",
  "find_user_by_id.reply",
  "update_user.reply",
  "delete_user.reply"
)

Write-Host "🔎 Creando tópicos en Kafka..."

foreach ($topic in $TOPICS) {
    Write-Host "➡️ Creando tópico: $topic"
    docker exec -it $KAFKA_CONTAINER kafka-topics.sh `
        --create `
        --if-not-exists `
        --topic $topic `
        --bootstrap-server $BOOTSTRAP_SERVER `
        --partitions 1 `
        --replication-factor 1
}

Write-Host "✅ Todos los tópicos fueron creados o ya existían."
Write-Host ""
Write-Host "📋 Tópicos en Kafka:"

docker exec -it $KAFKA_CONTAINER kafka-topics.sh --list --bootstrap-server $BOOTSTRAP_SERVER
