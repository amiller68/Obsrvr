# Define a port to expose
PORT=3000

echo "Starting server on port: " $PORT

# Start the server, make sure its running in the background
python3 server/server.py &
lt -p $PORT -s "obsrvr"
