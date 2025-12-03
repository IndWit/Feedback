package handlers

import (
	"context"
	"encoding/json"
	"net/http"

	"Feedback/db"     // Importing our new DB package
	"Feedback/models" // Importing our new Models package

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"golang.org/x/crypto/bcrypt"
)

// --- AUTH HANDLERS ---

func RegisterHandler(w http.ResponseWriter, r *http.Request) {
	EnableCors(&w)
	if r.Method == "OPTIONS" { return }
	if r.Method != "POST" {
		http.Error(w, "Only POST allowed", http.StatusMethodNotAllowed)
		return
	}

	var user models.User
	_ = json.NewDecoder(r.Body).Decode(&user)

	hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	user.Password = string(hashedPassword)
	user.ID = primitive.NewObjectID()

	collection := db.Database.Collection("users")
	_, err := collection.InsertOne(context.TODO(), user)
	if err != nil {
		http.Error(w, "Error saving user", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"status": "Admin Registered Successfully!"})
}

func LoginHandler(w http.ResponseWriter, r *http.Request) {
	EnableCors(&w)
	if r.Method == "OPTIONS" { return }
	if r.Method != "POST" { return }

	var loginDetails struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}
	_ = json.NewDecoder(r.Body).Decode(&loginDetails)

	var user models.User
	collection := db.Database.Collection("users")
	err := collection.FindOne(context.TODO(), bson.M{"email": loginDetails.Email}).Decode(&user)
	
	if err != nil {
		http.Error(w, "User not found", http.StatusUnauthorized)
		return
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(loginDetails.Password))
	if err != nil {
		http.Error(w, "Wrong password!", http.StatusUnauthorized)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{
		"status": "Login Successful!",
		"name":   user.Name,
		"id":     user.ID.Hex(),
	})
}

// --- SESSION HANDLERS ---

func CreateSessionHandler(w http.ResponseWriter, r *http.Request) {
	EnableCors(&w)
	if r.Method == "OPTIONS" { return }
	if r.Method != "POST" { return }

	var newSession models.Session
	_ = json.NewDecoder(r.Body).Decode(&newSession)
	newSession.ID = primitive.NewObjectID()

	collection := db.Database.Collection("sessions")
	collection.InsertOne(context.TODO(), newSession)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(newSession)
}

func GetSessionsHandler(w http.ResponseWriter, r *http.Request) {
	EnableCors(&w)
	if r.Method == "OPTIONS" { return }

	collection := db.Database.Collection("sessions")
	
	creatorID := r.URL.Query().Get("creator_id")
	sessionID := r.URL.Query().Get("id")

	var filter interface{}

	if sessionID != "" {
		objID, _ := primitive.ObjectIDFromHex(sessionID)
		filter = bson.M{"_id": objID}
	} else if creatorID != "" {
		filter = bson.M{"creator_id": creatorID}
	} else {
		filter = bson.M{}
	}

	cursor, _ := collection.Find(context.TODO(), filter)
	var sessions []models.Session
	cursor.All(context.TODO(), &sessions)

	if sessions == nil {
		sessions = []models.Session{}
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(sessions)
}

func DeleteSessionHandler(w http.ResponseWriter, r *http.Request) {
	EnableCors(&w)
	if r.Method == "OPTIONS" { return }
	
	sessionID := r.URL.Query().Get("id")
	objID, _ := primitive.ObjectIDFromHex(sessionID)

	db.Database.Collection("sessions").DeleteOne(context.TODO(), bson.M{"_id": objID})
	
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"status": "Deleted"})
}

// --- FEEDBACK HANDLERS ---

func SubmitFeedbackHandler(w http.ResponseWriter, r *http.Request) {
	EnableCors(&w)
	if r.Method == "OPTIONS" { return }
	if r.Method != "POST" { return }

	var newFeedback models.Feedback
	_ = json.NewDecoder(r.Body).Decode(&newFeedback)

	db.Database.Collection("feedback").InsertOne(context.TODO(), newFeedback)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"status": "Feedback Received!"})
}

func ViewFeedbackHandler(w http.ResponseWriter, r *http.Request) {
	EnableCors(&w)
	if r.Method == "OPTIONS" { return }

	sessionID := r.URL.Query().Get("session_id")
	collection := db.Database.Collection("feedback")
	
	cursor, _ := collection.Find(context.TODO(), bson.M{"session_id": sessionID})
	var feedbacks []models.Feedback
	cursor.All(context.TODO(), &feedbacks)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(feedbacks)
}

// Helper: Enable CORS
func EnableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	(*w).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
}