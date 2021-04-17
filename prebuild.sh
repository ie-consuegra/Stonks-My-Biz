echo "Building backend code..."
cat ./server/utils.js ./server/DB.js ./server/DBS.js ./server/stonksApp.js ./server/app.js ./server/server.js > ./dist/backend.js
echo "Done"
echo "Building frontend code..."
cat ./client/js/datePickerSetup.js ./client/js/utils.js ./client/js/viewSwitcher.js ./client/js/SmartTable.js ./client/js/tables.js ./client/js/onload.js > ./client/script.js
cat ./client/index.html > ./dist/frontend.html
echo "Done"
