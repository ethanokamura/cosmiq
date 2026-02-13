use reqwest;
use serde::Deserialize;
use tauri::command;
use tauri::Manager;

#[derive(Debug, Deserialize)]
pub struct GenerateQuizInput {
    pub prompt: String,
}

#[derive(Debug, Deserialize)]
pub struct GenerateSummaryInput {
    pub content: String,
}

#[derive(Deserialize)]
struct SummaryResponse {
    summary: String,
}

#[command]
async fn generate_summary(input: GenerateSummaryInput) -> Result<String, String> {
    let backend_url = "https://cosmiq-386550765711.us-west1.run.app/generate-summary";
    let client = reqwest::Client::new();
    let response = client
        .post(backend_url)
        .json(&serde_json::json!({ "content": input.content }))
        .send()
        .await
        .map_err(|e| e.to_string())?;

    if !response.status().is_success() {
      return Err(format!("Server error: {}", response.status()));
    }

    let data: SummaryResponse = response.json().await.map_err(|e| e.to_string())?;
    Ok(data.summary)
}

#[command]
async fn generate_quiz(input: GenerateQuizInput) -> Result<String, String> {
    let backend_url = "https://cosmiq-386550765711.us-west1.run.app/generate-quiz";
    let client = reqwest::Client::new();
    let response = client
        .post(backend_url)
        .json(&serde_json::json!({ "prompt": input.prompt }))
        .send()
        .await
        .map_err(|e| e.to_string())?;

    if !response.status().is_success() {
      return Err(format!("Server error: {}", response.status()));
    }

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
        .setup(|app| {
          if let Some(window) = app.get_webview_window("main") {
              // set transparent title bar only when building for macOS
              #[cfg(target_os = "macos")]
              window.set_title_bar_style(tauri::TitleBarStyle::Transparent).unwrap();

              // set background color only when building for macOS
              #[cfg(target_os = "macos")]
              {
                  use cocoa::appkit::{NSColor, NSWindow};
                  use cocoa::base::{id, nil};

                  let ns_window = window.ns_window().unwrap() as id;
                  unsafe {
                      let bg_color = NSColor::colorWithRed_green_blue_alpha_(
                          nil,
                          16.0 / 255.0,
                          20.0 / 255.0,
                          26.0 / 255.0,
                          1.0,
                      );
                      ns_window.setBackgroundColor_(bg_color);
                  }
              }
          }
          Ok(())
        })
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![generate_summary, generate_quiz])
        .run(tauri::generate_context!())
        .expect("error while running tauri application")
}
