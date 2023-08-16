apiProcesses=$(lsof -i :3000)

pids=$(echo "$apiProcesses" | awk '$1=="COMMAND" {next} {print $2}')

if [ -z "$pids" ]; then
  echo "No processes found on port 3000"
else
  for pid in $pids; do
    kill "$pid"
    echo "Process with PID $pid has been terminated"
  done
fi
