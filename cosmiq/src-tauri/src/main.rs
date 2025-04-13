// Prevents additional console window on Windows in release, DO NOT REMOVE!!
// but I want to -- Alex
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
    dotenvy::dotenv().ok();
    cosmiq_lib::run()
}
