import React from 'react';

import { Link } from 'react-router-dom";
import ( useEffect, useState } from "react";
import { GoogleGenAI} from "@google/genai";

const ai = new GoogleGenAI({ apiKey:"AIzaSyCHb1yl_9vM1C3_a9vJGROkfT_0iEcE0LM" });

funciton Summary({path}:{path:string}){

const [content,setContent]=useState<string|null>(null);
	useEffect(()=>{
	const loadFile = async() => {
		try{
		baseDir:BaseDirectory.Document,
	});
	setContent(md);
	} catch (error){
		console.error("Failure to read file:",error);
	}
	};
	loadFile();
}, [filePath]);




	try{
		const response = await ai.models.generateContent{(
			model: "gemini-2.0-flash",
			contents: content;
		});

		summarizedText= response.text;

		//
}

//find a way to get the text out of this component

export default function Summary() {
  return (
    <main>
      <h1>Summary Page</h1>
    </main>
  );
}
