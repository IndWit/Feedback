package main

import (
	"fmt"
	"log"
	"net/http"

	"Feedback/db"       // Import our DB connection
	"Feedback/handlers" // Import our Logic
)

func main() {
	fmt.Println("⚡ PeerPulse Backend is starting...")

	// 1. Connect to Database
	db.Connect()

	// 2. Setup Routes (Using functions from the 'handlers' package)
	http.HandleFunc("/register", handlers.RegisterHandler)
	http.HandleFunc("/login", handlers.LoginHandler)
	
	http.HandleFunc("/create-session", handlers.CreateSessionHandler)
	http.HandleFunc("/get-sessions", handlers.GetSessionsHandler)
	http.HandleFunc("/delete-session", handlers.DeleteSessionHandler)
	
	http.HandleFunc("/submit-feedback", handlers.SubmitFeedbackHandler)
	http.HandleFunc("/view-feedback", handlers.ViewFeedbackHandler)

	// 3. Start Server
	fmt.Println("🚀 Server running on http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}