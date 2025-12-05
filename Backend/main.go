package main

import (
	"fmt"
	"time"

	"Feedback/db"       // Import our DB
	"Feedback/handlers" // Import our Logic

	"github.com/gin-contrib/cors" // Official CORS tool
	"github.com/gin-gonic/gin"    // The Gin Framework
)

func main() {
	fmt.Println("⚡ PeerPulse Backend (Gin Edition) is starting...")

	// 1. Connect to Database
	db.Connect()

	// 2. Initialize Gin Router
	r := gin.Default()

	// 3. Setup CORS (Security) - Allow React to talk to us
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"}, // Allow everyone (for development)
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	// 4. Define Routes
	// Notice how clean this is! We specify the method (POST, GET) directly.
	
	// Auth
	r.POST("/register", handlers.RegisterHandler)
	r.POST("/login", handlers.LoginHandler)

	// Admin Actions
	r.POST("/create-session", handlers.CreateSessionHandler)
	r.GET("/get-sessions", handlers.GetSessionsHandler)
	r.DELETE("/delete-session", handlers.DeleteSessionHandler)
	r.GET("/view-feedback", handlers.ViewFeedbackHandler)

	// User Actions
	r.POST("/submit-feedback", handlers.SubmitFeedbackHandler)

	// 5. Start Server
	fmt.Println("🚀 Server running on http://localhost:8080")
	r.Run(":8080") // Gin handles the server startup
}