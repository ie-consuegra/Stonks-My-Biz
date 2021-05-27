echo "*  Bundling backend JavaScript code..."
cat ./server/utils.js ./server/DB.js ./server/DBS.js ./server/stonksApp.js ./server/app.js ./server/server.js > ./dist/backend.js
echo "✔️  Done, file can be found as backend.js in dist folder"
printf "\n"
echo "*  Bundling frontend JavaScript code..."
cat ./client/js/utils.js ./client/js/SmartTable.js ./client/js/settings.js ./client/js/globals.js ./client/js/switchView.js ./client/js/output.js ./client/js/serverCalls.js ./client/js/input.js ./client/js/computations.js ./client/js/onload.js ./client/js/datePickerSetup.js > ./client/bundle.js
echo "✔️  Done, file can be found as bundle.js in client folder"
printf "\n"
echo "*  Building frontend file..."
npx html-build -c html-build-config.js client/index.html dist/frontend.html
echo "✔️  Done, ready to test or deploy"
printf "\n"
