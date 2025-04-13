// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use reqwest::header::CONTENT_TYPE;
use serde::Deserialize;
use std::env;
use tauri::command;

#[derive(Deserialize)]
struct GenerateSummaryInput {
    content: String,
}

#[derive(Debug, Deserialize)]
pub struct GenerateQuizInput {
    pub topic: String,
    pub num_questions: u8,
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
    let generated_text = json
        .get("candidates")
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

#[command]
async fn generate_quiz(input: GenerateQuizInput) -> Result<String, String> {
    let api_key = env::var("GEMINI_API_KEY").map_err(|e| e.to_string())?;
    let base_url = env::var("GEMINI_MODEL_VERSION").map_err(|e| e.to_string())?;
    let url = format!("{}?key={}", base_url, api_key);
    println!("API KEY: {}", api_key);
    println!("Model URL: {}", url);

    let client = reqwest::Client::new();
    let prompt = format!(
        "Create a quiz with {} questions about {}. Return the response as a JSON object with the following structure:\
        {{\"questions\": [{{\"question\": \"Question text\", \"options\": [\"Option A\", \"Option B\", \"Option C\", \"Option D\"], \"answer\": \"Correct option\"}}]}}",
        input.num_questions, input.topic
    );

    let payload = serde_json::json!({
        "contents": [
            {
                "parts": [
                    {
                        "text": prompt
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

    let generated_text = json
        .get("candidates")
        .and_then(|c| c.get(0))
        .and_then(|c| c.get("content"))
        .and_then(|c| c.get("parts"))
        .and_then(|p| p.get(0))
        .and_then(|p| p.get("text"))
        .and_then(|t| t.as_str())
        .unwrap_or("No quiz generated")
        .to_string();

    // Validate that the response is proper JSON with the expected structure
    match serde_json::from_str::<serde_json::Value>(&generated_text) {
        Ok(quiz_json) => {
            if quiz_json.get("questions").is_some() {
                Ok(generated_text)
            } else {
                Err("Generated quiz doesn't have the expected JSON structure".to_string())
            }
        }
        Err(_) => {
            // If the response isn't valid JSON, try to extract and fix it
            // Sometimes the API might return JSON with extra text around it
            if let Some(json_start) = generated_text.find('{') {
                if let Some(json_end) = generated_text.rfind('}') {
                    let json_str = &generated_text[json_start..=json_end];
                    if let Ok(_) = serde_json::from_str::<serde_json::Value>(json_str) {
                        return Ok(json_str.to_string());
                    }
                }
            }
            Err("Failed to parse generated quiz as JSON".to_string())
        }
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![generate_summary])
        .run(tauri::generate_context!())
        .expect("error while running tauri application")
}
