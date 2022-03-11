near delete clock.dani-rs.testnet dani-rs.testnet
near create-account clock.dani-rs.testnet --masterAccount dani-rs.testnet
cd rust
./build.sh
near deploy clock.dani-rs.testnet --wasmFile target/wasm32-unknown-unknown/release/rust_counter_tutorial.wasm
cd ..
yarn parcel src/index.html