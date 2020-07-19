yarn install --production
export GENERATE_SOURCEMAP=false
yarn run build-lm
yes | sudo cp -rf ./build/* /website/lwt
