// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use tauri::command;
use serde::Deserialize;
use reqwest::header::{CONTENT_TYPE, AUTHORIZATION};
use std::env;

#[derive(Deserialize)]
struct GenerateSummaryInput {
    content: String,
}

#[command]
async fn generate_summary(input: GenerateSummaryInput) -> Result<String, String> {
    let api_key = env::var("GEMINI_API_KEY").map_err(|e| e.to_string())?;
    let base_url = env::var("GEMINI_MODEL_VERSION").map_err(|e| e.to_string())?;
    let url = format!("{}?key={}", base_url, api_key);  
    println!("API KEY: {}", api_key);
    println!("Model URL: {}", url);

    let client = reqwest::Client::new();

    let payload = serde_json::json!({
        "contents": [
            {
                "parts": [
                    {
                        "text": input.content
                    }
                ]
            }
        ]
    });

    let response = client
    .post(&url)
    .header(CONTENT_TYPE, "application/json")
    .json(&payload)
    .send()
    .await
    .map_err(|e| e.to_string())?;

    let json: serde_json::Value = response.json().await.map_err(|e| e.to_string())?;
    println!("Gemini response: {}", json);
    let generated_text = json.get("candidates")
    .and_then(|c| c.get(0))
    .and_then(|c| c.get("content"))
    .and_then(|c| c.get("parts"))
    .and_then(|p| p.get(0))
    .and_then(|p| p.get("text"))
    .and_then(|t| t.as_str())
    .unwrap_or("No summary found")
    .to_string();
    Ok(generated_text)
}


#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![generate_summary])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
