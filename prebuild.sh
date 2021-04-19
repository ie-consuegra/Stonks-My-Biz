echo "Building backend code..."
cat ./server/utils.js ./server/DB.js ./server/DBS.js ./server/stonksApp.js ./server/app.js ./server/server.js > ./dist/backend.js
echo "Done"
echo "Building frontend code..."
cat ./client/js/utils.js ./client/js/SmartTable.js ./client/js/appConfig.js ./client/js/globals.js ./client/js/switchView.js ./client/js/output.js ./client/js/serverCalls.js ./client/js/input.js ./client/js/onload.js ./client/js/datePickerSetup.js > ./client/script.js
cat ./client/index.html > ./dist/frontend.html
echo "Done"
