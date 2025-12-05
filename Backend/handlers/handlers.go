package handlers

import (
	"context"
	"net/http"

	"Feedback/db"
	"Feedback/models"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"golang.org/x/crypto/bcrypt"
)

// --- AUTH HANDLERS ---

func RegisterHandler(c *gin.Context) {
	var user models.User
	// Gin automatically reads the body and fills the struct
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	user.Password = string(hashedPassword)
	user.ID = primitive.NewObjectID()

	collection := db.Database.Collection("users")
	_, err := collection.InsertOne(context.TODO(), user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error saving user"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": "Admin Registered Successfully!"})
}

func LoginHandler(c *gin.Context) {
	var loginDetails struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}
	if err := c.ShouldBindJSON(&loginDetails); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	var user models.User
	collection := db.Database.Collection("users")
	err := collection.FindOne(context.TODO(), bson.M{"email": loginDetails.Email}).Decode(&user)

	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not found"})
		return
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(loginDetails.Password))
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Wrong password!"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status": "Login Successful!",
		"name":   user.Name,
		"id":     user.ID.Hex(),
	})
}

// --- SESSION HANDLERS ---

func CreateSessionHandler(c *gin.Context) {
	var newSession models.Session
	if err := c.ShouldBindJSON(&newSession); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	newSession.ID = primitive.NewObjectID()

	if newSession.Title == "" || newSession.Content == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Title and Content are required"})
		return
	}

	collection := db.Database.Collection("sessions")
	_, err := collection.InsertOne(context.TODO(), newSession)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create session"})
		return
	}

	c.JSON(http.StatusOK, newSession)
}

func GetSessionsHandler(c *gin.Context) {
	collection := db.Database.Collection("sessions")

	// Get query parameters easily with Gin
	creatorID := c.Query("creator_id")
	sessionID := c.Query("id")

	var filter interface{}

	if sessionID != "" {
		objID, err := primitive.ObjectIDFromHex(sessionID)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Session ID"})
			return
		}
		filter = bson.M{"_id": objID}
	} else if creatorID != "" {
		filter = bson.M{"creator_id": creatorID}
	} else {
		filter = bson.M{}
	}

	cursor, err := collection.Find(context.TODO(), filter)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error fetching sessions"})
		return
	}

	var sessions []models.Session
	cursor.All(context.TODO(), &sessions)

	if sessions == nil {
		sessions = []models.Session{}
	}

	c.JSON(http.StatusOK, sessions)
}

func DeleteSessionHandler(c *gin.Context) {
	sessionID := c.Query("id")
	if sessionID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Session ID required"})
		return
	}

	objID, err := primitive.ObjectIDFromHex(sessionID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Session ID"})
		return
	}

	result, err := db.Database.Collection("sessions").DeleteOne(context.TODO(), bson.M{"_id": objID})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error deleting session"})
		return
	}

	if result.DeletedCount == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Session not found"})
		return
	}

	// Delete related feedback
	db.Database.Collection("feedback").DeleteMany(context.TODO(), bson.M{"session_id": sessionID})

	c.JSON(http.StatusOK, gin.H{"status": "Deleted successfully"})
}

// --- FEEDBACK HANDLERS ---

func SubmitFeedbackHandler(c *gin.Context) {
	var newFeedback models.Feedback
	if err := c.ShouldBindJSON(&newFeedback); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	collection := db.Database.Collection("feedback")
	_, err := collection.InsertOne(context.TODO(), newFeedback)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to submit feedback"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": "Feedback Received!"})
}

func ViewFeedbackHandler(c *gin.Context) {
	sessionID := c.Query("session_id")
	collection := db.Database.Collection("feedback")

	cursor, err := collection.Find(context.TODO(), bson.M{"session_id": sessionID})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error fetching feedback"})
		return
	}

	var feedbacks []models.Feedback
	cursor.All(context.TODO(), &feedbacks)

	if feedbacks == nil {
		feedbacks = []models.Feedback{}
	}

	c.JSON(http.StatusOK, feedbacks)
}