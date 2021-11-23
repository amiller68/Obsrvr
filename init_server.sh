# Define a port to expose
PORT=3000

echo "Starting server on port: " $PORT

# Start the server, make sure its running in the background
node server/server.js $PORT &


#BROKEN
# Run a local tunnel, get the URI and store it in a place expo can see it
##ENV_FILE="app/.env"
#touch $ENV_FILE
#lt -p $PORT -s "obsrvr" | unbuffer -p egrep -o 'https?://[^ ]+' >> $ENV_FILE

echo "Make sure our app is requesting from:"
lt -p $PORT -s "obsrvr" | unbuffer -p egrep -o 'https?://[^ ]+'