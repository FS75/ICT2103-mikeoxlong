echo "Going into frontend/2103-project directory"
cd frontend/2103-project
echo "npm run build"
(sleep 10
echo "Opening browser"
start http://localhost:8080/ & open http://localhost:8080/) & npm run build