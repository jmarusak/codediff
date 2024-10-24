package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
)

// Define a struct to represent the expected JSON structure
type RequestData struct {
	Message string `json:"message"` // This maps to the "message" field in the incoming JSON
}

// Middleware to handle CORS
func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		// Handle preflight OPTIONS request
		if r.Method == http.MethodOptions {
			return
		}

		next.ServeHTTP(w, r)
	})
}

func generateHandler(w http.ResponseWriter, r *http.Request) {
	//		response := map[string]interface{}{"status": "success", "message": "Hello World!"}

	// Request
	if r.Method != http.MethodPost {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	// Read the body of the request
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "Unable to read request body", http.StatusBadRequest)
		return
	}
	defer r.Body.Close()

	// Parse the JSON body into a Go struct
	var requestData RequestData
	err = json.Unmarshal(body, &requestData)
	if err != nil {
		http.Error(w, "Invalid JSON format", http.StatusBadRequest)
		return
	}

	// Response
	/*
		jsonData, err := json.Marshal(body)
		if err != nil {
			http.Error(w, "Failed to marshal response: %v", http.StatusInternalServerError)
			return
		}
	*/

	_, err = w.Write(body)
	if err != nil {
		log.Printf("Failed to write response: %v", err)
	}
}

func main() {
	mux := http.NewServeMux()
	handler := corsMiddleware(mux)

	mux.HandleFunc("/generate", generateHandler)

	fmt.Println("Server starting on port 8080...")
	log.Fatal(http.ListenAndServe(":8080", handler))
}
