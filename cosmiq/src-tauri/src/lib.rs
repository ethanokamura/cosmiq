use reqwest;
use serde::Deserialize;
use tauri::command;

#[derive(Debug, Deserialize)]
pub struct GenerateQuizInput {
    pub prompt: String,
}

#[command]
async fn generate_summary(content: String) -> Result<String, String> {
    let backend_url = if cfg!(debug_assertions) {
        "http://localhost:8080/generate-summary"
    } else {
        "https://cosmiq-server.vercel.app/generate-summary"
    };

    let client = reqwest::Client::new();
    let response = client
        .post(backend_url)
        .json(&serde_json::json!({ "content": content }))
        .send()
        .await
        .map_err(|e| e.to_string())?;

    let data: serde_json::Value = response.json().await.map_err(|e| e.to_string())?;
    Ok(data["summary"].as_str().unwrap_or("No summary").to_string())
}

#[command]
async fn generate_quiz(input: GenerateQuizInput) -> Result<String, String> {
    let backend_url = if cfg!(debug_assertions) {
        "http://localhost:8080/generate-quiz"
    } else {
        "https://cosmiq-server.vercel.app/generate-quiz"
    };

    let client = reqwest::Client::new();

    let response = client
        .post(backend_url)
        .header("Content-Type", "application/json")
        .json(&serde_json::json!({ "prompt": input.prompt }))
        .send()
        .await
        .map_err(|e| e.to_string())?;

    let json: serde_json::Value = response.json().await.map_err(|e| e.to_string())?;

    if let Some(quiz_json) = json.get("quiz") {
        Ok(quiz_json.to_string())
    } else {
        Err("Invalid response from server".to_string())
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![generate_summary, generate_quiz])
        .run(tauri::generate_context!())
        .expect("error while running tauri application")
}
